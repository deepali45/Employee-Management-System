const THEME_KEY = "ems-theme";

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
