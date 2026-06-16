export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category?: string;
  subcategory?: string;
  rating?: number;
  reviews?: number;
  stock?: number;
  inStock?: boolean;
  featured?: boolean;
  badge?: string;
  description?: string;
  image?: string;
  images?: string[];
  specifications?: Record<string, string>;
};

export type ProductCreateInput = Omit<Product, "id">;
