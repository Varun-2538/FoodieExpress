import { Router } from 'express';
import authRoutes from './auth.routes';
import restaurantRoutes from './restaurant.routes';
import menuItemRoutes from './menu-item.routes';
import orderRoutes from './order.routes';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'FoodieExpress API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/menu-items', menuItemRoutes);
router.use('/orders', orderRoutes);

export default router;