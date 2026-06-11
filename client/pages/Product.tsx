import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Star, ShoppingCart, Heart, ChevronRight, Truck, RotateCcw, Shield } from 'lucide-react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productData = {
    id,
    name: 'Fone de Ouvido Wireless Premium',
    price: 299.90,
    originalPrice: 399.90,
    rating: 4.8,
    reviews: 324,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
    ],
    description: 'Fone de ouvido wireless de alta qualidade com cancelamento de ruído ativo e bateria de longa duração.',
    specifications: {
      'Marca': 'Premium Audio',
      'Modelo': 'PA-WH-2024',
      'Tipo': 'Fone Over-Ear',
      'Conexão': 'Bluetooth 5.3',
      'Tempo de Bateria': '40 horas',
      'Cancelamento de Ruído': 'Ativo (ANC)',
      'Peso': '250g',
      'Cor': 'Preto',
      'Marca de Fone': 'Premium Audio',
    },
    stock: 12,
    inStock: true,
  };

  const relatedProducts = [
    {
      id: 1,
      name: 'Capa Protetora para Fone',
      price: 'R$ 49,90',
      image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 89,
    },
    {
      id: 2,
      name: 'Cabo de Áudio Premium',
      price: 'R$ 79,90',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 3,
      name: 'Adaptador USB-C Dourado',
      price: 'R$ 39,90',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 234,
    },
  ];

  const frequentlyBought = [
    {
      id: 4,
      name: 'Suporte para Fone Desk',
      price: 'R$ 59,90',
      image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
      checked: true,
    },
    {
      id: 5,
      name: 'Screen Cleaner Premium',
      price: 'R$ 29,90',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
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
            <Link to="/" className="hover:text-accent transition-colors">Início</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/categoria/tecnologia" className="hover:text-accent transition-colors">Tecnologia</Link>
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
                  src={productData.images[selectedImage]}
                  alt={productData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {productData.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? 'border-accent' : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <img src={img} alt={`${productData.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{productData.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-accent text-accent"
                    />
                  ))}
                </div>
                <span className="text-sm">
                  <strong>{productData.rating}</strong> ({productData.reviews} avaliações)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold">R$ {productData.price.toFixed(2).replace('.', ',')}</span>
                <span className="text-lg text-muted-foreground line-through">
                  R$ {productData.originalPrice.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-sm font-semibold text-accent ml-2">
                  {Math.round(((productData.originalPrice - productData.price) / productData.originalPrice) * 100)}% OFF
                </span>
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
                      <span className="text-green-600 font-semibold">✓ Em Estoque</span>
                      <span className="text-muted-foreground ml-2">({productData.stock} unidades disponíveis)</span>
                    </>
                  ) : (
                    <span className="text-destructive font-semibold">✗ Fora de Estoque</span>
                  )}
                </p>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">Quantidade</label>
                <div className="flex items-center gap-3 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(productData.stock, quantity + 1))}
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
                      ? 'bg-accent/10 border-accent text-accent'
                      : 'border-border text-foreground hover:border-accent'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
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
                    <p className="text-sm text-muted-foreground">Chega em até 7 dias úteis</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent-secondary/10 rounded-lg flex-shrink-0">
                    <RotateCcw className="w-5 h-5 text-accent-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold">Devolução Gratuita</p>
                    <p className="text-sm text-muted-foreground">30 dias para devolver ou trocar</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Compra Protegida</p>
                    <p className="text-sm text-muted-foreground">Garantia de satisfação 100%</p>
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
                {Object.entries(productData.specifications).map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`p-4 ${idx % 2 === 1 ? 'bg-muted/30' : ''} ${
                      idx >= Object.entries(productData.specifications).length - 2 ? 'border-t border-border' : ''
                    }`}
                  >
                    <p className="text-sm font-semibold text-muted-foreground">{key}</p>
                    <p className="font-semibold mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Frequently Bought Together */}
          <div className="mb-20 border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-8">Frequentemente Comprados Juntos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {frequentlyBought.map((item) => (
                <div key={item.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      className="w-5 h-5 rounded border-2 border-border accent-accent cursor-pointer flex-shrink-0 mt-2"
                    />
                    <div>
                      <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-muted">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="font-semibold text-sm mb-2 line-clamp-2">{item.name}</p>
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
              {relatedProducts.map((product) => (
                <Link key={product.id} to={`/produto/${product.id}`} className="group">
                  <div className="bg-card rounded-lg overflow-hidden mb-4">
                    <div className="aspect-square bg-muted overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <p className="text-accent font-bold">{product.price}</p>
                </Link>
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
