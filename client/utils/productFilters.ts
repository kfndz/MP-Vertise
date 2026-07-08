import type { Product } from "@/types/product";

export type ProductFilterState = {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  minRating: number;
};

export type ProductFilters = ProductFilterState;

export const DEFAULT_PRODUCT_FILTERS: ProductFilterState = {
  categories: [],
  priceRange: {
    min: 0,
    max: 999999,
  },
  minRating: 0,
};

export function filterProducts(
  products: Product[],
  filters: ProductFilterState,
  searchTerm?: string,
) {
  return products.filter((product) => {
    const price = Number(product.price ?? 0);
    const rating = Number(product.rating ?? 0);

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category ?? "");

    const matchesPrice =
      price >= filters.priceRange.min && price <= filters.priceRange.max;

    const matchesRating = rating >= filters.minRating;

    const term = searchTerm?.trim().toLowerCase();

    const matchesSearch =
      !term ||
      [
        product.name,
        product.description,
        product.brand,
        product.category,
        product.subcategory,
        product.marketplace,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term));

    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });
}