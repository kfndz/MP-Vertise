import {
  Shirt,
  Heart,
  Home,
  Utensils,
  Dumbbell,
  Smartphone,
  PawPrint,
  Settings,
  LucideIcon,
} from "lucide-react";

export type Subcategory = {
  id: string;
  name: string;
  slug: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  subcategories: Subcategory[];
};

export const categories: Category[] = [
  {
    id: "moda-acessorios",
    name: "Moda & Estilo",
    slug: "moda-acessorios",
    description: "Roupas, acessórios e tendências de moda",
    icon: Shirt,
    subcategories: [
      { id: "relogios", name: "Relógios", slug: "relogios" },
      { id: "bolsas", name: "Bolsas", slug: "bolsas" },
      { id: "carteiras", name: "Carteiras", slug: "carteiras" },
      { id: "oculos", name: "Óculos", slug: "oculos" },
      { id: "joias", name: "Joias", slug: "joias" },
      { id: "colares", name: "Colares", slug: "colares" },
      { id: "correntes", name: "Correntes", slug: "correntes" },
      { id: "pulseiras", name: "Pulseiras", slug: "pulseiras" },
      { id: "aneis", name: "Anéis", slug: "aneis" },
      { id: "brincos", name: "Brincos", slug: "brincos" },
    ],
  },
  {
    id: "saude-beleza",
    name: "Beleza & Cuidados Pessoais",
    slug: "saude-beleza",
    description: "Maquiagem, perfumes, cosméticos e produtos de autocuidado",
    icon: Heart,
    subcategories: [
      { id: "cuidados-pessoais", name: "Cuidados Pessoais", slug: "cuidados-pessoais" },
      { id: "cosmeticos", name: "Cosméticos", slug: "cosmeticos" },
      { id: "bem-estar", name: "Bem-estar", slug: "bem-estar" },
      { id: "higiene", name: "Higiene", slug: "higiene" },
    ],
  },
  {
    id: "casa",
    name: "Casa & Decoração",
    slug: "casa",
    description: "Móveis, decoração e utensílios para o seu lar",
    icon: Home,
    subcategories: [
      { id: "cozinha", name: "Cozinha", slug: "cozinha" },
      { id: "decoracao", name: "Decoração", slug: "decoracao" },
      { id: "organizacao", name: "Organização", slug: "organizacao" },
      { id: "limpeza", name: "Limpeza", slug: "limpeza" },
    ],
  },
  {
    id: "utilidades",
    name: "Utilidades",
    slug: "utilidades",
    description: "Produtos úteis e práticos para o dia a dia",
    icon: Utensils,
    subcategories: [
      { id: "organizadores", name: "Organizadores", slug: "organizadores" },
      { id: "ferramentas", name: "Ferramentas", slug: "ferramentas" },
    ],
  },
  {
    id: "esporte-fitness",
    name: "Esporte e Fitness",
    slug: "esporte-fitness",
    description: "Produtos para treinos, esportes e rotina ativa",
    icon: Dumbbell,
    subcategories: [
      { id: "musculacao", name: "Musculação", slug: "musculacao" },
      { id: "corrida", name: "Corrida", slug: "corrida" },
      { id: "yoga", name: "Yoga", slug: "yoga" },
      { id: "acessorios-esporte", name: "Acessórios", slug: "acessorios-esporte" },
    ],
  },
  {
    id: "tecnologia",
    name: "Tecnologia",
    slug: "tecnologia",
    description: "Smartphones, notebooks, acessórios e gadgets",
    icon: Smartphone,
    subcategories: [
      { id: "smartphones", name: "Smartphones", slug: "smartphones" },
      { id: "informatica", name: "Informática", slug: "informatica" },
      { id: "audio", name: "Áudio", slug: "audio" },
      { id: "smart-home", name: "Smart Home", slug: "smart-home" },
      { id: "acessorios-tech", name: "Acessórios", slug: "acessorios-tech" },
    ],
  },
  {
    id: "pet-shop",
    name: "Pet Shop",
    slug: "pet-shop",
    description: "Produtos para cuidado e bem-estar do seu pet",
    icon: PawPrint,
    subcategories: [
      { id: "caes", name: "Cães", slug: "caes" },
      { id: "gatos", name: "Gatos", slug: "gatos" },
      { id: "brinquedos-pet", name: "Brinquedos", slug: "brinquedos-pet" },
      { id: "higiene-pet", name: "Higiene", slug: "higiene-pet" },
    ],
  },
  {
    id: "automotivo",
    name: "Automotivo",
    slug: "automotivo",
    description: "Acessórios e utilidades para o seu carro",
    icon: Settings,
    subcategories: [
      { id: "interior", name: "Interior", slug: "interior" },
      { id: "exterior", name: "Exterior", slug: "exterior" },
      { id: "acessorios-auto", name: "Acessórios", slug: "acessorios-auto" },
      { id: "organizacao-auto", name: "Organização", slug: "organizacao-auto" },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string,
): Subcategory | undefined {
  const category = getCategoryBySlug(categorySlug);

  return category?.subcategories.find((sub) => sub.slug === subcategorySlug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}