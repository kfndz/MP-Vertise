import { Navigate } from "react-router-dom";
import { AuthService } from "@/services/AuthService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  if (!AuthService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}