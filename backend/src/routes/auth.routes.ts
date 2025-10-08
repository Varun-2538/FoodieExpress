import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/google', authController.signInWithGoogle);
router.post('/exchange-code', authController.exchangeCodeForSession);

// Protected routes
router.post('/signout', authMiddleware, authController.signOut);
router.get('/me', authMiddleware, authController.getCurrentUser);

export default router;