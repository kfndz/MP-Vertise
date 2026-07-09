import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, User, Menu, X } from "lucide-react";
import { CategoryDropdown } from "./CategoryDropdown";
import { CategoryAccordion } from "./CategoryAccordion";
import { ProductService } from "@/services/ProductService";
import type { Product } from "@/types/product";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    ProductService.getAll()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  function getProductUrl(product: Product) {
    return `/produto/${product.slug ?? product.id}`;
  }

  function filterProducts(term: string) {
    const q = term.trim().toLowerCase();

    if (!q) return [];

    return products
      .filter((product) =>
        [
          product.name,
          product.brand,
          product.description,
          product.category,
          product.subcategory,
          product.marketplace,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(q)),
      )
      .slice(0, 5);
  }

  const desktopResults = useMemo(
    () => filterProducts(searchTerm),
    [searchTerm, products],
  );

  const mobileResults = useMemo(
    () => filterProducts(mobileSearchTerm),
    [mobileSearchTerm, products],
  );

  function handleSearchSubmit(term: string) {
    const q = term.trim();
    if (!q) return;

    navigate(`/catalogo?q=${encodeURIComponent(q)}`);
    setSearchTerm("");
    setMobileSearchTerm("");
    setMobileMenuOpen(false);
  }

  function handleProductClick(product: Product) {
    navigate(getProductUrl(product));
    setSearchTerm("");
    setMobileSearchTerm("");
    setMobileMenuOpen(false);
  }

  function SearchSuggestions({
    results,
  }: {
    results: Product[];
  }) {
    if (results.length === 0) return null;

    return (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        {results.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => handleProductClick(product)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-muted"
          >
            <img
              src={product.image ?? "/images/home-image.png"}
              alt={product.name}
              onError={(event) => {
                event.currentTarget.src = "/images/home-image.png";
              }}
              className="h-10 w-10 rounded-lg object-cover bg-muted"
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {product.name}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {product.marketplace ?? "Produto"} •{" "}
                {product.category ?? "Catálogo"}
              </p>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="bg-accent text-white text-center py-2.5 text-sm font-medium sticky top-0 z-50">
        Produtos Exclusivos com as melhores ofertas! Aproveite agora!
      </div>

      <header className="sticky top-10 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-22">
            <Link
              to="/"
              className="flex-shrink-0 pl-2 sm:pl-6 md:pl-0 lg:mr-4 transition-all"
            >
              <img
                src="/logo-mp.png"
                alt="MP Vertise"
                className="h-20 w-auto md:h-24"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <CategoryDropdown />

              <Link
                to="/ofertas"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Ofertas
              </Link>

              <Link
                to="/mais-vendidos"
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                Mais Vendidos
              </Link>
            </nav>

            <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit(e.currentTarget.value);
                    }
                  }}
                  className="w-full px-4 py-2 pr-10 bg-muted border-2 border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:bg-card transition-all"
                />

                <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />

                <SearchSuggestions results={desktopResults} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/favoritos"
                className="hidden sm:block p-2 hover:bg-muted rounded-lg transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Link>

              <Link
                to="/admin/login"
                className="hidden sm:block p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4 space-y-3">
              <div className="relative px-4 pb-4">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={mobileSearchTerm}
                  onChange={(e) => setMobileSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit(e.currentTarget.value);
                    }
                  }}
                  className="w-full px-4 py-2 pr-10 bg-muted border-2 border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                />

                <Search className="absolute right-7 top-6 w-4 h-4 text-muted-foreground" />

                <div className="left-4 right-4">
                  <SearchSuggestions results={mobileResults} />
                </div>
              </div>

              <div className="px-0">
                <p className="px-4 py-2 text-xs font-semibold uppercase text-muted-foreground mb-2">
                  Categorias
                </p>
                <CategoryAccordion />
              </div>

              <hr className="my-3 border-border" />

              <Link
                to="/favoritos"
                className="block px-4 py-2 text-sm font-medium hover:text-accent transition-colors"
              >
                Favoritos
              </Link>

              <Link
                to="/ofertas"
                className="block px-4 py-2 text-sm font-medium hover:text-accent transition-colors"
              >
                Ofertas
              </Link>

              <Link
                to="/mais-vendidos"
                className="block px-4 py-2 text-sm font-medium hover:text-accent transition-colors"
              >
                Mais Vendidos
              </Link>

              <Link
                to="/admin/login"
                className="block px-4 py-2 text-sm font-medium hover:text-accent transition-colors"
              >
                Painel Administrativo
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}