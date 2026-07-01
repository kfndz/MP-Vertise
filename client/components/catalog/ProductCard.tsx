import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <Link
      to={`/produto/${product.id}`}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold line-clamp-2 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="text-sm">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-xl font-bold">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>

          {product.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-sm line-through text-muted-foreground">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>

              {discount > 0 && (
                <span className="text-xs font-semibold text-accent">
                  {discount}% OFF
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}