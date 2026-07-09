import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../_lib/prisma.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Método não permitido.",
    });
  }

  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email e senha são obrigatórios.",
      });
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email: String(email),
      },
    });

    if (!admin) {
      return res.status(401).json({
        message: "Credenciais inválidas.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      String(password),
      admin.passwordHash,
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Credenciais inválidas.",
      });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "JWT_SECRET não configurado.",
      });
    }

    const token = jwt.sign(
      {
        sub: admin.id,
        email: admin.email,
        role: "admin",
      },
      secret,
      {
        expiresIn: "7d",
      },
    );

    return res.status(200).json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Não foi possível fazer login.",
    });
  }
}