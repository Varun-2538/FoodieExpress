import { Router } from 'express';
import * as menuItemController from '../controllers/menu-item.controller';

const router = Router();

router.get('/', menuItemController.getMenuItems);
router.get('/:id', menuItemController.getMenuItemById);

export default router;
