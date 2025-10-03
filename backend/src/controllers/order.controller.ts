import { Response } from 'express';
import { OrderService } from '../services/order.service';
import { AuthRequest, CreateOrderRequest } from '../types';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  /**
   * POST /api/orders
   * Create a new order
   */
  createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Authentication required',
        });
        return;
      }

      const orderRequest: CreateOrderRequest = req.body;

      // Validate request
      if (!orderRequest.restaurantId || !orderRequest.items || !orderRequest.deliveryAddress) {
        res.status(400).json({
          success: false,
          error: 'Missing required fields',
        });
        return;
      }

      if (orderRequest.items.length === 0) {
        res.status(400).json({
          success: false,
          error: 'Order must contain at least one item',
        });
        return;
      }

      const order = await this.orderService.createOrder(req.user.id, orderRequest);

      res.status(201).json({
        success: true,
        data: order,
        message: 'Order created successfully',
      });
    } catch (error: any) {
      if (error.statusCode) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
        return;
      }

      console.error('Create order error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create order',
      });
    }
  };

  /**
   * GET /api/orders/:id
   * Get order by ID
   */
  getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Authentication required',
        });
        return;
      }

      const { id } = req.params;
      const order = await this.orderService.getOrderById(id, req.user.id);

      res.json({
        success: true,
        data: order,
      });
    } catch (error: any) {
      if (error.statusCode) {
        res.status(error.statusCode).json({
          success: false,
          error: error.message,
        });
        return;
      }

      console.error('Get order error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch order',
      });
    }
  };

  /**
   * GET /api/orders
   * Get user orders
   */
  getUserOrders = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          error: 'Authentication required',
        });
        return;
      }

      const orders = await this.orderService.getUserOrders(req.user.id);

      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      console.error('Get user orders error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch orders',
      });
    }
  };
}