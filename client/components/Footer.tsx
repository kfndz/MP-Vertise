import { Heart, Truck, Lock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Trust Elements */}
      <div className="border-b border-background/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent rounded-lg flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Economia Inteligente</h4>
                <p className="text-sm text-background/70">Reunimos as melhores ofertas, promoções reais das grandes lojas em um só lugar.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent-secondary rounded-lg flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Lojas Oficiais</h4>
                <p className="text-sm text-background/70">Você é redirecionado para concluir a compra comm a estrutura e a segurança das maiores plataformas do país. </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent rounded-lg flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Curadoria Rigorosa</h4>
                <p className="text-sm text-background/70">Filtramos apenas produtos bem avaliados, com selo de segurança e estoques verificados contra golpes. </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent-secondary rounded-lg flex-shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Compra 100% Segura</h4>
                <p className="text-sm text-background/70">Seus dados de pagamento e cadastro ficam totalmente protegidos dentro do ambiente da loja oficial escolhida. </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-6">Empresa</h3>
            <ul className="space-y-3">
              <li><Link to="/sobre" className="text-background/70 hover:text-background transition-colors">Sobre nós</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-6">Categorias </h3>
            <ul className="space-y-3">
              <li><Link to="/categoria/moda-acessorios" className="text-background/70 hover:text-background transition-colors">Moda & Estilo </Link></li>
              <li><Link to="/categoria/saude-beleza" className="text-background/70 hover:text-background transition-colors">Beleza & Cuidados pessoais</Link></li>
              <li><Link to="/categoria/casa" className="text-background/70 hover:text-background transition-colors">Casa & Decoração</Link></li>
              <li><Link to="/categoria/utilidades" className="text-background/70 hover:text-background transition-colors">Utilidades</Link></li>
              <li><Link to="/categoria/esporte-fitness" className="text-background/70 hover:text-background transition-colors">Esporte & Fitness</Link></li>
              <li><Link to="/categoria/saude-beleza" className="text-background/70 hover:text-background transition-colors">Saúde & Bem-estar</Link></li>
              <li><Link to="/categoria/tecnologia" className="text-background/70 hover:text-background transition-colors">Tecnologia & Gadgets</Link></li>
              <li><Link to="/categoria/pet-shop" className="text-background/70 hover:text-background transition-colors">Pet Shop</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-6">Suporte</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-background/70 hover:text-background transition-colors">FAQ (Perguntas Frequentes) </Link></li>
              <li><Link to="/contato" className="text-background/70 hover:text-background transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacidade" className="text-background/70 hover:text-background transition-colors">Privacidade</Link></li>
              <li><Link to="/termos" className="text-background/70 hover:text-background transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-6">Conectar</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-background/20 rounded-lg hover:bg-accent transition-colors flex items-center justify-center text-sm font-semibold">
                @
              </a>
              <a href="#" className="w-10 h-10 bg-background/20 rounded-lg hover:bg-accent transition-colors flex items-center justify-center text-sm font-semibold">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-background/20 rounded-lg hover:bg-accent transition-colors flex items-center justify-center text-sm font-semibold">
                in
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/70">© 2026 MP Vertise. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <span className="text-xs text-background/50">Segurança SSL</span>
            <span className="text-xs text-background/50">Compra Protegida</span>
            <span className="text-xs text-background/50">Privacidade</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
