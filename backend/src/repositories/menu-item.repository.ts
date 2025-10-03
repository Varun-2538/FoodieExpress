import { supabaseAdmin } from '../config/supabase';
import { Database } from '../types/database.types';

type MenuItemRow = Database['public']['Tables']['menu_items']['Row'];

export class MenuItemRepository {
  /**
   * Get all menu items for a restaurant
   */
  async findByRestaurantId(restaurantId: string): Promise<MenuItemRow[]> {
    const { data, error } = await supabaseAdmin
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('category', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch menu items: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get menu item by ID
   */
  async findById(id: string): Promise<MenuItemRow | null> {
    const { data, error } = await supabaseAdmin
      .from('menu_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new Error(`Failed to fetch menu item: ${error.message}`);
    }

    return data;
  }

  /**
   * Get available menu items for a restaurant
   */
  async findAvailableByRestaurantId(restaurantId: string): Promise<MenuItemRow[]> {
    const { data, error } = await supabaseAdmin
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .eq('is_available', true)
      .order('category', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch available menu items: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get menu items by category
   */
  async findByCategory(restaurantId: string, category: string): Promise<MenuItemRow[]> {
    const { data, error } = await supabaseAdmin
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .eq('category', category)
      .order('name', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch menu items by category: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get multiple menu items by IDs
   */
  async findByIds(ids: string[]): Promise<MenuItemRow[]> {
    const { data, error } = await supabaseAdmin
      .from('menu_items')
      .select('*')
      .in('id', ids);

    if (error) {
      throw new Error(`Failed to fetch menu items: ${error.message}`);
    }

    return data || [];
  }
}