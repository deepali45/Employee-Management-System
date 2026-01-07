// src/services/attendanceService.js
import axiosInstance from "../api/axiosConfig";

const ATTENDANCE_API_URL = "/attendance";

const AttendanceService = {
  recordCheckIn: (employeeId) => {
    return axiosInstance.post(`${ATTENDANCE_API_URL}/check-in/${employeeId}`);
  },

  recordCheckOut: (employeeId) => {
    return axiosInstance.post(`${ATTENDANCE_API_URL}/check-out/${employeeId}`);
  },

  createAttendance: (attendanceData) => {
    return axiosInstance.post(ATTENDANCE_API_URL, attendanceData);
  },

  getAttendanceById: (id) => {
    return axiosInstance.get(`${ATTENDANCE_API_URL}/${id}`);
  },

  getAllAttendance: () => {
    return axiosInstance.get(ATTENDANCE_API_URL);
  },

  getAttendanceByEmployeeId: (employeeId) => {
    return axiosInstance.get(`${ATTENDANCE_API_URL}/employee/${employeeId}`);
  },

  getAttendanceByDateRange: (startDate, endDate) => {
    return axiosInstance.get(`${ATTENDANCE_API_URL}/date-range`, {
      params: { startDate, endDate },
    });
  },

  getAttendanceByEmployeeAndDateRange: (employeeId, startDate, endDate) => {
    return axiosInstance.get(
      `${ATTENDANCE_API_URL}/employee/${employeeId}/date-range`,
      {
        params: { startDate, endDate },
      }
    );
  },

  updateAttendance: (id, attendanceData) => {
    return axiosInstance.put(`${ATTENDANCE_API_URL}/${id}`, attendanceData);
  },

  deleteAttendance: (id) => {
    return axiosInstance.delete(`${ATTENDANCE_API_URL}/${id}`);
  },
};

export default AttendanceService;
