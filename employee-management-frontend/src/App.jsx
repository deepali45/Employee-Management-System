import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { getTheme, setTheme } from "./utils/themeUtils";
import "./index.css";

export default function App() {
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return <AppRoutes />;
}
