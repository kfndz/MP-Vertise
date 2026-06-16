import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { ProductService } from "../../services/ProductService";
import { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/admin/login");
      return;
    }

    ProductService.getAll().then(setProducts);
  }, [navigate]);

  return (
    <AdminLayout title="Painel">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white border rounded">
          <h3 className="text-sm text-gray-500">Produtos</h3>
          <div className="text-2xl font-bold">{products.length}</div>
        </div>

        <div className="p-4 bg-white border rounded">
          <h3 className="text-sm text-gray-500">Categorias (únicas)</h3>
          <div className="text-2xl font-bold">{Array.from(new Set(products.map((p) => p.category))).length}</div>
        </div>

        <div className="p-4 bg-white border rounded">
          <h3 className="text-sm text-gray-500">Estoque total</h3>
          <div className="text-2xl font-bold">{products.reduce((s, p) => s + (p.stock ?? 0), 0)}</div>
        </div>
      </div>
    </AdminLayout>
  );
}
