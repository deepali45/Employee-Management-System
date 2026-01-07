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
  ButtonGroup,
} from "@mui/material";
import LeaveRequestService from "../../services/leaveRequestService";
import { getEmployeeId } from "../../utils/tokenUtils"; // Assuming a utility to get employeeId

export default function LeaveRequestsApproval() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reviewerId = getEmployeeId(); // Get the logged-in reviewer's ID

  const fetchAllLeaveRequests = async () => {
    try {
      setLoading(true);
      const response = await LeaveRequestService.getAllLeaveRequests();
      setLeaveRequests(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch leave requests. Please try again later.");
      console.error("Leave requests fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLeaveRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await LeaveRequestService.approveLeaveRequest(id, reviewerId);
      fetchAllLeaveRequests(); // Refresh list
    } catch (err) {
      setError("Failed to approve leave request.");
      console.error("Approve leave error:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await LeaveRequestService.rejectLeaveRequest(id, reviewerId);
      fetchAllLeaveRequests(); // Refresh list
    } catch (err) {
      setError("Failed to reject leave request.");
      console.error("Reject leave error:", err);
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
        Leave Requests for Approval
      </Typography>

      {leaveRequests.length === 0 ? (
        <Typography>No leave requests found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Requested At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.leaveRequestId}>
                  <TableCell>{request.employeeId}</TableCell>
                  <TableCell>{request.leaveType}</TableCell>
                  <TableCell>
                    {request.startDate} to {request.endDate}
                  </TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {new Date(request.requestedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {request.status === "PENDING" && (
                      <ButtonGroup
                        variant="contained"
                        aria-label="leave actions"
                      >
                        <Button
                          color="success"
                          onClick={() => handleApprove(request.leaveRequestId)}
                        >
                          Approve
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleReject(request.leaveRequestId)}
                        >
                          Reject
                        </Button>
                      </ButtonGroup>
                    )}
                    {request.status !== "PENDING" && (
                        <Typography variant="body2" color="textSecondary">
                            {request.status} by {request.reviewedByEmployeeId} at {new Date(request.reviewedAt).toLocaleString()}
                        </Typography>
                    )}
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
