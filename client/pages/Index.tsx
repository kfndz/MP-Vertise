import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ChevronRight,
  ChevronDown,
  Lock,
  Truck,
  Award,
  Headphones,
  ChevronLeft, 
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/catalog/SectionHeader";
import { ProductCard } from "@/components/catalog/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const { products } = useProducts();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  // --- CONFIGURAÇÃO DO CARROSSEL ---
  const carouselImages = [
    { src: "/images/home-image.png", alt: "Vitrine Inteligente MP Vertise" },
    { src: "/images/tecnologia-image.png", alt: "As Melhores Ofertas de Tecnologia" },
    { src: "/images/moda-estilo-image.png", alt: "Tendências de Moda e Estilo" },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Efeito para passar os slides automaticamente a cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };
  // ---------------------------------

  const categories = [
    {
      name: "Moda & Estilo",
      slug: "moda-acessorios",
      image: "/images/moda-estilo-image.png",
      description: "Roupas, acessórios e tendências de moda",
    },
    {
      name: "Beleza & Cuidados pessoais",
      slug: "saude-beleza",
      image: "/images/produtos-beleza-image.png",
      description: "Maquiagem, perfumes, cosméticos e produtos para sua beleza pessoal",
    },
    {
      name: "Casa & Decoração",
      slug: "casa",
      image: "/images/casa-image.png",
      description: "Móveis, decoração e utensílios para o seu lar",
    },
    {
      name: "Utilidades",
      slug: "utilidades", 
      image: "/images/utilidades-image.png",
      description: "Produtos do dia a dia",
    },
    {
      name: "Esporte & Fitness",
      slug: "esporte-fitness",
      image: "/images/esportes-image.png",
      description: "Melhores produtos para você praticar seu esporte favorito",
    },
    {
      name: "Saúde & Bem-estar",
      slug: "saude-beleza",
      image: "/images/saude-image.png",
      description: "Produtos para sua saúde e bem-estar",
    },
    {
      name: "Tecnologia & Gadgets",
      slug: "tecnologia",
      image: "/images/tecnologia-image.png",
      description: "Smartphones, Notebooks e Acessórios",
    },
    {
      name: "Pet Shop",
      slug: "pet-shop",
      image: "/images/petshop-image.png",
      description: "Produtos para o seu Pet",
    },
  ];

  const faqs = [
    {
      question: "Como o site funciona?",
      answer:
        "Nós selecionamos e organizamos as melhores ofertas e produtos de grandes lojas em um só lugar para facilitar sua busca. Quando você clica em um produto, você é redirecionado para concluir sua compra com total segurança na loja oficial.",
    },
    {
      question: "Eu pago algo a mais para comprar por aqui?",
      answer:
        "Não! Você paga o mesmo valor do produto na loja oficial. O site funciona apenas como um indicador de ofertas, nós não cobramos nenhuma taxa extra dos usuários.",
    },
    {
      question: "Como funciona o envio e o rastreamento do meu pedido?",
      answer:
        "Como nós apenas indicamos os produtos, todo o processo de envio, entrega e rastreamento é de responsabilidade da loja onde você finalizou a compra.",
    },
    {
      question: "Onde vejo o prazo de entrega e o valor do frete?",
      answer:
        "Você consegue calcular o frete e ver o prazo de entrega diretamente na página da loja oficial, antes de finalizar o seu pagamento, inserindo o seu CEP.",
    },
    {
      question: "Se eu precisar devolver ou trocar o produto, o que eu faço?",
      answer:
        "Qualquer troca, devolução ou pedido de reembolso deve ser feito diretamente através do suporte da loja onde o produto foi comprado, seguindo as políticas de devolução deles.",
    },
    {
      question: "O site é seguro?",
      answer:
        "Sim, totalmente. Você não insere dados de cartão de crédito ou dados pessoais sensíveis no nosso site. Toda a parte de pagamento e cadastro é feita dentro do ambiente seguro das maiores e mais confiáveis plataformas de e-commerce do Brasil.",
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
                MP Vertise: Sua Vitrine Inteligente de Ofertas 
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                O ponto de partida para suas compras inteligentes - Encontre produtos selecionados, promoções verificadas e links diretos para os ambientes seguros do varejo brasileiro.
              </p>
              <div className="flex gap-4">
                <Link to="/catalogo" className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all active:scale-95 flex items-center gap-2">
                  Explore Produtos
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link to="/mais-vendidos" className="px-8 py-4 border-2 border-foreground text-foreground rounded-lg font-semibold hover:bg-foreground hover:text-background transition-all">
                  Mais Vendidos
                </Link>
              </div>
            </div>

            {/* Hero Interactive Carousel */}
            <div className="relative hidden md:block group">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted relative">
                {carouselImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Botões de Navegação (Visíveis ao passar o mouse) */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background text-foreground p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 hover:bg-background text-foreground p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all active:scale-90"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Indicadores de bolinha (Dots) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlide ? "w-6 bg-accent" : "w-2 bg-background/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-accent-secondary rounded-2xl opacity-20 blur-3xl" />
            </div>

          </div>
        </div>
      </section>

      {/* Categorias Destacadas */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Categorias Destacadas"
            description="Explore nossas seleções especiais in cada categoria"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/categoria/${cat.slug}`}
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

      {/* Mais Vendidos */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Mais Vendidos"
            description="Os favoritos dos nossos clientes"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Por Que Escolher A Gente */}
      <section className="py-20 md:py-32 border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Por Que Escolher A Gente"
            description="Simplificamos sua busca encontrando as melhores oportunidades com total segurança."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Curadoria Inteligente",
                desc: "Filtramos a internet diariamente para selecionar apenas produtos altamente avaliados e de procedência comprovada pelas maiores lojas.",
              },
              {
                title: "Economia de Verdade",
                desc: "Encontramos os menores preços, promoções reais e cupons de desconto válidos para você não gastar um centavo a mais.",
              },
              {
                title: "Direcionamento Seguro",
                desc: "Livre de fraudes. Garantimos que você clique apenas em links oficiais e termine sua compra nos ambientes mais protegidos do país.",
              },
              {
                title: "Ganho de Tempo",
                desc: "Esqueça as horas gastas comparando sites. Reunimos as melhores ofertas de diversos nichos em um único catálogo organizado.",
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
          <SectionHeader
            title="Nossos Diferenciais"
            description="O que nos torna a escolha ideal para suas pesquisas e compras"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Lock className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Redirecionamento Seguro</h3>
              <p className="text-muted-foreground">
                Livre de fraudes. Garantimos links verificados para que você finalize suas compras apenas nos ambientes oficiais e protegidos das maiores lojas do país.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent-secondary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Truck className="w-7 h-7 text-accent-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">As Melhores Plataformas</h3>
              <p className="text-muted-foreground">
                Parcerias com gigantes do mercado. Indicamos ofertas de grandes redes que possuem logística de entrega rápida e abrangência para todo o Brasil.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Award className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curadoria Rigorosa</h3>
              <p className="text-muted-foreground">
                Filtramos a internet diariamente para reunir apenas produtos com excelentes avaliações dos consumidores e garantia de procedência
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-accent-secondary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Headphones className="w-7 h-7 text-accent-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Foco na Economia</h3>
              <p className="text-muted-foreground">
                Pesquisa inteligente que poupa seu tempo. Cruzamos informações para trazer promoções reais e cupons válidos em uma interface limpa e direta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Acompanhe Nossas Atualizações"
            description="@mpvertise"
          />

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
          <SectionHeader
            title="Perguntas Frequentes"
            description="Encontre respostas para suas dúvidas"
          />

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
      <Footer />
    </div>
  );
};

export default Index;