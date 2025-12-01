/**
 * Test Database Connection
 * Script untuk test koneksi ke PostgreSQL
 */

const { query, close } = require('./db');

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...\n');
    
    // Test 1: Basic connection
    const result = await query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Database connection successful!');
    console.log('   Current time:', result.rows[0].current_time);
    console.log('   PostgreSQL version:', result.rows[0].pg_version.split(',')[0]);
    
    // Test 2: Check database name
    const dbResult = await query('SELECT current_database() as db_name');
    console.log('   Database name:', dbResult.rows[0].db_name);
    
    // Test 3: Check tables
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log(`\n📊 Found ${tablesResult.rows.length} tables:`);
      tablesResult.rows.forEach((row, index) => {
        console.log(`   ${index + 1}. ${row.table_name}`);
      });
    } else {
      console.log('\n⚠️  No tables found. Run setup.js to create schema.');
    }
    
    await close();
    console.log('\n✅ Connection test completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check if PostgreSQL is running');
    console.error('   2. Verify database credentials in .env file');
    console.error('   3. Make sure database "mycotrack" exists');
    console.error('   4. Check if user has proper permissions');
    await close();
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  testConnection();
}

module.exports = { testConnection };

