import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Star, ShoppingCart, ChevronRight, Sliders } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { ProductService } from "@/services/ProductService";

const Catalog = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("relevancia");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
  ProductService.getAll().then(setAllProducts);
}, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-accent transition-colors">
              Início
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent font-medium">Catálogo</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 md:py-20 border-b border-border bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Catálogo de Produtos
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore nossa seleção completa de produtos premium
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div
              className={`lg:col-span-1 ${showFilters ? "block" : "hidden"} lg:block`}
            >
              <div className="bg-card border border-border rounded-lg p-6 sticky top-32">
                <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                  <Sliders className="w-5 h-5" />
                  Filtros
                </h3>

                {/* Category Filter */}
                <div className="mb-8">
                  <label className="text-sm font-semibold block mb-4">
                    Categorias
                  </label>
                  <div className="space-y-2">
                    {["Tecnologia", "Casa", "Bem-estar", "Utilidades"].map(
                      (cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="rounded"
                            defaultChecked={false}
                          />
                          <span className="text-sm">{cat}</span>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="mb-8">
                  <label className="text-sm font-semibold block mb-4">
                    Faixa de Preço
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    defaultValue="500"
                    className="w-full"
                  />
                  <div className="flex gap-2 mt-3">
                    <input
                      type="number"
                      placeholder="Min"
                      className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-8">
                  <label className="text-sm font-semibold block mb-4">
                    Classificação
                  </label>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <label
                        key={star}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="rounded"
                          defaultChecked={star >= 4}
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < star ? "fill-accent text-accent" : "text-muted"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          para cima
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full py-2 border border-accent text-accent rounded-lg text-sm font-semibold hover:bg-accent hover:text-white transition-colors">
                  Limpar Filtros
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort and Filter Toggle */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border flex-wrap gap-4">
                <span className="text-sm text-muted-foreground">
                  Exibindo {allProducts.length} produtos
                </span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Sliders className="w-4 h-4" />
                    Filtros
                  </button>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="relevancia">Relevância</option>
                    <option value="menor-preco">Menor Preço</option>
                    <option value="maior-preco">Maior Preço</option>
                    <option value="mais-vendidos">Mais Vendidos</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/produto/${product.id}`}
                    className="group"
                  >
                    <div className="relative bg-card rounded-lg overflow-hidden mb-4">
                      <div className="aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {product.badge && (
                        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {product.badge}
                        </div>
                      )}
                      <button className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white rounded-full p-3">
                          <ShoppingCart className="w-6 h-6 text-foreground" />
                        </div>
                      </button>
                    </div>

                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-accent text-accent"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-foreground">
                        {product.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Catalog;
