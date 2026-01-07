import { removeToken, removeRole, removeEmployeeId } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    removeRole();
    removeEmployeeId();
    navigate("/");
  };

  return <button onClick={logout}>Logout</button>;
}
