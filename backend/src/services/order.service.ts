import { OrderRepository } from '../repositories/order.repository';
import { MenuItemRepository } from '../repositories/menu-item.repository';
import { RestaurantRepository } from '../repositories/restaurant.repository';
import { Order, CreateOrderRequest, OrderStatus } from '../types';
import { AppError } from '../middleware/error.middleware';

export class OrderService {
  private orderRepository: OrderRepository;
  private menuItemRepository: MenuItemRepository;
  private restaurantRepository: RestaurantRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.menuItemRepository = new MenuItemRepository();
    this.restaurantRepository = new RestaurantRepository();
  }

  /**
   * Create a new order
   */
  async createOrder(userId: string, orderRequest: CreateOrderRequest): Promise<Order> {
    // Validate restaurant exists
    const restaurant = await this.restaurantRepository.findById(orderRequest.restaurantId);
    if (!restaurant) {
      throw new AppError(404, 'Restaurant not found');
    }

    if (!restaurant.is_open) {
      throw new AppError(400, 'Restaurant is currently closed');
    }

    // Validate menu items
    const menuItemIds = orderRequest.items.map(item => item.menuItemId);
    const menuItems = await this.menuItemRepository.findByIds(menuItemIds);

    if (menuItems.length !== menuItemIds.length) {
      throw new AppError(400, 'One or more menu items not found');
    }

    // Validate all items belong to the same restaurant
    const invalidItems = menuItems.filter(item => item.restaurant_id !== orderRequest.restaurantId);
    if (invalidItems.length > 0) {
      throw new AppError(400, 'All items must be from the same restaurant');
    }

    // Validate all items are available
    const unavailableItems = menuItems.filter(item => !item.is_available);
    if (unavailableItems.length > 0) {
      throw new AppError(400, 'One or more items are not available');
    }

    // Calculate total amount
    let totalAmount = 0;
    const orderItemsData = orderRequest.items.map(item => {
      const menuItem = menuItems.find(mi => mi.id === item.menuItemId)!;
      const itemTotal = menuItem.price * item.quantity;
      totalAmount += itemTotal;

      return {
        menu_item_id: item.menuItemId,
        quantity: item.quantity,
        price: menuItem.price,
        special_instructions: item.specialInstructions || null,
      };
    });

    // Check minimum order
    if (totalAmount < restaurant.minimum_order) {
      throw new AppError(
        400,
        `Minimum order amount is ${restaurant.minimum_order}. Current total: ${totalAmount}`
      );
    }

    // Create order
    const order = await this.orderRepository.create({
      user_id: userId,
      restaurant_id: orderRequest.restaurantId,
      status: OrderStatus.PENDING,
      total_amount: totalAmount,
      delivery_fee: restaurant.delivery_fee,
      delivery_address: orderRequest.deliveryAddress,
      special_instructions: orderRequest.specialInstructions || null,
    });

    // Create order items
    const orderItemsWithOrderId = orderItemsData.map(item => ({
      ...item,
      order_id: order.id,
    }));

    await this.orderRepository.createOrderItems(orderItemsWithOrderId);

    return this.mapToOrder(order);
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId: string, userId: string): Promise<any> {
    const order = await this.orderRepository.findByIdWithItems(orderId);

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    // Verify order belongs to user
    if ((order as any).user_id !== userId) {
      throw new AppError(403, 'Access denied');
    }

    return order;
  }

  /**
   * Get user orders
   */
  async getUserOrders(userId: string): Promise<Order[]> {
    const orders = await this.orderRepository.findByUserId(userId);
    return orders.map(this.mapToOrder);
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    const updatedOrder = await this.orderRepository.updateStatus(orderId, status);
    return this.mapToOrder(updatedOrder);
  }

  /**
   * Convert database row to application model
   */
  private mapToOrder(row: any): Order {
    return {
      id: row.id,
      userId: row.user_id,
      restaurantId: row.restaurant_id,
      status: row.status as OrderStatus,
      totalAmount: row.total_amount,
      deliveryFee: row.delivery_fee,
      deliveryAddress: row.delivery_address,
      specialInstructions: row.special_instructions,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}