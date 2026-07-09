import { Request, Response } from "express";
import { ProductService } from "../services/ProductService.js";

export const ProductController = {
  async getAll(req: Request, res: Response) {
    try {
      const products = await ProductService.getAll();

      return res.status(200).json(products);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao buscar produtos.",
      });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const product = await ProductService.getById(id);

      return res.status(200).json(product);
    } catch (error) {
      console.error(error);

      return res.status(404).json({
        message: "Produto não encontrado.",
      });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const product = await ProductService.create(req.body);

      return res.status(201).json(product);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao cadastrar produto.",
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const product = await ProductService.update(id, req.body);

      return res.status(200).json(product);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao atualizar produto.",
      });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      await ProductService.remove(id);

      await ProductService.remove(id);

      return res.status(200).json({
        message: "Produto removido com sucesso.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Erro ao remover produto.",
      });
    }
  },
};