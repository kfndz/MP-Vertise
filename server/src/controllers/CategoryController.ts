import type { Request, Response, NextFunction } from "express";
import { categoryService } from "../services/categoryService.js";

export const categoryController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await categoryService.listCategories();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug as string;
      const result = await categoryService.getCategoryBySlug(slug);
      const status = result.success ? 200 : 404;
      res.status(status).json(result);
    } catch (error) {
      next(error);
    }
  },
};
