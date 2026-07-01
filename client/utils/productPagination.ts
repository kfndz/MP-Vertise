import type { Product } from "@/types/product";

export type PaginatedProducts<T> = {
  items: T[];
  totalPages: number;
  totalItems: number;
};

export function paginateProducts(
  products: Product[],
  perPage: number,
  page: number,
): PaginatedProducts<Product> {
  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const startIndex = (safePage - 1) * perPage;

  return {
    items: products.slice(startIndex, startIndex + perPage),
    totalPages,
    totalItems,
  };
}
