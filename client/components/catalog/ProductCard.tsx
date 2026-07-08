import { memo } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

function formatPrice(value?: number | string | null) {
  const numberValue = Number(value ?? 0);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
}

export const ProductCard = memo(function ProductCard({
  product,
}: ProductCardProps) {
  const price = Number(product.price ?? 0);
  const originalPrice =
    product.originalPrice !== null && product.originalPrice !== undefined
      ? Number(product.originalPrice)
      : undefined;

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const imageUrl =
    product.images?.find(Boolean) ?? product.image ?? "/images/home-image.png";

  return (
    <Link
      to={`/produto/${product.slug ?? product.id}`}
      className="group flex flex-col h-full"
    >
      <div className="relative bg-card rounded-lg overflow-hidden mb-4">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.src = "/images/home-image.png";
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {product.badge && (
          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.badge}
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white rounded-full p-3">
            <ShoppingCart className="w-6 h-6 text-foreground" />
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>

          <span className="text-xs text-muted-foreground">
            ({product.reviews ?? product.reviewCount ?? 0})
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-foreground">
            {formatPrice(price)}
          </span>

          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {discount > 0 && (
          <span className="text-xs font-semibold text-accent">
            {discount}% OFF
          </span>
        )}
      </div>
    </Link>
  );
});