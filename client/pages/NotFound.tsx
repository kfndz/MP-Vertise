import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-20 md:py-32">
        <div className="text-center">
          {/* 404 Illustration */}
          <div className="mb-12">
            <div className="inline-block">
              <div className="relative">
                <div className="text-8xl md:text-9xl font-black text-accent opacity-20">404</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-accent/10 rounded-full mx-auto mb-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Página Não Encontrada</h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Desculpe, a página que você está procurando não existe ou foi movida. Mas não se preocupe, estamos aqui para ajudá-lo a encontrar o que precisa.
          </p>

          {/* Quick Links */}
          <div className="mb-12 pt-8">
            <p className="text-muted-foreground mb-6 font-semibold">Explore nosso site</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all active:scale-95"
              >
                <Home className="w-5 h-5" />
                Ir para Início
              </Link>
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-foreground text-foreground rounded-lg font-semibold hover:bg-foreground hover:text-background transition-all"
              >
                <Search className="w-5 h-5" />
                Ver Catálogo
              </Link>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-auto">
            <h3 className="font-semibold mb-4">Páginas Populares</h3>
            <div className="space-y-3 text-sm">
              <Link to="/" className="block text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                Página Inicial
              </Link>
              <Link to="/catalogo" className="block text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                Produtos
              </Link>
              <Link to="/sobre" className="block text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                Sobre Nós
              </Link>
              <Link to="/contato" className="block text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                Fale Conosco
              </Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                Perguntas Frequentes
              </Link>
            </div>
          </div>

          {/* Search Help */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground mb-4">
              Não encontrou o que procura? Entre em contato com nosso suporte.
            </p>
            <Link
              to="/contato"
              className="inline-block text-accent font-semibold hover:underline"
            >
              Contate-nos →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
