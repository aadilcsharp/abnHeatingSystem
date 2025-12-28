import { users } from '../data/users';
import { saveUserToFile } from './userFileSaver';

// Function to demonstrate user registration saving to users.ts
export const demoUserRegistration = () => {
  console.log('🔍 DEMONSTRATING USER REGISTRATION:');
  console.log('═'.repeat(50));
  
  // Show current users count
  console.log(`👥 Current users in memory: ${users.length}`);
  console.log(`👥 Current customers: ${users.filter(u => u.role === 'customer').length}`);
  console.log(`👥 Last user ID: ${users[users.length - 1]?.id}`);
  
  // Create a demo customer registration
  const demoCustomerData = {
    username: "demouser" + Date.now(),
    password: "demo123",
    role: 'customer' as const,
    name: "Demo Customer",
    email: `democustomer${Date.now()}@example.com`,
    phone: "+91-98765-43200",
    address: "456 Demo Avenue, Test City",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };
  
  console.log('➕ Registering new customer...');
  const newCustomer = saveUserToFile(demoCustomerData);
  
  console.log(`✅ Customer registered successfully with ID: ${newCustomer.id}`);
  console.log(`👥 New users count: ${users.length}`);
  console.log(`👥 New customers count: ${users.filter(u => u.role === 'customer').length}`);
  
  console.log('\n🎯 PROOF THAT USERS ARE SAVED:');
  console.log('The users array now contains:', users.map(u => ({
    id: u.id,
    username: u.username,
    name: u.name,
    role: u.role,
    email: u.email
  })));
  
  console.log('\n💡 HOW TO GET UPDATED USERS.TS FILE:');
  console.log('- Users are saved to the in-memory array (which represents users.ts)');
  console.log('- Call downloadUsersFile() to get the updated users.ts file');
  console.log('- Replace your current users.ts with the downloaded content');
  console.log('- In production, this would save to a database');
  
  return newCustomer;
};

// Function to show users by role
export const showUsersByRole = () => {
  console.group('👥 USERS BY ROLE');
  
  const customers = users.filter(u => u.role === 'customer');
  const admins = users.filter(u => u.role === 'admin');
  const employees = users.filter(u => u.role === 'employee');
  
  console.log('📊 CUSTOMERS:', customers);
  console.log('📊 ADMINS:', admins);
  console.log('📊 EMPLOYEES:', employees);
  console.log(`📊 TOTAL: ${users.length} users`);
  
  console.groupEnd();
};

// Function to simulate a complete user registration flow
export const simulateUserRegistration = (userData: {
  username: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}) => {
  console.log('\n🚀 SIMULATING USER REGISTRATION FLOW:');
  console.log('═'.repeat(50));
  
  const registrationData = {
    ...userData,
    password: 'temp123', // In production, this would be properly hashed
    role: 'customer' as const,
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };
  
  console.log('📝 Registration Data:', registrationData);
  
  // Check if user already exists
  const existingUser = users.find(
    u => u.username === userData.username || u.email === userData.email
  );
  
  if (existingUser) {
    console.log('❌ Registration failed: User already exists');
    return null;
  }
  
  // Save new customer
  const newCustomer = saveUserToFile(registrationData);
  
  console.log('✅ Registration successful!');
  console.log('🎉 New customer added to users.ts');
  console.log('📁 Call downloadUsersFile() to get updated file');
  
  return newCustomer;
};

// Make functions available globally for testing
if (typeof window !== 'undefined') {
  (window as any).demoUserRegistration = demoUserRegistration;
  (window as any).showUsersByRole = showUsersByRole;
  (window as any).simulateUserRegistration = simulateUserRegistration;
  
  console.log('\n🧪 USER REGISTRATION TESTING FUNCTIONS AVAILABLE:');
  console.log('- demoUserRegistration() - Test user registration');
  console.log('- showUsersByRole() - Show all users by role');
  console.log('- simulateUserRegistration({username, name, email, phone, address}) - Simulate registration');
  console.log('- downloadUsersFile() - Download updated users.ts file');
}
