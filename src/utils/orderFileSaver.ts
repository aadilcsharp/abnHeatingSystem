import { Order, orders } from '../data/orders';

// Function to add order and generate downloadable orders.ts file
export const saveOrderToFile = (newOrder: Omit<Order, 'id'>): Order => {
  // Generate new ID
  const maxId = orders.reduce((max, order) => Math.max(max, order.id), 0);
  const orderWithId: Order = {
    ...newOrder,
    id: maxId + 1
  };

  // Add to orders array (this updates the in-memory array)
  orders.push(orderWithId);

  console.log(`✅ Order added with ID: ${orderWithId.id}`);
  console.log(`📊 Total orders: ${orders.length}`);

  // Generate and save updated file content
  generateAndSaveOrdersFile();

  return orderWithId;
};

// Function to generate the complete orders.ts file content
export const generateOrdersFileContent = (): string => {
  const fileHeader = `export interface OrderItem {
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
    const itemsString = order.items.map(item => `      {
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
    orderDate: "${order.orderDate}"${order.estimatedDelivery ? `,
    estimatedDelivery: "${order.estimatedDelivery}"` : ''}${order.trackingNumber ? `,
    trackingNumber: "${order.trackingNumber}"` : ''}${order.notes ? `,
    notes: "${order.notes}"` : ''}
  }`;
  }).join(',\n');

  return `${fileHeader}
${ordersContent}
];

// Helper functions for order management
export const getOrderById = (id: number): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getOrdersByUserId = (userId: number): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const getOrdersByStatus = (status: Order['status']): Order[] => {
  return orders.filter(order => order.status === status);
};

export const updateOrderStatus = (id: number, status: Order['status']): boolean => {
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = status;
    return true;
  }
  return false;
};
`;
};

// Function to generate and provide downloadable file
export const generateAndSaveOrdersFile = (): void => {
  const content = generateOrdersFileContent();
  
  // Save to localStorage for easy access
  localStorage.setItem('eshop-updated-orders-file', content);
  
  console.log('\n🔄 ORDERS.TS FILE UPDATED!');
  console.log('═'.repeat(60));
  console.log('📁 The updated orders.ts content is ready!');
  console.log('📋 You can:');
  console.log('   1. Call downloadOrdersFile() to download the updated file');
  console.log('   2. Call copyOrdersFileContent() to copy content to clipboard');
  console.log('   3. Replace your current orders.ts with the downloaded content');
  console.log('═'.repeat(60));
  
  // Make download function available
  if (typeof window !== 'undefined') {
    (window as any).downloadOrdersFile = () => {
      const blob = new Blob([content], { type: 'text/typescript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders.ts';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('📁 Downloaded orders.ts file with all current orders!');
    };
    
    (window as any).copyOrdersFileContent = () => {
      navigator.clipboard.writeText(content).then(() => {
        console.log('📋 Orders.ts content copied to clipboard!');
      }).catch(() => {
        console.log('Content ready to copy:', content);
      });
    };
  }
};

// Function to show current orders status
export const showOrdersStatus = (): void => {
  console.group('📊 ORDERS STATUS');
  console.log(`Total orders: ${orders.length}`);
  console.log(`Pending orders: ${orders.filter(o => o.status === 'pending').length}`);
  console.log(`Processing orders: ${orders.filter(o => o.status === 'processing').length}`);
  console.log(`Shipped orders: ${orders.filter(o => o.status === 'shipped').length}`);
  console.log(`Delivered orders: ${orders.filter(o => o.status === 'delivered').length}`);
  console.log(`Last order ID: ${Math.max(...orders.map(o => o.id))}`);
  console.groupEnd();
};

// Make functions globally available
if (typeof window !== 'undefined') {
  (window as any).saveOrderToFile = saveOrderToFile;
  (window as any).generateOrdersFileContent = generateOrdersFileContent;
  (window as any).showOrdersStatus = showOrdersStatus;
  (window as any).generateAndSaveOrdersFile = generateAndSaveOrdersFile;
}
