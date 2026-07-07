import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const productRoutes = Router();

productRoutes.get("/products", ProductController.getAll);
productRoutes.get("/products/:id", ProductController.getById);
productRoutes.post("/products", ProductController.create);
productRoutes.put("/products/:id", ProductController.update);
productRoutes.delete("/products/:id", ProductController.remove);

export { productRoutes };