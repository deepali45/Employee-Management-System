// src/services/taskService.js
import axiosInstance from "../api/axiosConfig";

const TASK_API_URL = "/tasks";

const TaskService = {
  createTask: (taskData) => {
    return axiosInstance.post(TASK_API_URL, taskData);
  },

  getTaskById: (id) => {
    return axiosInstance.get(`${TASK_API_URL}/${id}`);
  },

  getAllTasks: () => {
    return axiosInstance.get(TASK_API_URL);
  },

  getTasksByEmployeeId: (employeeId) => {
    return axiosInstance.get(`${TASK_API_URL}/employee/${employeeId}`);
  },

  getTasksByStatus: (status) => {
    return axiosInstance.get(`${TASK_API_URL}/status/${status}`);
  },

  getTasksByPriority: (priority) => {
    return axiosInstance.get(`${TASK_API_URL}/priority/${priority}`);
  },

  updateTask: (id, taskData) => {
    return axiosInstance.put(`${TASK_API_URL}/${id}`, taskData);
  },

  deleteTask: (id) => {
    return axiosInstance.delete(`${TASK_API_URL}/${id}`);
  },
};

export default TaskService;
