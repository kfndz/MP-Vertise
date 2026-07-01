import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Star,
  ShoppingCart,
  Heart,
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductService } from "@/services/ProductService";
import type { Product as ProductType } from "@/types/product";
import { ProductCard } from "@/components/catalog/ProductCard"

const Product = () => {
  const { id } = useParams<{ id: string }>();

  const [productData, setProductData] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const images = productData.images ?? [];

  useEffect(() => {
    async function loadProduct() {
       if (!id) return;
 
       setLoading(true);
 
       const product = await ProductService.getById(Number(id));
 
       setProductData(product ?? null);
 
       const products = await ProductService.getAll();
       setAllProducts(products);
 
       setLoading(false);

       setSelectedImage(0);
    }
 
    loadProduct();
 }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  if (!productData) {
    return <div className="min-h-screen flex items-center justify-center">
      Produto não encontrado. </div>
  };

  let relatedProducts = allProducts.filter (
    p => 
      p.subcategory === productData.subcategory &&
      p.id !== productData.id
  );

  if (relatedProducts.length < 4) {
    relatedProducts = allProducts.filter(
      p => 
        p.category === productData.category &&
        p.id !== productData.id
    );
  }

  relatedProducts = relatedProducts.slice(0,4);

  const specifications = Object.entries(productData.specifications ?? {});

  const discount = 
    productData.originalPrice && productData.originalPrice > productData.price
      ? Math.round(
        ((productData.originalPrice - productData.price) / productData.originalPrice) * 100
      )
      : 0;

  const frequentlyBought = [
    {
      id: 4,
      name: "Suporte para Fone Desk",
      price: "R$ 59,90",
      image:
        "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop",
      checked: true,
    },
    {
      id: 5,
      name: "Screen Cleaner Premium",
      price: "R$ 29,90",
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      checked: false,
    },
  ];

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
            <Link
              to={`/categoria/${productData.category}`}
            >
              {productData.category}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent font-medium">Produto</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={
                    images[selectedImage] ?? images[0]
                  }
                  alt={productData.name ?? "Produto"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx
                        ? "border-accent"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${productData.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {productData.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm">
                  <strong>{productData.rating ?? 0}</strong> ({productData.reviews ?? 0} avaliações)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold">
                  R$ {productData.price.toFixed(2).replace(".", ",")}
                </span>

                {productData.originalPrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      R$ {productData.originalPrice.toFixed(2).replace(".", ",")}
                    </span>

                    {discount > 0 && (
                      <span className="text-sm font-semibold text-accent ml-2">
                        {discount}% OFF
                      </span>
                    )}
                    </>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {productData.description}
              </p>

              {/* Stock Status */}
              <div className="mb-8 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm">
                  {productData.inStock ? (
                    <>
                      <span className="text-green-600 font-semibold">
                        ✓ Em Estoque
                      </span>
                      <span className="text-muted-foreground ml-2">
                        ({productData.stock ?? 0} unidades disponíveis)
                      </span>
                    </>
                  ) : (
                    <span className="text-destructive font-semibold">
                      ✗ Fora de Estoque
                    </span>
                  )}
                </p>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">
                  Quantidade
                </label>
                <div className="flex items-center gap-3 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(productData.stock ?? 1, quantity + 1))
                    }
                    className="w-10 h-10 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mb-8">
                <button className="flex-1 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-6 py-4 rounded-lg font-semibold border-2 transition-colors ${
                    isWishlisted
                      ? "bg-accent/10 border-accent text-accent"
                      : "border-border text-foreground hover:border-accent"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
              </div>

              {/* Trust Elements */}
              <div className="space-y-4 pt-8 border-t border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                    <Truck className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Entrega Rápida</p>
                    <p className="text-sm text-muted-foreground">
                      Chega em até 7 dias úteis
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-secondary/10 rounded-lg flex-shrink-0">
                    <RotateCcw className="w-5 h-5 text-accent-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold">Devolução Gratuita</p>
                    <p className="text-sm text-muted-foreground">
                      30 dias para devolver ou trocar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Compra Protegida</p>
                    <p className="text-sm text-muted-foreground">
                      Garantia de satisfação 100%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-20 border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-8">Especificações</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {specifications.map(
                  ([key, value], idx) => (
                    <div
                      key={key}
                      className={`p-4 ${idx % 2 === 1 ? "bg-muted/30" : ""} ${
                        idx >=
                        specifications.length - 2
                          ? "border-t border-border"
                          : ""
                      }`}
                    >
                      <p className="text-sm font-semibold text-muted-foreground">
                        {key}
                      </p>
                      <p className="font-semibold mt-1">{value}</p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Frequently Bought Together */}
          <div className="mb-20 border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-8">
              Frequentemente Comprados Juntos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {frequentlyBought.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      className="w-5 h-5 rounded border-2 border-border accent-accent cursor-pointer flex-shrink-0 mt-2"
                    />
                    <div>
                      <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-semibold text-sm mb-2 line-clamp-2">
                        {item.name}
                      </p>
                      <p className="text-accent font-bold">{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div className="border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Product;
