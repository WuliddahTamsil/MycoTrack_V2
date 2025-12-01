-- ============================================
-- PostgreSQL Schema untuk MycoTrack
-- ============================================

-- Extension untuk UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. ADMIN TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk email (case-insensitive search)
CREATE INDEX IF NOT EXISTS idx_admins_email_lower ON admins (LOWER(email));

-- ============================================
-- 2. CUSTOMERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    profile_photo TEXT,
    role VARCHAR(50) DEFAULT 'customer' NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0 NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected', 'suspended')),
    admin_message TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_customers_email_lower ON customers (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers (status);

-- ============================================
-- 3. PETANIS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS petanis (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    ktp_photo TEXT,
    role VARCHAR(50) DEFAULT 'petani' NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0 NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected', 'suspended')),
    admin_message TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    -- Shop data (JSONB untuk fleksibilitas)
    shop_name VARCHAR(255),
    shop_description TEXT,
    shop_photo TEXT,
    -- Farm data (JSONB untuk fleksibilitas)
    farm_land_area DECIMAL(10, 2),
    farm_land_photo TEXT,
    farm_mushroom_type VARCHAR(255),
    farm_rack_count INTEGER,
    farm_baglog_count INTEGER,
    farm_harvest_capacity DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_petanis_email_lower ON petanis (LOWER(email));
CREATE INDEX IF NOT EXISTS idx_petanis_status ON petanis (status);

-- ============================================
-- 4. PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(255) PRIMARY KEY,
    farmer_id VARCHAR(255) NOT NULL REFERENCES petanis(id) ON DELETE CASCADE,
    farmer_name VARCHAR(255) NOT NULL, -- Denormalized untuk performa
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(15, 2) NOT NULL CHECK (price > 0),
    stock DECIMAL(10, 2) NOT NULL CHECK (stock >= 0),
    unit VARCHAR(50) NOT NULL,
    category VARCHAR(255) NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_farmer_id ON products (farmer_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products (created_at DESC);

-- ============================================
-- 5. CARTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS carts (
    id VARCHAR(255) PRIMARY KEY,
    customer_id VARCHAR(255) NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    product_id VARCHAR(255) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL, -- Denormalized
    product_image TEXT, -- Denormalized
    farmer_id VARCHAR(255) NOT NULL, -- Denormalized
    farmer_name VARCHAR(255) NOT NULL, -- Denormalized
    price DECIMAL(15, 2) NOT NULL, -- Harga saat ditambahkan ke cart
    unit VARCHAR(50) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
    subtotal DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Unique constraint: satu customer hanya bisa punya satu cart item per product
    UNIQUE(customer_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_carts_customer_id ON carts (customer_id);
CREATE INDEX IF NOT EXISTS idx_carts_product_id ON carts (product_id);

-- ============================================
-- 6. ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(255) PRIMARY KEY,
    customer_id VARCHAR(255) NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    customer_name VARCHAR(255) NOT NULL, -- Denormalized
    farmer_id VARCHAR(255) NOT NULL REFERENCES petanis(id) ON DELETE RESTRICT,
    farmer_name VARCHAR(255) NOT NULL, -- Denormalized
    total DECIMAL(15, 2) NOT NULL CHECK (total >= 0),
    status VARCHAR(50) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    payment_status VARCHAR(50) DEFAULT 'pending' NOT NULL CHECK (payment_status IN ('pending', 'paid', 'failed')),
    payment_method VARCHAR(255) NOT NULL,
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders (customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_farmer_id ON orders (farmer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders (payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

-- ============================================
-- 7. ORDER_ITEMS TABLE (Many-to-Many: Orders ↔ Products)
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(255) PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(255) NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    product_name VARCHAR(255) NOT NULL, -- Denormalized
    product_image TEXT, -- Denormalized
    price DECIMAL(15, 2) NOT NULL, -- Harga saat checkout
    quantity DECIMAL(10, 2) NOT NULL CHECK (quantity > 0),
    unit VARCHAR(50) NOT NULL,
    subtotal DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items (product_id);

-- ============================================
-- 8. ORDER_TRACKING TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS order_tracking (
    id VARCHAR(255) PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_tracking_order_id ON order_tracking (order_id);
CREATE INDEX IF NOT EXISTS idx_order_tracking_timestamp ON order_tracking (timestamp DESC);

-- ============================================
-- 9. FORUM_POSTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS forum_posts (
    id VARCHAR(255) PRIMARY KEY,
    author_id VARCHAR(255) NOT NULL, -- Bisa customer atau petani
    author_name VARCHAR(255) NOT NULL, -- Denormalized
    author_role VARCHAR(50) NOT NULL CHECK (author_role IN ('customer', 'petani', 'admin')),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    views INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_forum_posts_author_id ON forum_posts (author_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created_at ON forum_posts (created_at DESC);

-- ============================================
-- 10. FORUM_LIKES TABLE (Many-to-Many: Posts ↔ Users)
-- ============================================
CREATE TABLE IF NOT EXISTS forum_likes (
    id VARCHAR(255) PRIMARY KEY,
    post_id VARCHAR(255) NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL, -- Denormalized
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Unique constraint: satu user hanya bisa like sekali per post
    UNIQUE(post_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_forum_likes_post_id ON forum_likes (post_id);
CREATE INDEX IF NOT EXISTS idx_forum_likes_user_id ON forum_likes (user_id);

-- ============================================
-- 11. FORUM_COMMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS forum_comments (
    id VARCHAR(255) PRIMARY KEY,
    post_id VARCHAR(255) NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL, -- Denormalized
    user_role VARCHAR(50) NOT NULL CHECK (user_role IN ('customer', 'petani', 'admin')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_forum_comments_post_id ON forum_comments (post_id);
CREATE INDEX IF NOT EXISTS idx_forum_comments_user_id ON forum_comments (user_id);
CREATE INDEX IF NOT EXISTS idx_forum_comments_created_at ON forum_comments (created_at);

-- ============================================
-- 12. LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS logs (
    id VARCHAR(255) PRIMARY KEY,
    action VARCHAR(50) NOT NULL CHECK (action IN ('accepted', 'rejected', 'suspended', 'delete')),
    role VARCHAR(50) NOT NULL CHECK (role IN ('customer', 'petani')),
    user_email VARCHAR(255) NOT NULL,
    admin_email VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    old_status VARCHAR(50),
    new_status VARCHAR(50),
    admin_message TEXT
);

CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_logs_user_email ON logs (user_email);

-- ============================================
-- 13. ARTICLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    image TEXT,
    author VARCHAR(255),
    category VARCHAR(255),
    views INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_articles_category ON articles (category);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles (created_at DESC);

-- ============================================
-- 14. CHATS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS chats (
    id VARCHAR(255) PRIMARY KEY,
    sender_id VARCHAR(255) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    sender_role VARCHAR(50) NOT NULL CHECK (sender_role IN ('customer', 'petani', 'admin')),
    receiver_id VARCHAR(255) NOT NULL,
    receiver_name VARCHAR(255) NOT NULL,
    receiver_role VARCHAR(50) NOT NULL CHECK (receiver_role IN ('customer', 'petani', 'admin')),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_chats_sender_id ON chats (sender_id);
CREATE INDEX IF NOT EXISTS idx_chats_receiver_id ON chats (receiver_id);
CREATE INDEX IF NOT EXISTS idx_chats_created_at ON chats (created_at DESC);

-- ============================================
-- 15. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL CHECK (user_role IN ('customer', 'petani', 'admin')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications (user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications (is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications (created_at DESC);

-- ============================================
-- 16. LEDGER TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS ledger (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL CHECK (user_role IN ('customer', 'petani')),
    transaction_type VARCHAR(50) NOT NULL CHECK (transaction_type IN ('debit', 'credit')),
    amount DECIMAL(15, 2) NOT NULL,
    balance_after DECIMAL(15, 2) NOT NULL,
    description TEXT,
    order_id VARCHAR(255),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ledger_user_id ON ledger (user_id);
CREATE INDEX IF NOT EXISTS idx_ledger_timestamp ON ledger (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_ledger_order_id ON ledger (order_id);

-- ============================================
-- 17. ANALYTICS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS analytics (
    id VARCHAR(255) PRIMARY KEY,
    date DATE NOT NULL,
    metric_name VARCHAR(255) NOT NULL,
    metric_value DECIMAL(15, 2) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date, metric_name)
);

CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics (date DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_metric_name ON analytics (metric_name);

-- ============================================
-- 18. GALLERY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS gallery (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL CHECK (user_role IN ('customer', 'petani', 'admin')),
    image_url TEXT NOT NULL,
    title VARCHAR(255),
    description TEXT,
    category VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_gallery_user_id ON gallery (user_id);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery (category);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery (created_at DESC);

-- ============================================
-- TRIGGER untuk UPDATE updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger ke semua tabel yang punya updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON forum_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_comments_updated_at BEFORE UPDATE ON forum_comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Selesai
-- ============================================

