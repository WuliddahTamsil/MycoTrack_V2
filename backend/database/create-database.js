/**
 * Create Database Script
 * Script untuk membuat database mycotrack tanpa perlu psql command line
 * 
 * Usage: node database/create-database.js
 */

const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

// Load .env file if exists
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  console.log('⚠️  .env file not found. Using default values.');
  console.log('   Create .env file with: DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD\n');
}

async function createDatabase() {
  // Connect to default 'postgres' database to create new database
  const adminPool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres', // Connect to default database
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  });

  const dbName = process.env.DB_NAME || 'mycotrack';

  try {
    console.log('🔌 Connecting to PostgreSQL...');
    
    // Check if database already exists
    const checkResult = await adminPool.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkResult.rows.length > 0) {
      console.log(`✅ Database "${dbName}" already exists!`);
      await adminPool.end();
      return;
    }

    // Create database
    console.log(`📦 Creating database "${dbName}"...`);
    await adminPool.query(`CREATE DATABASE ${dbName}`);
    console.log(`✅ Database "${dbName}" created successfully!`);

    await adminPool.end();
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log(`✅ Database "${dbName}" already exists!`);
    } else {
      console.error('❌ Error creating database:', error.message);
      console.error('\n💡 Troubleshooting:');
      console.error('   1. Check if PostgreSQL is running');
      console.error('   2. Verify database credentials in .env file');
      console.error('   3. Make sure user has CREATE DATABASE permission');
      console.error('\n   Example .env file:');
      console.error('   DB_HOST=localhost');
      console.error('   DB_PORT=5432');
      console.error('   DB_NAME=mycotrack');
      console.error('   DB_USER=postgres');
      console.error('   DB_PASSWORD=your_password_here');
    }
    await adminPool.end();
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  createDatabase();
}

module.exports = { createDatabase };

