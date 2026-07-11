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
    max: Number.MAX_SAFE_INTEGER,
  },
  minRating: 0,
};

export function filterProducts(
  products: Product[],
  filters: ProductFilterState,
  searchTerm = "",
): Product[] {
  const normalizedTerm =
    searchTerm.trim().toLowerCase();

  return products.filter((product) => {
    const price = Number(product.price ?? 0);
    const rating = Number(product.rating ?? 0);
    const category = product.category ?? "";

    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(category);

    const matchesPrice =
      price >= filters.priceRange.min &&
      price <= filters.priceRange.max;

    const matchesRating =
      rating >= filters.minRating;

    const matchesSearch =
      normalizedTerm.length === 0 ||
      [
        product.name,
        product.description,
        product.brand,
        product.category,
        product.subcategory,
        product.marketplace,
      ]
        .filter(
          (value): value is string =>
            value !== null &&
            value !== undefined &&
            value !== "",
        )
        .some((value) =>
          value
            .toLowerCase()
            .includes(normalizedTerm),
        );

    return (
      matchesCategory &&
      matchesPrice &&
      matchesRating &&
      matchesSearch
    );
  });
}