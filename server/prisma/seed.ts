import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      name: "Moda & Estilo",
      slug: "moda-acessorios",
      description: "Roupas e acessórios para todas as ocasiões",
    },
    {
      name: "Beleza & Cuidados Pessoais",
      slug: "saude-beleza",
      description: "Produtos para sua rotina de autocuidado",
    },
    {
      name: "Casa & Decoração",
      slug: "casa",
      description: "Tudo para deixar seu lar aconchegante",
    },
    {
      name: "Utilidades",
      slug: "utilidades",
      description: "Praticidade e inovação para o seu dia a dia",
    },
    {
      name: "Esporte e Fitness",
      slug: "esporte-fitness",
      description: "Itens para treinos e rotina ativa",
    },
    {
      name: "Tecnologia",
      slug: "tecnologia",
      description: "Gadgets e acessórios inovadores",
    },
    {
      name: "Pet Shop",
      slug: "pet-shop",
      description: "Essenciais para o cuidado do pet",
    },
    {
      name: "Automotivo",
      slug: "automotivo",
      description: "Proteção e organização para o carro",
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
      },
      create: category,
    });
  }

  const existingCategories = await prisma.category.findMany();

  const subcategoriesByCategory: Record<
    string,
    Array<{ name: string; slug: string }>
  > = {
    "moda-acessorios": [
      { name: "Relógios", slug: "relogios" },
      { name: "Bolsas", slug: "bolsas" },
      { name: "Carteiras", slug: "carteiras" },
      { name: "Óculos", slug: "oculos" },
    ],
    "saude-beleza": [
      { name: "Cuidados Pessoais", slug: "cuidados-pessoais" },
      { name: "Cosméticos", slug: "cosmeticos" },
      { name: "Bem-estar", slug: "bem-estar" },
      { name: "Higiene", slug: "higiene" },
    ],
    casa: [
      { name: "Cozinha", slug: "cozinha" },
      { name: "Decoração", slug: "decoracao" },
      { name: "Organização", slug: "organizacao" },
      { name: "Limpeza", slug: "limpeza" },
    ],
    utilidades: [
      { name: "Organizadores", slug: "organizadores" },
      { name: "Ferramentas", slug: "ferramentas" },
    ],
    "esporte-fitness": [
      { name: "Musculação", slug: "musculacao" },
      { name: "Corrida", slug: "corrida" },
      { name: "Yoga", slug: "yoga" },
      { name: "Acessórios", slug: "acessorios-esporte" },
    ],
    tecnologia: [
      { name: "Smartphones", slug: "smartphones" },
      { name: "Informática", slug: "informatica" },
      { name: "Áudio", slug: "audio" },
      { name: "Smart Home", slug: "smart-home" },
      { name: "Acessórios", slug: "acessorios-tech" },
    ],
    "pet-shop": [
      { name: "Cães", slug: "caes" },
      { name: "Gatos", slug: "gatos" },
      { name: "Brinquedos", slug: "brinquedos-pet" },
      { name: "Higiene", slug: "higiene-pet" },
    ],
    automotivo: [
      { name: "Interior", slug: "interior" },
      { name: "Exterior", slug: "exterior" },
      { name: "Acessórios", slug: "acessorios-auto" },
      { name: "Organização", slug: "organizacao-auto" },
    ],
  };

  for (const category of existingCategories) {
    for (const subcategory of subcategoriesByCategory[category.slug] ?? []) {
      await prisma.subcategory.upsert({
        where: {
          categoryId_slug: {
            categoryId: category.id,
            slug: subcategory.slug,
          },
        },
        update: {
          name: subcategory.name,
        },
        create: {
          categoryId: category.id,
          name: subcategory.name,
          slug: subcategory.slug,
        },
      });
    }
  }

  const tecnologia = await prisma.category.findUnique({
    where: { slug: "tecnologia" },
  });

  const audio = tecnologia
    ? await prisma.subcategory.findFirst({
        where: {
          categoryId: tecnologia.id,
          slug: "audio",
        },
      })
    : null;

  const beleza = await prisma.category.findUnique({
    where: { slug: "saude-beleza" },
  });

  const cosmeticos = beleza
    ? await prisma.subcategory.findFirst({
        where: {
          categoryId: beleza.id,
          slug: "cosmeticos",
        },
      })
    : null;

  if (tecnologia) {
    await prisma.product.upsert({
      where: { slug: "fone-bluetooth-premium" },
      update: {},
      create: {
        name: "Fone Bluetooth Premium",
        slug: "fone-bluetooth-premium",
        description:
          "Fone bluetooth selecionado para quem busca qualidade de áudio, conforto e bom custo-benefício.",
        brand: "Premium Audio",
        price: 149.9,
        originalPrice: 199.9,
        affiliateUrl: "https://example.com/afiliado-fone",
        marketplace: "Amazon",
        image: "/images/fone.png",
        rating: 4.8,
        reviewCount: 324,
        stock: 0,
        featured: true,
        isOffer: true,
        isBestSeller: true,
        badge: "Mais vendido",
        categoryId: tecnologia.id,
        subcategoryId: audio?.id ?? null,
      },
    });
  }

  if (beleza) {
    await prisma.product.upsert({
      where: { slug: "kit-beleza-cuidados-diarios" },
      update: {},
      create: {
        name: "Kit Beleza Cuidados Diários",
        slug: "kit-beleza-cuidados-diarios",
        description:
          "Produto de beleza selecionado para rotina de cuidados pessoais.",
        brand: "Beauty Care",
        price: 89.9,
        originalPrice: 119.9,
        affiliateUrl: "https://example.com/afiliado-beleza",
        marketplace: "Shopee",
        image: "/images/produtos-beleza-image.png",
        rating: 4.7,
        reviewCount: 218,
        stock: 0,
        featured: true,
        isOffer: true,
        isBestSeller: false,
        badge: "Oferta",
        categoryId: beleza.id,
        subcategoryId: cosmeticos?.id ?? null,
      },
    });
  }

  console.log("Seed concluído com sucesso.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });