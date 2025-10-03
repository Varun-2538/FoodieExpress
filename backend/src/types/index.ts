import { Request } from 'express';

// Core application types
export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisineTypes: string[];
  minimumOrder: number;
  deliveryFee: number;
  isOpen: boolean;
  address: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian: boolean;
  isAvailable: boolean;
  preparationTime: number;
}

export interface Order {
  id: string;
  userId: string | null;
  restaurantId: string;
  status: OrderStatus;
  totalAmount: number;
  deliveryFee: number;
  deliveryAddress: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface CreateOrderRequest {
  restaurantId: string;
  items: {
    menuItemId: string;
    quantity: number;
    specialInstructions?: string;
  }[];
  deliveryAddress: string;
  specialInstructions?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

// Extended Express Request with user
export interface AuthRequest extends Request {
  user?: AuthUser;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}