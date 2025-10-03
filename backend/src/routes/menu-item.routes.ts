import { Router } from 'express';
import { MenuItemController } from '../controllers/menu-item.controller';

const router = Router();
const menuItemController = new MenuItemController();

// Public routes (menu items can be viewed without auth)
router.get('/', menuItemController.getMenuItems);
router.get('/:id', menuItemController.getMenuItemById);

export default router;