import React, { useEffect } from "react";
import { useJwt } from "react-jwt";
import { Navigate } from "react-router";

// Global State

export const AdminRestriction = ({ children }) => {
  const protectedToken = localStorage.getItem("email");
  const accountType = localStorage.getItem("accountType");
  const authToken = localStorage.getItem("token");
  if (protectedToken && accountType === "admin") return children;

  return <Navigate to="/" />;
};

export const SuperAdminRestriction = ({ children }) => {
  const protectedToken = localStorage.getItem("email");
  const accountType = localStorage.getItem("accountType");
  if (protectedToken && accountType === "superadmin") return children;

  return <Navigate to="/" />;
};

export const LoginRestriction = ({ children }) => {
  const protectedToken = localStorage.getItem("email");
  const accountType = localStorage.getItem("accountType");
  if (!protectedToken) return children;

  if (accountType === "admin") return <Navigate to="/admin/medicine" />;

  return <Navigate to="/superadmin/barangay" />;
};
