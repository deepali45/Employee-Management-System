import { loginApi } from "../api/authApi";
import { setToken, removeToken, setRole, removeRole, setEmployeeId, removeEmployeeId } from "../utils/tokenUtils";
import { useAuthStore } from "../store/authStore";

const AuthService = {
  login: async (credentials) => {
    const res = await loginApi(credentials);
    setToken(res.data.token);
    setRole(res.data.role);
    setEmployeeId(res.data.employeeId); // Store employeeId

    // Update Zustand store
    useAuthStore.getState().login(res.data.role);
    return res.data;
  },

  logout: () => {
    removeToken();
    removeRole();
    removeEmployeeId(); // Remove employeeId on logout
    useAuthStore.getState().logout();
  },
};

export default AuthService;
