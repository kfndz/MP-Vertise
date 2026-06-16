import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function AdminLayout({ children, title }: Props) {
  const navigate = useNavigate();

  function handleLogout() {
    AuthService.logout();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white border-r p-4">
          <h2 className="text-xl font-semibold mb-4">Admin</h2>
          <nav className="flex flex-col gap-2">
            <Link to="/admin" className="text-sm text-gray-700 hover:underline">
              Dashboard
            </Link>
            <Link to="/admin/produtos" className="text-sm text-gray-700 hover:underline">
              Produtos
            </Link>
            <button onClick={handleLogout} className="text-sm text-red-600 text-left mt-4">
              Sair
            </button>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
