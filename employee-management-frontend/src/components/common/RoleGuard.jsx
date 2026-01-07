import { Navigate } from "react-router-dom";
import { getRole } from "../../utils/tokenUtils";

export default function RoleGuard({ allowedRole, children }) {
  const role = getRole();
  return role === allowedRole ? children : <Navigate to="/" />;
}
