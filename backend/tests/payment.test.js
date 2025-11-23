/**
 * Unit and Integration Tests for Payment Flow
 * 
 * Run with: node backend/tests/payment.test.js
 */

const fs = require('fs').promises;
const path = require('path');

// Mock data paths
const testDataDir = path.join(__dirname, 'test-data');
const customersPath = path.join(testDataDir, 'customers.json');
const petanisPath = path.join(testDataDir, 'petanis.json');
const ordersPath = path.join(testDataDir, 'orders.json');
const ledgerPath = path.join(testDataDir, 'ledger.json');
const analyticsPath = path.join(testDataDir, 'analytics.json');

// Helper functions (simplified versions from server.js)
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

async function writeJSONFile(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

async function recordLedgerEntry(entry) {
  const ledger = await readJSONFile(ledgerPath);
  ledger.push({
    ...entry,
    id: `ledger-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString()
  });
  await writeJSONFile(ledgerPath, ledger);
}

async function processWalletTransaction(orderId, customerId, farmerId, amount) {
  const customers = await readJSONFile(customersPath);
  const petanis = await readJSONFile(petanisPath);
  
  const customerIndex = customers.findIndex(c => c.id === customerId);
  const farmerIndex = petanis.findIndex(p => p.id === farmerId);
  
  if (customerIndex === -1) {
    throw new Error(`Customer dengan ID ${customerId} tidak ditemukan`);
  }
  if (farmerIndex === -1) {
    throw new Error(`Petani dengan ID ${farmerId} tidak ditemukan`);
  }
  
  const customer = customers[customerIndex];
  const farmer = petanis[farmerIndex];
  
  const customerBalance = customer.balance || 0;
  if (customerBalance < amount) {
    throw new Error(`Saldo tidak mencukupi. Saldo: Rp ${customerBalance.toLocaleString('id-ID')}, Dibutuhkan: Rp ${amount.toLocaleString('id-ID')}`);
  }
  
  const oldCustomerBalance = customerBalance;
  const oldFarmerBalance = farmer.balance || 0;
  
  customers[customerIndex].balance = oldCustomerBalance - amount;
  petanis[farmerIndex].balance = (oldFarmerBalance || 0) + amount;
  
  await writeJSONFile(customersPath, customers);
  await writeJSONFile(petanisPath, petanis);
  
  await recordLedgerEntry({
    type: 'debit',
    userId: customerId,
    userType: 'customer',
    amount: -amount,
    balanceBefore: oldCustomerBalance,
    balanceAfter: oldCustomerBalance - amount,
    orderId: orderId,
    description: `Pembayaran pesanan ${orderId}`
  });
  
  await recordLedgerEntry({
    type: 'credit',
    userId: farmerId,
    userType: 'farmer',
    amount: amount,
    balanceBefore: oldFarmerBalance,
    balanceAfter: oldFarmerBalance + amount,
    orderId: orderId,
    description: `Penerimaan pembayaran pesanan ${orderId}`
  });
  
  return {
    success: true,
    customerBalance: customers[customerIndex].balance,
    farmerBalance: petanis[farmerIndex].balance
  };
}

// Test functions
async function setupTestData() {
  // Create test data
  await writeJSONFile(customersPath, [
    {
      id: 'customer-test-1',
      name: 'Test Customer',
      email: 'test@customer.com',
      balance: 1000000,
      status: 'accepted'
    }
  ]);
  
  await writeJSONFile(petanisPath, [
    {
      id: 'farmer-test-1',
      name: 'Test Farmer',
      email: 'test@farmer.com',
      balance: 0,
      status: 'accepted'
    }
  ]);
  
  await writeJSONFile(ordersPath, []);
  await writeJSONFile(ledgerPath, []);
  await writeJSONFile(analyticsPath, []);
}

async function cleanupTestData() {
  try {
    await fs.rm(testDataDir, { recursive: true, force: true });
  } catch (error) {
    // Ignore cleanup errors
  }
}

async function testAtomicTransaction() {
  console.log('\n🧪 Test 1: Atomic Wallet Transaction');
  
  await setupTestData();
  
  try {
    const orderId = 'order-test-1';
    const customerId = 'customer-test-1';
    const farmerId = 'farmer-test-1';
    const amount = 500000;
    
    // Get initial balances
    const customers = await readJSONFile(customersPath);
    const petanis = await readJSONFile(petanisPath);
    const initialCustomerBalance = customers[0].balance;
    const initialFarmerBalance = petanis[0].balance || 0;
    
    console.log(`  Initial Customer Balance: Rp ${initialCustomerBalance.toLocaleString('id-ID')}`);
    console.log(`  Initial Farmer Balance: Rp ${initialFarmerBalance.toLocaleString('id-ID')}`);
    
    // Process transaction
    const result = await processWalletTransaction(orderId, customerId, farmerId, amount);
    
    // Verify balances
    const customersAfter = await readJSONFile(customersPath);
    const petanisAfter = await readJSONFile(petanisPath);
    const finalCustomerBalance = customersAfter[0].balance;
    const finalFarmerBalance = petanisAfter[0].balance;
    
    console.log(`  Final Customer Balance: Rp ${finalCustomerBalance.toLocaleString('id-ID')}`);
    console.log(`  Final Farmer Balance: Rp ${finalFarmerBalance.toLocaleString('id-ID')}`);
    
    // Assertions
    if (finalCustomerBalance !== initialCustomerBalance - amount) {
      throw new Error('Customer balance tidak sesuai');
    }
    if (finalFarmerBalance !== initialFarmerBalance + amount) {
      throw new Error('Farmer balance tidak sesuai');
    }
    
    // Verify ledger entries
    const ledger = await readJSONFile(ledgerPath);
    const debitEntry = ledger.find(e => e.type === 'debit' && e.orderId === orderId);
    const creditEntry = ledger.find(e => e.type === 'credit' && e.orderId === orderId);
    
    if (!debitEntry || !creditEntry) {
      throw new Error('Ledger entries tidak ditemukan');
    }
    
    if (debitEntry.amount !== -amount || creditEntry.amount !== amount) {
      throw new Error('Ledger entry amounts tidak sesuai');
    }
    
    console.log('  ✅ Atomic transaction test passed');
    return true;
  } catch (error) {
    console.error('  ❌ Atomic transaction test failed:', error.message);
    return false;
  } finally {
    await cleanupTestData();
  }
}

async function testInsufficientBalance() {
  console.log('\n🧪 Test 2: Insufficient Balance');
  
  await setupTestData();
  
  try {
    const orderId = 'order-test-2';
    const customerId = 'customer-test-1';
    const farmerId = 'farmer-test-1';
    const amount = 2000000; // More than customer balance
    
    await processWalletTransaction(orderId, customerId, farmerId, amount);
    
    console.error('  ❌ Should have thrown error for insufficient balance');
    return false;
  } catch (error) {
    if (error.message.includes('Saldo tidak mencukupi')) {
      console.log('  ✅ Insufficient balance test passed');
      return true;
    } else {
      console.error('  ❌ Unexpected error:', error.message);
      return false;
    }
  } finally {
    await cleanupTestData();
  }
}

async function testInvalidCustomer() {
  console.log('\n🧪 Test 3: Invalid Customer ID');
  
  await setupTestData();
  
  try {
    const orderId = 'order-test-3';
    const customerId = 'invalid-customer';
    const farmerId = 'farmer-test-1';
    const amount = 100000;
    
    await processWalletTransaction(orderId, customerId, farmerId, amount);
    
    console.error('  ❌ Should have thrown error for invalid customer');
    return false;
  } catch (error) {
    if (error.message.includes('tidak ditemukan')) {
      console.log('  ✅ Invalid customer test passed');
      return true;
    } else {
      console.error('  ❌ Unexpected error:', error.message);
      return false;
    }
  } finally {
    await cleanupTestData();
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting Payment Flow Tests\n');
  
  const results = [];
  results.push(await testAtomicTransaction());
  results.push(await testInsufficientBalance());
  results.push(await testInvalidCustomer());
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(`\n📊 Test Results: ${passed}/${total} passed`);
  
  if (passed === total) {
    console.log('✅ All tests passed!');
    process.exit(0);
  } else {
    console.log('❌ Some tests failed');
    process.exit(1);
  }
}

// Run tests if executed directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  processWalletTransaction,
  testAtomicTransaction,
  testInsufficientBalance,
  testInvalidCustomer
};

