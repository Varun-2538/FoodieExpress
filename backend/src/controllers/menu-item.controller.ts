import { Request, Response } from 'express';
import * as menuItemService from '../services/menu-item.service';
import { asyncHandler } from '../utils/asyncHandler';
import { createAppError } from '../middleware/error.middleware';

export const getMenuItems = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { restaurantId, category, available } = req.query;

  if (!restaurantId) {
    throw createAppError(400, 'Restaurant ID is required');
  }

  let menuItems;

  if (category) {
    menuItems = await menuItemService.getMenuItemsByCategory(
      restaurantId as string,
      category as string
    );
  } else if (available === 'true') {
    menuItems = await menuItemService.getAvailableMenuItems(restaurantId as string);
  } else {
    menuItems = await menuItemService.getMenuItemsByRestaurantId(restaurantId as string);
  }

  res.json({
    success: true,
    data: menuItems,
  });
});

export const getMenuItemById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const menuItem = await menuItemService.getMenuItemById(id);

  res.json({
    success: true,
    data: menuItem,
  });
});
