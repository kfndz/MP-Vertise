import { useEffect, useMemo, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { CategoryPageLayout } from "@/components/catalog/CategoryPageLayout";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { SectionHeader } from "@/components/catalog/SectionHeader";
import { useProducts } from "@/hooks/useProducts";
import { FavoriteService } from "@/services/FavoriteService";

export default function Favoritos() {
  const { products, loading } = useProducts();

  const [favoriteIds, setFavoriteIds] = useState<string[]>(
    () => FavoriteService.getAll(),
  );

  useEffect(() => {
    function refreshFavorites() {
      setFavoriteIds(FavoriteService.getAll());
    }

    window.addEventListener("storage", refreshFavorites);
    window.addEventListener("favorites-updated", refreshFavorites);

    return () => {
      window.removeEventListener("storage", refreshFavorites);
      window.removeEventListener(
        "favorites-updated",
        refreshFavorites,
      );
    };
  }, []);

  const items = useMemo(() => {
    return (products ?? []).filter((product) =>
      favoriteIds.includes(String(product.id)),
    );
  }, [favoriteIds, products]);

  return (
    <CategoryPageLayout>
      <SectionHeader
        title="Favoritos"
        description="Seus produtos favoritos"
      />

      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex min-h-[260px] items-center justify-center rounded-2xl border border-border bg-card px-6 text-center">
              <p className="text-sm text-muted-foreground sm:text-base">
                Carregando seus favoritos...
              </p>
            </div>
          ) : items.length > 0 ? (
            <>
              <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {items.length === 1
                    ? "1 produto favoritado"
                    : `${items.length} produtos favoritados`}
                </p>

                <Link
                  to="/catalogo"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:opacity-80"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Continuar explorando
                </Link>
              </div>

              <ProductGrid products={items} />
            </>
          ) : (
            <div className="mx-auto flex min-h-[360px] max-w-2xl flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 py-12 text-center sm:px-10">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Heart className="h-8 w-8 text-accent" />
              </div>

              <h2 className="mb-3 text-2xl font-bold">
                Nenhum favorito ainda
              </h2>

              <p className="mb-7 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                Salve os produtos que mais gostou para encontrá-los
                rapidamente depois.
              </p>

              <Link
                to="/catalogo"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent/90"
              >
                <ShoppingBag className="h-5 w-5" />
                Explorar produtos
              </Link>
            </div>
          )}
        </div>
      </section>
    </CategoryPageLayout>
  );
}