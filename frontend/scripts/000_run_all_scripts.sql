-- Master script to run all database setup scripts in order
-- This ensures tables are created before seeding data

-- Create tables first
\i 001_create_restaurants_table.sql
\i 002_create_menu_items_table.sql  
\i 003_create_orders_table.sql

-- Then seed data
\i 004_seed_restaurants.sql
\i 005_seed_menu_items.sql
