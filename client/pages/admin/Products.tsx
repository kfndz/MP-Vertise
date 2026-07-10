import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import ProductForm from "../../components/admin/ProductForm";
import ProductTable from "../../components/admin/ProductTable";

import { AuthService } from "../../services/AuthService";
import { ProductService } from "../../services/ProductService";
import type {
  Product,
  ProductCreateInput,
} from "../../types/product";

export default function AdminProducts() {
  const navigate = useNavigate();
  const params = useParams<{ id?: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<
    string | number | null
  >(null);

  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await ProductService.getAll();

      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar os produtos.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/admin/login", {
        replace: true,
      });

      return;
    }

    void loadProducts();
  }, [loadProducts, navigate]);

  useEffect(() => {
    if (!params.id) {
      return;
    }

    let isMounted = true;

    async function loadProductForEditing() {
      try {
        setLoadingProduct(true);
        setError("");

        const product = await ProductService.getById(
          params.id as string,
        );

        if (!isMounted) return;

        setEditing(product);
        setShowForm(true);
      } catch (err) {
        if (!isMounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar o produto.",
        );

        navigate("/admin/produtos", {
          replace: true,
        });
      } finally {
        if (isMounted) {
          setLoadingProduct(false);
        }
      }
    }

    void loadProductForEditing();

    return () => {
      isMounted = false;
    };
  }, [navigate, params.id]);

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

  function handleCancel() {
    if (saving) return;

    setEditing(null);
    setShowForm(false);
    setError("");

    navigate("/admin/produtos", {
      replace: true,
    });
  }

  async function handleSave(input: ProductCreateInput) {
    try {
      setSaving(true);
      setError("");
      setFeedback("");

      if (editing) {
        await ProductService.update(editing.id, input);
        setFeedback("Produto atualizado com sucesso.");
      } else {
        await ProductService.create(input);
        setFeedback("Produto cadastrado com sucesso.");
      }

      setEditing(null);
      setShowForm(false);

      navigate("/admin/produtos", {
        replace: true,
      });

      await loadProducts();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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

  async function handleDelete(id: string | number) {
    const confirmed = window.confirm(
      "Tem certeza de que deseja excluir este produto? Essa ação não poderá ser desfeita.",
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");
      setFeedback("");

      await ProductService.remove(id);

      setFeedback("Produto excluído com sucesso.");

      await loadProducts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível excluir o produto.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AdminLayout title="Produtos">
      <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Catálogo de produtos
          </h2>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Cadastre, edite e organize os produtos exibidos no site.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          disabled={saving || loadingProduct}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm shadow-accent/20 transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <Plus className="h-5 w-5" />
          Adicionar produto
        </button>
      </div>

      {feedback && (
        <div
          role="status"
          className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700"
        >
          {feedback}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      {loadingProduct && (
        <div className="rounded-2xl border border-border bg-card px-4 py-6 text-center text-sm text-muted-foreground">
          Carregando produto para edição...
        </div>
      )}

      {showForm && !loadingProduct && (
        <ProductForm
          product={editing}
          onCancel={handleCancel}
          onSave={handleSave}
          isSaving={saving}
        />
      )}

      <ProductTable
        products={products}
        loading={loading}
        deletingId={deletingId}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}