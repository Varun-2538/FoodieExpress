import { supabaseAdmin } from '../config/supabase';
import { Database } from '../types/database.types';

type RestaurantRow = Database['public']['Tables']['restaurants']['Row'];

export class RestaurantRepository {
  /**
   * Get all restaurants
   */
  async findAll(): Promise<RestaurantRow[]> {
    const { data, error } = await supabaseAdmin
      .from('restaurants')
      .select('*')
      .order('rating', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch restaurants: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get restaurant by ID
   */
  async findById(id: string): Promise<RestaurantRow | null> {
    const { data, error } = await supabaseAdmin
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Not found
      }
      throw new Error(`Failed to fetch restaurant: ${error.message}`);
    }

    return data;
  }

  /**
   * Search restaurants by name or cuisine
   */
  async search(query: string): Promise<RestaurantRow[]> {
    const { data, error } = await supabaseAdmin
      .from('restaurants')
      .select('*')
      .or(`name.ilike.%${query}%,cuisine_types.cs.{${query}}`)
      .order('rating', { ascending: false });

    if (error) {
      throw new Error(`Failed to search restaurants: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get open restaurants
   */
  async findOpen(): Promise<RestaurantRow[]> {
    const { data, error } = await supabaseAdmin
      .from('restaurants')
      .select('*')
      .eq('is_open', true)
      .order('rating', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch open restaurants: ${error.message}`);
    }

    return data || [];
  }
}