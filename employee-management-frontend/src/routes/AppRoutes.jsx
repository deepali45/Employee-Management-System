import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import ViewEmployees from "../pages/admin/ViewEmployees";
import AddEmployee from "../pages/admin/AddEmployee";
import EditEmployee from "../pages/admin/EditEmployee";
import LeaveRequestsApproval from "../components/admin/LeaveRequestsApproval";
import AttendanceManagement from "../components/admin/AttendanceManagement";
import DocumentManagement from "../components/admin/DocumentManagement";
import TaskManagement from "../components/admin/TaskManagement";
import AuditLogsPage from "../pages/admin/AuditLogsPage";

// HR
import HrDashboard from "../pages/hr/HrDashboard";

// Employee
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import EmployeeProjects from "../pages/employee/EmployeeProjects";
import EmployeeFinance from "../pages/employee/EmployeeFinance";
import ProfessionalDetails from "../pages/employee/ProfessionalDetails";
import EmployeeLeavePage from "../pages/employee/EmployeeLeavePage";
import EmployeeAttendance from "../pages/employee/EmployeeAttendance";
import EmployeeDocuments from "../pages/employee/EmployeeDocuments";
import EmployeeTasks from "../pages/employee/EmployeeTasks";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<ViewEmployees />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="edit-employee/:id" element={<EditEmployee />} />
          <Route path="leave-requests" element={<LeaveRequestsApproval />} />
          <Route path="attendance" element={<AttendanceManagement />} />
          <Route path="documents" element={<DocumentManagement />} />
          <Route path="tasks" element={<TaskManagement />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
        </Route>
      </Route>

      {/* HR ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["HR", "ADMIN"]} />}>
        <Route path="/hr" element={<Layout />}>
          <Route index element={<HrDashboard />} />
          <Route path="dashboard" element={<HrDashboard />} />
          <Route path="leave-requests" element={<LeaveRequestsApproval />} />
          <Route path="attendance" element={<AttendanceManagement />} />
          <Route path="documents" element={<DocumentManagement />} />
          <Route path="tasks" element={<TaskManagement />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
        </Route>
      </Route>

      {/* EMPLOYEE ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE"]} />}>
        <Route path="/employee" element={<Layout />}>
          <Route index element={<EmployeeDashboard />} />
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="profile" element={<EmployeeDashboard />} />
          <Route path="professional" element={<ProfessionalDetails />} />
          <Route path="projects" element={<EmployeeProjects />} />
          <Route path="finance" element={<EmployeeFinance />} />
          <Route path="leave" element={<EmployeeLeavePage />} />
          <Route path="attendance" element={<EmployeeAttendance />} />
          <Route path="documents" element={<EmployeeDocuments />} />
          <Route path="tasks" element={<EmployeeTasks />} />
        </Route>
      </Route>
    </Routes>
  );
}
