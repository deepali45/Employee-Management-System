// src/utils/tokenUtils.js

const TOKEN_KEY = "ems_token";
const ROLE_KEY = "role";
const EMPLOYEE_ID_KEY = "employeeId";
const THEME_KEY = "ems-theme";

// ---------- TOKEN ----------
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// ---------- ROLE ----------
export const setRole = (role) => {
  localStorage.setItem(ROLE_KEY, role);
};

export const getRole = () => {
  return localStorage.getItem(ROLE_KEY);
};

export const removeRole = () => {
  localStorage.removeItem(ROLE_KEY);
};

// ---------- EMPLOYEE ID ----------
export const setEmployeeId = (employeeId) => {
  localStorage.setItem(EMPLOYEE_ID_KEY, employeeId);
};

export const getEmployeeId = () => {
  return localStorage.getItem(EMPLOYEE_ID_KEY);
};

export const removeEmployeeId = () => {
  localStorage.removeItem(EMPLOYEE_ID_KEY);
};

// ---------- THEME ----------
export const getTheme = () =>
  localStorage.getItem(THEME_KEY) || "light";

export const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
  document.body.setAttribute("data-theme", theme);
};

export const toggleTheme = () => {
  const current = getTheme();
  const newTheme = current === "light" ? "dark" : "light";
  setTheme(newTheme);
};
