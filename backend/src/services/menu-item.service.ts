import * as menuItemRepo from '../repositories/menu-item.repository';
import { MenuItem } from '../types';
import { createAppError } from '../middleware/error.middleware';

const mapToMenuItem = (row: any): MenuItem => {
  return {
    id: row.id,
    restaurantId: row.restaurant_id,
    name: row.name,
    description: row.description,
    price: row.price,
    image: row.image,
    category: row.category,
    isVegetarian: row.is_vegetarian,
    isAvailable: row.is_available,
    preparationTime: row.preparation_time,
  };
};

export const getMenuItemsByRestaurantId = async (restaurantId: string): Promise<MenuItem[]> => {
  const menuItems = await menuItemRepo.findByRestaurantId(restaurantId);
  return menuItems.map(mapToMenuItem);
};

export const getMenuItemById = async (id: string): Promise<MenuItem> => {
  const menuItem = await menuItemRepo.findById(id);

  if (!menuItem) {
    throw createAppError(404, 'Menu item not found');
  }

  return mapToMenuItem(menuItem);
};

export const getAvailableMenuItems = async (restaurantId: string): Promise<MenuItem[]> => {
  const menuItems = await menuItemRepo.findAvailableByRestaurantId(restaurantId);
  return menuItems.map(mapToMenuItem);
};

export const getMenuItemsByCategory = async (restaurantId: string, category: string): Promise<MenuItem[]> => {
  const menuItems = await menuItemRepo.findByCategory(restaurantId, category);
  return menuItems.map(mapToMenuItem);
};

export const getMenuItemsByIds = async (ids: string[]): Promise<MenuItem[]> => {
  const menuItems = await menuItemRepo.findByIds(ids);
  return menuItems.map(mapToMenuItem);
};
