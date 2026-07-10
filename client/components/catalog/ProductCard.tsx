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
    product.originalPrice !== null &&
    product.originalPrice !== undefined
      ? Number(product.originalPrice)
      : undefined;

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(
          ((originalPrice - price) / originalPrice) * 100,
        )
      : 0;

  const imageUrl =
    product.images?.find(Boolean) ??
    product.image ??
    "/images/home-image.png";

  const reviewCount =
    product.reviews ?? product.reviewCount ?? 0;

  return (
    <Link
      to={`/produto/${product.slug ?? product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
    >
      {/* Imagem */}
      <div className="relative h-[220px] overflow-hidden bg-muted sm:h-auto sm:aspect-square">
        <img
          src={imageUrl}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src =
              "/images/home-image.png";
          }}
          className="h-full w-full object-cover transition-transform duration-300 md:group-hover:scale-105"
        />

        {product.badge && (
          <span className="absolute right-3 top-3 max-w-[70%] truncate rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-sm">
            {product.badge}
          </span>
        )}

        {/* Efeito apenas em telas com mouse */}
        <div className="absolute inset-0 hidden items-center justify-center bg-black/0 opacity-0 transition md:flex md:group-hover:bg-black/35 md:group-hover:opacity-100">
          <div className="rounded-full bg-white p-3 shadow-lg">
            <ShoppingCart className="h-5 w-5 text-foreground" />
          </div>
        </div>
      </div>

      {/* Informações */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug text-foreground sm:min-h-[2.75rem] sm:text-[17px]">
          {product.name}
        </h3>

        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className="h-3.5 w-3.5 fill-accent text-accent sm:h-4 sm:w-4"
              />
            ))}
          </div>

          <span className="text-xs text-muted-foreground">
            ({reviewCount})
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-xl font-bold leading-none text-foreground">
              {formatPrice(price)}
            </span>

            {originalPrice && originalPrice > price && (
              <span className="text-xs text-muted-foreground line-through sm:text-sm">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {discount > 0 && (
            <p className="mt-3 text-xs font-semibold text-accent">
              {discount}% OFF
            </p>
          )}
        </div>
      </div>
    </Link>
  );
});