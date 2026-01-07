import { toggleTheme, getTheme } from "../../utils/themeUtils";
import { useState } from "react";

export default function ThemeToggle() {
  const [theme, setThemeState] = useState(getTheme());

  const handleToggle = () => {
    toggleTheme();
    setThemeState(getTheme());
  };

  return (
    <button onClick={handleToggle}>
      {theme === "light" ? "🌙 Dark" : "☀ Light"}
    </button>
  );
}
