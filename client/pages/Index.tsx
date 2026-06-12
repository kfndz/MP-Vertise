import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Star,
  ShoppingCart,
  ChevronRight,
  Plus,
  Minus,
  ChevronDown,
  Lock,
  Truck,
  Award,
  Headphones,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "@/lib/products";
import { Description } from "@radix-ui/react-toast";

const Index = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");

  const categories = [
    {
      name: "Tecnologia",
      image:
        "/images/tecnologia-image.png",
      description: "Gadgets e acessórios inovadores",
    },
    {
      name: "Casa",
      image:
        "/images/casa-image.png",
      description: "Decoração e utilidades",
    },
    {
      name: "Produtos de Beleza",
      image:
        "/images/produtos-beleza-image.png",
      description: "Produtos de Beleza",
    },
    {
      name: "Utilidades",
      image:
        "/images/utilidades-image.png",
      description: "Produtos do dia a dia",
    },
    {
      name: "Esporte e Fitness",
      image: 
        "/images/esportes-image.png",
      description: "Melhores produtos para você praticar seu esporte favorito"
    },
    {
      name: "Saúde",
      image: 
        "/images/saude-image.png",
      description: "Produtos para sua saúde e bem-estar"
    },
    {
      name: "Indústria e Comércio",
      image:
        "/images/comercio-image.png",
      description:"Produtos especialmente para o seu negócio"
    },
    {
      name: "Pet Shop",
      image: 
        "/images/petshop-image.png",
      description: "Produtos para o seu Pet"
    }
    
  ];

  const faqs = [
    {
      question: "Como funciona o envio?",
      answer:
        "Oferecemos envio para todo o Brasil. A entrega é feita dentro de 7 dias úteis. Frete grátis para compras acima de R$199.",
    },
    {
      question: "Qual é a política de devolução?",
      answer:
        "Você tem até 30 dias para devolver um produto em perfeitas condições. Oferecemos reembolso total ou troca.",
    },
    {
      question: "Como rastrear meu pedido?",
      answer:
        "Após a confirmação do pedido, você receberá um código de rastreamento via email para acompanhar sua entrega.",
    },
    {
      question: "Os produtos têm garantia?",
      answer:
        "Sim! Todos os nossos produtos têm garantia de 1 ano contra defeitos de fabricação.",
    },
    {
      question: "Como faço para entrar em contato?",
      answer:
        "Você pode nos contatar via email, chat, ou telefone. Nosso suporte está disponível 24/7.",
    },
    {
      question: "Vocês oferecem parcelamento?",
      answer:
        "Sim! Aceitamos parcelamento em até 12 vezes sem juros no cartão de crédito.",
    },
  ];

  const instagramGallery = [
    "/images/fone.png",
    "/images/casa-image.png",
    "/images/esportes-image.png",
    "/images/saude-image.png",
    "/images/tecnologia-image.png",
    "/images/utilidades-image.png",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Descubra produtos que fazem diferença no seu dia a dia
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Seleção exclusiva com qualidade, praticidade e entrega segura.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all active:scale-95 flex items-center gap-2">
                  Explorar Produtos
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-4 border-2 border-foreground text-foreground rounded-lg font-semibold hover:bg-foreground hover:text-background transition-all">
                  Mais Vendidos
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden md:block">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src="/images/esportes-image.png"
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-accent-secondary rounded-2xl opacity-20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Categorias Destacadas</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore nossas seleções especiais em cada categoria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/categoria/${cat.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-xl bg-card hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-white/80 text-sm">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Mais Vendidos</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Os favoritos dos nossos clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col h-full">
                <div className="relative bg-card rounded-lg overflow-hidden mb-4">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.images?.[0] ?? product.image}
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

                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem]">
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

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-foreground">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>

                    <span className="text-sm text-muted-foreground line-through">
                      R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>

                  <button className="mt-auto w-full py-2.5 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all active:scale-95">
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Por Que Escolher A Gente
            </h2>
            <p className="text-background/70 text-lg max-w-2xl mx-auto">
              Oferecemos uma experiência de compra premium com qualidade
              incomparável
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Compra Segura",
                desc: "Transações criptografadas com tecnologia SSL",
              },
              {
                title: "Entrega Rápida",
                desc: "Envio para todo Brasil em até 7 dias",
              },
              {
                title: "Produtos Premium",
                desc: "Curadoria exclusiva de marcas selecionadas",
              },
              {
                title: "Suporte 24/7",
                desc: "Equipe humanizada disponível sempre",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-background/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos Diferenciais */}
      <section className="py-20 md:py-32 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nossos Diferenciais</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              O que nos torna a escolha ideal para sua compra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Lock className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compra Segura</h3>
              <p className="text-muted-foreground">
                Transações criptografadas com tecnologia SSL de última geração
                para sua proteção.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent-secondary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Truck className="w-7 h-7 text-accent-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Entrega para Todo o Brasil
              </h3>
              <p className="text-muted-foreground">
                Envio rápido e confiável para qualquer lugar do país com
                rastreamento em tempo real.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Award className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Produtos Selecionados
              </h3>
              <p className="text-muted-foreground">
                Curadoria exclusiva de marcas premium com garantia de qualidade
                em cada item.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent-secondary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Headphones className="w-7 h-7 text-accent-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Atendimento Especializado
              </h3>
              <p className="text-muted-foreground">
                Equipe humanizada disponível 24/7 para esclarecer dúvidas e
                resolver problemas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Acompanhe Nossas Atualizações
            </h2>
            <p className="text-muted-foreground text-lg">@premiumstore</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramGallery.map((image, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg overflow-hidden bg-muted hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <img
                  src={image}
                  alt={`Instagram ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-muted-foreground text-lg">
              Encontre respostas para suas dúvidas
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors"
                >
                  <span className="font-semibold text-left">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      expandedFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-6 py-4 bg-muted border-t border-border">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-32 border-t border-border bg-accent text-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Assine Nossa Newsletter</h2>
            <p className="text-white/90 text-lg">
              Receba as melhores ofertas e novidades direto no seu email
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="flex-1 px-6 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-accent rounded-lg font-semibold hover:bg-white/90 transition-all active:scale-95 whitespace-nowrap"
            >
              Inscrever
            </button>
          </form>
          <p className="text-center text-white/70 text-sm mt-4">
            Respeitamos sua privacidade. Cancelar inscrição a qualquer momento.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
