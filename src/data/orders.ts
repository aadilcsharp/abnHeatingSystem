export interface OrderItem {
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
  {
    id: 1001,
    userId: 1,
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    items: [
      {
        id: 1,
        name: "Premium Smartphone",
        price: 79999,
        quantity: 1,
        image: "mobile/phone1.jpg",
        category: "Mobile"
      },
      {
        id: 4,
        name: "Smart Watch Series",
        price: 24999,
        quantity: 1,
        image: "mobile/watch1.jpg",
        category: "Watches"
      }
    ],
    totalAmount: 104998,
    shippingAddress: {
      fullName: "John Doe",
      address: "123 Main Street",
      city: "Mumbai",
      postalCode: "400001",
      country: "India",
      phone: "+91-98765-43210"
    },
    paymentMethod: "UPI",
    status: "processing",
    orderDate: "2025-01-15",
    estimatedDelivery: "2025-01-20",
    trackingNumber: "TRK123456789",
    notes: "Customer requested expedited shipping"
  },
  {
    id: 1002,
    userId: 2,
    customerName: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    items: [
      {
        id: 3,
        name: "Gaming Laptop Pro",
        price: 129999,
        quantity: 1,
        image: "mobile/phone3.jpg",
        category: "Laptops"
      }
    ],
    totalAmount: 129999,
    shippingAddress: {
      fullName: "Jane Smith",
      address: "456 Oak Avenue",
      city: "Delhi",
      postalCode: "110001",
      country: "India",
      phone: "+91-98765-43211"
    },
    paymentMethod: "Credit Card",
    status: "shipped",
    orderDate: "2025-01-12",
    estimatedDelivery: "2025-01-18",
    trackingNumber: "TRK987654321",
    notes: "Signature required on delivery"
  },
  {
    id: 1003,
    userId: 3,
    customerName: "Bob Johnson",
    customerEmail: "bob.johnson@email.com",
    items: [
      {
        id: 4,
        name: "Smart Watch Series",
        price: 24999,
        quantity: 2,
        image: "mobile/watch2.jpg",
        category: "Watches"
      }
    ],
    totalAmount: 81996,
    shippingAddress: {
      fullName: "Bob Johnson",
      address: "789 Pine Street",
      city: "Bangalore",
      postalCode: "560001",
      country: "India",
      phone: "+91-98765-43212"
    },
    paymentMethod: "UPI",
    status: "delivered",
    orderDate: "2025-01-10",
    estimatedDelivery: "2025-01-16",
    trackingNumber: "TRK456789123",
    notes: "Order delivered successfully"
  },
  {
    id: 1004,
    userId: 4,
    customerName: "Alice Wilson",
    customerEmail: "alice.wilson@email.com",
    items: [
      {
        id: 4,
        name: "Smart Watch Series",
        price: 24999,
        quantity: 1,
        image: "mobile/watch3.jpg",
        category: "Watches"
      }
    ],
    totalAmount: 24999,
    shippingAddress: {
      fullName: "Alice Wilson",
      address: "321 Elm Street",
      city: "Chennai",
      postalCode: "600001",
      country: "India",
      phone: "+91-98765-43213"
    },
    paymentMethod: "Debit Card",
    status: "pending",
    orderDate: "2025-01-17",
    estimatedDelivery: "2025-01-22",
    notes: "Customer called to confirm address"
  },
  {
    id: 1005,
    userId: 5,
    customerName: "Charlie Brown",
    customerEmail: "charlie.brown@email.com",
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
      fullName: "Charlie Brown",
      address: "654 Maple Drive",
      city: "Kolkata",
      postalCode: "700001",
      country: "India",
      phone: "+91-98765-43214"
    },
    paymentMethod: "UPI",
    status: "cancelled",
    orderDate: "2025-01-14",
    notes: "Customer requested cancellation - refund processed"
  },
  {
    id: 1006,
    userId: 1,
    customerName: "Demo User",
    customerEmail: "demo@email.com",
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
      fullName: "Demo User",
      address: "123 Demo Street",
      city: "Demo City",
      postalCode: "123456",
      country: "India",
      phone: "+91-98765-43215"
    },
    paymentMethod: "UPI",
    status: "pending",
    orderDate: "2025-07-21",
    estimatedDelivery: "2025-07-28",
    notes: "Demo order created via payment system"
  },
  {
    id: 1007,
    userId: 1,
    customerName: "Test User",
    customerEmail: "testuser@email.com",
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
      fullName: "Test User",
      address: "789 Test Avenue",
      city: "Test City",
      postalCode: "987654",
      country: "India",
      phone: "+91-98765-43216"
    },
    paymentMethod: "UPI",
    status: "pending",
    orderDate: "2025-07-21",
    estimatedDelivery: "2025-07-28",
    notes: "Order placed via payment demo system"
  }
];
