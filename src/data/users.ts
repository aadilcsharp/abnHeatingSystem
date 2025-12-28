export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'employee' | 'customer';
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  phone?: string;
  address?: string;
}

export const users: User[] = [
  {
    id: "1",
    username: "admin",
    password: "admin123", // In production, this should be hashed
    role: "admin",
    name: "Administrator",
    email: "admin@ABN HEATING SYSTEM.com",
    isActive: true,
    createdAt: "2024-01-01",
    lastLogin: undefined
  },
  {
    id: "2",
    username: "employee1",
    password: "emp123",
    role: "employee",
    name: "John Doe",
    email: "john@ABN HEATING SYSTEM.com",
    isActive: true,
    createdAt: "2024-01-15",
    lastLogin: undefined
  },
  {
    id: "3",
    username: "employee2",
    password: "emp456",
    role: "employee",
    name: "Jane Smith",
    email: "jane@ABN HEATING SYSTEM.com",
    isActive: true,
    createdAt: "2024-01-20",
    lastLogin: undefined
  },
  {
    id: "4",
    username: "manager",
    password: "mgr789",
    role: "admin",
    name: "Mike Johnson",
    email: "mike@ABN HEATING SYSTEM.com",
    isActive: true,
    createdAt: "2024-01-10",
    lastLogin: undefined
  },
  // Sample customer users (would be added via registration)
  {
    id: "5",
    username: "customer1",
    password: "cust123",
    role: "customer",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    isActive: true,
    createdAt: "2025-07-22",
    lastLogin: undefined,
    phone: "+91-98765-43217",
    address: "123 Customer Street, Mumbai"
  }
];
