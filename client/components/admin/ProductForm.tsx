import React, { useState, useEffect } from "react";
import { Product, ProductCreateInput } from "../../types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "./ImageUpload";

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
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[28px] border border-border bg-card p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Nome</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Preço</label>
          <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} step="0.01" required />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Categoria</label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">Estoque</label>
          <Input
            type="number"
            value={stock ?? ""}
            onChange={(e) => setStock(e.target.value ? Number(e.target.value) : undefined)}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-muted-foreground">Descrição</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-muted-foreground">Imagem do Produto</label>
        <ImageUpload value={image} onChange={setImage} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button variant="outline" type="button" className="w-full sm:w-auto" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" className="w-full sm:w-auto">
          Salvar
        </Button>
      </div>
    </form>
  );
}