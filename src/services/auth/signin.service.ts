
// src/services/auth.service.ts
import db from "@log/database";
import bcrypt from "bcryptjs";
import { IAuthSignUpModel } from "@log/interface/auth/IAuthSignUp.model";

export const signInUser = async (
  email: string,
  password: string
): Promise<Omit<IAuthSignUpModel.User, "password_hash"> | null> => {
  // 1. Get user by email
  const result = await db.query<IAuthSignUpModel.User>(
    `SELECT id, first_name, last_name, email, phone_no, password_hash, created_at
     FROM users WHERE email = $1`,
    [email]
  );

  if (result.rowCount === 0) {
    return null; // user not found
  }

  const user = result.rows[0];

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    return null; // password mismatch
  }

  // 3. Remove password_hash before returning user
  const { password_hash, ...userWithoutPassword } = user;

  return userWithoutPassword;
};
