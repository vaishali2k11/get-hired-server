// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { signInSchema } from "@log/schemas/auth/signin.schema";
import { signInUser } from "@log/services/auth/signin.service";

export const signInController = async (req: Request, res: Response) => {
  try {
    console.log('req.body:', req.body)
    const parsed = signInSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        errors: parsed.error.message,
      });
    }

    const { email, password } = parsed.data;

    const user = await signInUser(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Signin successful",
      user,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
