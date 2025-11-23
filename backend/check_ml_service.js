/**
 * Script untuk check apakah ML Service berjalan
 * Jalankan: node check_ml_service.js
 */

const axios = require('axios');

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5000';

async function checkMLService() {
  console.log('='.repeat(70));
  console.log('Checking ML Detection Service Status');
  console.log('='.repeat(70));
  console.log(`\nService URL: ${ML_SERVICE_URL}\n`);

  try {
    // Check health endpoint
    console.log('1. Checking /health endpoint...');
    const healthResponse = await axios.get(`${ML_SERVICE_URL}/health`, {
      timeout: 5000
    });
    
    console.log('   ✅ ML Service is running!');
    console.log(`   Status: ${healthResponse.data.status}`);
    console.log(`   Model loaded: ${healthResponse.data.model_loaded ? '✅ Yes' : '❌ No'}`);
    console.log(`   Model path: ${healthResponse.data.model_path}`);
    
    if (!healthResponse.data.model_loaded) {
      console.log('\n   ⚠️  WARNING: Model is not loaded!');
      console.log('   Make sure weights/best.pt exists in ML project folder');
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('✅ ML Service is ready to use!');
    console.log('='.repeat(70));
    
  } catch (error) {
    console.log('   ❌ ML Service is NOT running!');
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n   Error: Connection refused');
      console.log('   This means the ML service is not running.');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('\n   Error: Connection timeout');
      console.log('   The service might be slow to respond or not running.');
    } else {
      console.log(`\n   Error: ${error.message}`);
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('⚠️  ACTION REQUIRED:');
    console.log('='.repeat(70));
    console.log('\n1. Open a new terminal/command prompt');
    console.log('2. Navigate to: machine learning\\Project');
    console.log('3. Run: python ml_api_service.py');
    console.log('   OR double-click: start_ml_service.bat (Windows)');
    console.log('\n4. Wait for the service to start');
    console.log('5. Run this check again');
    console.log('\n' + '='.repeat(70));
    
    process.exit(1);
  }
}

// Run check
checkMLService();

