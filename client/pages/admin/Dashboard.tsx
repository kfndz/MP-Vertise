import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { ProductService } from "../../services/ProductService";
import { Product } from "../../types/product";
import { AuthService } from "../../services/AuthService";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/admin/login", {
        replace: true,
      });
      return;
    }

    ProductService.getAll().then(setProducts);
  }, [navigate]);

  return (
    <AdminLayout title="Painel">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Produtos
          </h3>

          <div className="mt-4 text-3xl font-bold text-foreground">
            {products.length}
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Categorias
          </h3>

          <div className="mt-4 text-3xl font-bold text-foreground">
            {Array.from(
              new Set(products.map((p) => p.category))
            ).length}
          </div>
        </div>

        <div className="rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Estoque Total
          </h3>

          <div className="mt-4 text-3xl font-bold text-foreground">
            {products.reduce((s, p) => s + (p.stock ?? 0), 0)}
          </div>
        </div>

      </div>

    </AdminLayout>
  );
}