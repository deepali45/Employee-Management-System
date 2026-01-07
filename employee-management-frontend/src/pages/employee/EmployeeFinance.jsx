import React, { useEffect, useState } from 'react';
import EmployeeService from "../../services/EmployeeService";
import { getEmployeeId } from '../../utils/tokenUtils';
import { Typography, Card, CardContent, CircularProgress, Box, Alert } from '@mui/material';

export default function EmployeeFinance() {
  const [financeDetails, setFinanceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFinanceDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const employeeId = getEmployeeId();
        if (!employeeId) {
          throw new Error("Employee ID not found. Please log in again.");
        }
        const response = await EmployeeService.getEmployeeById(employeeId);
        if (response.data && response.data.finance) {
          setFinanceDetails(response.data.finance);
        } else {
          setFinanceDetails(null);
        }
      } catch (err) {
        console.error("Failed to fetch finance details:", err);
        setError("Failed to load finance details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceDetails();
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

  if (!financeDetails) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Alert severity="info">No financial data found for this employee.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Finance Details
      </Typography>
      <Card>
        <CardContent>
          <Typography color="text.secondary">
            PAN Card: {financeDetails.panCard}
          </Typography>
          <Typography color="text.secondary">
            Aadhar Card: {financeDetails.aadharCard}
          </Typography>
          <Typography color="text.secondary">
            Bank Name: {financeDetails.bankName}
          </Typography>
          <Typography color="text.secondary">
            Account Number: {financeDetails.accountNumber}
          </Typography>
          <Typography color="text.secondary">
            IFSC Code: {financeDetails.ifscCode}
          </Typography>
          <Typography color="text.secondary">
            CTC: {financeDetails.ctc}
          </Typography>
          <Typography color="text.secondary">
            Salary Breakup: {financeDetails.salaryBreakup}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}