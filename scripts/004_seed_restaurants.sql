-- Seed restaurants table with mock data
INSERT INTO restaurants (
  id, name, image, rating, delivery_time, cuisine_types, 
  minimum_order, delivery_fee, is_open, address
) VALUES 
  ('1', 'Spice Garden', '/indian-restaurant-exterior.jpg', 4.5, '25-35 mins', 
   ARRAY['Indian', 'North Indian', 'Vegetarian'], 200, 40, true, 'MG Road, Bangalore'),
  ('2', 'Pizza Palace', '/italian-pizza-restaurant.jpg', 4.2, '30-40 mins', 
   ARRAY['Italian', 'Pizza', 'Fast Food'], 300, 50, true, 'Koramangala, Bangalore'),
  ('3', 'Dragon Wok', '/chinese-restaurant-interior.png', 4.3, '20-30 mins', 
   ARRAY['Chinese', 'Asian', 'Noodles'], 250, 35, true, 'Indiranagar, Bangalore'),
  ('4', 'Taco Fiesta', '/colorful-mexican-restaurant.png', 4.1, '35-45 mins', 
   ARRAY['Mexican', 'Tex-Mex', 'Spicy'], 180, 45, true, 'HSR Layout, Bangalore'),
  ('5', 'Burger Junction', '/modern-burger-restaurant.png', 4.0, '15-25 mins', 
   ARRAY['American', 'Burgers', 'Fast Food'], 150, 30, true, 'Whitefield, Bangalore'),
  ('6', 'Sushi Zen', '/japanese-sushi-restaurant-elegant.jpg', 4.6, '40-50 mins', 
   ARRAY['Japanese', 'Sushi', 'Healthy'], 500, 60, false, 'UB City Mall, Bangalore'),
  ('7', 'Curry Express', '/south-indian-restaurant-traditional.jpg', 4.4, '20-30 mins', 
   ARRAY['South Indian', 'Vegetarian', 'Traditional'], 120, 25, true, 'Jayanagar, Bangalore'),
  ('8', 'Mediterranean Delight', '/mediterranean-restaurant-fresh.jpg', 4.3, '30-40 mins', 
   ARRAY['Mediterranean', 'Healthy', 'Salads'], 280, 40, true, 'Brigade Road, Bangalore'),
  ('9', 'BBQ Nation Express', '/bbq-restaurant-grilled-food.jpg', 4.2, '35-45 mins', 
   ARRAY['BBQ', 'Grilled', 'Non-Vegetarian'], 400, 55, true, 'Electronic City, Bangalore'),
  ('10', 'Sweet Treats Cafe', '/dessert-cafe-pastries.jpg', 4.5, '25-35 mins', 
   ARRAY['Desserts', 'Cafe', 'Beverages'], 100, 20, true, 'Commercial Street, Bangalore');
