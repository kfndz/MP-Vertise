import type { Product } from "@/types/product";

export type ProductSortOption =
  | "relevancia"
  | "menor-preco"
  | "maior-preco"
  | "mais-vendidos"
  | "novos";

export function sortProducts(products: Product[], sortBy: ProductSortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "menor-preco":
      return sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    case "maior-preco":
      return sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    case "mais-vendidos":
      return sorted.sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0));
    case "novos":
      return sorted.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    case "relevancia":
    default:
      return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }
}
