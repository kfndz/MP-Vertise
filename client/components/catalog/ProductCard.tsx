import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount =
    product.originalPrice && product.originalPrice > (product.price ?? 0)
      ? Math.round(
          ((product.originalPrice - (product.price ?? 0)) / product.originalPrice) * 100,
        )
      : 0;

  return (
    <Link to={`/produto/${product.id}`} className="group flex flex-col h-full">
      <div className="relative bg-card rounded-lg overflow-hidden mb-4">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.images?.[0] ?? product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {product.badge && (
          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.badge}
          </div>
        )}
        <button className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white rounded-full p-3">
            <ShoppingCart className="w-6 h-6 text-foreground" />
          </div>
        </button>
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
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-foreground">
            R$ {(product.price ?? 0).toFixed(2).replace(".", ",")}
          </span>

          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        {discount > 0 && (
          <span className="text-xs font-semibold text-accent">{discount}% OFF</span>
        )}
      </div>
    </Link>
  );
}