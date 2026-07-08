import { CategoryPageLayout } from "@/components/catalog/CategoryPageLayout";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { SectionHeader } from "@/components/catalog/SectionHeader";
import { FavoriteService } from "@/services/FavoriteService";

export default function Favoritos() {
  const { products, loading } = useProducts();

  const favoriteIds = FavoriteService.getAll();

  const items = (products ?? []).filter((product) =>
    favoriteIds.includes(String(product.id)),
  );

  return (
    <CategoryPageLayout>
      <SectionHeader title="Favoritos" description="Seus produtos favoritos" />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div>Carregando...</div>
          ) : items.length ? (
            <ProductGrid products={items} />
          ) : (
            <div className="text-center py-12">Nenhum favorito ainda.</div>
          )}
        </div>
      </section>
    </CategoryPageLayout>
  );
}
