export interface Database {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string
          name: string
          image: string
          rating: number
          delivery_time: string
          cuisine_types: string[]
          minimum_order: number
          delivery_fee: number
          is_open: boolean
          address: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          image: string
          rating: number
          delivery_time: string
          cuisine_types: string[]
          minimum_order: number
          delivery_fee: number
          is_open?: boolean
          address: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          image?: string
          rating?: number
          delivery_time?: string
          cuisine_types?: string[]
          minimum_order?: number
          delivery_fee?: number
          is_open?: boolean
          address?: string
          created_at?: string
          updated_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          restaurant_id: string
          name: string
          description: string
          price: number
          image: string
          category: string
          is_vegetarian: boolean
          is_available: boolean
          preparation_time: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          name: string
          description: string
          price: number
          image: string
          category: string
          is_vegetarian?: boolean
          is_available?: boolean
          preparation_time: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          name?: string
          description?: string
          price?: number
          image?: string
          category?: string
          is_vegetarian?: boolean
          is_available?: boolean
          preparation_time?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          restaurant_id: string
          status: string
          total_amount: number
          delivery_fee: number
          delivery_address: string
          special_instructions: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          restaurant_id: string
          status?: string
          total_amount: number
          delivery_fee: number
          delivery_address: string
          special_instructions?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          restaurant_id?: string
          status?: string
          total_amount?: number
          delivery_fee?: number
          delivery_address?: string
          special_instructions?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          menu_item_id: string
          quantity: number
          price: number
          special_instructions: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          menu_item_id: string
          quantity: number
          price: number
          special_instructions?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          menu_item_id?: string
          quantity?: number
          price?: number
          special_instructions?: string | null
          created_at?: string
        }
      }
    }
  }
}