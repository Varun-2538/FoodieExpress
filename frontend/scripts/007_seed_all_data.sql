-- Insert restaurants data
INSERT INTO restaurants (name, description, image_url, rating, delivery_time, delivery_fee, minimum_order, cuisine_type, is_open) VALUES
('Pizza Palace', 'Authentic Italian pizzas made with fresh ingredients and traditional recipes', '/placeholder.svg?height=200&width=300', 4.5, '25-35 min', 2.99, 15.00, 'Italian', true),
('Burger Barn', 'Gourmet burgers made with premium beef and fresh toppings', '/placeholder.svg?height=200&width=300', 4.2, '20-30 min', 1.99, 12.00, 'American', true),
('Sushi Zen', 'Fresh sushi and Japanese cuisine prepared by expert chefs', '/placeholder.svg?height=200&width=300', 4.7, '30-40 min', 3.99, 20.00, 'Japanese', true),
('Taco Fiesta', 'Authentic Mexican tacos and burritos with bold flavors', '/placeholder.svg?height=200&width=300', 4.3, '15-25 min', 1.49, 10.00, 'Mexican', true),
('Green Garden', 'Healthy vegetarian and vegan options with organic ingredients', '/placeholder.svg?height=200&width=300', 4.4, '20-30 min', 2.49, 18.00, 'Vegetarian', true),
('Noodle House', 'Traditional Asian noodle dishes and stir-fries', '/placeholder.svg?height=200&width=300', 4.1, '25-35 min', 2.99, 15.00, 'Asian', true);

-- Insert menu items data
INSERT INTO menu_items (restaurant_id, name, description, price, image_url, category, is_available) VALUES
-- Pizza Palace items
(1, 'Margherita Pizza', 'Classic pizza with tomato sauce, mozzarella, and fresh basil', 14.99, '/placeholder.svg?height=150&width=200', 'Pizza', true),
(1, 'Pepperoni Pizza', 'Traditional pepperoni pizza with mozzarella cheese', 16.99, '/placeholder.svg?height=150&width=200', 'Pizza', true),
(1, 'Caesar Salad', 'Fresh romaine lettuce with Caesar dressing and croutons', 9.99, '/placeholder.svg?height=150&width=200', 'Salad', true),
(1, 'Garlic Bread', 'Toasted bread with garlic butter and herbs', 5.99, '/placeholder.svg?height=150&width=200', 'Appetizer', true),

-- Burger Barn items
(2, 'Classic Cheeseburger', 'Beef patty with cheese, lettuce, tomato, and special sauce', 12.99, '/placeholder.svg?height=150&width=200', 'Burger', true),
(2, 'BBQ Bacon Burger', 'Beef patty with BBQ sauce, bacon, and onion rings', 15.99, '/placeholder.svg?height=150&width=200', 'Burger', true),
(2, 'Sweet Potato Fries', 'Crispy sweet potato fries with seasoning', 6.99, '/placeholder.svg?height=150&width=200', 'Side', true),
(2, 'Chocolate Milkshake', 'Rich chocolate milkshake topped with whipped cream', 4.99, '/placeholder.svg?height=150&width=200', 'Drink', true),

-- Sushi Zen items
(3, 'Salmon Roll', 'Fresh salmon with avocado and cucumber', 8.99, '/placeholder.svg?height=150&width=200', 'Sushi', true),
(3, 'Tuna Sashimi', 'Fresh tuna slices served with wasabi and ginger', 12.99, '/placeholder.svg?height=150&width=200', 'Sashimi', true),
(3, 'Miso Soup', 'Traditional Japanese soup with tofu and seaweed', 3.99, '/placeholder.svg?height=150&width=200', 'Soup', true),
(3, 'Edamame', 'Steamed soybeans with sea salt', 4.99, '/placeholder.svg?height=150&width=200', 'Appetizer', true),

-- Taco Fiesta items
(4, 'Beef Tacos', 'Three soft tacos with seasoned beef, lettuce, and cheese', 9.99, '/placeholder.svg?height=150&width=200', 'Taco', true),
(4, 'Chicken Burrito', 'Large burrito with grilled chicken, rice, beans, and salsa', 11.99, '/placeholder.svg?height=150&width=200', 'Burrito', true),
(4, 'Guacamole & Chips', 'Fresh guacamole served with tortilla chips', 6.99, '/placeholder.svg?height=150&width=200', 'Appetizer', true),
(4, 'Churros', 'Fried dough pastry with cinnamon sugar', 5.99, '/placeholder.svg?height=150&width=200', 'Dessert', true),

-- Green Garden items
(5, 'Quinoa Bowl', 'Quinoa with roasted vegetables and tahini dressing', 13.99, '/placeholder.svg?height=150&width=200', 'Bowl', true),
(5, 'Veggie Burger', 'Plant-based burger with lettuce, tomato, and avocado', 11.99, '/placeholder.svg?height=150&width=200', 'Burger', true),
(5, 'Green Smoothie', 'Spinach, banana, and mango smoothie', 7.99, '/placeholder.svg?height=150&width=200', 'Drink', true),
(5, 'Hummus Plate', 'Homemade hummus with vegetables and pita bread', 8.99, '/placeholder.svg?height=150&width=200', 'Appetizer', true),

-- Noodle House items
(6, 'Pad Thai', 'Stir-fried rice noodles with shrimp, tofu, and peanuts', 12.99, '/placeholder.svg?height=150&width=200', 'Noodles', true),
(6, 'Beef Lo Mein', 'Soft noodles with beef and mixed vegetables', 11.99, '/placeholder.svg?height=150&width=200', 'Noodles', true),
(6, 'Spring Rolls', 'Fresh spring rolls with vegetables and peanut sauce', 6.99, '/placeholder.svg?height=150&width=200', 'Appetizer', true),
(6, 'Hot & Sour Soup', 'Traditional Chinese soup with tofu and mushrooms', 4.99, '/placeholder.svg?height=150&width=200', 'Soup', true);
