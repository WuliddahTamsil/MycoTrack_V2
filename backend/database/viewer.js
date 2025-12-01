/**
 * Database Viewer Server
 * Web interface untuk melihat tabel dan data PostgreSQL di browser
 * 
 * Usage: node database/viewer.js
 * Then open: http://localhost:3001/db-viewer
 */

// Load environment variables
const path = require('path');
const fs = require('fs');
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  console.log('⚠️  .env file not found. Using default database values.');
}

const express = require('express');
const { query, close } = require('./db');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'viewer')));

// API: Get all tables
app.get('/api/tables', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        table_name,
        (SELECT COUNT(*) FROM information_schema.columns 
         WHERE table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    res.json({ success: true, tables: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get table structure
app.get('/api/table/:tableName/structure', async (req, res) => {
  try {
    const { tableName } = req.params;
    const result = await query(`
      SELECT 
        column_name,
        data_type,
        character_maximum_length,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = $1
      ORDER BY ordinal_position
    `, [tableName]);
    res.json({ success: true, columns: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get table data
app.get('/api/table/:tableName/data', async (req, res) => {
  try {
    const { tableName } = req.params;
    const { page = 1, limit = 50, search = '' } = req.query;
    const offset = (page - 1) * limit;

    // Get columns for this table
    const columnsResult = await query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = $1
      ORDER BY ordinal_position
    `, [tableName]);
    
    const allColumns = columnsResult.rows.map(col => col.column_name);
    const firstColumn = allColumns[0] || 'id';
    const textColumns = columnsResult.rows
      .filter(col => ['text', 'varchar', 'character varying'].includes(col.data_type))
      .map(col => col.column_name);

    // Get total count
    let countQuery = `SELECT COUNT(*) as total FROM "${tableName}"`;
    let countParams = [];
    
    if (search && textColumns.length > 0) {
      const searchConditions = textColumns.map((col, idx) => 
        `"${col}"::text ILIKE $${idx + 1}`
      ).join(' OR ');
      countQuery += ` WHERE ${searchConditions}`;
      countParams = textColumns.map(() => `%${search}%`);
    }
    
    const countResult = await query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);

    // Get data
    let dataQuery = `SELECT * FROM "${tableName}"`;
    let dataParams = [];
    
    if (search && textColumns.length > 0) {
      const searchConditions = textColumns.map((col, idx) => 
        `"${col}"::text ILIKE $${idx + 1}`
      ).join(' OR ');
      dataQuery += ` WHERE ${searchConditions}`;
      dataParams = textColumns.map(() => `%${search}%`);
    }
    
    dataQuery += ` ORDER BY "${firstColumn}" LIMIT $${dataParams.length + 1} OFFSET $${dataParams.length + 2}`;
    dataParams.push(limit, offset);
    
    const dataResult = await query(dataQuery, dataParams);

    res.json({
      success: true,
      data: dataResult.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Get table row count
app.get('/api/table/:tableName/count', async (req, res) => {
  try {
    const { tableName } = req.params;
    const result = await query(`SELECT COUNT(*) as count FROM "${tableName}"`);
    res.json({ success: true, count: parseInt(result.rows[0].count) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Execute custom query (read-only)
app.post('/api/query', async (req, res) => {
  try {
    const { query: sqlQuery } = req.body;
    
    // Security: Only allow SELECT queries
    const trimmedQuery = sqlQuery.trim().toUpperCase();
    if (!trimmedQuery.startsWith('SELECT')) {
      return res.status(400).json({ 
        success: false, 
        error: 'Only SELECT queries are allowed for security reasons' 
      });
    }
    
    const result = await query(sqlQuery);
    res.json({ 
      success: true, 
      data: result.rows,
      rowCount: result.rowCount 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve HTML page
app.get('/db-viewer', (req, res) => {
  res.sendFile(path.join(__dirname, 'viewer', 'index.html'));
});

// Test database connection before starting server
async function startServer() {
  try {
    // Test connection
    console.log('🔌 Testing database connection...');
    await query('SELECT NOW()');
    console.log('✅ Database connection successful!\n');
    
    // Start server
    app.listen(PORT, () => {
      console.log('==========================================');
      console.log(`✅ Database Viewer running on:`);
      console.log(`   http://localhost:${PORT}/db-viewer`);
      console.log('==========================================');
      console.log('\nTekan Ctrl+C untuk menghentikan\n');
    });
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check if PostgreSQL is running');
    console.error('   2. Verify database credentials in .env file');
    console.error('   3. Make sure database "mycotrack" exists');
    console.error('   4. Run: node database/test-connection.js');
    console.error('\n   Example .env file:');
    console.error('   DB_HOST=localhost');
    console.error('   DB_PORT=5432');
    console.error('   DB_NAME=mycotrack');
    console.error('   DB_USER=postgres');
    console.error('   DB_PASSWORD=your_password_here');
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\nShutting down Database Viewer...');
  await close();
  process.exit(0);
});

// Error handling
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error);
});

