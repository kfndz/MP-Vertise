import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-accent transition-colors">Início</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent font-medium">Política de Entrega</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-12">Política de Entrega</h1>

          <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Cobertura de Entrega</h2>
              <p>
                A Premium Store realiza entregas em todo o Brasil, incluindo capitais, cidades médias e pequenas. Alguns endereços remotos podem estar sujeitos a restrições ou prazos estendidos.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Prazos de Entrega</h2>
              <p>
                Os prazos são contados a partir da confirmação do pagamento e não incluem finais de semana e feriados:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Região Sudeste:</strong> 3-5 dias úteis</li>
                <li><strong>Região Sul:</strong> 5-7 dias úteis</li>
                <li><strong>Região Nordeste:</strong> 5-7 dias úteis</li>
                <li><strong>Região Centro-Oeste:</strong> 5-7 dias úteis</li>
                <li><strong>Região Norte:</strong> 7-10 dias úteis</li>
              </ul>
              <p className="mt-3 text-sm">*Prazos são estimativas e podem variar conforme a localidade.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Custos de Frete</h2>
              <p>
                O frete é calculado automaticamente durante o checkout com base no CEP e peso do pedido:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Frete Grátis:</strong> Compras acima de R$ 199</li>
                <li><strong>Frete com Desconto:</strong> Compras entre R$ 100 e R$ 199</li>
                <li><strong>Frete Normal:</strong> Compras abaixo de R$ 100</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Processamento do Pedido</h2>
              <p>
                Os pedidos são processados nos seguintes prazos:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Confirmação de pagamento: até 30 minutos</li>
                <li>Preparação do pedido: até 24 horas</li>
                <li>Despacho: até 24 horas após preparação</li>
                <li>Coleta pela transportadora: até 2 dias úteis</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Rastreamento</h2>
              <p>
                Após o despacho, você receberá um código de rastreamento por email. Poderá acompanhar seu pedido em tempo real através de:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Sua conta no site (seção Meus Pedidos)</li>
                <li>Email com código de rastreamento</li>
                <li>Site da transportadora</li>
                <li>WhatsApp com código do pedido</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Transportadoras</h2>
              <p>
                Utilizamos parcerias com as principais transportadoras brasileiras para garantir qualidade e confiabilidade:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Sedex (Correios)</li>
                <li>PAC (Correios)</li>
                <li>Loggi</li>
                <li>Melhor Envio</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Endereços de Entrega</h2>
              <p>
                Garantir dados precisos do endereço é responsabilidade do cliente:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>CEP completo e correto</li>
                <li>Rua, número e complemento</li>
                <li>Bairro e cidade</li>
                <li>Telefone de contato</li>
              </ul>
              <p className="mt-3">Erros no endereço podem atrasar a entrega. Verifique antes de confirmar o pedido.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Entrega em Múltiplos Endereços</h2>
              <p>
                Você pode dividir seu pedido entre múltiplos endereços. Cada endereço será tratado como um pedido separado com frete calculado individualmente.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Falha na Entrega</h2>
              <p>
                Caso a entrega falhe (endereço incorreto, sem recepção), a transportadora fará uma nova tentativa:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>1ª tentativa: contato para reagendamento</li>
                <li>2ª tentativa: nova data de entrega</li>
                <li>3ª tentativa: produto retorna ao depósito</li>
              </ul>
              <p className="mt-3">Após 3 tentativas, você pode solicitar reembolso ou regresso do produto.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Atrasos na Entrega</h2>
              <p>
                Embora raro, atrasos podem ocorrer por fatores fora de nosso controle:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Fenômenos naturais (chuva, neblina, inundação)</li>
                <li>Greves transportadoras</li>
                <li>Problemas em logística regional</li>
                <li>Eventos extraordinários</li>
              </ul>
              <p className="mt-3">Nestes casos, manteremos você informado e não somos responsáveis pelo atraso.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Dano na Entrega</h2>
              <p>
                Se o produto chegar danificado:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Fotografe a embalagem e o produto danificado</li>
                <li>Contate nosso suporte dentro de 48 horas</li>
                <li>Forneceremos reembolso ou troca</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Entrega em Caixas Postais</h2>
              <p>
                Não realizamos entregas em caixas postais (PO Box). Informe sempre um endereço residencial ou comercial completo.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Assinatura na Entrega</h2>
              <p>
                Alguns produtos podem exigir assinatura ou confirmação na entrega. O cliente deve estar disponível ou autorizar alguém em seu lugar.
              </p>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mt-8">
              <p className="text-sm">
                <strong>Última atualização:</strong> Janeiro de 2024
              </p>
              <p className="text-sm mt-2">
                Para dúvidas sobre entrega: entrega@premiumstore.com | (11) 3333-3333
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;
