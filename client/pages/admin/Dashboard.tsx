import { useEffect, useMemo, useState } from "react";
import {
  Boxes,
  FolderTree,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import { AuthService } from "../../services/AuthService";
import { ProductService } from "../../services/ProductService";
import type { Product } from "../../types/product";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/admin/login", {
        replace: true,
      });

      return;
    }

    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await ProductService.getAll();

        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        if (!isMounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os dados do painel.",
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const categoryCount = useMemo(() => {
    return new Set(
      products
        .map((product) => product.category)
        .filter(Boolean),
    ).size;
  }, [products]);

  const totalStock = useMemo(() => {
    return products.reduce(
      (total, product) =>
        total + Number(product.stock ?? 0),
      0,
    );
  }, [products]);

  const cards = [
    {
      label: "Produtos",
      value: products.length,
      description: "Produtos cadastrados",
      icon: Package,
    },
    {
      label: "Categorias",
      value: categoryCount,
      description: "Categorias com produtos",
      icon: FolderTree,
    },
    {
      label: "Estoque total",
      value: totalStock,
      description: "Unidades cadastradas",
      icon: Boxes,
    },
  ];

  return (
    <AdminLayout title="Painel">
      <div>
        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
          Acompanhe os principais números do catálogo.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-3xl border border-border bg-card"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.label}
                className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-sm">
                      {card.label}
                    </h2>

                    <p className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                      {card.value}
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </div>

                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}