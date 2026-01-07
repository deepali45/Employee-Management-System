// src/services/leaveRequestService.js
import axiosInstance from "../api/axiosConfig";

const LEAVE_REQUEST_API_URL = "/leave-requests";

const LeaveRequestService = {
  createLeaveRequest: (leaveRequestData) => {
    return axiosInstance.post(LEAVE_REQUEST_API_URL, leaveRequestData);
  },

  getLeaveRequestById: (id) => {
    return axiosInstance.get(`${LEAVE_REQUEST_API_URL}/${id}`);
  },

  getAllLeaveRequests: () => {
    return axiosInstance.get(LEAVE_REQUEST_API_URL);
  },

  getLeaveRequestsByEmployeeId: (employeeId) => {
    return axiosInstance.get(`${LEAVE_REQUEST_API_URL}/employee/${employeeId}`);
  },

  approveLeaveRequest: (id, reviewerId) => {
    return axiosInstance.put(`${LEAVE_REQUEST_API_URL}/${id}/approve`, { reviewerId });
  },

  rejectLeaveRequest: (id, reviewerId) => {
    return axiosInstance.put(`${LEAVE_REQUEST_API_URL}/${id}/reject`, { reviewerId });
  },

  updateLeaveRequest: (id, leaveRequestData) => {
    return axiosInstance.put(`${LEAVE_REQUEST_API_URL}/${id}`, leaveRequestData);
  },

  deleteLeaveRequest: (id) => {
    return axiosInstance.delete(`${LEAVE_REQUEST_API_URL}/${id}`);
  },
};

export default LeaveRequestService;
