import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { AuthService } from "../../services/AuthService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Se já estiver autenticado, não deixa permanecer na tela de login
    if (AuthService.isAuthenticated()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const ok = await AuthService.login(email, password);

    if (!ok) {
      setError("Email ou senha inválidos.");
      return;
    }

    navigate("/admin", {
      replace: true,
    });
  }

  function handleBackHome() {
    navigate("/", {
      replace: true,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-12">
      <div className="w-full max-w-md rounded-[32px] border border-border bg-card px-6 py-8 shadow-[0_30px_80px_-40px_rgba(47,67,47,0.4)] sm:px-8 sm:py-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-accent text-accent-foreground shadow-lg shadow-accent/20">
            <span className="text-lg font-semibold">
              ADM
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-foreground">
            Painel Administrativo
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Acesse a gestão de produtos com segurança.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-medium text-muted-foreground"
            >
              Email
            </label>

            <Input
              id="admin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-medium text-muted-foreground"
            >
              Senha
            </label>

            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-12"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={
                  showPassword
                    ? "Ocultar senha"
                    : "Mostrar senha"
                }
                title={
                  showPassword
                    ? "Ocultar senha"
                    : "Mostrar senha"
                }
              >
                {showPassword ? (
                  <EyeOff
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                ) : (
                  <Eye
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full rounded-2xl bg-accent text-accent-foreground hover:bg-accent/95"
          >
            Entrar
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleBackHome}
            className="w-full rounded-2xl"
          >
            Voltar ao site
          </Button>
        </form>
      </div>
    </div>
  );
}