/**
 * Unit and Integration Tests for Notifications
 * 
 * Run with: node backend/tests/notifications.test.js
 */

const fs = require('fs').promises;
const path = require('path');

const testDataDir = path.join(__dirname, 'test-data');
const notificationsPath = path.join(testDataDir, 'notifications.json');

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

async function createNotification(notification) {
  const notifications = await readJSONFile(notificationsPath);
  const newNotification = {
    ...notification,
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    read: notification.read || false,
    createdAt: new Date().toISOString()
  };
  notifications.push(newNotification);
  await writeJSONFile(notificationsPath, notifications);
  return newNotification;
}

async function getNotifications(userId) {
  const notifications = await readJSONFile(notificationsPath);
  return notifications.filter(n => n.userId === userId);
}

async function markAsRead(notificationId, userId) {
  const notifications = await readJSONFile(notificationsPath);
  const notification = notifications.find(n => n.id === notificationId && n.userId === userId);
  if (notification) {
    notification.read = true;
    await writeJSONFile(notificationsPath, notifications);
    return true;
  }
  return false;
}

async function setupTestData() {
  await writeJSONFile(notificationsPath, []);
}

async function cleanupTestData() {
  try {
    await fs.rm(testDataDir, { recursive: true, force: true });
  } catch (error) {
    // Ignore cleanup errors
  }
}

async function testCreateNotification() {
  console.log('\n🧪 Test 1: Create Notification');
  
  await setupTestData();
  
  try {
    const notification = await createNotification({
      userId: 'farmer-test-1',
      userType: 'farmer',
      type: 'new_order',
      title: 'Pesanan Baru',
      message: 'Anda mendapat pesanan baru',
      orderId: 'order-test-1'
    });
    
    if (!notification.id) {
      throw new Error('Notification ID tidak dibuat');
    }
    
    const notifications = await readJSONFile(notificationsPath);
    if (notifications.length !== 1) {
      throw new Error('Notification tidak tersimpan');
    }
    
    console.log('  ✅ Create notification test passed');
    return true;
  } catch (error) {
    console.error('  ❌ Create notification test failed:', error.message);
    return false;
  } finally {
    await cleanupTestData();
  }
}

async function testGetNotifications() {
  console.log('\n🧪 Test 2: Get Notifications by User');
  
  await setupTestData();
  
  try {
    // Create multiple notifications
    await createNotification({
      userId: 'farmer-test-1',
      userType: 'farmer',
      type: 'new_order',
      title: 'Pesanan 1',
      message: 'Pesanan baru 1'
    });
    
    await createNotification({
      userId: 'farmer-test-1',
      userType: 'farmer',
      type: 'new_order',
      title: 'Pesanan 2',
      message: 'Pesanan baru 2'
    });
    
    await createNotification({
      userId: 'farmer-test-2',
      userType: 'farmer',
      type: 'new_order',
      title: 'Pesanan 3',
      message: 'Pesanan baru 3'
    });
    
    const farmer1Notifications = await getNotifications('farmer-test-1');
    const farmer2Notifications = await getNotifications('farmer-test-2');
    
    if (farmer1Notifications.length !== 2) {
      throw new Error(`Farmer 1 should have 2 notifications, got ${farmer1Notifications.length}`);
    }
    
    if (farmer2Notifications.length !== 1) {
      throw new Error(`Farmer 2 should have 1 notification, got ${farmer2Notifications.length}`);
    }
    
    console.log('  ✅ Get notifications test passed');
    return true;
  } catch (error) {
    console.error('  ❌ Get notifications test failed:', error.message);
    return false;
  } finally {
    await cleanupTestData();
  }
}

async function testMarkAsRead() {
  console.log('\n🧪 Test 3: Mark Notification as Read');
  
  await setupTestData();
  
  try {
    const notification = await createNotification({
      userId: 'farmer-test-1',
      userType: 'farmer',
      type: 'new_order',
      title: 'Pesanan Baru',
      message: 'Test message'
    });
    
    if (notification.read !== false) {
      throw new Error('Notification should be unread initially');
    }
    
    const marked = await markAsRead(notification.id, 'farmer-test-1');
    if (!marked) {
      throw new Error('Failed to mark notification as read');
    }
    
    const notifications = await readJSONFile(notificationsPath);
    const updatedNotification = notifications.find(n => n.id === notification.id);
    
    if (updatedNotification.read !== true) {
      throw new Error('Notification should be marked as read');
    }
    
    console.log('  ✅ Mark as read test passed');
    return true;
  } catch (error) {
    console.error('  ❌ Mark as read test failed:', error.message);
    return false;
  } finally {
    await cleanupTestData();
  }
}

async function runTests() {
  console.log('🚀 Starting Notification Tests\n');
  
  const results = [];
  results.push(await testCreateNotification());
  results.push(await testGetNotifications());
  results.push(await testMarkAsRead());
  
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

if (require.main === module) {
  runTests().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  testCreateNotification,
  testGetNotifications,
  testMarkAsRead
};

