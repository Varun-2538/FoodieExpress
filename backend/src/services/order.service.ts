import * as orderRepo from '../repositories/order.repository';
import * as menuItemRepo from '../repositories/menu-item.repository';
import * as restaurantRepo from '../repositories/restaurant.repository';
import { Order, CreateOrderRequest, OrderStatus } from '../types';
import { createAppError } from '../middleware/error.middleware';

const mapToOrder = (row: any): Order => {
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
};

export const createOrder = async (userId: string, orderRequest: CreateOrderRequest): Promise<Order> => {
  // validate restaurant exists
  const restaurant = await restaurantRepo.findById(orderRequest.restaurantId);
  if (!restaurant) {
    throw createAppError(404, 'Restaurant not found');
  }

  if (!restaurant.is_open) {
    throw createAppError(400, 'Restaurant is currently closed');
  }

  // validate menu items
  const menuItemIds = orderRequest.items.map(item => item.menuItemId);
  const menuItems = await menuItemRepo.findByIds(menuItemIds);

  if (menuItems.length !== menuItemIds.length) {
    throw createAppError(400, 'One or more menu items not found');
  }

  // check if all items belong to the same restaurant
  const invalidItems = menuItems.filter(item => item.restaurant_id !== orderRequest.restaurantId);
  if (invalidItems.length > 0) {
    throw createAppError(400, 'All items must be from the same restaurant');
  }

  // validate availability
  const unavailableItems = menuItems.filter(item => !item.is_available);
  if (unavailableItems.length > 0) {
    throw createAppError(400, 'One or more items are not available');
  }

  // calculate total
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

  // check minimum order requirement
  if (totalAmount < restaurant.minimum_order) {
    throw createAppError(
      400,
      `Minimum order amount is ${restaurant.minimum_order}. Current total: ${totalAmount}`
    );
  }

  // create the order
  const order = await orderRepo.create({
    user_id: userId,
    restaurant_id: orderRequest.restaurantId,
    status: OrderStatus.PENDING,
    total_amount: totalAmount,
    delivery_fee: restaurant.delivery_fee,
    delivery_address: orderRequest.deliveryAddress,
    special_instructions: orderRequest.specialInstructions || null,
  });

  // add order items
  const orderItemsWithOrderId = orderItemsData.map(item => ({
    ...item,
    order_id: order.id,
  }));

  await orderRepo.createOrderItems(orderItemsWithOrderId);

  return mapToOrder(order);
};

export const getOrderById = async (orderId: string, userId: string): Promise<any> => {
  const order = await orderRepo.findByIdWithItems(orderId);

  if (!order) {
    throw createAppError(404, 'Order not found');
  }

  // verify ownership
  if ((order as any).user_id !== userId) {
    throw createAppError(403, 'Access denied');
  }

  return order;
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const orders = await orderRepo.findByUserId(userId);
  return orders.map(mapToOrder);
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<Order> => {
  const order = await orderRepo.findById(orderId);

  if (!order) {
    throw createAppError(404, 'Order not found');
  }

  const updatedOrder = await orderRepo.updateStatus(orderId, status);
  return mapToOrder(updatedOrder);
};
