import type {
  Product,
  ProductCreateInput,
  ProductUpdateInput,
} from "@/types/product";

import { AuthService } from "@/services/AuthService";

const API_URL = "/api/products";

type ApiCategory = {
  id?: string;
  name?: string;
  slug?: string;
};

type ApiSubcategory = {
  id?: string;
  name?: string;
  slug?: string;
};

type ApiProduct = Omit<
  Product,
  | "price"
  | "originalPrice"
  | "category"
  | "subcategory"
  | "images"
  | "reviews"
> & {
  price: number | string;
  originalPrice?: number | string | null;

  category?: ApiCategory | string | null;
  subcategory?: ApiSubcategory | string | null;

  images?: Array<string | { url?: string | null }>;

  reviewCount?: number;
  reviews?: number;
};

function normalizeProduct(product: ApiProduct): Product {
  const normalizedImages =
    product.images
      ?.map((image) => {
        if (typeof image === "string") {
          return image;
        }

        return image?.url ?? "";
      })
      .filter(Boolean) ?? [];

  const mainImage =
    product.image ??
    normalizedImages[0] ??
    "/images/home-image.png";

  return {
    ...product,

    price: Number(product.price ?? 0),

    originalPrice:
      product.originalPrice === null ||
        product.originalPrice === undefined
        ? null
        : Number(product.originalPrice),

    image: mainImage,

    images:
      normalizedImages.length > 0
        ? normalizedImages
        : mainImage
          ? [mainImage]
          : [],

    rating: Number(product.rating ?? 0),

    reviews: Number(
      product.reviews ??
      product.reviewCount ??
      0,
    ),

    reviewCount: Number(
      product.reviewCount ??
      product.reviews ??
      0,
    ),

    stock: Number(product.stock ?? 0),

    inStock: Number(product.stock ?? 0) > 0,

    category:
      typeof product.category === "string"
        ? product.category
        : product.category?.slug ?? null,

    subcategory:
      typeof product.subcategory === "string"
        ? product.subcategory
        : product.subcategory?.slug ?? null,

    categoryId:
      product.categoryId ??
      (typeof product.category === "object"
        ? product.category?.id ?? null
        : null),

    subcategoryId:
      product.subcategoryId ??
      (typeof product.subcategory === "object"
        ? product.subcategory?.id ?? null
        : null),
  };
}

async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const token = AuthService.getToken();

  const headers = new Headers(options?.headers);

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = "Erro ao processar a solicitação.";

    try {
      const data = await response.json();

      if (data?.error) {
        message = data.error;
      } else if (data?.message) {
        message = data.message;
      }
    } catch {
      // Mantém a mensagem padrão.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const ProductService = {
  async getAll(): Promise<Product[]> {
    const products = await request<ApiProduct[]>(API_URL);

    return products.map(normalizeProduct);
  },

  async getById(id: string | number): Promise<Product> {
    const product = await request<ApiProduct>(
      `${API_URL}/${id}`,
    );

    return normalizeProduct(product);
  },

  async create(
    input: ProductCreateInput,
  ): Promise<Product> {
    const product = await request<ApiProduct>(API_URL, {
      method: "POST",
      body: JSON.stringify(input),
    });

    return normalizeProduct(product);
  },

  async update(
    id: string | number,
    input: ProductUpdateInput,
  ): Promise<Product> {
    const product = await request<ApiProduct>(
      `${API_URL}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(input),
      },
    );

    return normalizeProduct(product);
  },

  async delete(id: string | number): Promise<void> {
    await request<void>(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },

  async remove(id: string | number): Promise<void> {
    await request<void>(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};