import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { productRoutes } from "./routes/productRoutes";
import categoriesRouter from "./routes/categories";
import healthRouter from "./routes/health";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/health", healthRouter);
  app.use("/api", productRoutes);
  app.use("/categories", categoriesRouter);

  app.use(errorHandler);

  return app;
}