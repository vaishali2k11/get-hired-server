
import { Application } from 'express';
import { authRouters } from './routers/auth/auth.router';

export function appRoutes(app: Application): void {
    app.use('/api/v1/auth', authRouters());
}
