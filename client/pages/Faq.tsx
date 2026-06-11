import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Faq = () => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    entrega: true,
    pagamento: false,
    pedidos: false,
    devolucao: false,
    produtos: false,
    seguranca: false,
  });

  const [expandedFaq, setExpandedFaq] = useState<Record<string, boolean>>({});

  const faqData = {
    entrega: {
      title: 'Entrega',
      faqs: [
        {
          id: 'entrega-1',
          question: 'Como funciona a entrega?',
          answer: 'Oferecemos envio para todo o Brasil. A entrega é feita dentro de 7 dias úteis. Frete grátis para compras acima de R$199. Você receberá um código de rastreamento para acompanhar seu pedido em tempo real.',
        },
        {
          id: 'entrega-2',
          question: 'Qual é o prazo de entrega para minha região?',
          answer: 'O prazo varia conforme a região. Geralmente é de 5-7 dias úteis. Para cidades mais afastadas, pode levar até 10 dias úteis. Você verá a estimativa exata ao finalizar a compra.',
        },
        {
          id: 'entrega-3',
          question: 'Como posso rastrear meu pedido?',
          answer: 'Após confirmar o pagamento, você receberá um email com o código de rastreamento. Acesse a seção "Meus Pedidos" ou use o código na página de rastreamento. Também pode acompanhar via WhatsApp.',
        },
        {
          id: 'entrega-4',
          question: 'Entregam em cidades pequenas?',
          answer: 'Sim! Entregamos em qualquer município do Brasil através de parcerias com as principais transportadoras. O frete pode variar conforme a localização.',
        },
      ],
    },
    pagamento: {
      title: 'Pagamento',
      faqs: [
        {
          id: 'pagamento-1',
          question: 'Quais formas de pagamento vocês aceitam?',
          answer: 'Aceitamos cartão de crédito (Visa, Mastercard, Elo, American Express), cartão de débito, PIX e boleto bancário. Também oferecemos parcelamento de até 12 vezes sem juros no cartão.',
        },
        {
          id: 'pagamento-2',
          question: 'Como funciona o parcelamento?',
          answer: 'Oferecemos parcelamento de até 12 vezes sem juros no cartão de crédito. Cada parcela será cobrada na data do seu vencimento. O PIX oferece descontos especiais!',
        },
        {
          id: 'pagamento-3',
          question: 'Meu pagamento foi rejeitado, o que faço?',
          answer: 'Verifique se seus dados estão corretos, o limite disponível do cartão e a data de validade. Se o problema persistir, entre em contato com seu banco ou tente outra forma de pagamento.',
        },
        {
          id: 'pagamento-4',
          question: 'Posso pagar com outra pessoa?',
          answer: 'Sim, você pode usar um cartão ou PIX de outra pessoa. Certifique-se de que tem autorização para usar esse meio de pagamento.',
        },
      ],
    },
    pedidos: {
      title: 'Pedidos',
      faqs: [
        {
          id: 'pedidos-1',
          question: 'Como acompanhar meu pedido?',
          answer: 'Acesse sua conta e clique em "Meus Pedidos". Lá você verá o status de todos os seus pedidos. Você também pode usar o código de rastreamento enviado por email.',
        },
        {
          id: 'pedidos-2',
          question: 'Posso modificar ou cancelar um pedido?',
          answer: 'Se o pedido ainda não foi despachado, podemos modificar ou cancelar. Entre em contato conosco por WhatsApp, telefone ou email assim que possível. Após o despacho, será necessário fazer uma devolução.',
        },
        {
          id: 'pedidos-3',
          question: 'Quanto tempo leva para confirmar o pedido?',
          answer: 'A confirmação é imediata após a aprovação do pagamento. O pedido é preparado e despachado em até 24 horas. Você receberá notificação por email e SMS.',
        },
        {
          id: 'pedidos-4',
          question: 'Posso escolher a data de entrega?',
          answer: 'Não oferecemos escolha de data exata, mas você pode ver o prazo estimado ao finalizar a compra. Para necessidades especiais, entre em contato com nosso suporte.',
        },
      ],
    },
    devolucao: {
      title: 'Devolução & Troca',
      faqs: [
        {
          id: 'devolucao-1',
          question: 'Qual é a política de devolução?',
          answer: 'Você tem até 30 dias para devolver um produto em perfeitas condições, com embalagem original. Oferecemos reembolso total ou troca pelo produto que desejar.',
        },
        {
          id: 'devolucao-2',
          question: 'Como faço uma devolução?',
          answer: 'Acesse "Meus Pedidos", selecione o produto e clique em "Solicitar Devolução". Imprima a etiqueta de postagem e leve para a transportadora. O reembolso é processado em até 7 dias úteis após recebermos.',
        },
        {
          id: 'devolucao-3',
          question: 'Quem paga pelo frete da devolução?',
          answer: 'Nós pagamos pelo frete da devolução! Você recebe uma etiqueta de postagem gratuita. Basta levar ao ponto de coleta mais próximo.',
        },
        {
          id: 'devolucao-4',
          question: 'Posso trocar por outro tamanho ou cor?',
          answer: 'Sim! Oferecemos troca gratuita. Selecione "Trocar" ao invés de "Devolver" e escolha o novo produto. O frete é por nossa conta.',
        },
      ],
    },
    produtos: {
      title: 'Produtos',
      faqs: [
        {
          id: 'produtos-1',
          question: 'Os produtos são originais?',
          answer: 'Sim! Todos os nossos produtos são originais e vêm de fornecedores autorizados. Oferecemos garantia de autenticidade em todos os itens.',
        },
        {
          id: 'produtos-2',
          question: 'Os produtos têm garantia?',
          answer: 'Sim! Todos os produtos têm garantia de 1 ano contra defeitos de fabricação. A garantia é válida mediante apresentação da nota fiscal.',
        },
        {
          id: 'produtos-3',
          question: 'Como saber se um produto está em estoque?',
          answer: 'Na página do produto, você verá "Em Estoque" ou "Fora de Estoque". Se não está disponível, você pode solicitar notificação para quando chegar.',
        },
        {
          id: 'produtos-4',
          question: 'Vocês têm produtos similares mais baratos?',
          answer: 'Nossa seleção prioriza qualidade. Se encontrar um preço menor em outro lugar, entre em contato - podemos analisar uma igualdade de preço para produtos idênticos.',
        },
      ],
    },
    seguranca: {
      title: 'Segurança',
      faqs: [
        {
          id: 'seguranca-1',
          question: 'Meus dados estão seguros?',
          answer: 'Sim! Usamos criptografia SSL de 256 bits para proteger todos os dados. Seguimos as normas PCI-DSS de segurança de pagamento.',
        },
        {
          id: 'seguranca-2',
          question: 'Minhas informações serão compartilhadas?',
          answer: 'Nunca compartilhamos seus dados com terceiros sem consentimento. Veja nossa política de privacidade para mais detalhes.',
        },
        {
          id: 'seguranca-3',
          question: 'O site é seguro para comprar?',
          answer: 'Sim! Temos certificado de segurança, proteção contra fraude e todas as transações são criptografadas. Confie na gente!',
        },
        {
          id: 'seguranca-4',
          question: 'Como protejo minha conta?',
          answer: 'Use uma senha forte com letras, números e símbolos. Não compartilhe suas credenciais. Faça logout ao usar computadores públicos.',
        },
      ],
    },
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  };

  const toggleFaq = (id: string) => {
    setExpandedFaq({
      ...expandedFaq,
      [id]: !expandedFaq[id],
    });
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
            <span className="text-accent font-medium">FAQ</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-20 border-b border-border bg-gradient-to-br from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Perguntas Frequentes</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Encontre respostas para as questões mais comuns sobre compra, entrega, pagamento e mais
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {Object.entries(faqData).map(([categoryKey, category]) => (
              <div key={categoryKey} className="border border-border rounded-lg overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(categoryKey)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors bg-card"
                >
                  <h2 className="text-lg font-semibold">{category.title}</h2>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      expandedCategories[categoryKey] ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* FAQs */}
                {expandedCategories[categoryKey] && (
                  <div className="border-t border-border">
                    {category.faqs.map((faq, idx) => (
                      <div key={faq.id} className={idx > 0 ? 'border-t border-border' : ''}>
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                        >
                          <span className="font-medium">{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 flex-shrink-0 transition-transform ${
                              expandedFaq[faq.id] ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {expandedFaq[faq.id] && (
                          <div className="px-6 py-4 bg-muted/30 text-muted-foreground">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-16 p-8 bg-gradient-to-r from-accent/10 to-accent-secondary/10 border border-accent/20 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-3">Ainda tem dúvidas?</h3>
            <p className="text-muted-foreground mb-6">
              Nosso time de suporte está pronto para ajudar!
            </p>
            <Link
              to="/contato"
              className="inline-block px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Faq;
