import axiosInstance from "./axiosConfig";

export const loginApi = (data) => {
  return axiosInstance.post("/auth/login", data);
};
