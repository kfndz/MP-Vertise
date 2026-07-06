import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import ProductTable from "../../components/admin/ProductTable";
import ProductForm from "../../components/admin/ProductForm";

import { Product, ProductCreateInput } from "../../types/product";
import { ProductService } from "../../services/ProductService";
import { AuthService } from "../../services/AuthService";

export default function AdminProducts() {
  const navigate = useNavigate();
  const params = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/admin/login", {
        replace: true,
      });
      return;
    }

    load();

    if (params.id) {
      const id = Number(params.id);

      ProductService.getById(id).then((product) => {
        if (!product) return;

        setEditing(product);
        setShowForm(true);
      });
    }
  }, [navigate, params.id]);

  function load() {
    ProductService.getAll().then(setProducts);
  }

  async function handleCreate(input: ProductCreateInput) {
    await ProductService.create(input);

    setShowForm(false);
    load();
  }

  async function handleUpdate(input: ProductCreateInput) {
    if (!editing) return;

    await ProductService.update(editing.id, input);

    setEditing(null);
    setShowForm(false);

    navigate("/admin/produtos", {
      replace: true,
    });

    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Confirma exclusão do produto?")) return;

    await ProductService.remove(id);

    load();
  }

  function handleEdit(product: Product) {
    setEditing(product);
    setShowForm(true);

    navigate(`/admin/produtos/${product.id}/editar`);
  }

  function handleAddNew() {
    setEditing(null);
    setShowForm(true);

    navigate("/admin/produtos");
  }

  return (
    <AdminLayout title="Produtos">

      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm text-muted-foreground">
            Gerencie seus produtos com facilidade.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm shadow-accent/20 transition hover:bg-accent/90"
        >
          Adicionar Produto
        </button>

      </div>

      {showForm && (
        <div className="mb-4">

          <ProductForm
            product={editing || undefined}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);

              navigate("/admin/produtos", {
                replace: true,
              });
            }}
            onSave={async (input) => {
              if (editing) {
                await handleUpdate(input);
              } else {
                await handleCreate(input);
              }
            }}
          />

        </div>
      )}

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </AdminLayout>
  );
}