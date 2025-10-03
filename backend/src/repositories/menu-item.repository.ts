import { supabaseAdmin } from '../config/supabase';
import { Database } from '../types/database.types';

type MenuItemRow = Database['public']['Tables']['menu_items']['Row'];

export const findByRestaurantId = async (restaurantId: string): Promise<MenuItemRow[]> => {
  const { data, error } = await supabaseAdmin
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .order('category', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch menu items: ${error.message}`);
  }

  return data || [];
};

export const findById = async (id: string): Promise<MenuItemRow | null> => {
  const { data, error } = await supabaseAdmin
    .from('menu_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch menu item: ${error.message}`);
  }

  return data;
};

export const findAvailableByRestaurantId = async (restaurantId: string): Promise<MenuItemRow[]> => {
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
};

export const findByCategory = async (restaurantId: string, category: string): Promise<MenuItemRow[]> => {
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
};

export const findByIds = async (ids: string[]): Promise<MenuItemRow[]> => {
  const { data, error } = await supabaseAdmin
    .from('menu_items')
    .select('*')
    .in('id', ids);

  if (error) {
    throw new Error(`Failed to fetch menu items: ${error.message}`);
  }

  return data || [];
};
