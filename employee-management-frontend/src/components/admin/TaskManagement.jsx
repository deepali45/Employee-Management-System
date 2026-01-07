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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskService from "../../services/taskService";
import EmployeeService from "../../services/employeeService"; // To get employee list for assigning tasks

const taskStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"];
const taskPriorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export default function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]); // For employee selection
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const [formEmployeeId, setFormEmployeeId] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDueDate, setFormDueDate] = useState("");
  const [formStatus, setFormStatus] = useState("PENDING");
  const [formPriority, setFormPriority] = useState("MEDIUM");

  const fetchTasksAndEmployees = async () => {
    try {
      setLoading(true);
      const [tasksRes, employeesRes] = await Promise.all([
        TaskService.getAllTasks(),
        EmployeeService.getAllEmployees(), // Assuming this API exists
      ]);
      setTasks(tasksRes.data);
      setEmployees(employeesRes.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Task/Employee fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksAndEmployees();
  }, []);

  const handleOpenCreateDialog = () => {
    setIsEditing(false);
    setCurrentTask(null);
    setFormEmployeeId("");
    setFormTitle("");
    setFormDescription("");
    setFormDueDate("");
    setFormStatus("PENDING");
    setFormPriority("MEDIUM");
    setOpenTaskDialog(true);
  };

  const handleOpenEditDialog = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setFormEmployeeId(task.employeeId);
    setFormTitle(task.title);
    setFormDescription(task.description);
    setFormDueDate(task.dueDate);
    setFormStatus(task.status);
    setFormPriority(task.priority);
    setOpenTaskDialog(true);
  };

  const handleCloseTaskDialog = () => {
    setOpenTaskDialog(false);
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    setError("");

    const taskData = {
      employeeId: formEmployeeId,
      title: formTitle,
      description: formDescription,
      dueDate: formDueDate,
      status: formStatus,
      priority: formPriority,
    };

    try {
      if (isEditing) {
        await TaskService.updateTask(currentTask.taskId, taskData);
      } else {
        await TaskService.createTask(taskData);
      }
      handleCloseTaskDialog();
      fetchTasksAndEmployees(); // Refresh list
    } catch (err) {
      setError("Failed to save task. Please try again.");
      console.error("Save task error:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      fetchTasksAndEmployees(); // Refresh list
    } catch (err) {
      setError("Failed to delete task. Please try again.");
      console.error("Delete task error:", err);
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
        Task Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddTaskIcon />}
        onClick={handleOpenCreateDialog}
        sx={{ mb: 3 }}
      >
        Assign New Task
      </Button>

      <Dialog open={openTaskDialog} onClose={handleCloseTaskDialog}>
        <DialogTitle>{isEditing ? "Edit Task" : "Assign New Task"}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmitTask} sx={{ mt: 1 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Assign to Employee</InputLabel>
              <Select
                value={formEmployeeId}
                label="Assign to Employee"
                onChange={(e) => setFormEmployeeId(e.target.value)}
              >
                {employees.map((emp) => (
                  <MenuItem key={emp.employeeId} value={emp.employeeId}>
                    {emp.fullName} ({emp.companyEmail})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={formDueDate}
              onChange={(e) => setFormDueDate(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formStatus}
                label="Status"
                onChange={(e) => setFormStatus(e.target.value)}
              >
                {taskStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Priority</InputLabel>
              <Select
                value={formPriority}
                label="Priority"
                onChange={(e) => setFormPriority(e.target.value)}
              >
                {taskPriorities.map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DialogActions>
              <Button onClick={handleCloseTaskDialog}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? "Update Task" : "Assign Task"}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {tasks.length === 0 ? (
        <Typography>No tasks found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.taskId}>
                  <TableCell>
                    {employees.find((emp) => emp.employeeId === task.employeeId)?.fullName || task.employeeId}
                  </TableCell>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenEditDialog(task)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteTask(task.taskId)}
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
