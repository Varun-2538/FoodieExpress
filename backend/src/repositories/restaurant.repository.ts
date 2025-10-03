import { supabaseAdmin } from '../config/supabase';
import { Database } from '../types/database.types';

type RestaurantRow = Database['public']['Tables']['restaurants']['Row'];

export const findAll = async (): Promise<RestaurantRow[]> => {
  const { data, error } = await supabaseAdmin
    .from('restaurants')
    .select('*')
    .order('rating', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch restaurants: ${error.message}`);
  }

  return data || [];
};

export const findById = async (id: string): Promise<RestaurantRow | null> => {
  const { data, error } = await supabaseAdmin
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    // not found case
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to fetch restaurant: ${error.message}`);
  }

  return data;
};

export const search = async (query: string): Promise<RestaurantRow[]> => {
  const { data, error } = await supabaseAdmin
    .from('restaurants')
    .select('*')
    .or(`name.ilike.%${query}%,cuisine_types.cs.{${query}}`)
    .order('rating', { ascending: false });

  if (error) {
    throw new Error(`Failed to search restaurants: ${error.message}`);
  }

  return data || [];
};

export const findOpen = async (): Promise<RestaurantRow[]> => {
  const { data, error } = await supabaseAdmin
    .from('restaurants')
    .select('*')
    .eq('is_open', true)
    .order('rating', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch open restaurants: ${error.message}`);
  }

  return data || [];
};
