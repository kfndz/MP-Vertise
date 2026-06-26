import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Star,
  ShoppingCart,
  ChevronRight,
  Sliders,
  ArrowUpDown,
} from "lucide-react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductService } from "@/services/ProductService";
import { Product } from "@/types/product";
import { useEffect } from "react";

const Category = () => {
  const { category } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("relevancia");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
  ProductService.getAll().then(setProducts);
}, []);

  const categoryData: Record<
    string,
    { title: string; description: string; color: string }
  > = {
    tecnologia: {
      title: "Tecnologia",
      description:
        "Gadgets e acessórios inovadores para o seu estilo de vida digital",
      color: "accent",
    },
    casa: {
      title: "Casa",
      description:
        "Decoração e utilidades para tornar seu lar ainda mais especial",
      color: "accent",
    },
    "bem-estar": {
      title: "Bem-estar",
      description: "Produtos premium para sua saúde e qualidade de vida",
      color: "accent",
    },
    utilidades: {
      title: "Utilidades",
      description: "Produtos essenciais do dia a dia com qualidade garantida",
      color: "accent",
    },
  };

  const current =
    categoryData[category || "tecnologia"] || categoryData["tecnologia"];

  const filteredProducts = products.filter(
    (product) => product.category === category,
  );
  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIdx,
    startIdx + productsPerPage,
  );

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
            <span className="text-accent font-medium">{current.title}</span>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <section className="py-12 md:py-20 border-b border-border bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {current.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {current.description}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-32">
                <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                  <Sliders className="w-5 h-5" />
                  Filtros
                </h3>

                {/* Price Filter */}
                <div className="mb-8">
                  <label className="text-sm font-semibold block mb-4">
                    Faixa de Preço
                  </label>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            max: parseInt(e.target.value),
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            min: parseInt(e.target.value) || 0,
                          })
                        }
                        className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange({
                            ...priceRange,
                            max: parseInt(e.target.value) || 500,
                          })
                        }
                        className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
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

                {/* Clear Filters */}
                <button className="w-full py-2 border border-accent text-accent rounded-lg text-sm font-semibold hover:bg-accent hover:text-white transition-colors">
                  Limpar Filtros
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort Options */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Exibindo {startIdx + 1}-
                  {Math.min(
                    startIdx + productsPerPage,
                    filteredProducts.length,
                  )}{" "}
                  de {filteredProducts.length} produtos
                </span>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="relevancia">Relevância</option>
                    <option value="menor-preco">Menor Preço</option>
                    <option value="maior-preco">Maior Preço</option>
                    <option value="mais-vendidos">Mais Vendidos</option>
                    <option value="novos">Mais Novos</option>
                  </select>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedProducts.map((product) => (
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
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </span>

                      <span className="text-sm text-muted-foreground line-through">
                        R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 pt-12 border-t border-border">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 transition-colors"
                  >
                    Anterior
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                        currentPage === i + 1
                          ? "bg-accent text-white"
                          : "border border-border hover:bg-muted"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50 transition-colors"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Category;
