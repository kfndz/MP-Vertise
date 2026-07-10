import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpDown,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Breadcrumb } from "@/components/catalog/Breadcrumb";
import { CategoryPageLayout } from "@/components/catalog/CategoryPageLayout";
import { Pagination } from "@/components/catalog/Pagination";
import { ProductFilters } from "@/components/catalog/ProductFilters";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
} from "@/lib/categories";
import {
  DEFAULT_PRODUCT_FILTERS,
  filterProducts,
} from "@/utils/productFilters";
import { paginateProducts } from "@/utils/productPagination";
import {
  sortProducts,
  type ProductSortOption,
} from "@/utils/productSorting";

const Category = () => {
  const { category, subcategory } = useParams();
  const { products, loading } = useProducts();

  const [sortBy, setSortBy] =
    useState<ProductSortOption>("relevancia");
  const [filters, setFilters] = useState(
    DEFAULT_PRODUCT_FILTERS,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] =
    useState(false);

  const categoryData = getCategoryBySlug(category ?? "");

  const currentSubcategory = subcategory
    ? getSubcategoryBySlug(category ?? "", subcategory)
    : undefined;

  const hasValidRoute =
    Boolean(categoryData) &&
    (!subcategory || Boolean(currentSubcategory));

  useEffect(() => {
    setCurrentPage(1);
    setShowMobileFilters(false);
  }, [category, subcategory]);

  const filteredProducts = useMemo(() => {
    if (!hasValidRoute) {
      return [];
    }

    const categoryProducts = (products ?? []).filter(
      (product) => {
        const matchesCategory =
          product.category === categoryData?.slug;

        const matchesSubcategory = currentSubcategory
          ? product.subcategory === currentSubcategory.slug
          : true;

        return matchesCategory && matchesSubcategory;
      },
    );

    return sortProducts(
      filterProducts(categoryProducts, filters),
      sortBy,
    );
  }, [
    categoryData?.slug,
    currentSubcategory,
    filters,
    hasValidRoute,
    products,
    sortBy,
  ]);

  const paginatedProducts = useMemo(() => {
    return paginateProducts(
      filteredProducts,
      8,
      currentPage,
    );
  }, [currentPage, filteredProducts]);

  const breadcrumbItems = [
    {
      label: "Início",
      to: "/",
    },
    {
      label: categoryData?.name ?? "Categoria",
      to: categoryData
        ? `/categoria/${categoryData.slug}`
        : undefined,
      current: !subcategory,
    },
    ...(subcategory && currentSubcategory
      ? [
          {
            label: currentSubcategory.name,
            current: true,
          },
        ]
      : []),
  ];

  return (
    <CategoryPageLayout>
      <Breadcrumb items={breadcrumbItems} />

      <section className="border-b border-border bg-gradient-to-br from-muted/50 to-background py-8 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="mb-3 text-3xl font-bold md:mb-4 md:text-5xl">
            {categoryData?.name ?? "Categoria"}
          </h1>

          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            {currentSubcategory?.name
              ? `${categoryData?.name ?? "Categoria"} • ${currentSubcategory.name}`
              : categoryData?.description ??
                "Produtos selecionados para você"}
          </p>
        </div>
      </section>

      <section className="py-8 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
            {/* Filtros */}
            <aside>
              <button
                type="button"
                onClick={() =>
                  setShowMobileFilters((current) => !current)
                }
                aria-expanded={showMobileFilters}
                className="mb-4 flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-left font-semibold transition hover:border-accent lg:hidden"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filtros
                </span>

                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    showMobileFilters ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`${
                  showMobileFilters ? "block" : "hidden"
                } lg:block`}
              >
                <ProductFilters
                  filters={filters}
                  onFiltersChange={(newFilters) => {
                    setFilters(newFilters);
                    setCurrentPage(1);
                  }}
                  categories={[]}
                  showFilters
                  compact
                  onClear={() => {
                    setFilters(DEFAULT_PRODUCT_FILTERS);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </aside>

            {/* Produtos */}
            <div className="min-w-0 lg:col-span-3">
              <div className="mb-6 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between md:mb-8 md:pb-6">
                <span className="text-sm text-muted-foreground">
                  {loading
                    ? "Carregando produtos..."
                    : hasValidRoute
                      ? `Exibindo ${paginatedProducts.items.length} de ${filteredProducts.length} produtos`
                      : "Categoria não encontrada"}
                </span>

                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <ArrowUpDown className="h-4 w-4 flex-shrink-0 text-muted-foreground" />

                  <select
                    value={sortBy}
                    onChange={(event) => {
                      setSortBy(
                        event.target.value as ProductSortOption,
                      );
                      setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent sm:w-auto"
                  >
                    <option value="relevancia">
                      Relevância
                    </option>
                    <option value="menor-preco">
                      Menor Preço
                    </option>
                    <option value="maior-preco">
                      Maior Preço
                    </option>
                    <option value="mais-vendidos">
                      Mais Vendidos
                    </option>
                    <option value="novos">
                      Mais Novos
                    </option>
                  </select>
                </div>
              </div>

              {!loading && !hasValidRoute ? (
                <div className="rounded-2xl border border-border bg-card p-6 text-center md:p-8">
                  <h2 className="mb-3 text-xl font-semibold">
                    Esta categoria ainda não está disponível
                  </h2>

                  <p className="mb-6 text-muted-foreground">
                    A rota informada não corresponde a uma
                    categoria ou subcategoria válida.
                  </p>

                  <Link
                    to="/catalogo"
                    className="inline-flex items-center rounded-lg bg-accent px-6 py-3 font-semibold text-white"
                  >
                    Ver catálogo completo
                  </Link>
                </div>
              ) : !loading &&
                filteredProducts.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-6 text-center md:p-8">
                  <h2 className="mb-3 text-xl font-semibold">
                    Nenhum produto encontrado
                  </h2>

                  <p className="text-muted-foreground">
                    Tente alterar ou limpar os filtros para
                    visualizar outros produtos.
                  </p>
                </div>
              ) : (
                <>
                  <ProductGrid
                    products={paginatedProducts.items}
                    className="mb-12"
                  />

                  <Pagination
                    currentPage={currentPage}
                    totalPages={paginatedProducts.totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </CategoryPageLayout>
  );
};

export default Category;