import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import ProductTable from "../../components/admin/ProductTable";
import ProductForm from "../../components/admin/ProductForm";
import { Product, ProductCreateInput } from "../../types/product";
import { ProductService } from "../../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import { AuthService } from "../../services/AuthService";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      navigate("/admin/login");
      return;
    }
    load();
    // if route has id, open editor
    if (params.id) {
      const id = Number(params.id);
      ProductService.getById(id).then((p) => {
        if (p) {
          setEditing(p);
          setShowForm(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    navigate("/admin/produtos");
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("Confirma exclusão do produto?")) return;
    await ProductService.remove(id);
    load();
  }

  function handleEdit(p: Product) {
    setEditing(p);
    setShowForm(true);
    navigate(`/admin/produtos/${p.id}/editar`);
  }

  function handleAddNew() {
    setEditing(null);
    setShowForm(true);
    navigate(`/admin/produtos`);
  }

  return (
    <AdminLayout title="Produtos">
      <div className="mb-4 flex justify-between">
        <div></div>
        <div>
          <button onClick={handleAddNew} className="px-3 py-1 bg-green-600 text-white rounded">
            Adicionar Produto
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-4">
          <ProductForm
            product={editing || undefined}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
              navigate("/admin/produtos");
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

      <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </AdminLayout>
  );
}
