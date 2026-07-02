import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Tecnologia", slug: "tecnologia", description: "Gadgets e acessórios inovadores" },
    { name: "Casa", slug: "casa", description: "Decoração e utilidades para o lar" },
    { name: "Moda e Acessórios", slug: "moda-acessorios", description: "Peças e acessórios para o estilo" },
    { name: "Saúde e Beleza", slug: "saude-beleza", description: "Produtos para bem-estar e beleza" },
    { name: "Esporte e Fitness", slug: "esporte-fitness", description: "Itens para treino e rotina ativa" },
    { name: "Pet Shop", slug: "pet-shop", description: "Essenciais para o cuidado do pet" },
    { name: "Automotivo", slug: "automotivo", description: "Proteção e organização para o carro" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  const existingCategories = await prisma.category.findMany();

  const subcategoriesByCategory: Record<string, Array<{ name: string; slug: string }>> = {
    tecnologia: [
      { name: "Áudio", slug: "audio" },
      { name: "Smart Home", slug: "smart-home" },
      { name: "Acessórios", slug: "acessorios-tech" },
    ],
    casa: [
      { name: "Cozinha", slug: "cozinha" },
      { name: "Decoração", slug: "decoracao" },
      { name: "Organização", slug: "organizacao" },
    ],
    "moda-acessorios": [
      { name: "Relógios", slug: "relogios" },
      { name: "Bolsas", slug: "bolsas" },
      { name: "Óculos", slug: "oculos" },
    ],
    "saude-beleza": [
      { name: "Bem-estar", slug: "bem-estar" },
      { name: "Cosméticos", slug: "cosmeticos" },
      { name: "Higiene", slug: "higiene" },
    ],
    "esporte-fitness": [
      { name: "Yoga", slug: "yoga" },
      { name: "Musculação", slug: "musculacao" },
      { name: "Corrida", slug: "corrida" },
    ],
    "pet-shop": [
      { name: "Higiene", slug: "higiene-pet" },
      { name: "Brinquedos", slug: "brinquedos-pet" },
      { name: "Cães", slug: "caes" },
    ],
    automotivo: [
      { name: "Interior", slug: "interior" },
      { name: "Exterior", slug: "exterior" },
      { name: "Acessórios", slug: "acessorios-auto" },
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
        update: {},
        create: {
          categoryId: category.id,
          name: subcategory.name,
          slug: subcategory.slug,
        },
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
