import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";

const genders = ["Male", "Female", "Other"];
const employmentTypes = ["Full-time", "Part-time", "Contract", "Intern"];

export default function EditProfileForm({ employee, onSave, onCancel }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        fullName: employee.fullName || "",
        dateOfBirth: employee.dateOfBirth || "",
        gender: employee.gender || "",
        currentAddress: employee.currentAddress || "",
        permanentAddress: employee.permanentAddress || "",
        mobileNumber: employee.mobileNumber || "",
        personalEmail: employee.personalEmail || "",
        // Include other fields that can be edited by the employee
        // For simplicity, excluding sensitive data like companyEmail, employeeId, password, role, etc.
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="fullName"
            label="Full Name"
            fullWidth
            value={formData.fullName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="personalEmail"
            label="Personal Email"
            fullWidth
            value={formData.personalEmail}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="mobileNumber"
            label="Mobile Number"
            fullWidth
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="dateOfBirth"
            label="Date of Birth"
            fullWidth
            value={formData.dateOfBirth}
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="gender"
            label="Gender"
            fullWidth
            select
            value={formData.gender}
            onChange={handleChange}
          >
            {genders.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="currentAddress"
            label="Current Address"
            fullWidth
            multiline
            rows={2}
            value={formData.currentAddress}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="permanentAddress"
            label="Permanent Address"
            fullWidth
            multiline
            rows={2}
            value={formData.permanentAddress}
            onChange={handleChange}
          />
        </Grid>
        {/* Add more editable fields as needed */}
      </Grid>
      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
