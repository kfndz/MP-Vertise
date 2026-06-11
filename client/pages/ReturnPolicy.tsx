import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-accent transition-colors">Início</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent font-medium">Política de Trocas e Devoluções</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-12">Política de Trocas e Devoluções</h1>

          <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Período de Devolução</h2>
              <p>
                Você tem 30 dias corridos a partir da data de recebimento do produto para solicitar devolução ou troca. Após este período, não será possível fazer devoluções.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Condições para Devoluções Aceitas</h2>
              <p>
                Para que sua devolução seja aceita, o produto deve estar:
              </p>
              <div className="space-y-3 mt-3">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Não utilizado ou apenas testado</p>
                    <p className="text-sm">Sem sinais de uso ou desgaste</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Com embalagem original</p>
                    <p className="text-sm">Completamente intacta e todas as caixas</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Com acessórios e documentos</p>
                    <p className="text-sm">Todos os cabos, adaptadores e manuais</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Com garantia válida</p>
                    <p className="text-sm">Dentro do período de devolução de 30 dias</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Produtos NÃO Elegíveis para Devolução</h2>
              <p>
                Os seguintes produtos não podem ser devolvidos:
              </p>
              <div className="space-y-3 mt-3">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Produtos personalizados ou sob encomenda</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Produtos usados, danificados ou sujos</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Cosméticos e higiene pessoal abertos</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Eletrônicos com defeito causado pelo uso</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Itens em promoção final ou clearance</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Processo de Devolução</h2>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>Acesse sua conta e clique em "Meus Pedidos"</li>
                <li>Selecione o produto que deseja devolver</li>
                <li>Clique em "Solicitar Devolução"</li>
                <li>Escolha o motivo (defeito, não atendeu expectativas, etc.)</li>
                <li>Imprima a etiqueta de retorno fornecida</li>
                <li>Embale o produto com segurança</li>
                <li>Cole a etiqueta na embalagem</li>
                <li>Leve a qualquer agência da transportadora</li>
                <li>Você receberá um comprovante</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Frete de Devolução</h2>
              <p>
                A Premium Store paga 100% do frete de devolução! Você recebe uma etiqueta de postagem gratuita. Basta levar ao ponto de coleta mais próximo.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Inspeção de Devolução</h2>
              <p>
                Ao recebermos seu produto, realizaremos uma inspeção para verificar se atende aos critérios de aceitação. Este processo leva até 5 dias úteis.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Reembolso</h2>
              <p>
                Se sua devolução for aceita, o reembolso é processado em até 7 dias úteis após a inspeção. O valor será creditado no método de pagamento original:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong>Cartão de Crédito:</strong> 3-7 dias úteis (conforme banco)</li>
                <li><strong>PIX:</strong> 1-3 dias úteis</li>
                <li><strong>Boleto:</strong> Novo boleto para reembolso</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Trocas</h2>
              <p>
                Oferecemos trocas gratuitas para mudança de tamanho, cor ou modelo. O processo é o mesmo da devolução, mas você escolhe qual produto deseja receber.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Frete da devolução: Grátis</li>
                <li>Frete do novo produto: Grátis</li>
                <li>Prazo: até 15 dias úteis</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Defeitos de Fábrica</h2>
              <p>
                Se receber um produto com defeito de fábrica, você tem direito a:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Devolução dentro de 1 ano</li>
                <li>Sem necessidade de manter embalagem original (apenas proteger o produto)</li>
                <li>Frete totalmente grátis</li>
                <li>Reembolso ou troca rápida</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Garantia</h2>
              <p>
                Todos os produtos têm garantia de 1 ano contra defeitos de fábrica. A garantia cobre:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Vícios de fabricação</li>
                <li>Defeitos não causados pelo uso</li>
                <li>Problemas técnicos comprovados</li>
              </ul>
              <p className="mt-3">A garantia NÃO cobre:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Dano por queda ou impacto</li>
                <li>Contato com água ou líquidos</li>
                <li>Desgaste natural pelo uso</li>
                <li>Falta de uso conforme manual</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Condições Especiais</h2>
              <p>
                Alguns produtos podem ter políticas especiais:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Eletrônicos: 15 dias para devolução (produto não deve ter sido ligado)</li>
                <li>Vestuário: Deve estar sem uso, sem marcas de suor</li>
                <li>Perecíveis: Não aceitamos devolução</li>
                <li>Alimentos: Devem estar dentro da validade</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Reclamações e Disputas</h2>
              <p>
                Se sua devolução for recusada, você poderá:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Solicitar revisão da decisão</li>
                <li>Contatar nosso suporte com fotos</li>
                <li>Usar sistema de mediação</li>
              </ul>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mt-8">
              <p className="text-sm">
                <strong>Última atualização:</strong> Janeiro de 2024
              </p>
              <p className="text-sm mt-2">
                Para dúvidas sobre devoluções: devolucoes@premiumstore.com | (11) 3333-3333
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReturnPolicy;
