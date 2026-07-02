import { prisma } from "../config/prisma";

export const categoryRepository = {
  async list() {
    return prisma.category.findMany({
      include: { subcategories: true },
      orderBy: { name: "asc" },
    });
  },

  async findBySlug(slug: string) {
    return prisma.category.findUnique({
      where: { slug },
      include: { subcategories: true },
    });
  },
};
