import { Request, Response } from 'express';
import { RestaurantService } from '../services/restaurant.service';

export class RestaurantController {
  private restaurantService: RestaurantService;

  constructor() {
    this.restaurantService = new RestaurantService();
  }

  /**
   * GET /api/restaurants
   * Get all restaurants or search by query
   */
  getAllRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
      const { search, open } = req.query;

      let restaurants;

      if (search) {
        restaurants = await this.restaurantService.searchRestaurants(search as string);
      } else if (open === 'true') {
        restaurants = await this.restaurantService.getOpenRestaurants();
      } else {
        restaurants = await this.restaurantService.getAllRestaurants();
      }

      res.json({
        success: true,
        data: restaurants,
      });
    } catch (error) {
      console.error('Get restaurants error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch restaurants',
      });
    }
  };

  /**
   * GET /api/restaurants/:id
   * Get restaurant by ID
   */
  getRestaurantById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const restaurant = await this.restaurantService.getRestaurantById(id);

      res.json({
        success: true,
        data: restaurant,
      });
    } catch (error: any) {
      if (error.statusCode === 404) {
        res.status(404).json({
          success: false,
          error: error.message,
        });
        return;
      }

      console.error('Get restaurant error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch restaurant',
      });
    }
  };
}