import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthService } from "@/services/AuthService";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();

  if (!AuthService.isAuthenticated()) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <>{children}</>;
}