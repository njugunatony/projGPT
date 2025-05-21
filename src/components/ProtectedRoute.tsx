import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles: Array<"superadmin" | "hr_admin" | "manager" | "employee">;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { loading, profile } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!profile || !allowedRoles.includes(profile.role)) return <Navigate to="/not-authorized" />;

  return <>{children}</>;
};

export default ProtectedRoute;