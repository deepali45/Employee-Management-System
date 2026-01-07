package com.ems.controller;

import com.ems.dto.DocumentDTO;
import com.ems.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // Admin/HR can upload documents for any employee, Employee can upload for themselves
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE', 'ROLE_ADMIN', 'ROLE_HR')")
    @PostMapping("/upload/{employeeId}")
    public ResponseEntity<DocumentDTO> uploadDocument(
            @PathVariable Long employeeId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType,
            @RequestParam(value = "fileName", required = false) String fileName) {
        
        DocumentDTO documentDTO = new DocumentDTO();
        documentDTO.setDocumentType(com.ems.entity.DocumentType.valueOf(documentType.toUpperCase()));
        if (fileName != null && !fileName.isEmpty()) {
            documentDTO.setFileName(fileName);
        } else {
            documentDTO.setFileName(file.getOriginalFilename());
        }

        DocumentDTO uploadedDocument = documentService.uploadDocument(employeeId, documentDTO, file);

        // Generate download URI
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/documents/download/")
                .path(uploadedDocument.getDocumentId().toString())
                .toUriString();
        uploadedDocument.setFilePath(fileDownloadUri); // Update filePath to be the download URI

        return ResponseEntity.status(HttpStatus.CREATED).body(uploadedDocument);
    }

    // Admin/HR can get any document, Employee can get their own
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE', 'ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/{id}")
    public ResponseEntity<DocumentDTO> getDocumentById(@PathVariable Long id) {
        DocumentDTO document = documentService.getDocumentById(id);
        return ResponseEntity.ok(document);
    }

    // Admin/HR can view all documents
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping
    public ResponseEntity<List<DocumentDTO>> getAllDocuments() {
        List<DocumentDTO> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents.stream().map(doc -> {
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/documents/download/")
                    .path(doc.getDocumentId().toString())
                    .toUriString();
            doc.setFilePath(fileDownloadUri);
            return doc;
        }).collect(Collectors.toList()));
    }

    // Get documents for a specific employee (Admin/HR/Employee for themselves)
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE', 'ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<DocumentDTO>> getDocumentsByEmployeeId(@PathVariable Long employeeId) {
        List<DocumentDTO> documents = documentService.getDocumentsByEmployeeId(employeeId);
        return ResponseEntity.ok(documents.stream().map(doc -> {
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/documents/download/")
                    .path(doc.getDocumentId().toString())
                    .toUriString();
            doc.setFilePath(fileDownloadUri);
            return doc;
        }).collect(Collectors.toList()));
    }

    // Download a document
    @PreAuthorize("hasAnyAuthority('ROLE_EMPLOYEE', 'ROLE_ADMIN', 'ROLE_HR')")
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id, HttpServletRequest request) {
        Resource resource = documentService.downloadDocument(id);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            // Fallback to the default content type if type could not be determined
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    // Admin/HR can delete documents
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }
}
