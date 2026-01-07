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
  TextField,
  Button,
  Grid,
} from "@mui/material";
import AttendanceService from "../../services/attendanceService";
import DashboardService from "../../services/dashboardService"; // To get attendance summary

export default function AttendanceManagement() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("2023-01-01"); // Default start date
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10)); // Default end date

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const [recordsRes, summaryRes] = await Promise.all([
        AttendanceService.getAllAttendance(),
        DashboardService.getAttendanceSummary(startDate, endDate),
      ]);
      setAttendanceRecords(recordsRes.data);
      setAttendanceSummary(summaryRes.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch attendance data. Please try again later.");
      console.error("Attendance data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [startDate, endDate]); // Refetch when date range changes

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
        Attendance Management
      </Typography>

      <Box component={Paper} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Filter by Date
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={fetchAttendanceData}
            >
              Apply Filter
            </Button>
          </Grid>
        </Grid>
      </Box>

      {attendanceSummary && (
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Attendance Summary ({startDate} to {endDate})
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Present</Typography>
                <Typography variant="h4">
                  {attendanceSummary.totalPresent}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Absent</Typography>
                <Typography variant="h4">
                  {attendanceSummary.totalAbsent}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Half Day</Typography>
                <Typography variant="h4">
                  {attendanceSummary.totalHalfDay}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total On Leave</Typography>
                <Typography variant="h4">
                  {attendanceSummary.totalLeave}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Holidays</Typography>
                <Typography variant="h4">
                  {attendanceSummary.totalHoliday}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {attendanceRecords.length === 0 ? (
        <Typography>No attendance records found for the selected date range.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
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
                  <TableCell>{record.employeeId}</TableCell>
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
