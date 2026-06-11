import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-accent transition-colors">Início</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent font-medium">Política de Privacidade</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-12">Política de Privacidade</h1>

          <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Informações que Coletamos</h2>
              <p>
                A Premium Store coleta informações pessoais que você fornece voluntariamente ao se registrar, fazer pedidos ou entrar em contato conosco. Essas informações podem incluir:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Nome, email e telefone</li>
                <li>Endereço de entrega e cobrança</li>
                <li>Dados de pagamento (processados com segurança)</li>
                <li>Histórico de compras e preferências</li>
                <li>Comentários e avaliações de produtos</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Como Usamos Suas Informações</h2>
              <p>Usamos suas informações para:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Processar e entregar seus pedidos</li>
                <li>Enviar confirmações e atualizações de entrega</li>
                <li>Responder a suas perguntas e suporte</li>
                <li>Melhorar nossos produtos e serviços</li>
                <li>Enviar promoções e newsletter (com consentimento)</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Compartilhamento de Informações</h2>
              <p>
                Não vendemos ou alugamos suas informações pessoais. Compartilhamos dados apenas com:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Transportadoras para entrega</li>
                <li>Processadores de pagamento autorizados</li>
                <li>Prestadores de serviço (suporte técnico, análise)</li>
                <li>Autoridades quando exigido por lei</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Segurança de Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas, administrativas e físicas para proteger seus dados:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Criptografia SSL 256 bits em todas as transmissões</li>
                <li>Conformidade com padrões PCI-DSS</li>
                <li>Acesso restrito a dados pessoais</li>
                <li>Auditorias de segurança regulares</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cookies</h2>
              <p>
                Utilizamos cookies para melhorar sua experiência de navegação. Você pode controlar cookies através das configurações do seu navegador. Alguns cookies são essenciais para o funcionamento do site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Seus Direitos</h2>
              <p>Você tem o direito de:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir informações incorretas</li>
                <li>Solicitar exclusão de dados</li>
                <li>Optar por não receber marketing</li>
                <li>Receber uma cópia de seus dados</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Retenção de Dados</h2>
              <p>
                Mantemos seus dados pessoais pelo tempo necessário para fornecer serviços, cumprir obrigações legais e resolver disputas. Após esse período, os dados são excluídos ou anonimizados.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contato</h2>
              <p>
                Se tiver perguntas sobre esta política, entre em contato conosco:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Email: privacidade@premiumstore.com</li>
                <li>Telefone: (11) 3333-3333</li>
                <li>WhatsApp: (11) 99999-9999</li>
              </ul>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mt-8">
              <p className="text-sm">
                <strong>Última atualização:</strong> Janeiro de 2024
              </p>
              <p className="text-sm mt-2">
                Reservamos o direito de atualizar esta política a qualquer momento. Notificaremos você sobre mudanças materiais.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
