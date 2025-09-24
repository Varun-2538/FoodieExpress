-- Create menu_items table
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price > 0),
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_available BOOLEAN NOT NULL DEFAULT true,
  preparation_time INTEGER NOT NULL CHECK (preparation_time > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_restaurant_id ON public.menu_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON public.menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_is_available ON public.menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_is_vegetarian ON public.menu_items(is_vegetarian);

-- Enable RLS (Row Level Security)
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

-- Create policies for menu_items (public read access for now)
CREATE POLICY "menu_items_select_all" 
  ON public.menu_items FOR SELECT 
  USING (true);

-- Insert sample menu items data
INSERT INTO public.menu_items (
  restaurant_id, name, description, price, image, category, 
  is_vegetarian, is_available, preparation_time
) VALUES 
  -- Spice Garden items
  ('rest-001', 'Butter Chicken', 'Creamy tomato-based curry with tender chicken pieces', 320, '/butter-chicken.jpg', 'Main Course', false, true, 20),
  ('rest-001', 'Paneer Tikka', 'Grilled cottage cheese with aromatic spices', 280, '/paneer-tikka.jpg', 'Starters', true, true, 15),
  ('rest-001', 'Biryani', 'Fragrant basmati rice with spices and meat', 350, '/biryani.jpg', 'Main Course', false, true, 25),
  ('rest-001', 'Naan', 'Fresh baked Indian bread', 60, '/naan.jpg', 'Breads', true, true, 10),
  ('rest-001', 'Mango Lassi', 'Refreshing yogurt drink with mango', 80, '/mango-lassi.jpg', 'Beverages', true, true, 5),
  
  -- Pizza Palace items
  ('rest-002', 'Margherita Pizza', 'Classic pizza with tomato sauce, mozzarella, and basil', 450, '/margherita-pizza.jpg', 'Pizza', true, true, 18),
  ('rest-002', 'Pepperoni Pizza', 'Spicy pepperoni with mozzarella cheese', 520, '/pepperoni-pizza.jpg', 'Pizza', false, true, 18),
  ('rest-002', 'Caesar Salad', 'Fresh romaine lettuce with Caesar dressing', 220, '/caesar-salad.jpg', 'Salads', true, true, 10),
  ('rest-002', 'Garlic Bread', 'Toasted bread with garlic butter', 150, '/garlic-bread.jpg', 'Sides', true, true, 8),
  ('rest-002', 'Tiramisu', 'Classic Italian dessert', 180, '/tiramisu.jpg', 'Desserts', true, true, 5),
  
  -- Dragon Wok items
  ('rest-003', 'Sweet & Sour Chicken', 'Crispy chicken with sweet and sour sauce', 290, '/sweet-sour-chicken.jpg', 'Main Course', false, true, 22),
  ('rest-003', 'Vegetable Fried Rice', 'Wok-fried rice with mixed vegetables', 220, '/veg-fried-rice.jpg', 'Rice & Noodles', true, true, 15),
  ('rest-003', 'Spring Rolls', 'Crispy vegetable spring rolls', 160, '/spring-rolls.jpg', 'Starters', true, true, 12),
  ('rest-003', 'Kung Pao Chicken', 'Spicy chicken with peanuts and vegetables', 310, '/kung-pao-chicken.jpg', 'Main Course', false, true, 20),
  ('rest-003', 'Hot & Sour Soup', 'Traditional Chinese soup with tofu and mushrooms', 120, '/hot-sour-soup.jpg', 'Soups', true, true, 10)
ON CONFLICT (id) DO NOTHING;
