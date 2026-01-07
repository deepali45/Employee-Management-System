import axiosInstance from "./axiosConfig";

export const getDashboardStats = () =>
  axiosInstance.get("/dashboard/stats");
