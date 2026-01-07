import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { getRole } from "../../utils/tokenUtils";
import "../../assets/styles/dashboard.css";

const DashboardLayout = ({ children, title }) => {
  const role = getRole();

  return (
    <div className="dashboard-container">
      <Sidebar role={role} />

      <div className="dashboard-content">
        <Header title={title} />
        <div className="dashboard-page">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
