import React, { useEffect, useState } from 'react';
import EmployeeService from "../../services/EmployeeService";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await EmployeeService.getAll();
        setEmployees(response.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError("Failed to load employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleView = (id) => {
    navigate(`/admin/view-employee/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-employee/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await EmployeeService.remove(id);
        setEmployees(employees.filter(employee => employee.id !== id));
      } catch (err) {
        console.error("Failed to delete employee:", err);
        alert("Failed to delete employee. Please try again.");
      }
    }
  };

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

  if (employees.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Alert severity="info">No employees found.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Employee List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {employee.id}
                </TableCell>
                <TableCell>{employee.fullName}</TableCell>
                <TableCell>{employee.companyEmail}</TableCell>
                <TableCell>{employee.employeeRole}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => handleView(employee.id)} sx={{ mr: 1 }}>
                    View
                  </Button>
                  <Button variant="outlined" size="small" onClick={() => handleEdit(employee.id)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(employee.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
