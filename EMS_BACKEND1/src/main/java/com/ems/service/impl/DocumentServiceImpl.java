package com.ems.service.impl;

import com.ems.dto.DocumentDTO;
import com.ems.entity.Document;
import com.ems.entity.Employee;
import com.ems.exception.ResourceNotFoundException;
import com.ems.repository.DocumentRepository;
import com.ems.repository.EmployeeRepository;
import com.ems.service.DocumentService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final Path fileStorageLocation;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public DocumentServiceImpl() {
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @Override
    public DocumentDTO uploadDocument(Long employeeId, DocumentDTO documentDTO, MultipartFile file) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path targetLocation = this.fileStorageLocation.resolve(fileName);

        try {
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }

        Document document = new Document();
        document.setEmployee(employee);
        document.setFileName(fileName);
        document.setFileType(file.getContentType());
        document.setFilePath(targetLocation.toString()); // Store the absolute path
        document.setDocumentType(documentDTO.getDocumentType());

        Document savedDocument = documentRepository.save(document);
        return convertToDTO(savedDocument);
    }

    @Override
    public DocumentDTO getDocumentById(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with ID: " + documentId));
        return convertToDTO(document);
    }

    @Override
    public List<DocumentDTO> getAllDocuments() {
        return documentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DocumentDTO> getDocumentsByEmployeeId(Long employeeId) {
        return documentRepository.findByEmployeeEmployeeId(employeeId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<DocumentDTO> getDocumentsByDocumentType(String documentType) {
        return documentRepository.findByDocumentType(documentType).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Resource downloadDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with ID: " + documentId));

        Path filePath = Paths.get(document.getFilePath()).normalize();
        try {
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new ResourceNotFoundException("File not found " + document.getFileName());
            }
        } catch (MalformedURLException ex) {
            throw new ResourceNotFoundException("File not found " + document.getFileName(), ex);
        }
    }

    @Override
    public void deleteDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with ID: " + documentId));
        
        try {
            Files.deleteIfExists(Paths.get(document.getFilePath()).normalize());
        } catch (IOException ex) {
            throw new RuntimeException("Could not delete file " + document.getFileName(), ex);
        }
        documentRepository.delete(document);
    }

    private DocumentDTO convertToDTO(Document document) {
        DocumentDTO documentDTO = new DocumentDTO();
        BeanUtils.copyProperties(document, documentDTO, "employee");
        if (document.getEmployee() != null) {
            documentDTO.setEmployeeId(document.getEmployee().getEmployeeId());
        }
        return documentDTO;
    }
}
