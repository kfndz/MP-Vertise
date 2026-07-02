import { prisma } from "../config/prisma";

export const productRepository = {
  async list() {
    return prisma.product.findMany({
      include: {
        category: true,
        subcategory: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        subcategory: true,
        images: true,
      },
    });
  },

  async create(data: Parameters<typeof prisma.product.create>[0]["data"]) {
    return prisma.product.create({
      data,
      include: {
        category: true,
        subcategory: true,
        images: true,
      },
    });
  },

  async update(id: string, data: Parameters<typeof prisma.product.update>[0]["data"]) {
    return prisma.product.update({
      where: { id },
      data,
      include: {
        category: true,
        subcategory: true,
        images: true,
      },
    });
  },

  async remove(id: string) {
    return prisma.product.delete({ where: { id } });
  },
};
