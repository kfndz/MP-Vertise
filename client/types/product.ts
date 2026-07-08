export interface Product {
  id: string | number;

  name: string;
  slug?: string;

  description?: string | null;
  brand?: string | null;

  price: number;
  originalPrice?: number | null;

  affiliateUrl?: string | null;
  marketplace?: string | null;

  image?: string | null;
  images?: string[];

  rating?: number;
  reviews?: number;
  reviewCount?: number;

  stock?: number;
  inStock?: boolean;

  featured?: boolean;
  isOffer?: boolean;
  isBestSeller?: boolean;

  badge?: string | null;

  category?: string | null;
  subcategory?: string | null;

  categoryId?: string | null;
  subcategoryId?: string | null;

  specifications?: Record<string, string>;

  createdAt?: string;
  updatedAt?: string;
}

export type ProductCreateInput = Omit<
  Product,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "inStock"
  | "category"
  | "subcategory"
  | "reviews"
> & {
  slug?: string;
  affiliateUrl?: string | null;
  marketplace?: string | null;

};

export type ProductUpdateInput = Partial<ProductCreateInput>;