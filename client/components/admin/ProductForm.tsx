import React, { useState, useEffect } from "react";
import { Product, ProductCreateInput } from "../../types/product";

type Props = {
  product?: Product | null;
  onCancel?: () => void;
  onSave: (input: ProductCreateInput) => void;
};

export default function ProductForm({ product, onCancel, onSave }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState<number | undefined>(undefined);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || 0);
      setCategory(product.category || "");
      setDescription(product.description || "");
      setStock(product.stock);
      setImage(product.image || "");
    } else {
      setName("");
      setPrice(0);
      setCategory("");
      setDescription("");
      setStock(undefined);
      setImage("");
    }
  }, [product]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const input: ProductCreateInput = {
      name,
      price,
      originalPrice: undefined,
      category,
      rating: undefined,
      reviews: undefined,
      stock,
      inStock: typeof stock === "number" ? stock > 0 : undefined,
      featured: false,
      badge: undefined,
      description,
      image,
      images: image ? [image] : [],
      specifications: {},
    };
    onSave(input);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 border rounded">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Preço</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-1 block w-full border px-2 py-1 rounded"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoria</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full border px-2 py-1 rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border px-2 py-1 rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estoque</label>
        <input type="number" value={stock ?? ""} onChange={(e) => setStock(e.target.value ? Number(e.target.value) : undefined)} className="mt-1 block w-full border px-2 py-1 rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">URL da imagem</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} className="mt-1 block w-full border px-2 py-1 rounded" />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">
          Salvar
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-3 py-1 bg-gray-300 rounded">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
