import type { IncomingMessage } from "node:http";
import jwt from "jsonwebtoken";

type AdminTokenPayload = {
  sub: string;
  email: string;
  role: string;
};

export function requireAdminToken(
  req: IncomingMessage,
): AdminTokenPayload {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("UNAUTHORIZED");
  }

  const token = authHeader.slice(7);
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET_NOT_CONFIGURED");
  }

  try {
    const decoded = jwt.verify(
      token,
      secret,
    ) as AdminTokenPayload;

    if (decoded.role !== "admin") {
      throw new Error("FORBIDDEN");
    }

    return decoded;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "FORBIDDEN"
    ) {
      throw error;
    }

    throw new Error("UNAUTHORIZED");
  }
}