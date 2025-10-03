import { RestaurantRepository } from '../repositories/restaurant.repository';
import { Restaurant } from '../types';
import { AppError } from '../middleware/error.middleware';

export class RestaurantService {
  private restaurantRepository: RestaurantRepository;

  constructor() {
    this.restaurantRepository = new RestaurantRepository();
  }

  /**
   * Convert database row to application model
   */
  private mapToRestaurant(row: any): Restaurant {
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
  }

  /**
   * Get all restaurants
   */
  async getAllRestaurants(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantRepository.findAll();
    return restaurants.map(this.mapToRestaurant);
  }

  /**
   * Get restaurant by ID
   */
  async getRestaurantById(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findById(id);

    if (!restaurant) {
      throw new AppError(404, 'Restaurant not found');
    }

    return this.mapToRestaurant(restaurant);
  }

  /**
   * Search restaurants
   */
  async searchRestaurants(query: string): Promise<Restaurant[]> {
    if (!query || query.trim().length === 0) {
      return this.getAllRestaurants();
    }

    const restaurants = await this.restaurantRepository.search(query.trim());
    return restaurants.map(this.mapToRestaurant);
  }

  /**
   * Get open restaurants
   */
  async getOpenRestaurants(): Promise<Restaurant[]> {
    const restaurants = await this.restaurantRepository.findOpen();
    return restaurants.map(this.mapToRestaurant);
  }
}