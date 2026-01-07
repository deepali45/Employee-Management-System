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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import TaskService from "../../services/taskService";
import { getEmployeeId } from "../../utils/tokenUtils"; // Assuming a utility to get employeeId

export default function EmployeeTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employeeId = getEmployeeId();

  const fetchEmployeeTasks = async () => {
    try {
      setLoading(true);
      const response = await TaskService.getTasksByEmployeeId(employeeId);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again later.");
      console.error("Tasks fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setLoading(true);
      const taskToUpdate = tasks.find((task) => task.taskId === taskId);
      if (taskToUpdate) {
        await TaskService.updateTask(taskId, {
          ...taskToUpdate,
          status: newStatus,
        });
        fetchEmployeeTasks(); // Refresh tasks
      }
    } catch (err) {
      setError("Failed to update task status. Please try again.");
      console.error("Task status update error:", err);
    } finally {
      setLoading(false);
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
        My Tasks
      </Typography>

      {tasks.length === 0 ? (
        <Typography>No tasks assigned.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Assigned Date</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.taskId}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.assignedDate}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>
                    <FormControl variant="outlined" size="small">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.taskId, e.target.value)
                        }
                        label="Status"
                      >
                        <MenuItem value="PENDING">PENDING</MenuItem>
                        <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
                        <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                        <MenuItem value="ON_HOLD">ON_HOLD</MenuItem>
                        <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {/* Additional actions like view details if needed */}
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
