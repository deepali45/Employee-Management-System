// src/services/dashboardService.js
import axiosInstance from "../api/axiosConfig";

const DASHBOARD_API_URL = "/dashboard";

const DashboardService = {
  getDashboardOverview: () => {
    return axiosInstance.get(`${DASHBOARD_API_URL}/overview`);
  },

  getLeaveSummary: () => {
    return axiosInstance.get(`${DASHBOARD_API_URL}/leave-summary`);
  },

  getAttendanceSummary: (startDate, endDate) => {
    return axiosInstance.get(`${DASHBOARD_API_URL}/attendance-summary`, {
      params: { startDate, endDate },
    });
  },

  getEmployeeRoleDistribution: () => {
    return axiosInstance.get(`${DASHBOARD_API_URL}/role-distribution`);
  },
};

export default DashboardService;