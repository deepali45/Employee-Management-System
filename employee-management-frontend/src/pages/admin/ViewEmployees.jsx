import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../../api/employeeApi";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

export default function ViewEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        fetchEmployees();
      } catch (error) {
        console.error("Failed to delete employee:", error);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        View Employees
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/admin/add-employee"
        sx={{ mb: 2 }}
      >
        Add Employee
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.employeeId}>
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{employee.fullName}</TableCell>
                <TableCell>{employee.companyemail}</TableCell>
                <TableCell>
                  <IconButton
                    component={Link}
                    to={`/admin/edit-employee/${employee.employeeId}`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(employee.employeeId)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
