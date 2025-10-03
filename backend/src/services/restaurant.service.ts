import * as restaurantRepo from '../repositories/restaurant.repository';
import { Restaurant } from '../types';
import { AppError } from '../middleware/error.middleware';

const mapToRestaurant = (row: any): Restaurant => {
  return {
    id: row.id,
    name: row.name,
    image: row.image,
    rating: row.rating,
    deliveryTime: row.delivery_time,
    cuisineTypes: row.cuisine_types,
    minimumOrder: row.minimum_order,
    deliveryFee: row.delivery_fee,
    isOpen: row.is_open,
    address: row.address,
  };
};

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  const restaurants = await restaurantRepo.findAll();
  return restaurants.map(mapToRestaurant);
};

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  const restaurant = await restaurantRepo.findById(id);

  if (!restaurant) {
    throw new AppError(404, 'Restaurant not found');
  }

  return mapToRestaurant(restaurant);
};

export const searchRestaurants = async (query: string): Promise<Restaurant[]> => {
  if (!query || query.trim().length === 0) {
    return getAllRestaurants();
  }

  const restaurants = await restaurantRepo.search(query.trim());
  return restaurants.map(mapToRestaurant);
};

export const getOpenRestaurants = async (): Promise<Restaurant[]> => {
  const restaurants = await restaurantRepo.findOpen();
  return restaurants.map(mapToRestaurant);
};
