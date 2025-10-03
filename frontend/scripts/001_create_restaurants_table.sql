-- Create restaurants table
CREATE TABLE IF NOT EXISTS public.restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  rating DECIMAL(2,1) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  delivery_time TEXT NOT NULL,
  cuisine_types TEXT[] NOT NULL,
  minimum_order INTEGER NOT NULL CHECK (minimum_order >= 0),
  delivery_fee INTEGER NOT NULL CHECK (delivery_fee >= 0),
  is_open BOOLEAN NOT NULL DEFAULT true,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_restaurants_is_open ON public.restaurants(is_open);
CREATE INDEX IF NOT EXISTS idx_restaurants_cuisine_types ON public.restaurants USING GIN(cuisine_types);
CREATE INDEX IF NOT EXISTS idx_restaurants_rating ON public.restaurants(rating DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;

-- Create policies for restaurants (public read access for now)
CREATE POLICY "restaurants_select_all" 
  ON public.restaurants FOR SELECT 
  USING (true);

-- Insert sample restaurants data
INSERT INTO public.restaurants (
  id, name, image, rating, delivery_time, cuisine_types, 
  minimum_order, delivery_fee, is_open, address
) VALUES 
  (
    'rest-001',
    'Spice Garden',
    '/spice-garden.jpg',
    4.5,
    '25-35 mins',
    ARRAY['Indian', 'Vegetarian'],
    200,
    40,
    true,
    '123 Main Street, Downtown'
  ),
  (
    'rest-002',
    'Pizza Palace',
    '/pizza-palace.jpg',
    4.2,
    '20-30 mins',
    ARRAY['Italian', 'Pizza'],
    300,
    50,
    true,
    '456 Oak Avenue, City Center'
  ),
  (
    'rest-003',
    'Dragon Wok',
    '/dragon-wok.jpg',
    4.3,
    '30-40 mins',
    ARRAY['Chinese', 'Asian'],
    250,
    45,
    true,
    '789 Pine Road, Chinatown'
  ),
  (
    'rest-004',
    'Taco Fiesta',
    '/taco-fiesta.jpg',
    4.1,
    '15-25 mins',
    ARRAY['Mexican', 'Fast Food'],
    150,
    35,
    true,
    '321 Elm Street, West Side'
  ),
  (
    'rest-005',
    'Burger Junction',
    '/burger-junction.jpg',
    4.0,
    '20-30 mins',
    ARRAY['American', 'Burgers'],
    180,
    40,
    true,
    '654 Maple Drive, North End'
  )
ON CONFLICT (id) DO NOTHING;
