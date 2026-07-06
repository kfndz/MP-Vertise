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
    // 1. Validação de Categorias
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category ?? "");

    // 2. Validação de Preço
    const matchesPrice =
      (product.price ?? 0) >= filters.priceRange.min &&
      (product.price ?? 0) <= filters.priceRange.max;

    // 3. CORREÇÃO DA AVALIAÇÃO: Aplica tolerância inteligente para notas decimais (e-commerce padrão)
    const productRating = Number(product.rating) || 0;
    const filterRating = Number(filters.minRating) || 0;

    // Se o usuário clicar em 5 estrelas, exibe produtos excelentes de 4.5 para cima.
    // Para os filtros de 4, 3, etc., mantém o corte padrão do número selecionado.
    const minRequiredRating = filterRating === 5 ? 4.5 : filterRating;

    const matchesRating = productRating >= minRequiredRating;

    // 4. Validação do Termo de Busca
    const matchesTerm =
      !term ||
      [product.name, product.description, product.category, product.subcategory]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(term));

    return matchesCategory && matchesPrice && matchesRating && matchesTerm;
  });
}