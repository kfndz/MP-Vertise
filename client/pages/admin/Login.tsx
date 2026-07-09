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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    const ok = await AuthService.login(email, password);

    if (!ok) {
      setError("Email ou senha inválidos.");
      return;
    }

    // Remove a tela de login do histórico
    navigate("/admin", {
      replace: true,
    });
  }

  function handleBackHome() {
    // Remove o login do histórico
    navigate("/", {
      replace: true,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12">
      <div className="w-full max-w-md rounded-[32px] border border-border bg-card px-8 py-10 shadow-[0_30px_80px_-40px_rgba(47,67,47,0.4)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-accent text-accent-foreground shadow-lg shadow-accent/20">
            <span className="text-lg font-semibold">ADM</span>
          </div>

          <h2 className="text-2xl font-semibold text-foreground">
            Painel Administrativo
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Acesse a gestão de produtos com segurança.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              Email
            </label>

            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              Senha
            </label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
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