import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";
import LeaveRequestService from "../../services/leaveRequestService";
import { getEmployeeId } from "../../utils/tokenUtils"; // Assuming a utility to get employeeId

const leaveTypes = [
  "SICK",
  "CASUAL",
  "VACATION",
  "MATERNITY",
  "PATERNITY",
  "BEREAVEMENT",
  "OTHER",
];

export default function ApplyLeaveForm({ onLeaveApplied }) {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const employeeId = getEmployeeId(); // Get the logged-in employee's ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!leaveType || !startDate || !endDate || !reason) {
      setError("All fields are required.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be after end date.");
      return;
    }

    try {
      const leaveRequestData = {
        employeeId: employeeId,
        leaveType,
        startDate,
        endDate,
        reason,
      };
      await LeaveRequestService.createLeaveRequest(leaveRequestData);
      setSuccess("Leave request submitted successfully!");
      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");
      if (onLeaveApplied) {
        onLeaveApplied();
      }
    } catch (err) {
      setError("Failed to submit leave request. Please try again.");
      console.error("Leave request error:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Apply for Leave
      </Typography>

      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        select
        label="Leave Type"
        fullWidth
        margin="normal"
        value={leaveType}
        onChange={(e) => setLeaveType(e.target.value)}
      >
        {leaveTypes.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Start Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <TextField
        label="End Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <TextField
        label="Reason"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Submit Request
      </Button>
    </Box>
  );
}
