import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CategoryDropdown } from "./CategoryDropdown";
import { CategoryAccordion } from "./CategoryAccordion";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearchSubmit(term: string) {
    const q = term.trim();
    if (!q) return;
    navigate(`/catalogo?q=${encodeURIComponent(q)}`);
  }

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-accent text-white text-center py-2.5 text-sm font-medium sticky top-0 z-50">
        Produtos Exclusivos com as melhores ofertas! Aproveite agora!
      </div>

      {/* Main Header */}
      <header className="sticky top-10 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src="/logo-mp.png" alt="MP Vertise" className="h-16 w-auto" />
            </Link>

            {/* Desktop Navigation */}
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

            {/* Search Bar - Hidden on small screens */}
            <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchSubmit((e.target as HTMLInputElement).value);
                  }}
                  className="w-full px-4 py-2 bg-muted border-2 border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:bg-card transition-all"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              {/* Search Icon - Mobile */}
              <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link to="/favoritos" className="hidden sm:block p-2 hover:bg-muted rounded-lg transition-colors relative">
                <Heart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </Link>

              {/* User / Admin (back to admin login) */}
              <Link
                to="/admin/login"
                className="hidden sm:block p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link
                to="/carrinho"
                className="p-2 hover:bg-muted rounded-lg transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full text-white text-xs flex items-center justify-center" />
              </Link>

              {/* Mobile Menu */}
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

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4 space-y-3">
              <div className="relative px-4 pb-4">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchSubmit((e.target as HTMLInputElement).value);
                  }}
                  className="w-full px-4 py-2 bg-muted border-2 border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                />
                <Search className="absolute right-7 top-6 w-4 h-4 text-muted-foreground" />
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
