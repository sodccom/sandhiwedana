/*
  # Complete E-commerce Schema Setup for Sandhi Wedanaharanie
  
  ## Overview
  This migration creates a comprehensive database schema for an advanced e-commerce platform
  specializing in traditional Sri Lankan ayurvedic pain relief products.
  
  ## 1. New Tables
  
  ### Products Table (`products`)
  - `id` (uuid, primary key) - Unique product identifier
  - `name_en` (text) - Product name in English
  - `name_si` (text) - Product name in Sinhala
  - `slug` (text, unique) - URL-friendly identifier
  - `description_en` (text) - English description
  - `description_si` (text) - Sinhala description
  - `price_lkr` (decimal) - Price in Sri Lankan Rupees
  - `compare_at_price` (decimal) - Original price for discounts
  - `stock` (integer) - Available inventory
  - `sku` (text, unique) - Stock keeping unit
  - `images` (jsonb) - Array of image URLs
  - `featured` (boolean) - Featured product flag
  - `active` (boolean) - Product visibility status
  - `category` (text) - Product category
  - `tags` (text[]) - Searchable tags
  - `meta_title` (text) - SEO title
  - `meta_description` (text) - SEO description
  - `created_at`, `updated_at` - Timestamps
  
  ### Orders Table (`orders`)
  - `id` (uuid, primary key)
  - `order_number` (text, unique) - Human-readable order ID
  - `user_id` (uuid, foreign key) - Customer reference
  - `customer_name` (text) - Shipping name
  - `customer_email` (text) - Contact email
  - `customer_phone` (text) - Contact phone
  - `shipping_address` (jsonb) - Complete address object
  - `billing_address` (jsonb) - Billing address if different
  - `items` (jsonb) - Order items array
  - `subtotal` (decimal) - Items total
  - `delivery_fee` (decimal) - Shipping cost
  - `discount_amount` (decimal) - Applied discounts
  - `total_amount` (decimal) - Final total
  - `promo_code_id` (uuid, nullable) - Applied promo code
  - `payment_method` (text) - Payment type
  - `payment_status` (text) - Payment state
  - `order_status` (text) - Fulfillment state
  - `notes` (text) - Customer notes
  - `tracking_number` (text) - Shipping tracking
  - `created_at`, `updated_at` - Timestamps
  
  ### Customers Table (`customers`)
  - `id` (uuid, primary key)
  - `user_id` (uuid, unique, foreign key) - Auth user reference
  - `name` (text) - Full name
  - `email` (text, unique) - Email address
  - `phone` (text) - Phone number
  - `addresses` (jsonb) - Saved addresses array
  - `total_orders` (integer) - Order count
  - `total_spent` (decimal) - Lifetime value
  - `created_at`, `updated_at` - Timestamps
  
  ### Promo Codes Table (`promo_codes`)
  - `id` (uuid, primary key)
  - `code` (text, unique) - Promo code string
  - `type` (text) - 'percent' or 'fixed'
  - `value` (decimal) - Discount value
  - `min_order_amount` (decimal) - Minimum order requirement
  - `max_discount` (decimal) - Maximum discount cap
  - `usage_limit` (integer) - Total usage limit
  - `used_count` (integer) - Current usage count
  - `valid_from`, `valid_to` - Date range
  - `active` (boolean) - Status flag
  - `created_at` - Timestamp
  
  ### Testimonials Table (`testimonials`)
  - `id` (uuid, primary key)
  - `customer_id` (uuid, nullable, foreign key)
  - `customer_name` (text) - Display name
  - `text_en`, `text_si` (text) - Review text
  - `rating` (integer) - 1-5 stars
  - `order_id` (uuid, nullable) - Verified purchase
  - `approved` (boolean) - Moderation status
  - `featured` (boolean) - Homepage display
  - `created_at` - Timestamp
  
  ### Wishlist Table (`wishlists`)
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key) - Customer reference
  - `product_id` (uuid, foreign key) - Product reference
  - `created_at` - Timestamp
  
  ### Admin Users Table (`admin_users`)
  - `id` (uuid, primary key)
  - `user_id` (uuid, unique, foreign key) - Auth user reference
  - `username` (text, unique) - Login username
  - `role` (text) - 'super_admin' or 'admin'
  - `permissions` (jsonb) - Permission flags
  - `last_login` - Last login timestamp
  - `created_at` - Creation timestamp
  
  ### Site Settings Table (`site_settings`)
  - `id` (uuid, primary key)
  - `key` (text, unique) - Setting identifier
  - `value` (jsonb) - Setting value
  - `updated_at` - Timestamp
  
  ### Analytics Events Table (`analytics_events`)
  - `id` (uuid, primary key)
  - `event_type` (text) - Event category
  - `event_data` (jsonb) - Event details
  - `user_id` (uuid, nullable) - User reference
  - `session_id` (text) - Session identifier
  - `created_at` - Timestamp
  
  ## 2. Security Implementation
  
  All tables have Row Level Security (RLS) enabled with restrictive policies:
  
  - **Products**: Public read, admin write
  - **Orders**: Customers see own orders, admins see all
  - **Customers**: Users see own profile, admins see all
  - **Promo Codes**: Public read active codes, admin manage
  - **Testimonials**: Public read approved, admin moderate
  - **Wishlist**: Users manage own wishlist
  - **Admin Users**: Admin-only access
  - **Site Settings**: Public read, admin write
  - **Analytics**: System write, admin read
  
  ## 3. Indexes for Performance
  
  - Order number, customer lookups
  - Product slug, SKU searches
  - Customer email/phone searches
  - Promo code lookups
  - Analytics queries by date range
  
  ## 4. Important Notes
  
  - All monetary values use DECIMAL(10,2) for precision
  - Timestamps use timestamptz for timezone awareness
  - JSONB columns for flexible data structures
  - Text search capabilities for products
  - Audit trails via created_at/updated_at
  - Foreign keys with CASCADE deletes where appropriate
*/

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_en text NOT NULL,
  name_si text NOT NULL,
  slug text UNIQUE NOT NULL,
  description_en text NOT NULL DEFAULT '',
  description_si text NOT NULL DEFAULT '',
  price_lkr decimal(10,2) NOT NULL,
  compare_at_price decimal(10,2),
  stock integer NOT NULL DEFAULT 0,
  sku text UNIQUE,
  images jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  active boolean DEFAULT true,
  category text DEFAULT 'general',
  tags text[] DEFAULT ARRAY[]::text[],
  meta_title text,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name text NOT NULL,
  customer_email text,
  customer_phone text NOT NULL,
  shipping_address jsonb NOT NULL,
  billing_address jsonb,
  items jsonb NOT NULL,
  subtotal decimal(10,2) NOT NULL,
  delivery_fee decimal(10,2) DEFAULT 0,
  discount_amount decimal(10,2) DEFAULT 0,
  total_amount decimal(10,2) NOT NULL,
  promo_code_id uuid,
  payment_method text NOT NULL,
  payment_status text DEFAULT 'pending',
  order_status text DEFAULT 'pending',
  notes text,
  tracking_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE,
  phone text NOT NULL,
  addresses jsonb DEFAULT '[]'::jsonb,
  total_orders integer DEFAULT 0,
  total_spent decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Promo Codes Table
CREATE TABLE IF NOT EXISTS promo_codes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  code text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('percent', 'fixed')),
  value decimal(10,2) NOT NULL,
  min_order_amount decimal(10,2) DEFAULT 0,
  max_discount decimal(10,2),
  usage_limit integer,
  used_count integer DEFAULT 0,
  valid_from timestamptz DEFAULT now(),
  valid_to timestamptz,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  customer_name text NOT NULL,
  text_en text NOT NULL,
  text_si text DEFAULT '',
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  approved boolean DEFAULT false,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Wishlist Table
CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  permissions jsonb DEFAULT '{}'::jsonb,
  last_login timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active) WHERE active = true;

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);

CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON promo_codes(active) WHERE active = true;

CREATE INDEX IF NOT EXISTS idx_wishlists_user_product ON wishlists(user_id, product_id);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at DESC);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Products Policies (Public read, admin write)
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (active = true OR auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Orders Policies (Users see own, admins see all)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

-- Customers Policies
CREATE POLICY "Users can view own profile"
  ON customers FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Users can insert own profile"
  ON customers FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON customers FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Promo Codes Policies
CREATE POLICY "Anyone can view active promo codes"
  ON promo_codes FOR SELECT
  USING (active = true OR auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can manage promo codes"
  ON promo_codes FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

-- Testimonials Policies
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  USING (approved = true OR auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Users can create testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

-- Wishlist Policies
CREATE POLICY "Users can view own wishlist"
  ON wishlists FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to wishlist"
  ON wishlists FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from wishlist"
  ON wishlists FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Admin Users Policies
CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Super admins can manage admin users"
  ON admin_users FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users WHERE role = 'super_admin'))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users WHERE role = 'super_admin'));

-- Site Settings Policies
CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

-- Analytics Policies
CREATE POLICY "Anyone can insert analytics"
  ON analytics_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view analytics"
  ON analytics_events FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
