import type { Product } from "@/types/product";

export type ProductFilterState = {
  categories: string[];
  priceRange: { min: number; max: number };
  minRating: number;
};

export const DEFAULT_PRODUCT_FILTERS: ProductFilterState = {
  categories: [],
  priceRange: { min: 0, max: 500 },
  minRating: 0,
};

export function filterProducts(
  products: Product[],
  filters: ProductFilterState,
  searchTerm?: string,
): Product[] {
  const term = searchTerm?.trim().toLowerCase() || "";

  return products.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category ?? "");

    const matchesPrice =
      (product.price ?? 0) >= filters.priceRange.min &&
      (product.price ?? 0) <= filters.priceRange.max;

    const matchesRating = (product.rating ?? 0) >= filters.minRating;

    const matchesTerm =
      !term ||
      [product.name, product.description, product.category, product.subcategory]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(term));

    return matchesCategory && matchesPrice && matchesRating && matchesTerm;
  });
}
