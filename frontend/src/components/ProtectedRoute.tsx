import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}
