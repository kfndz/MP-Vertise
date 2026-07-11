import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthService } from "@/services/AuthService";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const location = useLocation();
  const authenticated = AuthService.isAuthenticated();

  useEffect(() => {
    const previousRobots =
      document
        .querySelector('meta[name="robots"]')
        ?.getAttribute("content") ?? "index, follow";

    let robotsMeta = document.querySelector(
      'meta[name="robots"]',
    );

    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }

    robotsMeta.setAttribute(
      "content",
      "noindex, nofollow, noarchive",
    );

    return () => {
      robotsMeta?.setAttribute(
        "content",
        previousRobots,
      );
    };
  }, []);

  if (!authenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <>{children}</>;
}