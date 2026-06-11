import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronRight, Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
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
            <span className="text-accent font-medium">Contato</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-20 border-b border-border bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Fale Conosco</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos aqui para ajudar. Entre em contato através do formulário, WhatsApp, email ou telefone
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">Responderemos em até 24 horas</p>
              <a href="mailto:contato@premiumstore.com" className="text-accent font-semibold hover:underline">
                contato@premiumstore.com
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-accent-secondary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-accent-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
              <p className="text-muted-foreground mb-4">Resposta imediata durante horário comercial</p>
              <a href="https://wa.me/5511999999999" className="text-accent-secondary font-semibold hover:underline">
                (11) 99999-9999
              </a>
            </div>

            {/* Phone */}
            <div className="bg-card border border-border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Telefone</h3>
              <p className="text-muted-foreground mb-4">Seg-Sex: 9h às 18h</p>
              <a href="tel:1133333333" className="text-accent font-semibold hover:underline">
                (11) 3333-3333
              </a>
            </div>
          </div>

          {/* Contact Form and Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Envie uma Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nome</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Assunto</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="pedido">Dúvida sobre Pedido</option>
                    <option value="produto">Informação do Produto</option>
                    <option value="entrega">Rastreamento de Entrega</option>
                    <option value="devolucao">Devolução/Troca</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Mensagem</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all active:scale-95"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8">Informações de Contato</h2>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-4 bg-accent/10 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Endereço</h4>
                    <p className="text-muted-foreground">
                      Avenida Paulista, 1000<br />
                      São Paulo, SP 01312-100<br />
                      Brasil
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-4 bg-accent-secondary/10 rounded-lg flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Horário de Funcionamento</h4>
                    <p className="text-muted-foreground">
                      Segunda a Sexta: 9h às 18h<br />
                      Sábado: 10h às 14h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="border-t border-border pt-8">
                <h3 className="font-semibold mb-4">Outras Dúvidas?</h3>
                <p className="text-muted-foreground mb-4">Confira nossa página de perguntas frequentes</p>
                <Link
                  to="/faq"
                  className="inline-block px-6 py-2 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-all"
                >
                  Ver FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
