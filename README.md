Employee Management System (EMS)

A full-stack Employee Management System that allows organizations to efficiently manage employee information, departments, projects, performance records, and financial details.

The system provides two roles: Admin and Employee, each with different access permissions.

Live Demo

Frontend: (Add after deployment)
Backend API: (Add after deployment)

Project Overview

The Employee Management System (EMS) is a web-based application designed to simplify employee data management within an organization.

Administrators can manage employee records, departments, projects, and financial data, while employees can access their own profiles and update personal information.

Key Features
Admin Features

Admin authentication (login system)

Create new employee profiles

Edit employee information

Delete employee records

View all employees

Manage employee departments

Manage employee roles

Manage employee projects

Track employee performance

Manage employee financial details

Employee Features

Secure login system

View personal profile

View professional details

View financial information

View assigned projects

Update personal information

Technology Stack
Frontend

React

Bootstrap

HTML5

CSS3

JavaScript

Axios (API communication)

Backend

Spring Boot

Spring Security

Spring Data JPA

REST API Architecture

Database

MySQL

API Testing

Postman

Version Control

GitHub

Deployment Platforms

Backend: Render

Frontend: Vercel

System Architecture
Frontend (React)
        │
        │ REST API
        ▼
Backend (Spring Boot)
        │
        ▼
Database (MySQL)

Project Structure
Employee-Management-System
│
├── EMS_BACKEND1
│   ├── src
│   ├── pom.xml
│   └── application.properties
│
├── employee-management-frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md

Installation Guide
Clone the Repository
git clone https://github.com/deepali45/Employee-Management-System.git


Open project folder:

cd Employee-Management-System

Backend Setup (Spring Boot)

Go to backend directory:

cd EMS_BACKEND1


Build the project:

mvn clean install


Run the application:

mvn spring-boot:run


Backend will start at:

http://localhost:8080

Database Configuration

Create database in MySQL:

CREATE DATABASE ems_db;


Update application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/ems_db
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update

Frontend Setup (React)

Navigate to frontend folder:

cd employee-management-frontend


Install dependencies:

npm install


Run the project:

npm start


Frontend will start at:

http://localhost:3000

API Testing

All backend APIs were tested using:

Postman

Example APIs:

GET /employees
POST /employees
PUT /employees/{id}
DELETE /employees/{id}

Deployment
Backend Deployment

Backend deployed using:

Render

Steps:

Connect GitHub repository

Select backend folder

Build using Maven

Deploy Spring Boot API

Frontend Deployment

Frontend deployed using:

Vercel

Steps:

Import GitHub repository

Select React project folder

Deploy build files

Screenshots
Login Page

(Add screenshot here)

Admin Dashboard

(Add screenshot here)

Employee List

(Add screenshot here)

Employee Details

(Add screenshot here)

Future Improvements

Role-based authentication

Email notification system

Attendance management

Leave management system

Payroll automation

Report generation

Team Members
Backend Development

Poojitha

Srinivas

Ajay

Frontend Development

Jashwa

Shiva Prasad

Simin

Conclusion

The Employee Management System provides an efficient solution for managing employee data, performance tracking, and administrative operations. The system ensures secure access, scalable architecture, and user-friendly interfaces for both administrators and employees.
