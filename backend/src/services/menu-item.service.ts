import { MenuItemRepository } from '../repositories/menu-item.repository';
import { MenuItem } from '../types';
import { AppError } from '../middleware/error.middleware';

export class MenuItemService {
  private menuItemRepository: MenuItemRepository;

  constructor() {
    this.menuItemRepository = new MenuItemRepository();
  }

  /**
   * Convert database row to application model
   */
  private mapToMenuItem(row: any): MenuItem {
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
  }

  /**
   * Get all menu items for a restaurant
   */
  async getMenuItemsByRestaurantId(restaurantId: string): Promise<MenuItem[]> {
    const menuItems = await this.menuItemRepository.findByRestaurantId(restaurantId);
    return menuItems.map(this.mapToMenuItem);
  }

  /**
   * Get menu item by ID
   */
  async getMenuItemById(id: string): Promise<MenuItem> {
    const menuItem = await this.menuItemRepository.findById(id);

    if (!menuItem) {
      throw new AppError(404, 'Menu item not found');
    }

    return this.mapToMenuItem(menuItem);
  }

  /**
   * Get available menu items for a restaurant
   */
  async getAvailableMenuItems(restaurantId: string): Promise<MenuItem[]> {
    const menuItems = await this.menuItemRepository.findAvailableByRestaurantId(restaurantId);
    return menuItems.map(this.mapToMenuItem);
  }

  /**
   * Get menu items by category
   */
  async getMenuItemsByCategory(restaurantId: string, category: string): Promise<MenuItem[]> {
    const menuItems = await this.menuItemRepository.findByCategory(restaurantId, category);
    return menuItems.map(this.mapToMenuItem);
  }

  /**
   * Get multiple menu items by IDs
   */
  async getMenuItemsByIds(ids: string[]): Promise<MenuItem[]> {
    const menuItems = await this.menuItemRepository.findByIds(ids);
    return menuItems.map(this.mapToMenuItem);
  }
}