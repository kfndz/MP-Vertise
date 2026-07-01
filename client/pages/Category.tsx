import { useMemo, useState } from "react";
import { ArrowUpDown, Sliders } from "lucide-react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "@/components/catalog/Breadcrumb";
import { CategoryPageLayout } from "@/components/catalog/CategoryPageLayout";
import { Pagination } from "@/components/catalog/Pagination";
import { ProductFilters } from "@/components/catalog/ProductFilters";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { getCategoryBySlug, getSubcategoryBySlug } from "@/lib/categories";
import { DEFAULT_PRODUCT_FILTERS, filterProducts } from "@/utils/productFilters";
import { paginateProducts } from "@/utils/productPagination";
import { sortProducts, type ProductSortOption } from "@/utils/productSorting";

const Category = () => {
  const { category, subcategory } = useParams();
  const { products, loading } = useProducts();
  const [sortBy, setSortBy] = useState<ProductSortOption>("relevancia");
  const [filters, setFilters] = useState(DEFAULT_PRODUCT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryData = getCategoryBySlug(category ?? "");
  const currentSubcategory = subcategory ? getSubcategoryBySlug(category ?? "", subcategory) : undefined;

  const filteredProducts = useMemo(() => {
    const categoryProducts = (products ?? []).filter((product) => {
      const matchesCategory = product.category === categoryData?.slug;
      const matchesSubcategory = currentSubcategory
        ? product.subcategory === currentSubcategory.slug
        : true;

      return matchesCategory && matchesSubcategory;
    });

    return sortProducts(filterProducts(categoryProducts, filters), sortBy);
  }, [categoryData?.slug, currentSubcategory, filters, products, sortBy]);

  const paginatedProducts = useMemo(() => {
    return paginateProducts(filteredProducts, 8, currentPage);
  }, [currentPage, filteredProducts]);

  const breadcrumbItems = [
    { label: "Início", to: "/" },
    { label: categoryData?.name ?? "Categoria", to: categoryData ? `/categoria/${categoryData.slug}` : undefined, current: !subcategory },
    ...(subcategory && currentSubcategory
      ? [{ label: currentSubcategory.name, current: true }]
      : []),
  ];

  return (
    <CategoryPageLayout>
      <Breadcrumb items={breadcrumbItems} />

      <section className="py-12 md:py-20 border-b border-border bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoryData?.name ?? "Categoria"}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {currentSubcategory?.name
              ? `${categoryData?.name ?? "Categoria"} • ${currentSubcategory.name}`
              : categoryData?.description ?? "Produtos selecionados para você"}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              categories={[]}
              showFilters
              compact
              onClear={() => setFilters(DEFAULT_PRODUCT_FILTERS)}
            />

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border flex-wrap gap-4">
                <span className="text-sm text-muted-foreground">
                  {loading
                    ? "Carregando produtos..."
                    : `Exibindo ${paginatedProducts.items.length} de ${filteredProducts.length} produtos`}
                </span>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(event) => {
                      setSortBy(event.target.value as ProductSortOption);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="relevancia">Relevância</option>
                    <option value="menor-preco">Menor Preço</option>
                    <option value="maior-preco">Maior Preço</option>
                    <option value="mais-vendidos">Mais Vendidos</option>
                    <option value="novos">Mais Novos</option>
                  </select>
                </div>
              </div>

              <ProductGrid products={paginatedProducts.items} className="mb-12" />
              <Pagination currentPage={currentPage} totalPages={paginatedProducts.totalPages} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </section>
    </CategoryPageLayout>
  );
};

export default Category;
