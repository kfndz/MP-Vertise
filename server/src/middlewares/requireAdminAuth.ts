import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type AdminTokenPayload = {
  sub: string;
  email: string;
  role: string;
};

export function requireAdminAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token de autenticação não enviado.",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      message: "JWT_SECRET não configurado.",
    });
  }

  try {
    const decoded = jwt.verify(token, secret) as AdminTokenPayload;

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Acesso negado.",
      });
    }

    next();
  } catch {
    return res.status(401).json({
      message: "Token inválido ou expirado.",
    });
  }
}