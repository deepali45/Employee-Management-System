import React, { useState, useEffect } from "react";
import { Box, Toolbar } from "@mui/material";
import Appbar from "./Appbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { getRole } from "../../utils/tokenUtils"; // Assuming a utility to get role

const Layout = () => {
  const [role, setRole] = useState(getRole());

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(getRole());
    };

    window.addEventListener('storage', handleStorageChange);
    // Listen for custom event if needed for more immediate updates without page reload
    // For example, if login/logout updates localstorage without full page navigation

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar />
      <Sidebar role={role} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* To offset content below AppBar */}
        <Outlet /> {/* Renders nested routes */}
      </Box>
    </Box>
  );
};

export default Layout;
