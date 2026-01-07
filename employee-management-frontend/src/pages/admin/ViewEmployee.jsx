import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeService from "../../services/EmployeeService";
import { Typography, Card, CardContent, CircularProgress, Box, Alert, Divider } from '@mui/material';

export default function ViewEmployee() {
  const { id } = useParams(); // Get employee ID from URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await EmployeeService.getById(id);
        setEmployee(response.data);
      } catch (err) {
        console.error(`Failed to fetch employee details for ID ${id}:`, err);
        setError("Failed to load employee details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

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

  if (!employee) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Alert severity="info">No employee data found for this ID.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Employee Details (ID: {employee.id})
      </Typography>
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Personal Details</Typography>
          <Typography><strong>Full Name:</strong> {employee.fullName}</Typography>
          <Typography><strong>Date of Birth:</strong> {employee.dateOfBirth}</Typography>
          <Typography><strong>Gender:</strong> {employee.gender}</Typography>
          <Typography><strong>Personal Email:</strong> {employee.personalEmail}</Typography>
          <Typography><strong>Mobile Number:</strong> {employee.mobileNumber}</Typography>
          <Typography><strong>Permanent Address:</strong> {employee.permanentAddress}</Typography>
          <Typography><strong>Current Address:</strong> {employee.currentAddress}</Typography>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Company / Official Details</Typography>
          <Typography><strong>Company Email:</strong> {employee.companyEmail}</Typography>
          <Typography><strong>Employee Role:</strong> {employee.employeeRole}</Typography>
          <Typography><strong>Designation:</strong> {employee.designation}</Typography>
          <Typography><strong>Department:</strong> {employee.department}</Typography>
          <Typography><strong>Date of Joining:</strong> {employee.dateOfJoining}</Typography>
          <Typography><strong>Reporting Manager:</strong> {employee.reportingManager}</Typography>
          <Typography><strong>Office Location:</strong> {employee.officeLocation}</Typography>
          <Typography><strong>Employment Type:</strong> {employee.employmentType}</Typography>
        </CardContent>
      </Card>

      {employee.professionalDetails && (
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Professional Details</Typography>
            <Typography><strong>Skills:</strong> {employee.professionalDetails.skills}</Typography>
            <Typography><strong>Experience:</strong> {employee.professionalDetails.experience}</Typography>
            <Typography><strong>Certifications:</strong> {employee.professionalDetails.certifications}</Typography>
            <Typography><strong>Previous Company:</strong> {employee.professionalDetails.previousCompany}</Typography>
            {employee.projects && employee.projects.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>Projects</Typography>
                {employee.projects.map((project, index) => (
                  <Box key={index} sx={{ mb: 1, ml: 2, borderLeft: '2px solid #ccc', pl: 1 }}>
                    <Typography><strong>Project Name:</strong> {project.currentProject}</Typography>
                    <Typography><strong>Project Code:</strong> {project.projectCode}</Typography>
                    <Typography><strong>Client Name:</strong> {project.clientName}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {employee.finance && (
        <Card sx={{ marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Financial / Payroll Details</Typography>
            <Typography><strong>PAN Card:</strong> {employee.finance.panCard}</Typography>
            <Typography><strong>Aadhar Card:</strong> {employee.finance.aadharCard}</Typography>
            <Typography><strong>Bank Name:</strong> {employee.finance.bankName}</Typography>
            <Typography><strong>Account Number:</strong> {employee.finance.accountNumber}</Typography>
            <Typography><strong>IFSC Code:</strong> {employee.finance.ifscCode}</Typography>
            <Typography><strong>CTC:</strong> {employee.finance.ctc}</Typography>
            <Typography><strong>Salary Breakup:</strong> {employee.finance.salaryBreakup}</Typography>
          </CardContent>
        </Card>
      )}

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>System / Security Details</Typography>
          <Typography><strong>Username / Email:</strong> {employee.username}</Typography>
          <Typography><strong>Role:</strong> {employee.employeeRole}</Typography>
          <Typography><strong>Account Status:</strong> {employee.accountStatus}</Typography>
          <Typography><strong>Last Login:</strong> {employee.lastLogin}</Typography>
          <Typography><strong>Created At:</strong> {employee.createdAt}</Typography>
        </CardContent>
      </Card>

      {/* Optional Details if they exist on the employee object */}
      {(employee.emergencyContact || employee.bloodGroup || employee.exitDate || employee.reasonForExit || employee.performanceRating || employee.leaveBalance) && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>Optional Details</Typography>
            {employee.emergencyContact && <Typography><strong>Emergency Contact:</strong> {employee.emergencyContact}</Typography>}
            {employee.bloodGroup && <Typography><strong>Blood Group:</strong> {employee.bloodGroup}</Typography>}
            {employee.exitDate && <Typography><strong>Exit Date:</strong> {employee.exitDate}</Typography>}
            {employee.reasonForExit && <Typography><strong>Reason for Exit:</strong> {employee.reasonForExit}</Typography>}
            {employee.performanceRating && <Typography><strong>Performance Rating:</strong> {employee.performanceRating}</Typography>}
            {employee.leaveBalance && <Typography><strong>Leave Balance:</strong> {employee.leaveBalance}</Typography>}
          </CardContent>
        </Card>
      )}
    </Box>
  );
}