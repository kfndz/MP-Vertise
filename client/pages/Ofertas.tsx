import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BadgePercent } from "lucide-react";

import { CategoryPageLayout } from "@/components/catalog/CategoryPageLayout";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { SectionHeader } from "@/components/catalog/SectionHeader";
import { useProducts } from "@/hooks/useProducts";
import { sortProducts } from "@/utils/productSorting";

export default function Ofertas() {
  const { products, loading, error } = useProducts();

  const offers = useMemo(() => {
    const filteredOffers = products.filter((product) => {
      const price = Number(product.price ?? 0);
      const originalPrice = Number(
        product.originalPrice ?? 0,
      );

      const hasDiscount =
        originalPrice > 0 && originalPrice > price;

      return (
        product.isOffer ||
        product.featured ||
        Boolean(product.badge) ||
        hasDiscount
      );
    });

    return sortProducts(
      filteredOffers,
      "relevancia",
    ).slice(0, 12);
  }, [products]);

  return (
    <CategoryPageLayout>
      <SectionHeader
        title="Ofertas"
        description="Confira os produtos e promoções selecionados"
      />

      <section className="py-10 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-[420px] animate-pulse rounded-2xl border border-border bg-muted"
                />
              ))}
            </div>
          ) : error ? (
            <div
              role="alert"
              className="rounded-3xl border border-destructive/30 bg-destructive/10 px-6 py-12 text-center"
            >
              <h2 className="text-xl font-semibold">
                Não foi possível carregar as ofertas
              </h2>

              <p className="mt-2 text-muted-foreground">
                Tente novamente em alguns instantes.
              </p>
            </div>
          ) : offers.length > 0 ? (
            <ProductGrid products={offers} />
          ) : (
            <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <BadgePercent
                  aria-hidden="true"
                  className="h-8 w-8 text-accent"
                />
              </div>

              <h2 className="text-2xl font-semibold">
                Nenhuma oferta disponível
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                Novas ofertas e promoções serão exibidas aqui
                assim que forem cadastradas.
              </p>

              <Link
                to="/"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-6 py-2.5 font-semibold text-white transition hover:bg-accent/90"
              >
                Voltar ao início
              </Link>
            </div>
          )}
        </div>
      </section>
    </CategoryPageLayout>
  );
}