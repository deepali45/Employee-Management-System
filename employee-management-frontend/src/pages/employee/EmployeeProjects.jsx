import React, { useEffect, useState } from 'react';
import EmployeeService from "../../services/EmployeeService";
import { getEmployeeId } from '../../utils/tokenUtils';
import { Typography, Card, CardContent, CircularProgress, Box, Alert } from '@mui/material';

export default function EmployeeProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const employeeId = getEmployeeId();
        if (!employeeId) {
          throw new Error("Employee ID not found. Please log in again.");
        }
        const response = await EmployeeService.getEmployeeById(employeeId);
        if (response.data && response.data.projects) {
          setProjects(response.data.projects);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error("Failed to fetch project details:", err);
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
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

  if (projects.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Alert severity="info">No project data found for this employee.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Projects
      </Typography>
      {projects.map((project, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Project Name: {project.currentProject}
            </Typography>
            <Typography color="text.secondary">
              Project Code: {project.projectCode}
            </Typography>
            <Typography color="text.secondary">
              Client Name: {project.clientName}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
