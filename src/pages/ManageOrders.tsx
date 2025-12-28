import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../data/dataService';
import { Order } from '../data/orders';
import { getProductImage } from '../../public/images';

const ManageOrders: React.FC = () => {
  const { state } = useAuth();
  const user = state.user;
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newStatus, setNewStatus] = useState<Order['status']>('pending');
  const [newTrackingNumber, setNewTrackingNumber] = useState('');
  const [updateNotes, setUpdateNotes] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadOrders();
    loadStats();
  }, []);

  const loadOrders = () => {
    setIsLoading(true);
    try {
      const allOrders = dataService.getOrders();
      setOrders(allOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = () => {
    const orderStats = dataService.getOrderStats();
    setStats(orderStats);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = 
      order.id.toString().includes(searchTerm) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleUpdateOrder = () => {
    if (!selectedOrder) return;

    let success = true;
    
    if (newStatus !== selectedOrder.status) {
      success = dataService.updateOrderStatus(selectedOrder.id, newStatus, updateNotes);
    }
    
    if (newTrackingNumber && newTrackingNumber !== selectedOrder.trackingNumber) {
      success = success && dataService.updateTrackingNumber(selectedOrder.id, newTrackingNumber);
    }

    if (success) {
      loadOrders();
      loadStats();
      setShowUpdateModal(false);
      resetUpdateForm();
      alert('Order updated successfully!');
    } else {
      alert('Failed to update order');
    }
  };

  const resetUpdateForm = () => {
    setSelectedOrder(null);
    setNewStatus('pending');
    setNewTrackingNumber('');
    setUpdateNotes('');
  };

  const openUpdateModal = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setNewTrackingNumber(order.trackingNumber || '');
    setUpdateNotes(order.notes || '');
    setShowUpdateModal(true);
  };

  const handleDeleteOrder = (orderId: number) => {
    if (user?.role !== 'admin') {
      alert('Only admins can delete orders');
      return;
    }

    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      const success = dataService.deleteOrder(orderId);
      if (success) {
        loadOrders();
        loadStats();
        alert('Order deleted successfully!');
      } else {
        alert('Failed to delete order');
      }
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'processing': return '#17a2b8';
      case 'shipped': return '#6f42c1';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // File management functions
  const handleExportOrders = () => {
    try {
      dataService.exportOrdersToFile();
      alert('Orders exported successfully! Check your downloads folder.');
    } catch (error) {
      alert('Failed to export orders. Please try again.');
      console.error('Export error:', error);
    }
  };

  const handleImportOrders = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (window.confirm('This will replace all current orders with the imported data. Are you sure?')) {
      dataService.importOrdersFromFile(file)
        .then(() => {
          loadOrders();
          loadStats();
          alert('Orders imported successfully!');
        })
        .catch((error) => {
          alert(`Failed to import orders: ${error.message}`);
          console.error('Import error:', error);
        });
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreateBackup = () => {
    try {
      dataService.createOrdersBackup();
      alert('Backup created successfully! Check your downloads folder.');
    } catch (error) {
      alert('Failed to create backup. Please try again.');
      console.error('Backup error:', error);
    }
  };

  const handleResetToDemo = () => {
    if (window.confirm('This will reset all orders to demo data. This action cannot be undone. Are you sure?')) {
      dataService.resetOrdersToDemo();
      loadOrders();
      loadStats();
      alert('Orders reset to demo data successfully!');
    }
  };

  if (!user || (user.role !== 'admin' && user.role !== 'employee')) {
    return (
      <div className="page-container">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="manage-orders">
        <div className="page-header">
          <h1>Order Management</h1>
          <p>Manage customer orders and track deliveries</p>
        </div>

        {/* File Management Section (Admin Only) */}
        {user.role === 'admin' && (
          <div className="order-file-management">
            <div className="file-actions">
              <h3>Order Data Management</h3>
              <div className="file-buttons">
                <button
                  className="btn btn-primary"
                  onClick={handleExportOrders}
                  title="Export all orders to JSON file"
                >
                  📄 Export Orders
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  style={{ display: 'none' }}
                  onChange={handleImportOrders}
                />
                <button
                  className="btn btn-secondary"
                  onClick={() => fileInputRef.current?.click()}
                  title="Import orders from JSON file"
                >
                  📁 Import Orders
                </button>
                
                <button
                  className="btn btn-outline"
                  onClick={handleCreateBackup}
                  title="Create backup of current orders"
                >
                  💾 Create Backup
                </button>
                
                <button
                  className="btn btn-danger"
                  onClick={handleResetToDemo}
                  title="Reset to demo data (WARNING: This cannot be undone)"
                >
                  🔄 Reset to Demo
                </button>
              </div>
              <p className="file-help-text">
                Export: Download orders as JSON file • Import: Replace orders from JSON file • 
                Backup: Create timestamped backup • Reset: Restore demo data
              </p>
            </div>
          </div>
        )}

        {/* Order Statistics */}
        {stats && (
          <div className="order-stats">
            <div className="stat-card">
              <h3>Total Orders</h3>
              <div className="stat-number">{stats.totalOrders}</div>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <div className="stat-number">{formatCurrency(stats.totalRevenue)}</div>
            </div>
            <div className="stat-card">
              <h3>Pending</h3>
              <div className="stat-number" style={{ color: getStatusColor('pending') }}>
                {stats.pendingOrders}
              </div>
            </div>
            <div className="stat-card">
              <h3>Processing</h3>
              <div className="stat-number" style={{ color: getStatusColor('processing') }}>
                {stats.processingOrders}
              </div>
            </div>
            <div className="stat-card">
              <h3>Shipped</h3>
              <div className="stat-number" style={{ color: getStatusColor('shipped') }}>
                {stats.shippedOrders}
              </div>
            </div>
            <div className="stat-card">
              <h3>Delivered</h3>
              <div className="stat-number" style={{ color: getStatusColor('delivered') }}>
                {stats.deliveredOrders}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="order-filters">
          <div className="filter-group">
            <label>Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Search:</label>
            <input
              type="text"
              placeholder="Order ID, customer name, email, or tracking number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="loading">Loading orders...</div>
        ) : (
          <div className="orders-list">
            {filteredOrders.length === 0 ? (
              <div className="no-orders">
                <p>No orders found matching your criteria.</p>
              </div>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-id">Order #{order.id}</div>
                    <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className="order-content">
                    <div className="order-customer">
                      <h3>{order.customerName}</h3>
                      <p>{order.customerEmail}</p>
                      <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                      {order.trackingNumber && (
                        <p><strong>Tracking:</strong> {order.trackingNumber}</p>
                      )}
                    </div>

                    <div className="order-items">
                      <h4>Items ({order.items.length})</h4>
                      <div className="items-grid">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <img
                              src={getProductImage(item.image, item.name, index)}
                              alt={item.name}
                              className="item-image"
                            />
                            <div className="item-details">
                              <p className="item-name">{item.name}</p>
                              <p className="item-quantity">Qty: {item.quantity}</p>
                              <p className="item-price">{formatCurrency(item.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="order-shipping">
                      <h4>Shipping Address</h4>
                      <div className="address">
                        <p>{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                        <p>{order.shippingAddress.country}</p>
                        <p>Phone: {order.shippingAddress.phone}</p>
                      </div>
                    </div>

                    <div className="order-summary">
                      <div className="total-amount">
                        <strong>Total: {formatCurrency(order.totalAmount)}</strong>
                      </div>
                      <div className="payment-method">
                        Payment: {order.paymentMethod}
                      </div>
                      {order.estimatedDelivery && (
                        <div className="estimated-delivery">
                          Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                        </div>
                      )}
                      {order.notes && (
                        <div className="order-notes">
                          <strong>Notes:</strong> {order.notes}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="order-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => openUpdateModal(order)}
                    >
                      Update Order
                    </button>
                    {user.role === 'admin' && (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        Delete Order
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Update Order Modal */}
        {showUpdateModal && selectedOrder && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Update Order #{selectedOrder.id}</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowUpdateModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-content">
                <div className="form-group">
                  <label>Order Status:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as Order['status'])}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tracking Number:</label>
                  <input
                    type="text"
                    value={newTrackingNumber}
                    onChange={(e) => setNewTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                  />
                </div>

                <div className="form-group">
                  <label>Notes:</label>
                  <textarea
                    value={updateNotes}
                    onChange={(e) => setUpdateNotes(e.target.value)}
                    placeholder="Add notes about this update..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateOrder}
                >
                  Update Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
