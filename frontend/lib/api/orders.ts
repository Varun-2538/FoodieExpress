/**
 * Order API functions
 * Convenience wrappers around the API client
 */

import { apiClient } from './client';
import { CartItem } from '../types';

export interface CreateOrderData {
  restaurantId: string;
  items: Array<{
    menuItemId: string;
    quantity: number;
    specialInstructions?: string;
  }>;
  deliveryAddress: string;
  specialInstructions?: string;
}

/**
 * Create a new order from cart items
 */
export async function createOrder(
  restaurantId: string,
  cartItems: CartItem[],
  deliveryAddress: string,
  specialInstructions?: string
) {
  const orderData: CreateOrderData = {
    restaurantId,
    items: cartItems.map((item) => ({
      menuItemId: item.menuItem.id,
      quantity: item.quantity,
      specialInstructions: item.specialInstructions,
    })),
    deliveryAddress,
    specialInstructions,
  };

  const response = await apiClient.createOrder(orderData);

  if (!response.success) {
    throw new Error(response.error || 'Failed to create order');
  }

  return response.data;
}

/**
 * Fetch user's order history
 */
export async function fetchUserOrders() {
  const response = await apiClient.getOrders();
  return response.data || [];
}

/**
 * Fetch single order by ID
 */
export async function fetchOrder(orderId: string) {
  const response = await apiClient.getOrder(orderId);

  if (!response.success) {
    throw new Error(response.error || 'Failed to fetch order');
  }

  return response.data;
}