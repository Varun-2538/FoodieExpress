import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/google', authController.signInWithGoogle.bind(authController));
router.post('/exchange-code', authController.exchangeCodeForSession.bind(authController));

// Protected routes
router.post('/signout', authMiddleware, authController.signOut.bind(authController));
router.get('/me', authMiddleware, authController.getCurrentUser.bind(authController));

export default router;