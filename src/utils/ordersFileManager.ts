import { Order } from '../data/orders';
import { orders } from '../data/orders';

// Simple file manager to add orders and show updated content for manual file replacement
export class OrdersFileManager {
  private static instance: OrdersFileManager;
  
  static getInstance(): OrdersFileManager {
    if (!OrdersFileManager.instance) {
      OrdersFileManager.instance = new OrdersFileManager();
    }
    return OrdersFileManager.instance;
  }
  
  // Add order and show updated orders.ts content for manual replacement
  addOrderToFile(newOrder: Order): void {
    console.log(`📝 Adding order #${newOrder.id} to orders array...`);
    
    // Add to in-memory array (this updates the running app)
    orders.push(newOrder);
    
    // Generate updated file content for manual replacement
    const updatedContent = this.generateOrdersFileContent();
    
    // Save to localStorage as backup
    localStorage.setItem('eshop-updated-orders-file', updatedContent);
    
    // Show clear instructions
    console.log('✅ Order added to in-memory array!');
    console.log('� TO UPDATE YOUR ORDERS.TS FILE:');
    console.log('═'.repeat(60));
    console.log('1. Open your orders.ts file in VS Code');
    console.log('2. Select ALL content (Ctrl+A)');
    console.log('3. Copy the content below and paste to replace');
    console.log('4. Save the file (Ctrl+S)');
    console.log('═'.repeat(60));
    console.log('');
    console.log('📄 COPY THIS CONTENT TO YOUR ORDERS.TS FILE:');
    console.log('');
    console.log(updatedContent);
    console.log('');
    console.log('═'.repeat(60));
    console.log(`📊 Total orders: ${orders.length}`);
    console.log('� Use copyOrdersContent() to copy to clipboard');
    
    // Show a notification
    if (typeof window !== 'undefined') {
      // Create a simple notification
      this.showNotification(`Order #${newOrder.id} added! Check console to update orders.ts file.`);
      
      // Make helper functions available globally
      (window as any).getUpdatedOrdersContent = () => {
        console.log('📄 UPDATED ORDERS.TS CONTENT:');
        console.log(updatedContent);
        return updatedContent;
      };
      
      (window as any).copyOrdersContent = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(updatedContent).then(() => {
            console.log('📋 Orders.ts content copied to clipboard!');
            console.log('✅ Now paste it into your orders.ts file');
            this.showNotification('Orders.ts content copied to clipboard! Paste into your orders.ts file.');
          }).catch(err => {
            console.log('❌ Failed to copy to clipboard:', err);
            console.log('📄 Please copy the content from console manually');
          });
        } else {
          console.log('📄 Copy the content from console manually');
        }
      };
      
      (window as any).downloadOrdersFile = () => {
        this.downloadFile(updatedContent, 'updated-orders.ts');
        console.log('📥 Downloaded updated-orders.ts - replace your orders.ts file with this');
      };
    }
  }
  
  private showNotification(message: string): void {
    // Create a simple notification div
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px;
      border-radius: 5px;
      z-index: 9999;
      max-width: 300px;
      font-family: Arial, sans-serif;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 5000);
  }
  
  private downloadFile(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log(`📥 Downloaded: ${filename}`);
  }
  
  private generateOrdersFileContent(): string {
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
}`;

    const ordersArray = orders.map(order => {
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

    return `${interfaceDefinitions}

// Orders data - similar to products.ts structure
export let orders: Order[] = [
${ordersArray}
];`;
  }
}

// Export singleton instance
export const ordersFileManager = OrdersFileManager.getInstance();
