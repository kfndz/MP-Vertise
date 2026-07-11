import type { Product } from "@/types/product";

export type ProductSortOption =
  | "relevancia"
  | "menor-preco"
  | "maior-preco"
  | "mais-vendidos"
  | "novos";

function getReviewCount(product: Product) {
  return Number(
    product.reviewCount ??
      product.reviews ??
      0,
  );
}

function getCreatedAtTimestamp(product: Product) {
  if (!product.createdAt) {
    return 0;
  }

  const timestamp = Date.parse(product.createdAt);

  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export function sortProducts(
  products: Product[],
  sortBy: ProductSortOption,
): Product[] {
  const sortedProducts = [...products];

  switch (sortBy) {
    case "menor-preco":
      return sortedProducts.sort(
        (first, second) =>
          Number(first.price ?? 0) -
          Number(second.price ?? 0),
      );

    case "maior-preco":
      return sortedProducts.sort(
        (first, second) =>
          Number(second.price ?? 0) -
          Number(first.price ?? 0),
      );

    case "mais-vendidos":
      return sortedProducts.sort(
        (first, second) =>
          getReviewCount(second) -
          getReviewCount(first),
      );

    case "novos":
      return sortedProducts.sort(
        (first, second) =>
          getCreatedAtTimestamp(second) -
          getCreatedAtTimestamp(first),
      );

    case "relevancia":
    default:
      return sortedProducts.sort(
        (first, second) => {
          const featuredDifference =
            Number(second.featured ?? false) -
            Number(first.featured ?? false);

          if (featuredDifference !== 0) {
            return featuredDifference;
          }

          const ratingDifference =
            Number(second.rating ?? 0) -
            Number(first.rating ?? 0);

          if (ratingDifference !== 0) {
            return ratingDifference;
          }

          return (
            getReviewCount(second) -
            getReviewCount(first)
          );
        },
      );
  }
}