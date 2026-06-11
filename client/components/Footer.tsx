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
                <h4 className="font-semibold mb-1">Compra Segura</h4>
                <p className="text-sm text-background/70">Transações criptografadas</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent-secondary rounded-lg flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Entrega Rápida</h4>
                <p className="text-sm text-background/70">Toda Brasil em até 7 dias</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent rounded-lg flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Produtos Selecionados</h4>
                <p className="text-sm text-background/70">Qualidade garantida</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent-secondary rounded-lg flex-shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Atendimento Humanizado</h4>
                <p className="text-sm text-background/70">Suporte 24/7</p>
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
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Carreiras</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Blog</a></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Imprensa</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-6">Produtos</h3>
            <ul className="space-y-3">
              <li><Link to="/categoria/tecnologia" className="text-background/70 hover:text-background transition-colors">Tecnologia</Link></li>
              <li><Link to="/categoria/casa" className="text-background/70 hover:text-background transition-colors">Casa</Link></li>
              <li><Link to="/categoria/bem-estar" className="text-background/70 hover:text-background transition-colors">Bem-estar</Link></li>
              <li><Link to="/categoria/utilidades" className="text-background/70 hover:text-background transition-colors">Utilidades</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-6">Suporte</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-background/70 hover:text-background transition-colors">Central de Ajuda</Link></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Rastrear Pedido</a></li>
              <li><Link to="/devolucoes" className="text-background/70 hover:text-background transition-colors">Devoluções</Link></li>
              <li><Link to="/contato" className="text-background/70 hover:text-background transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacidade" className="text-background/70 hover:text-background transition-colors">Privacidade</Link></li>
              <li><Link to="/termos" className="text-background/70 hover:text-background transition-colors">Termos de Uso</Link></li>
              <li><Link to="/entrega" className="text-background/70 hover:text-background transition-colors">Entrega</Link></li>
              <li><a href="#" className="text-background/70 hover:text-background transition-colors">Acessibilidade</a></li>
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
          <p className="text-sm text-background/70">© 2024 Premium Store. Todos os direitos reservados.</p>
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
