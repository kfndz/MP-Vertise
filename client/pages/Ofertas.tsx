import { SectionHeader } from "@/components/catalog/SectionHeader";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { CategoryPageLayout } from "@/components/catalog/CategoryPageLayout";

export default function Ofertas() {
  const { products, loading } = useProducts();

  const offers = (products ?? []).filter((p) => p.featured || !!p.badge).slice(0, 12);

  return (
    <CategoryPageLayout>
      <SectionHeader title="Ofertas" description="Aproveite nossas ofertas selecionadas" />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {loading ? <div>Carregando...</div> : <ProductGrid products={offers} />}
        </div>
      </section>
    </CategoryPageLayout>
  );
}
