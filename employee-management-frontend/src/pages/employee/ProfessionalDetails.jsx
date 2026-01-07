import React, { useEffect, useState } from 'react';
import EmployeeService from "../../services/EmployeeService";
import { getEmployeeId } from '../../utils/tokenUtils';
import { Typography, Card, CardContent, CircularProgress, Box, Alert } from '@mui/material';

export default function ProfessionalDetails() {
  const [professionalDetails, setProfessionalDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfessionalDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const employeeId = getEmployeeId();
        if (!employeeId) {
          throw new Error("Employee ID not found. Please log in again.");
        }
        const response = await EmployeeService.getById(employeeId);
        if (response.data && response.data.professionalDetails) {
          setProfessionalDetails(response.data.professionalDetails);
        } else {
          setProfessionalDetails(null);
        }
      } catch (err) {
        console.error("Failed to fetch professional details:", err);
        setError("Failed to load professional details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionalDetails();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!professionalDetails) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Alert severity="info">No professional data found for this employee.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Professional Details
      </Typography>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            Skills: {professionalDetails.skills}
          </Typography>
          <Typography color="text.secondary">
            Experience: {professionalDetails.experience}
          </Typography>
          <Typography color="text.secondary">
            Certifications: {professionalDetails.certifications}
          </Typography>
          <Typography color="text.secondary">
            Previous Company: {professionalDetails.previousCompany}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
