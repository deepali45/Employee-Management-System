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
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DocumentService from "../../services/documentService";

const documentTypes = [
  "PAYSLIP",
  "OFFER_LETTER",
  "CONTRACT",
  "TAX_DOCUMENT",
  "CERTIFICATE",
  "OTHER",
];

export default function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const [uploadEmployeeId, setUploadEmployeeId] = useState("");
  const [uploadDocumentType, setUploadDocumentType] = useState("");
  const [uploadFile, setUploadFile] = useState(null);

  const fetchAllDocuments = async () => {
    try {
      setLoading(true);
      const response = await DocumentService.getAllDocuments();
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
    fetchAllDocuments();
  }, []);

  const handleDownload = async (documentId, fileName) => {
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

  const handleDelete = async (documentId) => {
    try {
      await DocumentService.deleteDocument(documentId);
      fetchAllDocuments(); // Refresh list
    } catch (err) {
      setError("Failed to delete document. Please try again.");
      console.error("Delete error:", err);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!uploadEmployeeId || !uploadDocumentType || !uploadFile) {
      setError("All upload fields are required.");
      return;
    }

    try {
      await DocumentService.uploadDocument(
        uploadEmployeeId,
        uploadDocumentType,
        uploadFile
      );
      setOpenUploadDialog(false);
      setUploadEmployeeId("");
      setUploadDocumentType("");
      setUploadFile(null);
      fetchAllDocuments(); // Refresh list
    } catch (err) {
      setError("Failed to upload document. Please try again.");
      console.error("Upload error:", err);
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
        Document Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<UploadFileIcon />}
        onClick={() => setOpenUploadDialog(true)}
        sx={{ mb: 3 }}
      >
        Upload New Document
      </Button>

      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)}>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleUploadSubmit} sx={{ mt: 1 }}>
            <TextField
              label="Employee ID"
              fullWidth
              margin="normal"
              value={uploadEmployeeId}
              onChange={(e) => setUploadEmployeeId(e.target.value)}
            />
            <TextField
              select
              label="Document Type"
              fullWidth
              margin="normal"
              value={uploadDocumentType}
              onChange={(e) => setUploadDocumentType(e.target.value)}
            >
              {documentTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Choose File
              <input type="file" hidden onChange={(e) => setUploadFile(e.target.files[0])} />
            </Button>
            {uploadFile && <Typography sx={{ mt: 1 }}>{uploadFile.name}</Typography>}
            <DialogActions>
              <Button onClick={() => setOpenUploadDialog(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Upload</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {documents.length === 0 ? (
        <Typography>No documents found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
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
                  <TableCell>{doc.employeeId}</TableCell>
                  <TableCell>{doc.fileName}</TableCell>
                  <TableCell>{doc.fileType}</TableCell>
                  <TableCell>{doc.documentType}</TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        handleDownload(doc.documentId, doc.fileName)
                      }
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(doc.documentId)}
                    >
                      <DeleteIcon />
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
