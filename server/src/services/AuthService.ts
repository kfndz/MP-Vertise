import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const AuthService = {
  async login(email: string, password: string) {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new Error("Credenciais inválidas.");
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.passwordHash,
    );

    if (!passwordMatches) {
      throw new Error("Credenciais inválidas.");
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET não configurado.");
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

    return {
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };
  },
};