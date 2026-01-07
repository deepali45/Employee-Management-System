import { useState } from "react";
import { loginApi } from "../../api/authApi";
import { setToken, setRole, setEmployeeId } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

export default function Login() {
  const [companyEmail, setCompanyEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!companyEmail || !password) {
      setError("Email and password are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { data } = await loginApi({
        companyEmail,
        password,
      });

      // ✅ Store auth data
      setToken(data.token);
      setRole(data.role);
      setEmployeeId(data.employeeId);

      // ✅ Role-based redirect
      switch (data.role) {
        case "ADMIN":
          navigate("/admin/dashboard", { replace: true });
          break;
        case "HR":
          navigate("/hr/dashboard", { replace: true });
          break;
        case "EMPLOYEE":
          navigate("/employee/dashboard", { replace: true });
          break;
        default:
          setError("Invalid user role");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("User not found");
      } else if (err.response?.status === 401) {
        setError("Invalid password");
      } else {
        setError("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Container component="main" maxWidth="xs" className="glass-card">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Employee Management System
          </Typography>

          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            sx={{ mt: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Company Email"
              type="email"
              autoComplete="email"
              autoFocus
              value={companyEmail}
              onChange={(e) => setCompanyEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
