
import express, { Router } from 'express';
import { createUserController } from '../../controllers/auth/signup.controller';
import { signInController } from '../../controllers/auth/signin.controller';

const router: Router = express.Router();

export function authRouters(): Router {
  router.post('/signup', createUserController);
  router.post("/signin", signInController);

  return router;
}
