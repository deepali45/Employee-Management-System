import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Appbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Employee Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
