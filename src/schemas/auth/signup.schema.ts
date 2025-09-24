// src/schema/user.schema.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_no: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
