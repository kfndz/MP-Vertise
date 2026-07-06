import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthService } from "@/services/AuthService";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function AdminLayout({ children, title }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    AuthService.logout();

    // Remove completamente o painel do histórico
    navigate("/admin/login", {
      replace: true,
    });

    // Limpa o histórico restante do navegador
    window.history.pushState(null, "", "/admin/login");
  }

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-muted text-foreground">
      <div className="flex min-h-screen">

        <aside className="w-72 border-r border-border bg-card px-6 py-8 shadow-sm">

          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Gerenciamento
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-foreground">
              Admin
            </h2>
          </div>

          <nav className="flex flex-col gap-3 text-sm">

            <Link
              to="/admin"
              className={`rounded-2xl px-4 py-3 transition-colors ${
                isActive("/admin") && location.pathname === "/admin"
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-muted hover:text-accent"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/admin/produtos"
              className={`rounded-2xl px-4 py-3 transition-colors ${
                isActive("/admin/produtos")
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-muted hover:text-accent"
              }`}
            >
              Produtos
            </Link>

          </nav>

          <button
            onClick={handleLogout}
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive transition hover:bg-destructive/20"
          >
            Sair
          </button>

        </aside>

        <main className="flex-1 p-8">

          {title && (
            <h1 className="mb-4 text-3xl font-bold text-foreground">
              {title}
            </h1>
          )}

          <div className="space-y-6">
            {children}
          </div>

        </main>

      </div>
    </div>
  );
}