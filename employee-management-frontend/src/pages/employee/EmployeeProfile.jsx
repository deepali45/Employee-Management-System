import React, { useEffect, useState } from 'react';
import EmployeeService from "../../services/EmployeeService";
import { getEmployeeId } from '../../utils/tokenUtils';
import { Typography, Card, CardContent, CircularProgress, Box, Alert } from '@mui/material';

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const employeeId = getEmployeeId();
        if (!employeeId) {
          throw new Error("Employee ID not found. Please log in again.");
        }
        const response = await EmployeeService.getById(employeeId);
        setEmployee(response.data);
      } catch (err) {
        console.error("Failed to fetch employee profile:", err);
        setError("Failed to load employee profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeProfile();
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

  if (!employee) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Alert severity="info">No employee data found.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Employee Profile
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            {employee.fullName}
          </Typography>
          <Typography color="text.secondary">
            Employee ID: {employee.id}
          </Typography>
          <Typography color="text.secondary">
            Email: {employee.personalEmail}
          </Typography>
          <Typography color="text.secondary">
            Mobile: {employee.mobileNumber}
          </Typography>
          <Typography color="text.secondary">
            Date of Birth: {employee.dateOfBirth}
          </Typography>
          <Typography color="text.secondary">
            Gender: {employee.gender}
          </Typography>
          <Typography color="text.secondary">
            Permanent Address: {employee.permanentAddress}
          </Typography>
          <Typography color="text.secondary">
            Current Address: {employee.currentAddress}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
