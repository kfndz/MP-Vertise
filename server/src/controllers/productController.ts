import type { Request, Response, NextFunction } from "express";
import { productService } from "../services/productService";

export const productController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.listProducts();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.getProductById(req.params.id);
      const status = result.success ? 200 : 404;
      res.status(status).json(result);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.createProduct(req.body);
      const status = result.success ? 201 : 400;
      res.status(status).json(result);
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.updateProduct(req.params.id, req.body);
      const status = result.success ? 200 : 400;
      res.status(status).json(result);
    } catch (error) {
      next(error);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.deleteProduct(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
