import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DocumentService from "../../services/documentService";
import { getEmployeeId } from "../../utils/tokenUtils"; // Assuming a utility to get employeeId

export default function EmployeeDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeId = getEmployeeId();

  const fetchEmployeeDocuments = async () => {
    try {
      setLoading(true);
      const response = await DocumentService.getDocumentsByEmployeeId(
        employeeId
      );
      setDocuments(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch documents. Please try again later.");
      console.error("Documents fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeDocuments();
  }, []);

  const handleDownload = async (documentId, fileName, fileType) => {
    try {
      const response = await DocumentService.downloadDocument(documentId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to download document. Please try again.");
      console.error("Download error:", err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Documents
      </Typography>

      {documents.length === 0 ? (
        <Typography>No documents found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Document Type</TableCell>
                <TableCell>Upload Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.documentId}>
                  <TableCell>{doc.fileName}</TableCell>
                  <TableCell>{doc.fileType}</TableCell>
                  <TableCell>{doc.documentType}</TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleDownload(doc.documentId, doc.fileName, doc.fileType)
                      }
                    >
                      <DownloadIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
