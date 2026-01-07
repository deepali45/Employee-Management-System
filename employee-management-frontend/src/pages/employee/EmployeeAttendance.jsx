import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AttendanceService from "../../services/attendanceService";
import { getEmployeeId } from "../../utils/tokenUtils"; // Assuming a utility to get employeeId

export default function EmployeeAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [todayAttendance, setTodayAttendance] = useState(null);

  const employeeId = getEmployeeId();

  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      const response = await AttendanceService.getAttendanceByEmployeeId(
        employeeId
      );
      setAttendanceRecords(response.data);

      // Check for today's attendance record
      const today = new Date().toISOString().slice(0, 10);
      const recordToday = response.data.find(
        (rec) => rec.attendanceDate === today
      );
      setTodayAttendance(recordToday);

      setError(null);
    } catch (err) {
      setError("Failed to fetch attendance records. Please try again later.");
      console.error("Attendance records fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      await AttendanceService.recordCheckIn(employeeId);
      setSuccess("Checked in successfully!");
      fetchAttendanceRecords(); // Refresh data
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to check in. Please try again."
      );
      console.error("Check-in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      await AttendanceService.recordCheckOut(employeeId);
      setSuccess("Checked out successfully!");
      fetchAttendanceRecords(); // Refresh data
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to check out. Please try again."
      );
      console.error("Check-out error:", err);
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
        My Attendance
      </Typography>

      <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckIn}
          disabled={todayAttendance && todayAttendance.checkInTime}
        >
          Check In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCheckOut}
          disabled={
            !todayAttendance ||
            !todayAttendance.checkInTime ||
            todayAttendance.checkOutTime
          }
        >
          Check Out
        </Button>
      </Box>

      {attendanceRecords.length === 0 ? (
        <Typography>No attendance records found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Check-in</TableCell>
                <TableCell>Check-out</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceRecords.map((record) => (
                <TableRow key={record.attendanceId}>
                  <TableCell>{record.attendanceDate}</TableCell>
                  <TableCell>{record.checkInTime}</TableCell>
                  <TableCell>{record.checkOutTime}</TableCell>
                  <TableCell>{record.status}</TableCell>
                  <TableCell>{record.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
