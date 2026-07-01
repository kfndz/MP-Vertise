import { describe, expect, it } from "vitest";
import type { Product } from "@/types/product";
import { filterProducts } from "./productFilters";
import { paginateProducts } from "./productPagination";
import { sortProducts } from "./productSorting";

const products: Product[] = [
  {
    id: 1,
    name: "Produto A",
    price: 100,
    originalPrice: 150,
    category: "tecnologia",
    subcategory: "audio",
    rating: 4.8,
    reviews: 200,
    featured: true,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Produto B",
    price: 250,
    originalPrice: 300,
    category: "casa",
    subcategory: "cozinha",
    rating: 4.2,
    reviews: 50,
    featured: false,
  },
  {
    id: 3,
    name: "Produto C",
    price: 50,
    originalPrice: 80,
    category: "tecnologia",
    subcategory: "smartphones",
    rating: 3.5,
    reviews: 500,
    featured: false,
  },
];

describe("product catalog utilities", () => {
  it("filters products by category, price and minimum rating", () => {
    const result = filterProducts(products, {
      categories: ["tecnologia"],
      priceRange: { min: 60, max: 120 },
      minRating: 4,
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe(1);
  });

  it("sorts products by price and rating", () => {
    const asc = sortProducts([...products], "menor-preco");
    expect(asc[0]?.id).toBe(3);

    const desc = sortProducts([...products], "maior-preco");
    expect(desc[0]?.id).toBe(2);
  });

  it("paginates a product list", () => {
    const firstPage = paginateProducts(products, 2, 1);
    expect(firstPage.items).toHaveLength(2);
    expect(firstPage.totalPages).toBe(2);
    expect(firstPage.items[0]?.id).toBe(1);

    const secondPage = paginateProducts(products, 2, 2);
    expect(secondPage.items).toHaveLength(1);
    expect(secondPage.items[0]?.id).toBe(3);
  });
});
