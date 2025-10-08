import { Response } from 'express';
import * as orderService from '../services/order.service';
import { AuthRequest, CreateOrderRequest } from '../types';
import { asyncHandler } from '../utils/asyncHandler';
import { createAppError } from '../middleware/error.middleware';

export const createOrder = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    throw createAppError(401, 'Authentication required');
  }

  const orderRequest: CreateOrderRequest = req.body;

  // validate request
  if (!orderRequest.restaurantId || !orderRequest.items || !orderRequest.deliveryAddress) {
    throw createAppError(400, 'Missing required fields');
  }

  if (orderRequest.items.length === 0) {
    throw createAppError(400, 'Order must contain at least one item');
  }

  const order = await orderService.createOrder(req.user.id, orderRequest);

  res.status(201).json({
    success: true,
    data: order,
    message: 'Order created successfully',
  });
});

export const getOrderById = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    throw createAppError(401, 'Authentication required');
  }

  const { id } = req.params;
  const order = await orderService.getOrderById(id, req.user.id);

  res.json({
    success: true,
    data: order,
  });
});

export const getUserOrders = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    throw createAppError(401, 'Authentication required');
  }

  const orders = await orderService.getUserOrders(req.user.id);

  res.json({
    success: true,
    data: orders,
  });
});
