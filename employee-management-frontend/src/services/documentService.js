// src/services/documentService.js
import axiosInstance from "../api/axiosConfig";

const DOCUMENT_API_URL = "/documents";

const DocumentService = {
  uploadDocument: (employeeId, documentType, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);
    // Optionally append fileName if you want to provide a custom one
    // formData.append("fileName", file.name);

    return axiosInstance.post(`${DOCUMENT_API_URL}/upload/${employeeId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getDocumentById: (id) => {
    return axiosInstance.get(`${DOCUMENT_API_URL}/${id}`);
  },

  getAllDocuments: () => {
    return axiosInstance.get(DOCUMENT_API_URL);
  },

  getDocumentsByEmployeeId: (employeeId) => {
    return axiosInstance.get(`${DOCUMENT_API_URL}/employee/${employeeId}`);
  },

  getDocumentsByDocumentType: (documentType) => {
    return axiosInstance.get(`${DOCUMENT_API_URL}/type/${documentType}`);
  },

  downloadDocument: (id) => {
    return axiosInstance.get(`${DOCUMENT_API_URL}/download/${id}`, {
      responseType: "blob", // Important for downloading files
    });
  },

  deleteDocument: (id) => {
    return axiosInstance.delete(`${DOCUMENT_API_URL}/${id}`);
  },
};

export default DocumentService;
