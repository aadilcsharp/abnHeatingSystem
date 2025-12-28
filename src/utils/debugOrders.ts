import { getAllOrders } from '../data/orderService';

// Debug utility to check orders in both memory and localStorage
export const debugOrders = () => {
  console.log('=== ORDER DEBUG INFO ===');
  
  // Check in-memory orders
  const memoryOrders = getAllOrders();
  console.log(`📋 Orders in memory: ${memoryOrders.length}`);
  console.log('Memory orders:', memoryOrders.map(o => ({
    id: o.id,
    customerName: o.customerName,
    totalAmount: o.totalAmount,
    status: o.status,
    orderDate: o.orderDate
  })));
  
  // Check localStorage
  try {
    const storedOrders = localStorage.getItem('eshop-orders');
    if (storedOrders) {
      const parsed = JSON.parse(storedOrders);
      console.log(`💾 Orders in localStorage: ${parsed.length}`);
      console.log('localStorage orders:', parsed.map((o: any) => ({
        id: o.id,
        customerName: o.customerName,
        totalAmount: o.totalAmount,
        status: o.status,
        orderDate: o.orderDate
      })));
    } else {
      console.log('💾 No orders found in localStorage');
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  
  // Check backup
  try {
    const backup = localStorage.getItem('eshop-orders-backup');
    if (backup) {
      const parsedBackup = JSON.parse(backup);
      console.log(`🔒 Backup orders: ${parsedBackup.orders?.length || 0}`);
      console.log('Backup timestamp:', parsedBackup.timestamp);
    } else {
      console.log('🔒 No backup found');
    }
  } catch (error) {
    console.error('Error reading backup from localStorage:', error);
  }
  
  // Check updated file content
  try {
    const updatedFile = localStorage.getItem('eshop-updated-orders-file');
    if (updatedFile) {
      console.log('📄 Updated orders.ts file is available');
      console.log('💡 Use getUpdatedOrdersFile() to see the content');
      console.log('💡 Use downloadOrdersFile() to download the updated file');
    }
  } catch (error) {
    console.error('Error reading updated file:', error);
  }
  
  console.log('=== END ORDER DEBUG ===');
};

// Function to clear all orders (for testing)
export const clearAllOrders = () => {
  localStorage.removeItem('eshop-orders');
  localStorage.removeItem('eshop-orders-backup');
  console.log('🗑️ Cleared all orders from localStorage');
  console.log('⚠️ Refresh the page to reload default orders');
};

// Add to window for easy console access
if (typeof window !== 'undefined') {
  (window as any).debugOrders = debugOrders;
  (window as any).clearAllOrders = clearAllOrders;
}
