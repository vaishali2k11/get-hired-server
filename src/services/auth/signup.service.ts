
// src/services/user.service.ts
import db from '@log/database';
import { hashPassword } from '@log/middlewares/auth/password';
import { IAuthSignUpModel } from '@log/interface/auth/IAuthSignUp.model';

export const createUser = async (userData: Omit<IAuthSignUpModel.User, 'id' | 'created_at' | 'updated_at' | 'password_hash'> & { password: string }) => {
  const password_hash = await hashPassword(userData.password);

 const result = await db.query<IAuthSignUpModel.User>(
  `INSERT INTO users (first_name, last_name, email, phone_no, password_hash)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING id, first_name, last_name, email, phone_no, created_at`,
  [userData.first_name, userData.last_name, userData.email, userData.phone_no || null, password_hash]
);

    console.log('result:', result)

  return result.rows[0];
};
