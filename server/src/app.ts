import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import productsRouter from "./routes/products";
import categoriesRouter from "./routes/categories";
import healthRouter from "./routes/health";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/health", healthRouter);
  app.use("/products", productsRouter);
  app.use("/categories", categoriesRouter);

  app.use(errorHandler);

  return app;
}
