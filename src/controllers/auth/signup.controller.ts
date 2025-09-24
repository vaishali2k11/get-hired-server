
// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { createUserSchema } from '../../schemas/auth/signup.schema';
import * as userService from "../../services/auth/signup.service";

export const createUserController = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Validate request body
    console.log('req.body:', req.body)
    const parsed = createUserSchema.safeParse(req.body);
    console.log('parsed:', parsed)
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.message });
    }

    console.log('parsed:', parsed)
    const userData = parsed.data;

    const createdUser = await userService.createUser(userData);

    return res.status(201).json({ message: "User created successfully", user: createdUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
