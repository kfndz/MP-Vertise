import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Trash2, Plus, Minus, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Fone de Ouvido Wireless Premium',
      price: 299.90,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'Luminária LED Inteligente',
      price: 149.90,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=400&h=400&fit=crop',
    },
  ]);

  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 199 ? 0 : 15;
  const total = subtotal + shipping - discountAmount;

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    if (coupon === 'SAVE10') {
      setDiscountAmount(subtotal * 0.1);
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      setDiscountAmount(0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-accent transition-colors">Início</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent font-medium">Carrinho</span>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12">Seu Carrinho</h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-card border border-border rounded-lg p-6 flex gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link to={`/produto/${item.id}`} className="hover:text-accent transition-colors">
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      </Link>
                      <p className="text-accent text-xl font-bold">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        Unitário: R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-background rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-background rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-32 space-y-6">
                  <h2 className="text-2xl font-bold">Resumo</h2>

                  {/* Coupon */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold block">Cupom de Desconto</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Código do cupom"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                        className="flex-1 px-4 py-2 border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-muted rounded-lg text-sm font-semibold hover:bg-muted/80 transition-colors"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponApplied && (
                      <p className="text-sm text-green-600 font-semibold">✓ Cupom aplicado com sucesso!</p>
                    )}
                    <p className="text-xs text-muted-foreground">Use "SAVE10" para 10% de desconto</p>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border" />

                  {/* Pricing */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Desconto</span>
                        <span className="font-semibold">-R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Frete {shipping === 0 ? '(Grátis)' : ''}
                      </span>
                      <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                        {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border" />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-3xl font-bold text-accent">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  {/* Shipping Info */}
                  {shipping === 0 && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                      ✓ Você qualificou para frete grátis!
                    </div>
                  )}

                  {shipping > 0 && subtotal < 199 && (
                    <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg text-sm">
                      <p className="font-semibold text-accent mb-1">
                        Adicione R$ {(199 - subtotal).toFixed(2).replace('.', ',')} para frete grátis
                      </p>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <button className="w-full py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all active:scale-95">
                    Ir para Checkout
                  </button>

                  {/* Continue Shopping */}
                  <Link
                    to="/catalogo"
                    className="block w-full py-3 border-2 border-foreground text-foreground rounded-lg font-semibold hover:bg-foreground hover:text-background text-center transition-all"
                  >
                    Continuar Comprando
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-6">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h2>
              <p className="text-muted-foreground mb-8">Explore nossos produtos e comece suas compras</p>
              <Link
                to="/catalogo"
                className="inline-block px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all"
              >
                Ver Catálogo
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
