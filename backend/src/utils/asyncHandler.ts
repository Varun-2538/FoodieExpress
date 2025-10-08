import { Request, Response, NextFunction } from 'express';

/**
 * Async handler wrapper for Express route handlers
 * Automatically catches errors from async functions and passes them to Express error middleware
 *
 * @param fn - Async route handler function
 * @returns Wrapped function that catches errors
 *
 * @example
 * export const getRestaurant = asyncHandler(async (req, res) => {
 *   const restaurant = await service.getRestaurant(req.params.id);
 *   res.json({ success: true, data: restaurant });
 * });
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
