import React from "react";
import { Navigate } from "react-router-dom";
import { AuthService } from "@/services/AuthService";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!AuthService.isAuthenticated()) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
