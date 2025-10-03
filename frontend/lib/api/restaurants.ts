/**
 * Restaurant API functions
 * Convenience wrappers around the API client
 */

import { apiClient } from './client';
import { Restaurant } from '../types';

/**
 * Fetch all restaurants
 */
export async function fetchRestaurants(params?: {
  search?: string;
  open?: boolean;
}): Promise<Restaurant[]> {
  const response = await apiClient.getRestaurants(params);
  return response.data || [];
}

/**
 * Fetch single restaurant by ID
 */
export async function fetchRestaurant(id: string): Promise<Restaurant> {
  const response = await apiClient.getRestaurant(id);
  if (!response.success) {
    throw new Error(response.error || 'Failed to fetch restaurant');
  }
  return response.data;
}

/**
 * Search restaurants by query
 */
export async function searchRestaurants(query: string): Promise<Restaurant[]> {
  return fetchRestaurants({ search: query });
}

/**
 * Get only open restaurants
 */
export async function fetchOpenRestaurants(): Promise<Restaurant[]> {
  return fetchRestaurants({ open: true });
}