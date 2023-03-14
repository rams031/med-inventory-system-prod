import { Navigate } from "react-router";

// Global State

export const AdminRestriction = ({ children }) => {
  const protectedToken = localStorage.getItem("email");
  if (protectedToken) return children;

  return <Navigate to="/" />;
};

export const LoginRestriction = ({ children }) => {
  const protectedToken = localStorage.getItem("email");
  if (!protectedToken) return children;
  return <Navigate to="/admin/medicine" />;
};
