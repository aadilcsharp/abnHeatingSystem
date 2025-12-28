import { Order, orders } from './orders';
import { ordersFileManager } from '../utils/ordersFileManager';
import { saveOrderToFile } from '../utils/orderFileSaver';

// LocalStorage key for orders
const ORDERS_STORAGE_KEY = 'eshop-orders';

// Save orders to localStorage with backup
const saveOrdersToStorage = (): void => {
  try {
    // Save current orders to localStorage
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    
    // Create backup with timestamp
    const backup = {
      orders: [...orders],
      timestamp: new Date().toISOString(),
      count: orders.length
    };
    localStorage.setItem('eshop-orders-backup', JSON.stringify(backup));
    
    // Generate updated orders.ts file content
    generateUpdatedOrdersFile();
    
    console.log(`Saved ${orders.length} orders to localStorage with backup`);
  } catch (error) {
    console.error('Error saving orders to localStorage:', error);
  }
};

// Generate updated orders.ts file content
const generateUpdatedOrdersFile = (): void => {
  try {
    const fileContent = generateOrdersFileContent();
    
    // Save to localStorage for easy copy-paste
    localStorage.setItem('eshop-updated-orders-file', fileContent);
    
    // Show in console for easy copying
    console.log('\n📄 UPDATED ORDERS.TS CONTENT:');
    console.log('Copy the content below and replace your orders.ts file:');
    console.log('═'.repeat(50));
    console.log(fileContent);
    console.log('═'.repeat(50));
    
    // Make it available globally
    if (typeof window !== 'undefined') {
      (window as any).getUpdatedOrdersFile = () => {
        console.log(fileContent);
        return fileContent;
      };
      (window as any).downloadOrdersFile = () => {
        const blob = new Blob([fileContent], { type: 'text/typescript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'orders.ts';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };
    }
  } catch (error) {
    console.error('Error generating orders file:', error);
  }
};

// Generate the complete orders.ts file content
const generateOrdersFileContent = (): string => {
  const interfaceDefinitions = `export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: number;
  userId: number;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  notes?: string;
}

// Orders data - similar to products.ts structure`;

  const ordersArray = orders.map(order => {
    const itemsString = order.items.map(item => `    {
        id: ${item.id},
        name: "${item.name}",
        price: ${item.price},
        quantity: ${item.quantity},
        image: "${item.image}",
        category: "${item.category}"
      }`).join(',\n');

    return `  {
    id: ${order.id},
    userId: ${order.userId},
    customerName: "${order.customerName}",
    customerEmail: "${order.customerEmail}",
    items: [
${itemsString}
    ],
    totalAmount: ${order.totalAmount},
    shippingAddress: {
      fullName: "${order.shippingAddress.fullName}",
      address: "${order.shippingAddress.address}",
      city: "${order.shippingAddress.city}",
      postalCode: "${order.shippingAddress.postalCode}",
      country: "${order.shippingAddress.country}",
      phone: "${order.shippingAddress.phone}"
    },
    paymentMethod: "${order.paymentMethod}",
    status: "${order.status}",
    orderDate: "${order.orderDate}",${order.estimatedDelivery ? `
    estimatedDelivery: "${order.estimatedDelivery}",` : ''}${order.trackingNumber ? `
    trackingNumber: "${order.trackingNumber}",` : ''}${order.notes ? `
    notes: "${order.notes}"` : ''}
  }`;
  }).join(',\n');

  return `${interfaceDefinitions}
export let orders: Order[] = [
${ordersArray}
];`;
};

// Initialize orders from localStorage
export const initializeOrders = (): void => {
  console.log('🚀 Orders system initialized');
  console.log(`📊 Current orders in file: ${orders.length}`);
  console.log('ℹ️  New orders will be automatically added to orders.ts file');
};

// Get all orders
export const getAllOrders = (): Order[] => {
  console.log(`Current orders count: ${orders.length}`);
  return [...orders];
};

// Get orders count for debugging
export const getOrdersCount = (): number => {
  return orders.length;
};

// Get order by ID
export const getOrderById = (id: number): Order | undefined => {
  return orders.find(order => order.id === id);
};

// Get orders by user ID
export const getOrdersByUserId = (userId: number): Order[] => {
  return orders.filter(order => order.userId === userId);
};

// Get orders by status
export const getOrdersByStatus = (status: Order['status']): Order[] => {
  return orders.filter(order => order.status === status);
};

// Add new order
export const addOrder = (order: Omit<Order, 'id'>): Order => {
  // Use the new file saver utility
  const newOrder = saveOrderToFile(order);
  
  console.log('🎉 ORDER SAVED TO ORDERS.TS!');
  console.log(`✅ Order #${newOrder.id} - ${newOrder.customerName}`);
  console.log(`✅ Total orders: ${orders.length}`);
  console.log(`📁 Download the updated orders.ts file using: downloadOrdersFile()`);
  
  return newOrder;
};

// Function to generate and display updated orders.ts file
const generateAndShowUpdatedOrdersFile = (newOrder: Order) => {
  const updatedFileContent = generateCompleteOrdersFile();
  
  // Save to localStorage for easy access
  localStorage.setItem('eshop-updated-orders-file', updatedFileContent);
  
  console.log('\n🔄 ORDERS.TS FILE AUTO-UPDATE:');
  console.log('═'.repeat(60));
  console.log(`✅ Added Order #${newOrder.id} to file content`);
  console.log('📁 Updated orders.ts file content generated!');
  console.log('');
  console.log('🎯 TO UPDATE YOUR ORDERS.TS FILE:');
  console.log('1. Copy the content below');
  console.log('2. Replace your entire orders.ts file');
  console.log('3. Or use: downloadUpdatedOrdersFile()');
  console.log('═'.repeat(60));
  console.log('');
  console.log(updatedFileContent);
  console.log('');
  console.log('═'.repeat(60));
  
  // Make download function available
  if (typeof window !== 'undefined') {
    (window as any).downloadUpdatedOrdersFile = () => {
      const blob = new Blob([updatedFileContent], { type: 'text/typescript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders.ts';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('📥 Downloaded updated orders.ts file!');
    };
  }
};

// Function to generate complete orders.ts file content
const generateCompleteOrdersFile = (): string => {
  const header = `export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: number;
  userId: number;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  notes?: string;
}

// Orders data - similar to products.ts structure
export let orders: Order[] = [`;

  const ordersContent = orders.map(order => {
    const itemsString = order.items.map(item => 
      `      {
        id: ${item.id},
        name: "${item.name}",
        price: ${item.price},
        quantity: ${item.quantity},
        image: "${item.image}",
        category: "${item.category}"
      }`
    ).join(',\n');

    return `  {
    id: ${order.id},
    userId: ${order.userId},
    customerName: "${order.customerName}",
    customerEmail: "${order.customerEmail}",
    items: [
${itemsString}
    ],
    totalAmount: ${order.totalAmount},
    shippingAddress: {
      fullName: "${order.shippingAddress.fullName}",
      address: "${order.shippingAddress.address}",
      city: "${order.shippingAddress.city}",
      postalCode: "${order.shippingAddress.postalCode}",
      country: "${order.shippingAddress.country}",
      phone: "${order.shippingAddress.phone}"
    },
    paymentMethod: "${order.paymentMethod}",
    status: "${order.status}",
    orderDate: "${order.orderDate}"${order.estimatedDelivery ? `,
    estimatedDelivery: "${order.estimatedDelivery}"` : ''}${order.trackingNumber ? `,
    trackingNumber: "${order.trackingNumber}"` : ''}${order.notes ? `,
    notes: "${order.notes}"` : ''}
  }`;
  }).join(',\n');

  return `${header}
${ordersContent}
];`;
};

// Update order status
export const updateOrderStatus = (orderId: number, status: Order['status'], notes?: string): boolean => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    if (notes) {
      orders[orderIndex].notes = notes;
    }
    
    // Save to localStorage
    saveOrdersToStorage();
    
    console.log(`Order ${orderId} status updated to: ${status}`);
    return true;
  }
  return false;
};

// Update tracking number
export const updateTrackingNumber = (orderId: number, trackingNumber: string): boolean => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders[orderIndex].trackingNumber = trackingNumber;
    
    // Save to localStorage
    saveOrdersToStorage();
    
    console.log(`Order ${orderId} tracking number updated to: ${trackingNumber}`);
    return true;
  }
  return false;
};

// Delete order (admin only)
export const deleteOrder = (orderId: number): boolean => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);
    
    // Save to localStorage
    saveOrdersToStorage();
    
    console.log(`Order ${orderId} deleted`);
    return true;
  }
  return false;
};

// Get order statistics
export const getOrderStats = () => {
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter(order => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.totalAmount, 0);
  
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<Order['status'], number>);

  return {
    totalOrders,
    totalRevenue,
    statusCounts,
    pendingOrders: statusCounts.pending || 0,
    processingOrders: statusCounts.processing || 0,
    shippedOrders: statusCounts.shipped || 0,
    deliveredOrders: statusCounts.delivered || 0,
    cancelledOrders: statusCounts.cancelled || 0
  };
};

// Export orders to downloadable JSON file
export const exportOrdersToFile = (filename?: string): void => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const defaultFilename = `orders-${timestamp}.json`;
    const finalFilename = filename || defaultFilename;
    
    const dataStr = JSON.stringify(orders, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // Create download link
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = finalFilename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    console.log(`${orders.length} orders exported to ${finalFilename}`);
  } catch (error) {
    console.error('Error exporting orders to file:', error);
    throw error;
  }
};

// Import orders from JSON file and replace current orders
export const importOrdersFromFile = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      reject(new Error('File must be a JSON file'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const importedOrders: Order[] = JSON.parse(result);
          
          // Validate that it's an array of orders
          if (!Array.isArray(importedOrders)) {
            throw new Error('File does not contain a valid orders array');
          }

          // Basic validation of order structure
          const isValidOrders = importedOrders.every(order => 
            order.id !== undefined && 
            order.customerName && 
            order.items && 
            Array.isArray(order.items) &&
            order.totalAmount !== undefined
          );

          if (!isValidOrders) {
            throw new Error('File contains invalid order data structure');
          }

          // Replace current orders
          orders.length = 0;
          orders.push(...importedOrders);
          
          // Save to localStorage
          saveOrdersToStorage();

          console.log(`Successfully imported ${orders.length} orders from file: ${file.name}`);
          resolve(true);
        } else {
          reject(new Error('Failed to read file content'));
        }
      } catch (error) {
        reject(new Error(`Error parsing JSON file: ${error}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsText(file);
  });
};

// Create backup file of current orders
export const createOrdersBackup = (): void => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const filename = `orders-backup-${timestamp}.json`;
  exportOrdersToFile(filename);
};

// Reset orders to initial demo data (admin function)
export const resetOrdersToDemo = (): void => {
  // Get the initial orders from the orders.ts file by clearing localStorage
  localStorage.removeItem(ORDERS_STORAGE_KEY);
  localStorage.removeItem('eshop-orders-backup');
  
  // The orders array will be reset to its initial state when the page reloads
  // For immediate effect, we need to reload the page
  if (window.confirm('This will reset to demo data and reload the page. Continue?')) {
    window.location.reload();
  }
};

// Initialize orders when the service is imported
initializeOrders();
