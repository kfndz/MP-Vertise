import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Área Administrativa - Login</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Usuário</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full border px-2 py-1 rounded" />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full border px-2 py-1 rounded" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Entrar</button>
        </div>
      </form>
    </div>
  );
}
