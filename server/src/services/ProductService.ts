import { Prisma } from "@prisma/client";
import { ProductRepository } from "../repositories/productRepository";

function createSlug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeProductData(data: any): Prisma.ProductUncheckedCreateInput {
  return {
    name: data.name,
    slug: data.slug || createSlug(data.name),
    description: data.description || null,
    brand: data.brand || null,
    price: data.price,
    originalPrice: data.originalPrice || null,
    affiliateUrl: data.affiliateUrl,
    marketplace: data.marketplace,
    image: data.image,
    rating: data.rating ?? null,
    reviewCount: data.reviewCount ?? null,
    stock: data.stock ?? 0,
    featured: data.featured ?? false,
    isOffer: data.isOffer ?? false,
    isBestSeller: data.isBestSeller ?? false,
    badge: data.badge || null,
    categoryId: data.categoryId,
    subcategoryId: data.subcategoryId || null,
  };
}

export const ProductService = {
  async getAll() {
    return ProductRepository.findAll();
  },

  async getById(id: string) {
    const product = await ProductRepository.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado.");
    }

    return product;
  },

  async create(data: any) {
    const productData = normalizeProductData(data);

    return ProductRepository.create(productData);
  },

  async update(id: string, data: any) {
    await this.getById(id);

    const productData: Prisma.ProductUncheckedUpdateInput = {
      ...normalizeProductData(data),
    };

    return ProductRepository.update(id, productData);
  },

  async remove(id: string) {
    await this.getById(id);

    return ProductRepository.delete(id);
  },
};