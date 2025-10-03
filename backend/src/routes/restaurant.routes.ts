import { Router } from 'express';
import { RestaurantController } from '../controllers/restaurant.controller';

const router = Router();
const restaurantController = new RestaurantController();

// Public routes (restaurants can be viewed without auth)
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);

export default router;