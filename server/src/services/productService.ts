import { productRepository } from "../repositories/productRepository";
import { productSchema, updateProductSchema } from "../validators/product";
import { successResponse, errorResponse } from "../utils/response";

export const productService = {
  async listProducts() {
    const products = await productRepository.list();
    return successResponse(products, "Produtos listados com sucesso");
  },

  async getProductById(id: string) {
    const product = await productRepository.findById(id);
    if (!product) {
      return errorResponse("Produto não encontrado", ["id" ]);
    }

    return successResponse(product, "Produto encontrado");
  },

  async createProduct(input: unknown) {
    const parsed = productSchema.safeParse(input);
    if (!parsed.success) {
      return errorResponse("Dados inválidos", parsed.error.issues.map((issue) => issue.message));
    }

    const product = await productRepository.create({
      ...parsed.data,
      price: parsed.data.price.toString(),
      originalPrice: parsed.data.originalPrice?.toString(),
      stock: parsed.data.stock ?? 0,
      featured: parsed.data.featured ?? false,
      badge: parsed.data.badge ?? null,
      subcategoryId: parsed.data.subcategoryId ?? null,
    });

    return successResponse(product, "Produto criado com sucesso");
  },

  async updateProduct(id: string, input: unknown) {
    const parsed = updateProductSchema.safeParse(input);
    if (!parsed.success) {
      return errorResponse("Dados inválidos", parsed.error.issues.map((issue) => issue.message));
    }

    const product = await productRepository.update(id, {
      ...parsed.data,
      price: parsed.data.price?.toString(),
      originalPrice: parsed.data.originalPrice?.toString(),
    });

    return successResponse(product, "Produto atualizado com sucesso");
  },

  async deleteProduct(id: string) {
    await productRepository.remove(id);
    return successResponse(null, "Produto removido com sucesso");
  },
};
