import { Request, Response } from 'express';
import * as menuItemService from '../services/menu-item.service';

export const getMenuItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { restaurantId, category, available } = req.query;

    if (!restaurantId) {
      res.status(400).json({
        success: false,
        error: 'Restaurant ID is required',
      });
      return;
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
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch menu items',
    });
  }
};

export const getMenuItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const menuItem = await menuItemService.getMenuItemById(id);

    res.json({
      success: true,
      data: menuItem,
    });
  } catch (error: any) {
    if (error.statusCode === 404) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
      return;
    }

    console.error('Get menu item error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch menu item',
    });
  }
};
