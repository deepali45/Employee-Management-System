import axiosInstance from "../api/axiosConfig";

const EMPLOYEE_API_URL = "/employees";

const EmployeeService = {
  // ✅ Logged-in employee (NO ID)
  getEmployeeProfile: (employeeId) => {
    return axiosInstance.get(`${EMPLOYEE_API_URL}/profile/${employeeId}`);
  },

  updateEmployeeProfile: (employeeId, employeeData) => {
    return axiosInstance.put(`${EMPLOYEE_API_URL}/profile/${employeeId}`, employeeData);
  },

  // ✅ Admin APIs (ID required)
  getAllEmployees: () => {
    return axiosInstance.get(EMPLOYEE_API_URL);
  },

  getEmployeeById: (id) => {
    return axiosInstance.get(`${EMPLOYEE_API_URL}/${id}`);
  },

  createEmployee: (employeeData) => {
    return axiosInstance.post(EMPLOYEE_API_URL, employeeData);
  },

  updateEmployee: (id, employeeData) => {
    return axiosInstance.put(`${EMPLOYEE_API_URL}/${id}`, employeeData);
  },

  deleteEmployee: (id) => {
    return axiosInstance.delete(`${EMPLOYEE_API_URL}/${id}`);
  },
};

export default EmployeeService;
