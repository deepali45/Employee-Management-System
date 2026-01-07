import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from "../../services/EmployeeService";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  Button,
  Paper,
  Grid,
  Snackbar
} from '@mui/material';

export default function EditEmployee() {
  const { id } = useParams(); // Get employee ID from URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    personalEmail: '',
    mobileNumber: '',
    permanentAddress: '',
    currentAddress: '',
    companyEmail: '',
    employeeRole: '',
    designation: '',
    department: '',
    dateOfJoining: '',
    reportingManager: '',
    officeLocation: '',
    employmentType: '',
    skills: '',
    experience: '',
    certifications: '',
    previousCompany: '',
    currentProject: '',
    projectCode: '',
    clientName: '',
    panCard: '',
    aadharCard: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    ctc: '',
    salaryBreakup: '',
    username: '', // Assuming username is part of the main employee object for simplicity
    accountStatus: '',
    lastLogin: '',
    createdAt: '',
    emergencyContact: '',
    bloodGroup: '',
    exitDate: '',
    reasonForExit: '',
    performanceRating: '',
    leaveBalance: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        setLoading(true);
        setError(null);
                const response = await EmployeeService.getEmployeeById(id);
                const employeeData = response.data;
                setEmployee(employeeData);
        
                // Flatten the employee data for the form
                setFormData({
                  fullName: employeeData.fullName || '',
                  dateOfBirth: employeeData.dateOfBirth || '',
                  gender: employeeData.gender || '',
                  personalEmail: employeeData.personalEmail || '',
                  mobileNumber: employeeData.mobileNumber || '',
                  permanentAddress: employeeData.permanentAddress || '',
                  currentAddress: employeeData.currentAddress || '',
                  companyEmail: employeeData.companyEmail || '',
                  employeeRole: employeeData.employeeRole || '',
                  designation: employeeData.designation || '',
                  department: employeeData.department || '',
                  dateOfJoining: employeeData.dateOfJoining || '',
                  reportingManager: employeeData.reportingManager || '',
                  officeLocation: employeeData.officeLocation || '',
                  employmentType: employeeData.employmentType || '',
                  // Professional Details
                  skills: employeeData.professionalDetails?.skills || '',
                  experience: employeeData.professionalDetails?.experience || '',
                  certifications: employeeData.professionalDetails?.certifications || '',
                  previousCompany: employeeData.professionalDetails?.previousCompany || '',
                  currentProject: employeeData.projects?.[0]?.currentProject || '', // Assuming one project for simplicity
                  projectCode: employeeData.projects?.[0]?.projectCode || '',
                  clientName: employeeData.projects?.[0]?.clientName || '',
                  // Finance Details
                  panCard: employeeData.finance?.panCard || '',
                  aadharCard: employeeData.finance?.aadharCard || '',
                  bankName: employeeData.finance?.bankName || '',
                  accountNumber: employeeData.finance?.accountNumber || '',
                  ifscCode: employeeData.finance?.ifscCode || '',
                  ctc: employeeData.finance?.ctc || '',
                  salaryBreakup: employeeData.finance?.salaryBreakup || '',
                  // System/Security Details
                  username: employeeData.username || '',
                  accountStatus: employeeData.accountStatus || '',
                  lastLogin: employeeData.lastLogin || '',
                  createdAt: employeeData.createdAt || '',
                  // Optional Details
                  emergencyContact: employeeData.emergencyContact || '',
                  bloodGroup: employeeData.bloodGroup || '',
                  exitDate: employeeData.exitDate || '',
                  reasonForExit: employeeData.reasonForExit || '',
                  performanceRating: employeeData.performanceRating || '',
                  leaveBalance: employeeData.leaveBalance || '',
                });
              } catch (err) {
                console.error(`Failed to fetch employee details for ID ${id}:`, err);
                setError("Failed to load employee details. Please try again later.");
              } finally {
                setLoading(false);
              }
            };
        
            fetchEmployeeDetails();
          }, [id]);
        
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
            setError(null);
        
            // Reconstruct the nested objects for the API call
            const updatedEmployeeData = {
              ...formData,
              professionalDetails: {
                skills: formData.skills,
                experience: formData.experience,
                certifications: formData.certifications,
                previousCompany: formData.previousCompany,
              },
              projects: [{ // Assuming one project for now
                currentProject: formData.currentProject,
                projectCode: formData.projectCode,
                clientName: formData.clientName,
              }],
              finance: {
                panCard: formData.panCard,
                aadharCard: formData.aadharCard,
                bankName: formData.bankName,
                accountNumber: formData.accountNumber,
                ifscCode: formData.ifscCode,
                ctc: formData.ctc,
                salaryBreakup: formData.salaryBreakup,
              },
              // Remove flattened properties that are now nested
              skills: undefined,
              experience: undefined,
              certifications: undefined,
              previousCompany: undefined,
              currentProject: undefined,
              projectCode: undefined,
              clientName: undefined,
              panCard: undefined,
              aadharCard: undefined,
              bankName: undefined,
              accountNumber: undefined,
              ifscCode: undefined,
              ctc: undefined,
              salaryBreakup: undefined,
            };
        
            try {
              await EmployeeService.updateEmployee(id, updatedEmployeeData);      setSnackbarMessage('Employee updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      navigate('/admin/employees'); // Redirect to employee list
    } catch (err) {
      console.error("Failed to update employee:", err);
      setSnackbarMessage('Failed to update employee. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setError("Failed to update employee. Please try again.");
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

  if (loading && !employee) {
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
        Edit Employee (ID: {employee.id})
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Personal Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dateOfBirth}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Personal Email"
                name="personalEmail"
                type="email"
                value={formData.personalEmail}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Permanent Address"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Address"
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Company / Official Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Email"
                name="companyEmail"
                type="email"
                value={formData.companyEmail}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee Role"
                name="employeeRole"
                value={formData.employeeRole}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Joining"
                name="dateOfJoining"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.dateOfJoining}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Reporting Manager"
                name="reportingManager"
                value={formData.reportingManager}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Office Location"
                name="officeLocation"
                value={formData.officeLocation}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employment Type"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Professional Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Previous Company"
                name="previousCompany"
                value={formData.previousCompany}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Current Project"
                name="currentProject"
                value={formData.currentProject}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Project Code"
                name="projectCode"
                value={formData.projectCode}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Client Name"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Financial / Payroll Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="PAN Card"
                name="panCard"
                value={formData.panCard}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Aadhar Card"
                name="aadharCard"
                value={formData.aadharCard}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Number"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="IFSC Code"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CTC"
                name="ctc"
                value={formData.ctc}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Salary Breakup"
                name="salaryBreakup"
                value={formData.salaryBreakup}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>System / Security Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                disabled // Username might not be editable
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Account Status"
                name="accountStatus"
                value={formData.accountStatus}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Login"
                name="lastLogin"
                value={formData.lastLogin}
                onChange={handleChange}
                margin="normal"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Created At"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
                margin="normal"
                disabled
              />
            </Grid>
          </Grid>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>Optional Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Exit Date"
                name="exitDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.exitDate}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Reason for Exit"
                name="reasonForExit"
                value={formData.reasonForExit}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Performance Rating"
                name="performanceRating"
                value={formData.performanceRating}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Leave Balance"
                name="leaveBalance"
                value={formData.leaveBalance}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mr: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Update Employee'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={() => navigate('/admin/employees')}
            disabled={loading}
          >
            Cancel
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
