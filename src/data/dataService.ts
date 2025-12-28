import { Product, products } from './products';
import { User, users } from './users';
import { CompanyInfo, companyInfo } from './company';
import { Order } from './orders';
import * as orderService from './orderService';

// Direct manipulation of exported arrays to simulate database updates
// In a real application, this would be handled by a backend API

class DataService {
  // Product methods
  getProducts(): Product[] {
    return [...products];
  }

  addProduct(product: Product): void {
    products.push(product);
    console.log('Product added:', product);
  }

  updateProduct(updatedProduct: Product): void {
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      console.log('Product updated:', updatedProduct);
    }
  }

  deleteProduct(productId: string): void {
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
      console.log('Product deleted:', productId);
    }
  }

  // User methods
  getUsers(): User[] {
    return [...users];
  }

  addUser(user: User): void {
    users.push(user);
    console.log('User added:', user);
  }

  updateUser(updatedUser: User): void {
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      console.log('User updated:', updatedUser);
    }
  }

  deleteUser(userId: string): void {
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users.splice(index, 1);
      console.log('User deleted:', userId);
    }
  }

  toggleUserStatus(userId: string): void {
    const user = users.find(u => u.id === userId);
    if (user) {
      user.isActive = !user.isActive;
      console.log('User status toggled:', userId, 'Active:', user.isActive);
    }
  }

  // Company methods
  getCompanyInfo(): CompanyInfo {
    return { ...companyInfo };
  }

  updateCompanyInfo(updatedCompanyInfo: CompanyInfo): void {
    // Update all properties of the company info
    Object.assign(companyInfo, updatedCompanyInfo);
    console.log('Company info updated:', updatedCompanyInfo);
  }

  // Order methods
  getOrders(): Order[] {
    return orderService.getAllOrders();
  }

  getOrderById(orderId: number): Order | undefined {
    return orderService.getOrderById(orderId);
  }

  getOrdersByUserId(userId: number): Order[] {
    return orderService.getOrdersByUserId(userId);
  }

  getOrdersByStatus(status: Order['status']): Order[] {
    return orderService.getOrdersByStatus(status);
  }

  updateOrderStatus(orderId: number, status: Order['status'], notes?: string): boolean {
    return orderService.updateOrderStatus(orderId, status, notes);
  }

  updateTrackingNumber(orderId: number, trackingNumber: string): boolean {
    return orderService.updateTrackingNumber(orderId, trackingNumber);
  }

  addOrder(order: Omit<Order, 'id'>): Order {
    return orderService.addOrder(order);
  }

  deleteOrder(orderId: number): boolean {
    return orderService.deleteOrder(orderId);
  }

  getOrderStats() {
    return orderService.getOrderStats();
  }

  // File-based order management
  exportOrdersToFile(filename?: string): void {
    return orderService.exportOrdersToFile(filename);
  }

  importOrdersFromFile(file: File): Promise<boolean> {
    return orderService.importOrdersFromFile(file);
  }

  createOrdersBackup(): void {
    return orderService.createOrdersBackup();
  }

  resetOrdersToDemo(): void {
    return orderService.resetOrdersToDemo();
  }
}

// Create singleton instance
export const dataService = new DataService();
