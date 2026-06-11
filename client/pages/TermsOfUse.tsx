import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-accent transition-colors">Início</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent font-medium">Termos de Uso</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-12">Termos de Uso</h1>

          <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar o site da Premium Store, você concorda em estar vinculado a estes Termos de Uso. Se não concorda com qualquer parte destes termos, não continue usando o site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Uso Licenciado</h2>
              <p>
                É concedida a você uma licença limitada, não exclusiva e revogável para acessar e usar o site para fins pessoais e não comerciais. Você não pode:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Reproduzir ou distribuir conteúdo sem permissão</li>
                <li>Usar para fins comerciais sem autorização</li>
                <li>Tentar obter acesso não autorizado</li>
                <li>Causar dano ou interferir no funcionamento do site</li>
                <li>Usar de forma que viole leis aplicáveis</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Produtos e Preços</h2>
              <p>
                Fazemos nosso melhor para manter informações precisas sobre produtos e preços. Reservamos o direito de:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Corrigir erros nos preços anunciados</li>
                <li>Recusar ou cancelar pedidos devido a erros</li>
                <li>Alterar ou descontinuar produtos</li>
                <li>Limitar quantidades compradas</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Pagamento</h2>
              <p>
                Ao fazer um pedido, você autoriza cobrança no método de pagamento fornecido. Você garante que:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Tem direito legal de usar o método de pagamento</li>
                <li>As informações são precisas e atualizadas</li>
                <li>Não está envolvido em fraude</li>
                <li>Aceita todas as taxas e encargos</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Entrega</h2>
              <p>
                Os prazos de entrega são estimativas. A Premium Store não é responsável por atrasos causados por transportadoras, fenômenos naturais ou outros fatores fora de seu controle. Você assume o risco de perda uma vez que o produto é entregue à transportadora.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Devoluções e Trocas</h2>
              <p>
                Consulte nossa Política de Devoluções para informações completas. Em resumo:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>30 dias para devolver produtos não utilizados</li>
                <li>Frete de retorno é gratuito</li>
                <li>Reembolso processado em 7 dias úteis</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Conteúdo do Usuário</h2>
              <p>
                Ao enviar comentários, avaliações ou conteúdo para nosso site, você concede permissão para usarmos esse conteúdo. Você declara que:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>O conteúdo é original e de sua propriedade</li>
                <li>Não infringe direitos de terceiros</li>
                <li>Não é difamatório ou obsceno</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Isenção de Responsabilidade</h2>
              <p>
                O site é fornecido "como está" sem garantias. A Premium Store não se responsabiliza por:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Danos diretos, indiretos ou consequenciais</li>
                <li>Lucros cessantes ou perda de dados</li>
                <li>Interrupções de serviço</li>
                <li>Erros ou omissões no conteúdo</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitação de Responsabilidade</h2>
              <p>
                A responsabilidade total da Premium Store não excederá o valor pago por você em um pedido. Algumas jurisdições não permitem limitações de responsabilidade, portanto, este parágrafo pode não se aplicar a você.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Links Externos</h2>
              <p>
                Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelo conteúdo, precisão ou práticas desses sites. O acesso é por sua conta e risco.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo do site, incluindo textos, gráficos, logos e imagens, é propriedade da Premium Store ou de seus fornecedores. Protegido por leis de direitos autorais.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Alterações nos Termos</h2>
              <p>
                Reservamos o direito de alterar estes termos a qualquer momento. Continuando a usar o site após as alterações, você concorda com os novos termos.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Lei Aplicável</h2>
              <p>
                Estes termos são regidos pelas leis da República Federativa do Brasil, especificamente do Estado de São Paulo. Qualquer disputa será resolvida nos tribunais competentes.
              </p>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-6 mt-8">
              <p className="text-sm">
                <strong>Última atualização:</strong> Janeiro de 2024
              </p>
              <p className="text-sm mt-2">
                Para questões sobre estes Termos, entre em contato: termos@premiumstore.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
