import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Alert, Button } from "@mui/material";
import { getEmployeeId } from "../../utils/tokenUtils";
import EmployeeService from "../../services/employeeService"; // ✅ FIXED CASE
import EditProfileForm from "../../components/employee/EditProfileForm";

export default function EmployeeDashboard() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fetchEmployeeProfile = async () => {
    try {
      setLoading(true);
      const employeeId = getEmployeeId();
      const response = await EmployeeService.getEmployeeProfile(employeeId);
      setEmployee(response.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch employee profile:", err);
      setError(
        err.response?.data?.message ||
        "Failed to fetch employee profile. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeProfile();
  }, []);

  const handleSaveProfile = async (updatedData) => {
    try {
      setLoading(true);
      const employeeId = getEmployeeId();
      const response = await EmployeeService.updateEmployeeProfile(employeeId, updatedData);
      setEmployee(response.data);
      setIsEditing(false);
      setError("");
    } catch (err) {
      console.error("Profile update error:", err);
      setError(
        err.response?.data?.message ||
        "Failed to update profile. Please try again."
      );
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

  if (!employee) {
    return <Alert severity="warning">No employee data found.</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Employee Profile
      </Typography>

      {isEditing ? (
        <EditProfileForm
          employee={employee}
          onSave={handleSaveProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <Box mt={4}>
          <Typography variant="h6">Name: {employee.fullName}</Typography>
          <Typography>Email: {employee.personalEmail}</Typography>
          <Typography>Company Email: {employee.companyEmail}</Typography>
          <Typography>Mobile: {employee.mobileNumber}</Typography>
          <Typography>Gender: {employee.gender}</Typography>
          <Typography>DOB: {employee.dateOfBirth}</Typography>
          <Typography>Current Address: {employee.currentAddress}</Typography>
          <Typography>Permanent Address: {employee.permanentAddress}</Typography>
          <Typography>Designation: {employee.designation}</Typography>
          <Typography>Department: {employee.department}</Typography>
          <Typography>Role: {employee.employeeRole}</Typography>
          <Typography>Date of Joining: {employee.dateOfJoining}</Typography>
          <Typography>Reporting Manager: {employee.reportingManager}</Typography>
          <Typography>Office Location: {employee.officeLocation}</Typography>
          <Typography>Employment Type: {employee.employmentType}</Typography>
          <Typography>Emergency Contact: {employee.emergencyContact}</Typography>
          <Typography>Blood Group: {employee.bloodGroup}</Typography>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        </Box>
      )}
    </Box>
  );
}
