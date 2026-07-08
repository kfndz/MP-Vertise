import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const productRelations = {
  category: true,
  subcategory: true,
};

export const ProductRepository = {
  async findAll() {
    return prisma.product.findMany({
      include: productRelations,
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async findById(idOrSlug: string) {
    return prisma.product.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: productRelations,
    });
  },

  async create(data: any) {
    return prisma.product.create({
      data,
      include: productRelations,
    });
  },

  async update(idOrSlug: string, data: any) {
    const product = await this.findById(idOrSlug);

    if (!product) {
      return null;
    }

    return prisma.product.update({
      where: {
        id: product.id,
      },
      data,
      include: productRelations,
    });
  },

  async delete(idOrSlug: string) {
    const product = await this.findById(idOrSlug);

    if (!product) {
      return null;
    }

    return prisma.product.delete({
      where: {
        id: product.id,
      },
    });
  },
};