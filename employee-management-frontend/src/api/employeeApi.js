import axiosInstance from "./axiosConfig";
import { getEmployeeId } from "../utils/tokenUtils";

export const getEmployeeById = (id) =>
  axiosInstance.get(`/employees/${id}`);

export const getEmployees = () =>
  axiosInstance.get("/employees");

export const addEmployee = (data) =>
  axiosInstance.post("/employees", data);

export const updateEmployee = (id, data) =>
  axiosInstance.put(`/employees/${id}`, data);

export const deleteEmployee = (id) =>
  axiosInstance.delete(`/employees/${id}`);

export const getEmployeeProfile = () => {
    const id = getEmployeeId();
    return getEmployeeById(id);
}

export const getEmployeeFinance = () => {
    const id = getEmployeeId();
    return getEmployeeById(id).then(res => ({...res, data: res.data.finance}));
}

export const getEmployeeProjects = () => {
    const id = getEmployeeId();
    return getEmployeeById(id).then(res => ({...res, data: res.data.projects}));
}
