import { SectionHeader } from "@/components/catalog/SectionHeader";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { CategoryPageLayout } from "@/components/catalog/CategoryPageLayout";

export default function MaisVendidos() {
  const { products, loading } = useProducts();

  const top = (products ?? [])
    .slice()
    .sort((a, b) => (b.reviews ?? 0) - (a.reviews ?? 0))
    .slice(0, 8);

  return (
    <CategoryPageLayout>
      <SectionHeader title="Mais Vendidos" description="Produtos mais populares da loja" />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {loading ? <div>Carregando...</div> : <ProductGrid products={top} />}
        </div>
      </section>
    </CategoryPageLayout>
  );
}
