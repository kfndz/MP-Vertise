import { CategoryPageLayout } from "@/components/catalog/CategoryPageLayout";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { SectionHeader } from "@/components/catalog/SectionHeader";

export default function Favoritos() {
  const { products, loading } = useProducts();

  // Wishlist stored in localStorage as array of product ids
  const wishlistRaw = typeof window !== 'undefined' ? localStorage.getItem('wishlist_v1') : null;
  const wishlistIds = wishlistRaw ? JSON.parse(wishlistRaw) as string[] : [];

  const items = (products ?? []).filter((p) => wishlistIds.includes(String(p.id)));

  return (
    <CategoryPageLayout>
      <SectionHeader title="Favoritos" description="Seus produtos favoritos" />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {loading ? <div>Carregando...</div> : items.length ? <ProductGrid products={items} /> : <div className="text-center py-12">Nenhum favorito ainda.</div>}
        </div>
      </section>
    </CategoryPageLayout>
  );
}
