import { orders } from '../data/orders';

// Function to automatically append new orders to orders.ts file content
export const generateOrdersFileWithNewOrders = () => {
  // Get orders from localStorage (these are the NEW orders not in the static file)
  const storedOrders = localStorage.getItem('eshop-orders');
  let allOrders = [...orders]; // Start with current file orders
  
  if (storedOrders) {
    const parsedOrders = JSON.parse(storedOrders);
    // Find orders that are NOT in the static file (ID > 1007)
    const newOrders = parsedOrders.filter((order: any) => order.id > 1007);
    allOrders = [...orders, ...newOrders];
  }

  const fileContent = `export interface OrderItem {
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
export let orders: Order[] = [
${allOrders.map(order => {
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
}).join(',\n')}
];`;

  return fileContent;
};

// Function to show step-by-step instructions
export const showOrderUpdateInstructions = (newOrderId: number) => {
  console.log('\n🎯 HOW TO ADD ORDER TO ORDERS.TS FILE:');
  console.log('═'.repeat(60));
  console.log(`📋 Your new order ID: ${newOrderId}`);
  console.log('');
  console.log('🔧 METHOD 1 - Automatic File Generation:');
  console.log('1. Run: updateOrdersFile()');
  console.log('2. Copy the generated content');
  console.log('3. Replace your entire orders.ts file content');
  console.log('');
  console.log('🔧 METHOD 2 - Manual Addition:');
  console.log('1. Open: src/data/orders.ts');
  console.log('2. Add the new order before the closing ];');
  console.log('3. Use the format shown in console');
  console.log('');
  console.log('💾 METHOD 3 - Download Updated File:');
  console.log('1. Run: downloadCompleteOrdersFile()');
  console.log('2. Replace your orders.ts with downloaded file');
  console.log('═'.repeat(60));
};

// Make functions available globally
if (typeof window !== 'undefined') {
  (window as any).updateOrdersFile = () => {
    const content = generateOrdersFileWithNewOrders();
    console.log('\n📄 COMPLETE UPDATED ORDERS.TS CONTENT:');
    console.log('═'.repeat(50));
    console.log(content);
    console.log('═'.repeat(50));
    return content;
  };
  
  (window as any).downloadCompleteOrdersFile = () => {
    const content = generateOrdersFileWithNewOrders();
    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('📁 Downloaded complete orders.ts file with all orders!');
  };
  
  (window as any).showOrderInstructions = showOrderUpdateInstructions;
}
