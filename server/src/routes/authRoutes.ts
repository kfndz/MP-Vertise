import { Router } from "express";
import { AuthService } from "../services/AuthService.js";

export const authRoutes = Router();

authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email e senha são obrigatórios.",
      });
    }

    const result = await AuthService.login(email, password);

    return res.json(result);
  } catch (error) {
    return res.status(401).json({
      message:
        error instanceof Error
          ? error.message
          : "Não foi possível fazer login.",
    });
  }
});