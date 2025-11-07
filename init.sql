-- Initialize QR Menu Database
-- This file will be executed when the PostgreSQL container starts for the first time

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set timezone
SET timezone = 'Asia/Bangkok';

-- Create database if it doesn't exist (this is already created by POSTGRES_DB env var)
-- CREATE DATABASE IF NOT EXISTS qrmenu;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE qrmenu TO postgres;

-- You can add initial data here if needed
-- Example:
/*
INSERT INTO restaurants (id, name, description, address, phone, email, created_at, updated_at) VALUES 
(uuid_generate_v4(), 'Sample Restaurant', 'A sample restaurant for testing', '123 Main St', '02-123-4567', 'info@sample.com', NOW(), NOW());
*/

-- Create indexes for better performance (will be created by GORM migrations but can be added here)
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_restaurants_name ON restaurants(name);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_menus_restaurant_id ON menus(restaurant_id);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_menu_items_menu_id ON menu_items(menu_id);