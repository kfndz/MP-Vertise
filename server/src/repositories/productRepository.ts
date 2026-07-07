import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const productRelations = {
  category: true,
  subcategory: true,
} satisfies Prisma.ProductInclude;

export const ProductRepository = {
  async findAll() {
    return prisma.product.findMany({
      include: productRelations,
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: productRelations,
    });
  },

  async create(data: Prisma.ProductUncheckedCreateInput) {
    return prisma.product.create({
      data,
      include: productRelations,
    });
  },

  async update(id: string, data: Prisma.ProductUncheckedUpdateInput) {
    return prisma.product.update({
      where: { id },
      data,
      include: productRelations,
    });
  },

  async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  },
};