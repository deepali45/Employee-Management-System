import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Paper,
} from "@mui/material";
import DashboardService from "../../services/dashboardService"; // Correct path

export default function HrDashboard() {
  const [overview, setOverview] = useState(null);
  const [leaveSummary, setLeaveSummary] = useState(null);
  const [attendanceSummary, setAttendanceSummary] = useState(null);
  const [roleDistribution, setRoleDistribution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          overviewRes,
          leaveSummaryRes,
          attendanceSummaryRes,
          roleDistributionRes,
        ] = await Promise.all([
          DashboardService.getDashboardOverview(),
          DashboardService.getLeaveSummary(),
          DashboardService.getAttendanceSummary(
            "2023-01-01",
            "2023-12-31"
          ), // Example date range
          DashboardService.getEmployeeRoleDistribution(),
        ]);

        setOverview(overviewRes.data);
        setLeaveSummary(leaveSummaryRes.data);
        setAttendanceSummary(attendanceSummaryRes.data);
        setRoleDistribution(roleDistributionRes.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch dashboard data.");
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        HR Dashboard Overview
      </Typography>

      {overview && (
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Total Employees
              </Typography>
              <Typography variant="h3">{overview.totalEmployees}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Employees on Leave Today
              </Typography>
              <Typography variant="h3">{overview.employeesOnLeave}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Pending Leave Requests
              </Typography>
              <Typography variant="h3">
                {overview.pendingLeaveRequests}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Employees Present Today
              </Typography>
              <Typography variant="h3">
                {overview.employeesPresentToday}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Total Tasks
              </Typography>
              <Typography variant="h3">{overview.totalTasks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Pending Tasks
              </Typography>
              <Typography variant="h3">{overview.pendingTasks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Completed Tasks
              </Typography>
              <Typography variant="h3">{overview.completedTasks}</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}

      {leaveSummary && (
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Leave Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Requests</Typography>
                <Typography variant="h4">
                  {leaveSummary.totalLeaveRequests}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Approved</Typography>
                <Typography variant="h4">
                  {leaveSummary.approvedLeaves}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Pending</Typography>
                <Typography variant="h4">
                  {leaveSummary.pendingLeaves}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Rejected</Typography>
                <Typography variant="h4">
                  {leaveSummary.rejectedLeaves}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Cancelled</Typography>
                <Typography variant="h4">
                  {leaveSummary.cancelledLeaves}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {attendanceSummary && (
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Attendance Summary (2023)
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

      {roleDistribution && (
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Employee Role Distribution
          </Typography>
          <Grid container spacing={3}>
            {Object.entries(roleDistribution.roleCounts).map(([role, count]) => (
              <Grid item xs={12} md={4} key={role}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6">{role}</Typography>
                  <Typography variant="h4">{count}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
