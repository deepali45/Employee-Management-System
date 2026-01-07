<img width="1908" height="1010" alt="Screenshot 2026-01-06 185229" src="https://github.com/user-attachments/assets/a799c777-44d7-4e35-972b-8dee30e6e92c" /> Employee Management System (EMS)
A full-stack Employee Management System designed to manage employees, attendance, leave requests, tasks, documents, and payroll details with secure role-based access.

?? Project Overview
The Employee Management System simplifies HR operations by providing separate Admin and Employee dashboards. It ensures secure authentication, real-time data management, and easy scalability.

?? Tech Stack
Frontend
* React.js (Vite)
* JavaScript (ES6+)
* Material UI
* Axios
Backend
* Java 17
* Spring Boot
* Spring Security (JWT Authentication)
* Spring Data JPA
* Hibernate
Database
* MySQL
Tools
* VS Code (Frontend)
* Spring Tool Suite / Eclipse (Backend)
* Postman
* Git & GitHub

?? User Roles
Admin
* Dashboard overview
* Add / Edit / Delete employees
* Approve / Reject leave requests
* Attendance tracking
* Task & document management
* Audit logs
Employee
* Dashboard
* Profile management
* Apply for leave & view history
* Attendance view
* Tasks & documents

?? Database Schema (High-Level)
Tables
* users
* employees
* attendance
* leave_requests
* tasks
* documents
* audit_logs
Key Relationships
* One User ? One Employee
* One Employee ? Many Attendance records
* One Employee ? Many Leave requests

?? JWT Authentication Flow
1. User logs in with username & password
2. Backend validates credentials
3. JWT token is generated
4. Token sent to frontend
5. Frontend stores token (localStorage)
6. Token sent in Authorization header
7. Spring Security validates token on each request
Authorization: Bearer <JWT_TOKEN>

?? Installation & Setup
Frontend (VS Code)
npm install
npm run dev
Runs on: http://localhost:5173
Backend (STS / Eclipse)
mvn spring-boot:run
Runs on: http://localhost:8081

?? Deployment Steps
Frontend Deployment
1. Build project
npm run build
2. Deploy on Netlify / Vercel
Backend Deployment
1. Build JAR
mvn clean package
2. Deploy on AWS / Railway / Render
Database Deployment
* Use AWS RDS / PlanetScale

?? Screenshots
* Admin Dashboard
* Employee Dashboard
* Leave Management
* Attendance Management
* Add Employee Form

?? Future Enhancements
* Email notifications
* Payroll automation
* Role-based permissions
* Mobile application
* Analytics dashboard

????? Author
Developed by Your Name

?? License
This project is licensed under the MIT License.
























































