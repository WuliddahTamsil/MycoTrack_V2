/**
 * Migration Script: JSON to PostgreSQL
 * Script untuk memigrasikan data dari file JSON ke PostgreSQL
 */

const fs = require('fs').promises;
const path = require('path');
const { query, transaction } = require('./db');

// Paths to JSON files
const dataDir = path.join(__dirname, '..', 'data');

async function readJSONFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Migrate Admins
 */
async function migrateAdmins() {
  console.log('📦 Migrating admins...');
  const admins = await readJSONFile(path.join(dataDir, 'admin.json'));
  
  for (const admin of admins) {
    await query(
      `INSERT INTO admins (id, name, email, password, role, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         email = EXCLUDED.email,
         password = EXCLUDED.password`,
      [
        admin.id,
        admin.name,
        admin.email,
        admin.password,
        admin.role || 'admin',
        admin.createdAt || new Date().toISOString()
      ]
    );
  }
  console.log(`✅ Migrated ${admins.length} admins`);
}

/**
 * Migrate Customers
 */
async function migrateCustomers() {
  console.log('📦 Migrating customers...');
  const customers = await readJSONFile(path.join(dataDir, 'customers.json'));
  
  for (const customer of customers) {
    await query(
      `INSERT INTO customers (
        id, name, email, password, address, phone_number, profile_photo,
        role, balance, status, admin_message, reviewed_at, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        password = EXCLUDED.password,
        address = EXCLUDED.address,
        phone_number = EXCLUDED.phone_number,
        profile_photo = EXCLUDED.profile_photo,
        balance = EXCLUDED.balance,
        status = EXCLUDED.status,
        admin_message = EXCLUDED.admin_message,
        reviewed_at = EXCLUDED.reviewed_at`,
      [
        customer.id,
        customer.name,
        customer.email,
        customer.password,
        customer.address,
        customer.phoneNumber,
        customer.profilePhoto || null,
        customer.role || 'customer',
        customer.balance || 0,
        customer.status || 'pending',
        customer.adminMessage || null,
        customer.reviewedAt || null,
        customer.createdAt || new Date().toISOString()
      ]
    );
  }
  console.log(`✅ Migrated ${customers.length} customers`);
}

/**
 * Migrate Petanis
 */
async function migratePetanis() {
  console.log('📦 Migrating petanis...');
  const petanis = await readJSONFile(path.join(dataDir, 'petanis.json'));
  
  for (const petani of petanis) {
    await query(
      `INSERT INTO petanis (
        id, name, email, password, phone_number, address, ktp_photo,
        role, balance, status, admin_message, reviewed_at,
        shop_name, shop_description, shop_photo,
        farm_land_area, farm_land_photo, farm_mushroom_type,
        farm_rack_count, farm_baglog_count, farm_harvest_capacity,
        created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        email = EXCLUDED.email,
        password = EXCLUDED.password,
        phone_number = EXCLUDED.phone_number,
        address = EXCLUDED.address,
        ktp_photo = EXCLUDED.ktp_photo,
        balance = EXCLUDED.balance,
        status = EXCLUDED.status,
        admin_message = EXCLUDED.admin_message,
        shop_name = EXCLUDED.shop_name,
        shop_description = EXCLUDED.shop_description,
        shop_photo = EXCLUDED.shop_photo,
        farm_land_area = EXCLUDED.farm_land_area,
        farm_land_photo = EXCLUDED.farm_land_photo,
        farm_mushroom_type = EXCLUDED.farm_mushroom_type,
        farm_rack_count = EXCLUDED.farm_rack_count,
        farm_baglog_count = EXCLUDED.farm_baglog_count,
        farm_harvest_capacity = EXCLUDED.farm_harvest_capacity`,
      [
        petani.id,
        petani.name,
        petani.email,
        petani.password,
        petani.phoneNumber,
        petani.address,
        petani.ktpPhoto || null,
        petani.role || 'petani',
        petani.balance || 0,
        petani.status || 'pending',
        petani.adminMessage || null,
        petani.reviewedAt || null,
        petani.shop?.name || null,
        petani.shop?.description || null,
        petani.shop?.photo || null,
        petani.farm?.landArea || null,
        petani.farm?.landPhoto || null,
        petani.farm?.mushroomType || null,
        petani.farm?.rackCount || null,
        petani.farm?.baglogCount || null,
        petani.farm?.harvestCapacity || null,
        petani.createdAt || new Date().toISOString()
      ]
    );
  }
  console.log(`✅ Migrated ${petanis.length} petanis`);
}

/**
 * Migrate Products
 */
async function migrateProducts() {
  console.log('📦 Migrating products...');
  const products = await readJSONFile(path.join(dataDir, 'products.json'));
  
  for (const product of products) {
    await query(
      `INSERT INTO products (
        id, farmer_id, farmer_name, name, description, price, stock,
        unit, category, image, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO UPDATE SET
        farmer_name = EXCLUDED.farmer_name,
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        stock = EXCLUDED.stock,
        unit = EXCLUDED.unit,
        category = EXCLUDED.category,
        image = EXCLUDED.image,
        updated_at = EXCLUDED.updated_at`,
      [
        product.id,
        product.farmerId,
        product.farmerName,
        product.name,
        product.description,
        product.price,
        product.stock,
        product.unit,
        product.category,
        product.image || null,
        product.createdAt || new Date().toISOString(),
        product.updatedAt || new Date().toISOString()
      ]
    );
  }
  console.log(`✅ Migrated ${products.length} products`);
}

/**
 * Migrate Carts
 */
async function migrateCarts() {
  console.log('📦 Migrating carts...');
  const carts = await readJSONFile(path.join(dataDir, 'carts.json'));
  
  for (const cart of carts) {
    await query(
      `INSERT INTO carts (
        id, customer_id, product_id, product_name, product_image,
        farmer_id, farmer_name, price, unit, quantity, subtotal,
        created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      ON CONFLICT (id) DO UPDATE SET
        quantity = EXCLUDED.quantity,
        subtotal = EXCLUDED.subtotal,
        updated_at = EXCLUDED.updated_at`,
      [
        cart.id,
        cart.customerId,
        cart.productId,
        cart.productName,
        cart.productImage || null,
        cart.farmerId,
        cart.farmerName,
        cart.price,
        cart.unit,
        cart.quantity,
        cart.subtotal,
        cart.createdAt || new Date().toISOString(),
        cart.updatedAt || new Date().toISOString()
      ]
    );
  }
  console.log(`✅ Migrated ${carts.length} cart items`);
}

/**
 * Migrate Orders
 */
async function migrateOrders() {
  console.log('📦 Migrating orders...');
  const orders = await readJSONFile(path.join(dataDir, 'orders.json'));
  
  for (const order of orders) {
    // Insert order
    await query(
      `INSERT INTO orders (
        id, customer_id, customer_name, farmer_id, farmer_name,
        total, status, payment_status, payment_method, shipping_address,
        created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status,
        payment_status = EXCLUDED.payment_status,
        updated_at = EXCLUDED.updated_at`,
      [
        order.id,
        order.customerId,
        order.customerName,
        order.farmerId,
        order.farmerName,
        order.total,
        order.status || 'pending',
        order.paymentStatus || 'pending',
        order.paymentMethod,
        order.shippingAddress,
        order.createdAt || new Date().toISOString(),
        order.updatedAt || new Date().toISOString()
      ]
    );
    
    // Insert order items
    if (order.products && Array.isArray(order.products)) {
      for (const item of order.products) {
        await query(
          `INSERT INTO order_items (
            id, order_id, product_id, product_name, product_image,
            price, quantity, unit, subtotal, created_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          ON CONFLICT (id) DO NOTHING`,
          [
            `order-item-${order.id}-${item.productId}-${Date.now()}`,
            order.id,
            item.productId,
            item.productName,
            item.productImage || null,
            item.price,
            item.quantity,
            item.unit,
            item.subtotal,
            order.createdAt || new Date().toISOString()
          ]
        );
      }
    }
    
    // Insert order tracking
    if (order.tracking && Array.isArray(order.tracking)) {
      for (const track of order.tracking) {
        await query(
          `INSERT INTO order_tracking (
            id, order_id, status, message, timestamp
          )
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (id) DO NOTHING`,
          [
            `track-${order.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            order.id,
            track.status,
            track.message,
            track.timestamp || new Date().toISOString()
          ]
        );
      }
    }
  }
  console.log(`✅ Migrated ${orders.length} orders`);
}

/**
 * Migrate Forum Posts
 */
async function migrateForum() {
  console.log('📦 Migrating forum posts...');
  const forum = await readJSONFile(path.join(dataDir, 'forum.json'));
  
  for (const post of forum) {
    // Insert post
    await query(
      `INSERT INTO forum_posts (
        id, author_id, author_name, author_role, title, content,
        image, views, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        content = EXCLUDED.content,
        image = EXCLUDED.image,
        views = EXCLUDED.views,
        updated_at = EXCLUDED.updated_at`,
      [
        post.id,
        post.authorId,
        post.authorName,
        post.authorRole,
        post.title,
        post.content,
        post.image || null,
        post.views || 0,
        post.createdAt || new Date().toISOString(),
        post.updatedAt || new Date().toISOString()
      ]
    );
    
    // Insert likes
    if (post.likes && Array.isArray(post.likes)) {
      for (const like of post.likes) {
        await query(
          `INSERT INTO forum_likes (id, post_id, user_id, user_name, timestamp)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (post_id, user_id) DO NOTHING`,
          [
            `like-${post.id}-${like.userId}-${Date.now()}`,
            post.id,
            like.userId,
            like.userName,
            like.timestamp || new Date().toISOString()
          ]
        );
      }
    }
    
    // Insert comments
    if (post.comments && Array.isArray(post.comments)) {
      for (const comment of post.comments) {
        await query(
          `INSERT INTO forum_comments (
            id, post_id, user_id, user_name, user_role, content,
            created_at, updated_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (id) DO UPDATE SET
            content = EXCLUDED.content,
            updated_at = EXCLUDED.updated_at`,
          [
            comment.id,
            post.id,
            comment.userId,
            comment.userName,
            comment.userRole,
            comment.content,
            comment.createdAt || new Date().toISOString(),
            comment.updatedAt || new Date().toISOString()
          ]
        );
      }
    }
  }
  console.log(`✅ Migrated ${forum.length} forum posts`);
}

/**
 * Migrate Logs
 */
async function migrateLogs() {
  console.log('📦 Migrating logs...');
  const logs = await readJSONFile(path.join(dataDir, 'logs.json'));
  
  for (const log of logs) {
    await query(
      `INSERT INTO logs (
        id, action, role, user_email, admin_email, timestamp,
        old_status, new_status, admin_message
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO NOTHING`,
      [
        `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        log.action,
        log.role,
        log.userEmail,
        log.adminEmail,
        log.timestamp || new Date().toISOString(),
        log.oldStatus || null,
        log.newStatus || null,
        log.adminMessage || null
      ]
    );
  }
  console.log(`✅ Migrated ${logs.length} log entries`);
}

/**
 * Migrate Articles
 */
async function migrateArticles() {
  console.log('📦 Migrating articles...');
  const articles = await readJSONFile(path.join(dataDir, 'articles.json'));
  
  for (const article of articles) {
    await query(
      `INSERT INTO articles (
        id, title, content, image, author, category, views,
        created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        content = EXCLUDED.content,
        image = EXCLUDED.image,
        category = EXCLUDED.category,
        views = EXCLUDED.views,
        updated_at = EXCLUDED.updated_at`,
      [
        article.id,
        article.title,
        article.content,
        article.image || null,
        article.author || null,
        article.category || null,
        article.views || 0,
        article.createdAt || new Date().toISOString(),
        article.updatedAt || new Date().toISOString()
      ]
    );
  }
  console.log(`✅ Migrated ${articles.length} articles`);
}

/**
 * Migrate Chats
 */
async function migrateChats() {
  console.log('📦 Migrating chats...');
  const chats = await readJSONFile(path.join(dataDir, 'chats.json'));
  
  for (const chat of chats) {
    await query(
      `INSERT INTO chats (
        id, sender_id, sender_name, sender_role,
        receiver_id, receiver_name, receiver_role,
        message, is_read, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO UPDATE SET
        is_read = EXCLUDED.is_read`,
      [
        chat.id,
        chat.senderId,
        chat.senderName,
        chat.senderRole,
        chat.receiverId,
        chat.receiverName,
        chat.receiverRole,
        chat.message,
        chat.isRead || false,
        chat.createdAt || new Date().toISOString()
      ]
    );
  }
  console.log(`✅ Migrated ${chats.length} chat messages`);
}

/**
 * Migrate Notifications
 */
async function migrateNotifications() {
  console.log('📦 Migrating notifications...');
  const notifications = await readJSONFile(path.join(dataDir, 'notifications.json'));
  
  for (const notif of notifications) {
    await query(
      `INSERT INTO notifications (
        id, user_id, user_role, title, message, type, is_read, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE SET
        is_read = EXCLUDED.is_read`,
      [
        notif.id,
        notif.userId,
        notif.userRole,
        notif.title,
        notif.message,
        notif.type,
        notif.isRead || false,
        notif.createdAt || new Date().toISOString()
      ]
    );
  }
  console.log(`✅ Migrated ${notifications.length} notifications`);
}

/**
 * Migrate Ledger
 */
async function migrateLedger() {
  console.log('📦 Migrating ledger...');
  const ledger = await readJSONFile(path.join(dataDir, 'ledger.json'));
  
  for (const entry of ledger) {
    await query(
      `INSERT INTO ledger (
        id, user_id, user_role, transaction_type, amount,
        balance_after, description, order_id, timestamp
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO NOTHING`,
      [
        entry.id,
        entry.userId,
        entry.userRole,
        entry.transactionType,
        entry.amount,
        entry.balanceAfter,
        entry.description || null,
        entry.orderId || null,
        entry.timestamp || new Date().toISOString()
      ]
    );
  }
  console.log(`✅ Migrated ${ledger.length} ledger entries`);
}

/**
 * Main migration function
 */
async function migrate() {
  try {
    console.log('🚀 Starting migration from JSON to PostgreSQL...\n');
    
    // Run migrations in order (respecting foreign key constraints)
    await migrateAdmins();
    await migrateCustomers();
    await migratePetanis();
    await migrateProducts();
    await migrateCarts();
    await migrateOrders();
    await migrateForum();
    await migrateLogs();
    await migrateArticles();
    await migrateChats();
    await migrateNotifications();
    await migrateLedger();
    
    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if called directly
if (require.main === module) {
  migrate();
}

module.exports = { migrate };

