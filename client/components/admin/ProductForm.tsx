import React, { useEffect, useMemo, useState } from "react";
import type { Product, ProductCreateInput } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "./ImageUpload";
import { categories } from "@/lib/categories";

type Props = {
  product?: Product | null;
  onCancel?: () => void;
  onSave: (input: ProductCreateInput) => void;
};

function createSlug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ProductForm({ product, onCancel, onSave }: Props) {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>();
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [marketplace, setMarketplace] = useState("");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | undefined>();
  const [reviewCount, setReviewCount] = useState<number | undefined>();
  const [stock, setStock] = useState<number | undefined>(0);
  const [image, setImage] = useState("");
  const [badge, setBadge] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isOffer, setIsOffer] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);

  const selectedCategory = useMemo(
    () => categories.find((item) => item.slug === category),
    [category],
  );

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setBrand(product.brand || "");
      setPrice(product.price || 0);
      setOriginalPrice(product.originalPrice ?? undefined);
      setCategory(product.category || "");
      setSubcategory(product.subcategory || "");
      setMarketplace(product.marketplace || "");
      setAffiliateUrl(product.affiliateUrl || "");
      setDescription(product.description || "");
      setRating(product.rating ?? undefined);
      setReviewCount(product.reviewCount ?? product.reviews ?? undefined);
      setStock(product.stock ?? 0);
      setImage(product.image || "");
      setBadge(product.badge || "");
      setFeatured(product.featured ?? false);
      setIsOffer(product.isOffer ?? false);
      setIsBestSeller(product.isBestSeller ?? false);
    } else {
      setName("");
      setBrand("");
      setPrice(0);
      setOriginalPrice(undefined);
      setCategory("");
      setSubcategory("");
      setMarketplace("");
      setAffiliateUrl("");
      setDescription("");
      setRating(undefined);
      setReviewCount(undefined);
      setStock(0);
      setImage("");
      setBadge("");
      setFeatured(false);
      setIsOffer(false);
      setIsBestSeller(false);
    }
  }, [product]);

  useEffect(() => {
    if (!selectedCategory) return;
    if (!subcategory) return;

    const subcategoryExists = selectedCategory.subcategories.some(
      (item) => item.slug === subcategory,
    );

    if (!subcategoryExists) {
      setSubcategory("");
    }
  }, [selectedCategory, subcategory]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const input: ProductCreateInput = {
      name,
      slug: product?.slug || createSlug(name),
      brand: brand || undefined,
      price,
      originalPrice,
      categoryId: category,
      subcategoryId: subcategory || null,
      marketplace,
      affiliateUrl,
      rating,
      reviewCount,
      stock,
      featured,
      isOffer,
      isBestSeller,
      badge: badge || undefined,
      description,
      image,
    };

    onSave(input);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-[28px] border border-border bg-card p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Nome
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Marca
          </label>
          <Input value={brand} onChange={(e) => setBrand(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Preço atual
          </label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Preço antigo
          </label>
          <Input
            type="number"
            value={originalPrice ?? ""}
            onChange={(e) =>
              setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)
            }
            step="0.01"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Categoria
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Subcategoria
          </label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            disabled={!selectedCategory}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:opacity-60"
          >
            <option value="">Selecione uma subcategoria</option>
            {selectedCategory?.subcategories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Marketplace
          </label>
          <select
            value={marketplace}
            onChange={(e) => setMarketplace(e.target.value)}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Selecione</option>
            <option value="Amazon">Amazon</option>
            <option value="Shopee">Shopee</option>
            <option value="Mercado Livre">Mercado Livre</option>
            <option value="Magalu">Magalu</option>
            <option value="AliExpress">AliExpress</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Link de afiliado
          </label>
          <Input
            type="url"
            value={affiliateUrl}
            onChange={(e) => setAffiliateUrl(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Nota
          </label>
          <Input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating ?? ""}
            onChange={(e) =>
              setRating(e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Avaliações
          </label>
          <Input
            type="number"
            value={reviewCount ?? ""}
            onChange={(e) =>
              setReviewCount(e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Estoque
          </label>
          <Input
            type="number"
            value={stock ?? ""}
            onChange={(e) =>
              setStock(e.target.value ? Number(e.target.value) : undefined)
            }
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-muted-foreground">
          Badge
        </label>
        <Input
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          placeholder="Ex: Oferta, Mais vendido, Novo"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-muted-foreground">
          Descrição
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-muted-foreground">
          Imagem do Produto
        </label>
        <ImageUpload value={image} onChange={setImage} />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Destaque na Home
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isOffer}
            onChange={(e) => setIsOffer(e.target.checked)}
          />
          Oferta
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isBestSeller}
            onChange={(e) => setIsBestSeller(e.target.checked)}
          />
          Mais vendido
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button
            variant="outline"
            type="button"
            className="w-full sm:w-auto"
            onClick={onCancel}
          >
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