import axiosInstance from "./axiosConfig";

export const getFinanceDetails = (employeeId) =>
  axiosInstance.get(`/finance/employee/${employeeId}`);

export const addFinanceDetails = (data) =>
  axiosInstance.post("/admin/finance", data);
