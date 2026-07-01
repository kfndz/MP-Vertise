import { useMemo, useState } from "react";
import { Sliders } from "lucide-react";
import { Breadcrumb } from "@/components/catalog/Breadcrumb";
import { CategoryPageLayout } from "@/components/catalog/CategoryPageLayout";
import { ProductFilters } from "@/components/catalog/ProductFilters";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { DEFAULT_PRODUCT_FILTERS, filterProducts } from "@/utils/productFilters";
import { sortProducts, type ProductSortOption } from "@/utils/productSorting";
import type { Product } from "@/types/product";

const Catalog = () => {
  const { products, loading } = useProducts();
  const [sortBy, setSortBy] = useState<ProductSortOption>("relevancia");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_PRODUCT_FILTERS);

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products as Product[], filters);
    return sortProducts(filtered, sortBy);
  }, [filters, products, sortBy]);

  const categoryOptions = useMemo(() => {
    const categories = Array.from(new Set(products.map((product) => product.category).filter(Boolean)));
    return categories.map((category) => ({ id: category ?? "", name: category ?? "" }));
  }, [products]);

  return (
    <CategoryPageLayout>
      <Breadcrumb items={[{ label: "Início", to: "/" }, { label: "Catálogo", current: true }]} />

      <section className="py-12 md:py-20 border-b border-border bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Catálogo de Produtos</h1>
          <p className="text-muted-foreground text-lg">Explore nossa seleção completa de produtos premium</p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              categories={categoryOptions}
              showFilters={showFilters}
              onClear={() => setFilters(DEFAULT_PRODUCT_FILTERS)}
            />

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border flex-wrap gap-4">
                <span className="text-sm text-muted-foreground">
                  {loading ? "Carregando produtos..." : `Exibindo ${filteredProducts.length} produtos`}
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters((value) => !value)}
                    className="lg:hidden px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Sliders className="w-4 h-4" />
                    Filtros
                  </button>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as ProductSortOption)}
                    className="px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="relevancia">Relevância</option>
                    <option value="menor-preco">Menor Preço</option>
                    <option value="maior-preco">Maior Preço</option>
                    <option value="mais-vendidos">Mais Vendidos</option>
                  </select>
                </div>
              </div>

              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </section>
    </CategoryPageLayout>
  );
};

export default Catalog;
