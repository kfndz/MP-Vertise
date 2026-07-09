import type { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/response.js";

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const message = err instanceof Error ? err.message : "Erro interno do servidor";
  const details = err instanceof Error && err.stack ? [err.stack] : [];

  res.status(500).json(errorResponse(message, details));
};
