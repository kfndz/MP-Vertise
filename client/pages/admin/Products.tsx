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

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/admin/login", { replace: true });
      return;
    }

    load();

    if (params.id) {
      ProductService.getById(params.id).then((product) => {
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
    setFeedback("Produto cadastrado com sucesso.");
  }

  async function handleUpdate(input: ProductCreateInput) {
    if (!editing) return;

    await ProductService.update(editing.id, input);
    setFeedback("Produto atualizado com sucesso.");
  }

  async function handleDelete(id: string | number) {
    if (!confirm("Confirma exclusão do produto?")) return;

    await ProductService.remove(id);
    setFeedback("Produto excluído com sucesso.");
    load();
  }

  function handleEdit(product: Product) {
    setEditing(product);
    setShowForm(true);
    setFeedback("");
    setError("");

    navigate(`/admin/produtos/${product.id}/editar`);
  }

  function handleAddNew() {
    setEditing(null);
    setShowForm(true);
    setFeedback("");
    setError("");

    navigate("/admin/produtos");
  }

  async function handleSave(input: ProductCreateInput) {
    try {
      setSaving(true);
      setError("");
      setFeedback("");

      if (editing) {
        await handleUpdate(input);
      } else {
        await handleCreate(input);
      }

      setEditing(null);
      setShowForm(false);

      navigate("/admin/produtos", { replace: true });

      await ProductService.getAll().then(setProducts);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível salvar o produto.",
      );
    } finally {
      setSaving(false);
    }
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
          disabled={saving}
          className="rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm shadow-accent/20 transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Adicionar Produto
        </button>
      </div>

      {feedback && (
        <div className="mb-4 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700">
          {feedback}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mb-4">
          {saving && (
            <div className="mb-4 rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
              Salvando produto...
            </div>
          )}

          <ProductForm
            product={editing || undefined}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
              setError("");
              navigate("/admin/produtos", { replace: true });
            }}
            onSave={handleSave}
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