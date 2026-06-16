import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate("/admin");
    }
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = await AuthService.login(username, password);
    if (ok) {
      navigate("/admin");
    } else {
      setError("Credenciais inválidas. Usuário padrão: admin / admin123");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-12">
      <div className="w-full max-w-md rounded-[32px] border border-border bg-card px-8 py-10 shadow-[0_30px_80px_-40px_rgba(47,67,47,0.4)]">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-accent text-accent-foreground shadow-lg shadow-accent/20">
            <span className="text-lg font-semibold">ADM</span>
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Painel Administrativo</h2>
          <p className="mt-2 text-sm text-muted-foreground">Acesse a gestão de produtos com segurança.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Usuário</label>
            <Input
              autoComplete="username"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Senha</label>
            <Input
              type="password"
              autoComplete="current-password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="pt-1">
            <Button type="submit" className="w-full rounded-2xl bg-accent text-accent-foreground shadow-sm shadow-accent/20 hover:bg-accent/95">
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
