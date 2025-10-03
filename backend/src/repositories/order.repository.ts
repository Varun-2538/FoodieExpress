import { supabaseAdmin } from '../config/supabase';
import { Database } from '../types/database.types';

type OrderRow = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderItemRow = Database['public']['Tables']['order_items']['Row'];
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert'];

export class OrderRepository {
  /**
   * Create a new order
   */
  async create(order: OrderInsert): Promise<OrderRow> {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert(order as any)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }

    return data as OrderRow;
  }

  /**
   * Create order items
   */
  async createOrderItems(orderItems: OrderItemInsert[]): Promise<OrderItemRow[]> {
    const { data, error } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems as any)
      .select();

    if (error) {
      throw new Error(`Failed to create order items: ${error.message}`);
    }

    return data as OrderItemRow[];
  }

  /**
   * Get order by ID
   */
  async findById(id: string): Promise<OrderRow | null> {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new Error(`Failed to fetch order: ${error.message}`);
    }

    return data;
  }

  /**
   * Get order items by order ID
   */
  async findOrderItemsByOrderId(orderId: string): Promise<OrderItemRow[]> {
    const { data, error } = await supabaseAdmin
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    if (error) {
      throw new Error(`Failed to fetch order items: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get orders by user ID
   */
  async findByUserId(userId: string): Promise<OrderRow[]> {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch user orders: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Update order status
   */
  async updateStatus(orderId: string, status: string): Promise<OrderRow> {
    const updateData: any = { status, updated_at: new Date().toISOString() };
    const result = await (supabaseAdmin as any)
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single();

    const { data, error } = result;

    if (error) {
      throw new Error(`Failed to update order status: ${error.message}`);
    }

    return data as OrderRow;
  }

  /**
   * Get order with items (joined query)
   */
  async findByIdWithItems(orderId: string) {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          menu_items (*)
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Failed to fetch order with items: ${error.message}`);
    }

    return data;
  }
}