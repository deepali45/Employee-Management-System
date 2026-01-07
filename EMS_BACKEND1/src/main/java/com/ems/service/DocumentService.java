package com.ems.service;

import com.ems.dto.DocumentDTO;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DocumentService {
    DocumentDTO uploadDocument(Long employeeId, DocumentDTO documentDTO, MultipartFile file);
    DocumentDTO getDocumentById(Long documentId);
    List<DocumentDTO> getAllDocuments();
    List<DocumentDTO> getDocumentsByEmployeeId(Long employeeId);
    List<DocumentDTO> getDocumentsByDocumentType(String documentType);
    Resource downloadDocument(Long documentId);
    void deleteDocument(Long documentId);
}
