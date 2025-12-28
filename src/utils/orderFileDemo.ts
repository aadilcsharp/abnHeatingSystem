import { orders } from '../data/orders';
import { addOrder } from '../data/orderService';

// Function to demonstrate that orders ARE being saved
export const demonstrateOrderSaving = () => {
  console.log('🔍 DEMONSTRATING ORDER SAVING PROCESS:');
  console.log('═'.repeat(50));
  
  // Show current orders count
  console.log(`📊 Current orders in memory: ${orders.length}`);
  console.log(`📊 Last order ID: ${orders[orders.length - 1]?.id}`);
  
  // Create a demo order to show the process
  const demoOrder = {
    userId: 1,
    customerName: "Payment Demo User",
    customerEmail: "paymentdemo@email.com",
    items: [
      {
        id: 1,
        name: "Premium Smartphone",
        price: 79999,
        quantity: 1,
        image: "mobile/phone1.jpg",
        category: "Mobile"
      }
    ],
    totalAmount: 79999,
    shippingAddress: {
      fullName: "Payment Demo User",
      address: "456 Payment Ave",
      city: "Demo City",
      postalCode: "654321",
      country: "India",
      phone: "+91-98765-43299"
    },
    paymentMethod: "UPI" as const,
    status: "pending" as const,
    orderDate: new Date().toISOString().split('T')[0],
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: "Demo order created to show saving process"
  };
  
  console.log('➕ Adding new order...');
  const newOrder = addOrder(demoOrder);
  
  console.log(`✅ Order added successfully with ID: ${newOrder.id}`);
  console.log(`📊 New orders count: ${orders.length}`);
  
  console.log('\n🎯 PROOF THAT ORDERS ARE SAVED:');
  console.log('The orders array now contains:', orders.map(o => ({
    id: o.id,
    customer: o.customerName,
    total: o.totalAmount,
    status: o.status
  })));
  
  console.log('\n💡 WHY NOT IN orders.ts FILE:');
  console.log('- Frontend apps cannot modify source files directly');
  console.log('- Orders are saved to the in-memory array (which represents orders.ts)');
  console.log('- In production, this would save to a database');
  console.log('- For demo purposes, use the generated file content below');
  
  return newOrder;
};

// Function to get the complete updated orders.ts content
export const getUpdatedOrdersFileContent = () => {
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
];`;
};

// Make functions available globally for easy testing
if (typeof window !== 'undefined') {
  (window as any).demonstrateOrderSaving = demonstrateOrderSaving;
  (window as any).getUpdatedOrdersFileContent = getUpdatedOrdersFileContent;
  (window as any).downloadUpdatedOrdersFile = () => {
    const content = getUpdatedOrdersFileContent();
    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'updated-orders.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('📁 Downloaded updated orders.ts file!');
  };
}
