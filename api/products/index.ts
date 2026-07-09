import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../_lib/prisma.js";
import { requireAdminToken } from "../_lib/auth.js";

function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function resolveCategoryId(categoryIdOrSlug: string) {
  const category =
    (await prisma.category.findUnique({ where: { id: categoryIdOrSlug } })) ??
    (await prisma.category.findUnique({ where: { slug: categoryIdOrSlug } }));

  if (!category) throw new Error("Categoria inválida.");

  return category.id;
}

async function resolveSubcategoryId(
  subcategoryIdOrSlug: string | null | undefined,
  categoryId: string,
) {
  if (!subcategoryIdOrSlug?.trim()) return null;

  const subcategory =
    (await prisma.subcategory.findUnique({
      where: { id: subcategoryIdOrSlug },
    })) ??
    (await prisma.subcategory.findFirst({
      where: {
        slug: subcategoryIdOrSlug,
        categoryId,
      },
    }));

  if (!subcategory) throw new Error("Subcategoria inválida.");

  return subcategory.id;
}

async function prepareProductData(body: any) {
  const categoryId = await resolveCategoryId(String(body.categoryId ?? ""));
  const subcategoryId = await resolveSubcategoryId(
    body.subcategoryId ? String(body.subcategoryId) : null,
    categoryId,
  );

  const name = String(body.name ?? "").trim();

  if (!name) throw new Error("Nome do produto é obrigatório.");
  if (!body.affiliateUrl) throw new Error("Link de afiliado é obrigatório.");
  if (!body.marketplace) throw new Error("Marketplace é obrigatório.");
  if (!body.image) throw new Error("Imagem é obrigatória.");

  return {
    name,
    slug: String(body.slug ?? "").trim() || createSlug(name),
    description: body.description ? String(body.description).trim() : null,
    brand: body.brand ? String(body.brand).trim() : null,
    price: Number(body.price ?? 0),
    originalPrice:
      body.originalPrice === undefined ||
      body.originalPrice === null ||
      body.originalPrice === ""
        ? null
        : Number(body.originalPrice),
    affiliateUrl: String(body.affiliateUrl).trim(),
    marketplace: String(body.marketplace).trim(),
    image: String(body.image).trim(),
    rating:
      body.rating === undefined || body.rating === null || body.rating === ""
        ? 0
        : Number(body.rating),
    reviewCount:
      body.reviewCount === undefined ||
      body.reviewCount === null ||
      body.reviewCount === ""
        ? 0
        : Number(body.reviewCount),
    stock: Number(body.stock ?? 0),
    featured: Boolean(body.featured),
    isOffer: Boolean(body.isOffer),
    isBestSeller: Boolean(body.isBestSeller),
    badge: body.badge ? String(body.badge).trim() : null,
    categoryId,
    subcategoryId,
  };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    if (req.method === "GET") {
      const products = await prisma.product.findMany({
        include: {
          category: true,
          subcategory: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(products);
    }

    if (req.method === "POST") {
      requireAdminToken(req);

      const data = await prepareProductData(req.body);

      const product = await prisma.product.create({
        data,
        include: {
          category: true,
          subcategory: true,
        },
      });

      return res.status(201).json(product);
    }

    return res.status(405).json({
      message: "Método não permitido.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao processar produto.";

    if (message === "UNAUTHORIZED") {
      return res.status(401).json({
        message: "Token de autenticação não enviado ou inválido.",
      });
    }

    if (message === "FORBIDDEN") {
      return res.status(403).json({
        message: "Acesso negado.",
      });
    }

    return res.status(400).json({ message });
  }
}