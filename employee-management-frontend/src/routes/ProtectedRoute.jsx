import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getRole } from '../utils/tokenUtils'; // Assuming getRole from tokenUtils

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = getRole(); // Get the user's role from local storage

  if (!userRole) {
    // If no role (not logged in), redirect to login page
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If user's role is not in allowedRoles, redirect to a forbidden page or login
    // For simplicity, redirecting to login. In a real app, you might have a /403 page.
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;