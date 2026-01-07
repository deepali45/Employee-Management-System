import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService"; // Import EmployeeService

export default function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: '',
    dateOfBirth: '',
    gender: '',
    personalEmail: '',
    mobileNumber: '',
    permanentAddress: '',
    currentAddress: '',
    // Company / Official Details
    companyEmail: '',
    employeeRole: 'EMPLOYEE', // Default role
    designation: '',
    department: '',
    dateOfJoining: '',
    reportingManager: '',
    officeLocation: '',
    employmentType: '',
    // Professional Details (nested)
    skills: '',
    experience: '',
    certifications: '',
    previousCompany: '',
    // Project Details (nested, assuming one project for simplicity)
    currentProject: '',
    projectCode: '',
    clientName: '',
    // Financial / Payroll Details (nested)
    panCard: '',
    aadharCard: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    ctc: '',
    salaryBreakup: '',
    // System / Security Details
    username: '',
    password: '', // New field for setting password
    accountStatus: 'ACTIVE', // Default status
    // Optional Details
    emergencyContact: '',
    bloodGroup: '',
    exitDate: '',
    reasonForExit: '',
    performanceRating: '',
    leaveBalance: '',
  });

  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const employeeDataToSend = {
      // Personal Details
      fullName: formData.fullName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      personalEmail: formData.personalEmail,
      mobileNumber: formData.mobileNumber,
      permanentAddress: formData.permanentAddress,
      currentAddress: formData.currentAddress,
      // Company / Official Details
      companyEmail: formData.companyEmail,
      employeeRole: formData.employeeRole,
      designation: formData.designation,
      department: formData.department,
      dateOfJoining: formData.dateOfJoining,
      reportingManager: formData.reportingManager,
      officeLocation: formData.officeLocation,
      employmentType: formData.employmentType,
      // System / Security Details
      username: formData.username || formData.companyEmail, // Use companyEmail as username if not provided
      password: formData.password,
      accountStatus: formData.accountStatus,
      // Nested Professional Details
      professionalDetails: {
        skills: formData.skills,
        experience: formData.experience,
        certifications: formData.certifications,
        previousCompany: formData.previousCompany,
      },
      // Nested Projects (send as an array, assuming one project for simplicity)
      projects: [{
        currentProject: formData.currentProject,
        projectCode: formData.projectCode,
        clientName: formData.clientName,
      }],
      // Nested Finance Details
      finance: {
        panCard: formData.panCard,
        aadharCard: formData.aadharCard,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        ctc: formData.ctc,
        salaryBreakup: formData.salaryBreakup,
      },
      // Optional Details
      emergencyContact: formData.emergencyContact,
      bloodGroup: formData.bloodGroup,
      exitDate: formData.exitDate,
      reasonForExit: formData.reasonForExit,
      performanceRating: formData.performanceRating,
      leaveBalance: formData.leaveBalance,
    };

    try {
      await EmployeeService.createEmployee(employeeDataToSend);
      setSnackbarMessage('Employee added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate("/admin/employees"); // Redirect to employee list after successful addition
    } catch (error) {
      console.error("Failed to add employee:", error);
      setSnackbarMessage(`Failed to add employee: ${error.response?.data?.message || error.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Employee
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Personal Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} margin="normal" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Date of Birth" name="dateOfBirth" type="date" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Personal Email" name="personalEmail" type="email" value={formData.personalEmail} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Permanent Address" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Current Address" name="currentAddress" value={formData.currentAddress} onChange={handleChange} margin="normal" />
            </Grid>
          </Grid>

          {/* Company / Official Details */}
          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Company / Official Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Company Email" name="companyEmail" type="email" value={formData.companyEmail} onChange={handleChange} margin="normal" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Employee Role</InputLabel>
                <Select
                  name="employeeRole"
                  value={formData.employeeRole}
                  onChange={handleChange}
                  label="Employee Role"
                >
                  <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Designation" name="designation" value={formData.designation} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Department" name="department" value={formData.department} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Date of Joining" name="dateOfJoining" type="date" InputLabelProps={{ shrink: true }} value={formData.dateOfJoining} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Reporting Manager" name="reportingManager" value={formData.reportingManager} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Office Location" name="officeLocation" value={formData.officeLocation} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Employment Type</InputLabel>
                <Select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  label="Employment Type"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Intern">Intern</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Professional Details */}
          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Professional Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Skills" name="skills" value={formData.skills} onChange={handleChange} margin="normal" multiline rows={2} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Experience" name="experience" value={formData.experience} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Certifications" name="certifications" value={formData.certifications} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Previous Company" name="previousCompany" value={formData.previousCompany} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Current Project" name="currentProject" value={formData.currentProject} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Project Code" name="projectCode" value={formData.projectCode} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Client Name" name="clientName" value={formData.clientName} onChange={handleChange} margin="normal" />
            </Grid>
          </Grid>

          {/* Financial / Payroll Details */}
          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Financial / Payroll Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="PAN Card" name="panCard" value={formData.panCard} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Aadhar Card" name="aadharCard" value={formData.aadharCard} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="CTC" name="ctc" value={formData.ctc} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Salary Breakup" name="salaryBreakup" value={formData.salaryBreakup} onChange={handleChange} margin="normal" />
            </Grid>
          </Grid>

          {/* System / Security Details */}
          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>System / Security Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Username" name="username" value={formData.username} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Account Status</InputLabel>
                <Select
                  name="accountStatus"
                  value={formData.accountStatus}
                  onChange={handleChange}
                  label="Account Status"
                >
                  <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                  <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Optional Details */}
          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Optional Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Exit Date" name="exitDate" type="date" InputLabelProps={{ shrink: true }} value={formData.exitDate} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Reason for Exit" name="reasonForExit" value={formData.reasonForExit} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Performance Rating" name="performanceRating" value={formData.performanceRating} onChange={handleChange} margin="normal" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Leave Balance" name="leaveBalance" value={formData.leaveBalance} onChange={handleChange} margin="normal" />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Add Employee'}
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
