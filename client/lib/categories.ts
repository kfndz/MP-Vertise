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

// Ordem exata desejada na Home e refletida dinamicamente no Header
export const categories: Category[] = [
  {
    id: "moda-acessorios",
    name: "Moda & Estilo",
    slug: "moda-acessorios",
    description: "Roupas e acessórios para todas as ocasiões",
    icon: Shirt,
    subcategories: [
      { id: "relogios", name: "Relógios", slug: "relogios" },
      { id: "bolsas", name: "Bolsas", slug: "bolsas" },
      { id: "carteiras", name: "Carteiras", slug: "carteiras" },
      { id: "oculos", name: "Óculos", slug: "oculos" },
    ],
  },
  {
    id: "saude-beleza",
    name: "Beleza & Cuidados Pessoais",
    slug: "saude-beleza",
    description: "Produtos para sua rotina de autocuidado",
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
    description: "Tudo para deixar seu lar aconchegante",
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
    slug: "utilidades", // Corrigido para não usar mais o slug "casa"
    description: "Praticidade e inovação para o seu dia a dia",
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
    description: "Itens premium para treinos e rotina ativa com desempenho e estilo",
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
    description: "Gadgets e acessórios inovadores para o seu estilo de vida digital",
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
    description: "Essenciais e acessórios para o cuidado e o bem-estar do seu pet",
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
    description: "Proteção e organização para o seu carro com acabamento premium",
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

export function getSubcategoryBySlug(categorySlug: string, subcategorySlug: string): Subcategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find((sub) => sub.slug === subcategorySlug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}