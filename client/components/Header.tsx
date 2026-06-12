import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = ['Tecnologia', 'Casa', 'Produtos de Beleza', 'Utilidades'];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-accent text-white text-center py-2.5 text-sm font-medium sticky top-0 z-50">
        Frete grátis para compras acima de R$199
      </div>

      {/* Main Header */}
      <header className="sticky top-10 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-lg">∞</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {categories.map((cat) => (
                <Link key={cat} to={`/categoria/${cat.toLowerCase()}`} className="text-sm font-medium hover:text-accent transition-colors">
                  {cat}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Hidden on small screens */}
            <div className="hidden md:flex items-center flex-1 max-w-xs mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full px-4 py-2 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent focus:bg-card transition-all"
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
              <button className="hidden sm:block p-2 hover:bg-muted rounded-lg transition-colors relative">
                <Heart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>

              {/* User Account */}
              <button className="hidden sm:block p-2 hover:bg-muted rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link to="/carrinho" className="p-2 hover:bg-muted rounded-lg transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full text-white text-xs flex items-center justify-center" />
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-4 space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  className="w-full px-4 py-2 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
              </div>
              {categories.map((cat) => (
                <Link key={cat} to={`/categoria/${cat.toLowerCase()}`} className="block py-2 text-sm font-medium hover:text-accent transition-colors">
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
}
