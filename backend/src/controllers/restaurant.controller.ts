import { Request, Response } from 'express';
import * as restaurantService from '../services/restaurant.service';
import { asyncHandler } from '../utils/asyncHandler';

export const getAllRestaurants = asyncHandler(async (req: Request, res: Response): Promise<void> => {
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
});

export const getRestaurantById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const restaurant = await restaurantService.getRestaurantById(id);

  res.json({
    success: true,
    data: restaurant,
  });
});
