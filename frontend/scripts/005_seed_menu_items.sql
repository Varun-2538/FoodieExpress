-- Seed menu_items table with mock data
INSERT INTO menu_items (
  id, restaurant_id, name, description, price, image, 
  category, is_vegetarian, is_available, preparation_time
) VALUES 
  -- Spice Garden (Indian) - Restaurant ID: 1
  ('1-1', '1', 'Butter Chicken', 'Creamy tomato-based curry with tender chicken pieces', 
   320, '/butter-chicken-curry.png', 'Main Course', false, true, 20),
  ('1-2', '1', 'Paneer Tikka Masala', 'Grilled cottage cheese in rich spiced gravy', 
   280, '/paneer-tikka-masala.png', 'Main Course', true, true, 18),
  ('1-3', '1', 'Garlic Naan', 'Fresh baked bread with garlic and herbs', 
   80, '/garlic-naan.png', 'Breads', true, true, 10),
  ('1-4', '1', 'Samosa Chaat', 'Crispy samosas topped with chutneys and yogurt', 
   120, '/samosa-chaat-indian-street-food.jpg', 'Starters', true, true, 12),
  ('1-5', '1', 'Mango Lassi', 'Traditional yogurt drink with fresh mango', 
   90, '/mango-lassi.png', 'Beverages', true, true, 5),

  -- Pizza Palace (Italian) - Restaurant ID: 2
  ('2-1', '2', 'Margherita Pizza', 'Classic pizza with fresh mozzarella, tomatoes, and basil', 
   350, '/margherita-pizza-classic.jpg', 'Pizza', true, true, 25),
  ('2-2', '2', 'Pepperoni Supreme', 'Loaded with pepperoni, cheese, and Italian herbs', 
   450, '/pepperoni-pizza-supreme.jpg', 'Pizza', false, true, 28),
  ('2-3', '2', 'Garlic Breadsticks', 'Crispy breadsticks with garlic butter and herbs', 
   150, '/garlic-breadsticks-italian.jpg', 'Starters', true, true, 15),
  ('2-4', '2', 'Chicken Alfredo Pasta', 'Creamy pasta with grilled chicken and parmesan', 
   380, '/chicken-alfredo-pasta.png', 'Pasta', false, true, 22),

  -- Dragon Wok (Chinese) - Restaurant ID: 3
  ('3-1', '3', 'Chicken Fried Rice', 'Wok-tossed rice with chicken, vegetables, and soy sauce', 
   280, '/chicken-fried-rice-chinese.jpg', 'Rice', false, true, 18),
  ('3-2', '3', 'Vegetable Hakka Noodles', 'Stir-fried noodles with fresh vegetables and sauces', 
   250, '/hakka-noodles-vegetables.jpg', 'Noodles', true, true, 16),
  ('3-3', '3', 'Honey Chilli Chicken', 'Crispy chicken tossed in sweet and spicy sauce', 
   320, '/honey-chilli-chicken.jpg', 'Main Course', false, true, 20),
  ('3-4', '3', 'Spring Rolls', 'Crispy rolls filled with vegetables and served with sauce', 
   180, '/spring-rolls-chinese-appetizer.jpg', 'Starters', true, true, 12),

  -- Taco Fiesta (Mexican) - Restaurant ID: 4
  ('4-1', '4', 'Chicken Tacos', 'Soft tacos with grilled chicken, salsa, and guacamole', 
   240, '/chicken-tacos-mexican.jpg', 'Tacos', false, true, 15),
  ('4-2', '4', 'Veggie Burrito Bowl', 'Rice bowl with black beans, vegetables, and cheese', 
   280, '/burrito-bowl-vegetarian.jpg', 'Bowls', true, true, 18),
  ('4-3', '4', 'Loaded Nachos', 'Tortilla chips with cheese, jalapeños, and sour cream', 
   220, '/loaded-nachos-mexican.jpg', 'Starters', true, true, 12),

  -- Burger Junction (American) - Restaurant ID: 5
  ('5-1', '5', 'Classic Beef Burger', 'Juicy beef patty with lettuce, tomato, and special sauce', 
   320, '/classic-beef-burger.png', 'Burgers', false, true, 20),
  ('5-2', '5', 'Crispy Chicken Burger', 'Fried chicken breast with coleslaw and mayo', 
   300, '/crispy-chicken-burger.png', 'Burgers', false, true, 18),
  ('5-3', '5', 'Loaded Fries', 'French fries topped with cheese, bacon, and herbs', 
   180, '/loaded-french-fries.jpg', 'Sides', false, true, 12);
