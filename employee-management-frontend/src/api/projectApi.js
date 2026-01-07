import axiosInstance from "./axiosConfig";

export const getEmployeeProjects = () =>
  axiosInstance.get("/employee/projects");

export const addEmployeeProject = (data) =>
  axiosInstance.post("/admin/project", data);
