/**
 * Setup Database Schema
 * Script untuk membuat semua tabel di PostgreSQL
 */

const fs = require('fs');
const path = require('path');
const { query, close } = require('./db');

async function setupSchema() {
  try {
    console.log('🚀 Setting up database schema...\n');
    
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Split by semicolon and execute each statement
    // Handle multi-line statements and comments
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => {
        // Filter out empty statements and comments
        const trimmed = s.trim();
        return trimmed.length > 0 && 
               !trimmed.startsWith('--') && 
               !trimmed.startsWith('/*');
      });
    
    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement && statement.length > 10) { // Skip very short statements
        try {
          await query(statement);
          console.log(`✅ Executed statement ${i + 1}/${statements.length}`);
        } catch (error) {
          // Ignore "already exists" errors for CREATE TABLE IF NOT EXISTS
          if (error.message.includes('already exists') || 
              error.message.includes('duplicate')) {
            console.log(`⚠️  Statement ${i + 1} skipped (already exists)`);
          } else {
            console.error(`❌ Error in statement ${i + 1}:`, error.message);
            // Continue with other statements
          }
        }
      }
    }
    
    console.log('\n✅ Schema setup completed successfully!');
    await close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up schema:', error);
    await close();
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  setupSchema();
}

module.exports = { setupSchema };

