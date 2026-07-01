import {
  Smartphone,
  Monitor,
  Headphones,
  Home,
  Utensils,
  Package,
  Wind,
  Heart,
  Dumbbell,
  Footprints,
  Sparkles,
  Activity,
  PawPrint,
  Dog,
  Cat,
  Gamepad2,
  Droplets,
  Shirt,
  Watch,
  ShoppingBag,
  Eye,
  Wrench,
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
    id: "casa",
    name: "Casa",
    slug: "casa",
    description: "Decoração e utilidades para tornar seu lar ainda mais especial",
    icon: Home,
    subcategories: [
      { id: "cozinha", name: "Cozinha", slug: "cozinha" },
      { id: "decoracao", name: "Decoração", slug: "decoracao" },
      { id: "organizacao", name: "Organização", slug: "organizacao" },
      { id: "limpeza", name: "Limpeza", slug: "limpeza" },
    ],
  },
  {
    id: "moda-acessorios",
    name: "Moda e Acessórios",
    slug: "moda-acessorios",
    description: "Peças e acessórios para complementar seu estilo com sofisticação",
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
    name: "Saúde e Beleza",
    slug: "saude-beleza",
    description: "Produtos premium para sua saúde e bem-estar com conforto e praticidade",
    icon: Heart,
    subcategories: [
      { id: "cuidados-pessoais", name: "Cuidados Pessoais", slug: "cuidados-pessoais" },
      { id: "cosmeticos", name: "Cosméticos", slug: "cosmeticos" },
      { id: "bem-estar", name: "Bem-estar", slug: "bem-estar" },
      { id: "higiene", name: "Higiene", slug: "higiene" },
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

/**
 * Busca uma categoria pelo slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

/**
 * Busca uma subcategoria dentro de uma categoria
 */
export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string,
): Subcategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find((sub) => sub.slug === subcategorySlug);
}

/**
 * Busca categoria pelo ID (para compatibilidade)
 */
export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}
