import { Navigate } from "react-router-dom";
import { getToken } from "../../utils/tokenUtils";

export default function ProtectedRoute({ children }) {
  return getToken() ? children : <Navigate to="/" />;
}
