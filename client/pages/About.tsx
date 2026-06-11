import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronRight, Award, Target, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-accent transition-colors">Início</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent font-medium">Sobre Nós</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-20 border-b border-border bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Premium Store</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprometida em oferecer produtos premium com a melhor experiência de compra para todos os nossos clientes
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nossa História</h2>
              <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
                A Premium Store nasceu da paixão por oferecer produtos de qualidade superior com um atendimento que faz a diferença. Começamos com a visão simples mas poderosa de criar um espaço onde qualidade, praticidade e confiança caminham juntas.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Cada produto em nosso catálogo é cuidadosamente selecionado para garantir que você receba apenas o melhor. Acreditamos que comprar online deve ser uma experiência prazerosa, segura e confiável.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden h-96 bg-muted">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                alt="Nossa história"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Award className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualidade</h3>
              <p className="text-muted-foreground">
                Selecionamos cada produto com rigor para garantir excelência em tudo que oferecemos
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-14 h-14 bg-accent-secondary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-7 h-7 text-accent-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparência</h3>
              <p className="text-muted-foreground">
                Comunicação clara e honesta em todas as nossas interações com clientes
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-14 h-14 bg-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Humanidade</h3>
              <p className="text-muted-foreground">
                Acreditamos em construir relacionamentos genuínos com cada cliente
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-14 h-14 bg-accent-secondary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Target className="w-7 h-7 text-accent-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inovação</h3>
              <p className="text-muted-foreground">
                Sempre buscando novas formas de melhorar a experiência de compra
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-accent/5 to-transparent rounded-lg p-8 border border-accent/20">
              <h3 className="text-2xl font-bold mb-4 text-accent">Nossa Missão</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Oferecer uma experiência de compra online premium, com produtos selecionados, atendimento humanizado e entrega confiável, transformando cada compra em um momento especial para nossos clientes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent-secondary/5 to-transparent rounded-lg p-8 border border-accent-secondary/20">
              <h3 className="text-2xl font-bold mb-4 text-accent-secondary">Nossa Visão</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Ser a marca de e-commerce preferida pelos brasileiros que buscam qualidade premium, segurança nas compras e um atendimento que faz a diferença no seu dia a dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Nosso Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Ana Silva', role: 'Fundadora & CEO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
              { name: 'Carlos Santos', role: 'CTO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
              { name: 'Juliana Costa', role: 'Head de Atendimento', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
              { name: 'Marco Oliveira', role: 'Head de Operações', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="rounded-lg overflow-hidden mb-4 h-60 bg-muted">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Clientes Satisfeitos' },
              { number: '2M+', label: 'Produtos Vendidos' },
              { number: '98%', label: 'Taxa de Satisfação' },
              { number: '24/7', label: 'Suporte Disponível' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-accent text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Começar?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Explore nossos produtos premium e tenha a melhor experiência de compra
          </p>
          <Link
            to="/catalogo"
            className="inline-block px-8 py-4 bg-white text-accent rounded-lg font-semibold hover:bg-white/90 transition-all"
          >
            Explorar Catálogo
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
