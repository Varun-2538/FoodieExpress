/**
 * Menu Item API functions
 * Convenience wrappers around the API client
 */

import { apiClient } from './client';
import { MenuItem } from '../types';

/**
 * Fetch menu items for a restaurant
 */
export async function fetchMenuItems(restaurantId: string): Promise<MenuItem[]> {
  const response = await apiClient.getMenuItems({ restaurantId });
  return response.data || [];
}

/**
 * Fetch available menu items only
 */
export async function fetchAvailableMenuItems(restaurantId: string): Promise<MenuItem[]> {
  const response = await apiClient.getMenuItems({
    restaurantId,
    available: true,
  });
  return response.data || [];
}

/**
 * Fetch menu items by category
 */
export async function fetchMenuItemsByCategory(
  restaurantId: string,
  category: string
): Promise<MenuItem[]> {
  const response = await apiClient.getMenuItems({
    restaurantId,
    category,
  });
  return response.data || [];
}

/**
 * Fetch single menu item
 */
export async function fetchMenuItem(id: string): Promise<MenuItem> {
  const response = await apiClient.getMenuItem(id);
  if (!response.success) {
    throw new Error(response.error || 'Failed to fetch menu item');
  }
  return response.data;
}