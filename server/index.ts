import "dotenv/config";
import express from "express";
import cors from "cors";
import { createRequire } from "node:module";
import { handleDemo } from "./routes/demo";

const require = createRequire(import.meta.url);

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  const { createApp } = require("./src/app") as { createApp: () => express.Express };
  const modularApp = createApp();
  app.use(modularApp);

  return app;
}
