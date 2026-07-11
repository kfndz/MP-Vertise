# MP Vertise

Plataforma responsiva de curadoria e divulgação de produtos afiliados, com catálogo público, busca, favoritos e painel administrativo para gerenciamento de produtos.

## Visão geral

A MP Vertise reúne produtos selecionados de diferentes marketplaces em uma experiência única de navegação. O visitante pode explorar categorias, pesquisar produtos, salvar favoritos e acessar a loja parceira por meio do link de afiliado.

O sistema não processa pagamentos ou pedidos. A compra é concluída diretamente no marketplace responsável pela venda.

## Funcionalidades

- Home responsiva com carrossel e categorias em destaque
- Catálogo com busca, filtros e ordenação
- Páginas de categoria e subcategoria
- Página individual de produto
- Produtos relacionados
- Favoritos salvos no navegador
- Estados de carregamento, erro e catálogo vazio
- Painel administrativo protegido
- Cadastro, edição e exclusão de produtos
- Upload e visualização de imagens
- API própria integrada ao banco de dados
- SEO básico, sitemap, robots.txt e web manifest
- Layout adaptado para celular, tablet e desktop

## Tecnologias

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Radix UI
- Lucide React

### Backend e dados

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Neon
- JWT
- bcrypt

### Infraestrutura

- Git e GitHub
- Vercel
- GitHub Codespaces

## Arquitetura simplificada

```text
Usuário
  ↓
React
  ↓
Services
  ↓
API
  ↓
Prisma
  ↓
PostgreSQL / Neon
```

## Requisitos

- Node.js 20 ou superior
- pnpm 10 ou superior
- Banco PostgreSQL
- Variáveis de ambiente configuradas conforme `.env.example`

## Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd MP-Vertise
```

Instale as dependências:

```bash
pnpm install
```

Crie o arquivo local de variáveis de ambiente:

```bash
cp .env.example .env
```

Preencha o `.env` com os valores do seu ambiente.

Gere o Prisma Client:

```bash
pnpm prisma:generate
```

Inicie o projeto:

```bash
pnpm dev
```

A aplicação ficará disponível, por padrão, em:

```text
http://localhost:8080
```

## Scripts

```bash
pnpm dev
```

Inicia o ambiente de desenvolvimento.

```bash
pnpm typecheck
```

Executa a verificação de tipos do TypeScript.

```bash
pnpm test
```

Executa os testes com Vitest.

```bash
pnpm build
```

Gera os builds do frontend e do servidor.

```bash
pnpm start
```

Inicia o servidor a partir do build de produção.

```bash
pnpm format.fix
```

Formata os arquivos do projeto com Prettier.

```bash
pnpm prisma:migrate
```

Cria e aplica migrations do Prisma no ambiente de desenvolvimento.

```bash
pnpm prisma:seed
```

Executa o seed do banco de dados.

## Estrutura principal

```text
MP-Vertise/
├── api/
├── client/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   ├── types/
│   └── utils/
├── public/
├── server/
├── shared/
├── scripts/
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Variáveis de ambiente

O projeto utiliza variáveis de ambiente para banco de dados, autenticação e configurações de produção.

Use o arquivo `.env.example` como referência e nunca envie o arquivo `.env` para o GitHub.

## Produção

Antes de publicar:

```bash
pnpm typecheck
pnpm build
```

O deploy atual utiliza a Vercel. As variáveis de ambiente devem ser cadastradas no painel da plataforma.

## Segurança

- O painel administrativo exige autenticação.
- Senhas não devem ser armazenadas em texto puro.
- Segredos e credenciais devem permanecer somente em variáveis de ambiente.
- Arquivos `.env` são ignorados pelo Git.
- As páginas administrativas recebem instrução `noindex`.

## Modelo de negócio

A MP Vertise funciona como uma plataforma de afiliados. Os produtos são divulgados no catálogo e o visitante é redirecionado para o marketplace parceiro, onde pagamento, entrega, troca e devolução são processados.

## Versão

**MP Vertise v1.0.0**

Primeiro commit do projeto: 11 de junho de 2026.

## Autor

Desenvolvido por **Kauã Fernandez**.
