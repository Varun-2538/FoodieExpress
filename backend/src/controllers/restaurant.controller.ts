import { Request, Response } from 'express';
import * as restaurantService from '../services/restaurant.service';

export const getAllRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, open } = req.query;

    let restaurants;

    if (search) {
      restaurants = await restaurantService.searchRestaurants(search as string);
    } else if (open === 'true') {
      restaurants = await restaurantService.getOpenRestaurants();
    } else {
      restaurants = await restaurantService.getAllRestaurants();
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

export const getRestaurantById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantService.getRestaurantById(id);

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
