import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PORT: z.string().default("3000"),
  NODE_ENV: z.string().default("development"),
});

export const env = envSchema.parse(process.env);
