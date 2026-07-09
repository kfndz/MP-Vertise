import { categoryRepository } from "../repositories/categoryRepository.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const categoryService = {
  async listCategories() {
    const categories = await categoryRepository.list();
    return successResponse(categories, "Categorias listadas com sucesso");
  },

  async getCategoryBySlug(slug: string) {
    const category = await categoryRepository.findBySlug(slug);
    if (!category) {
      return errorResponse("Categoria não encontrada", ["slug"]);
    }

    return successResponse(category, "Categoria encontrada");
  },
};
