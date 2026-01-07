import React, { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import ApplyLeaveForm from "../../components/employee/ApplyLeaveForm";
import EmployeeLeaveHistory from "../../components/employee/EmployeeLeaveHistory";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EmployeeLeavePage() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Leave Management
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="employee leave tabs"
        >
          <Tab label="Apply for Leave" {...a11yProps(0)} />
          <Tab label="Leave History" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ApplyLeaveForm onLeaveApplied={() => setValue(1)} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EmployeeLeaveHistory />
      </TabPanel>
    </Box>
  );
}
