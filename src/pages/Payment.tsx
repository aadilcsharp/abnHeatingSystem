import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { companyInfo } from '../data/company';
import { qrCodeImage } from '../../public/images';
import { dataService } from '../data/dataService';
import { Order, OrderItem, ShippingAddress } from '../data/orders';

function Payment() {
  const { t } = useTranslation();
  const { state, dispatch } = useCart();
  const { state: authState } = useAuth();
  const { addNotification } = useNotification();
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [orderCreated, setOrderCreated] = useState<number | null>(null);
  const [finalTotal, setFinalTotal] = useState<number>(0);

  const subtotal = state.total;
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal >= 2999 ? 0 : 99;
  const total = subtotal + tax + shipping;

  const handlePaymentComplete = () => {
    // Store the final total before clearing cart
    setFinalTotal(total);
    
    // Create order when payment is completed
    const orderItems: OrderItem[] = state.items.map(item => ({
      id: parseInt(item.id),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.images?.[0] || '',
      category: item.category
    }));

    // Mock shipping address (in real app, this would come from a form)
    const shippingAddress: ShippingAddress = {
      fullName: authState.user?.username || 'Guest User',
      address: '123 Main Street',
      city: 'Your City',
      postalCode: '12345',
      country: 'Your Country',
      phone: '+1-555-0123'
    };

    const newOrder: Omit<Order, 'id'> = {
      userId: authState.user?.id ? parseInt(authState.user.id) : 0,
      customerName: authState.user?.username || 'Guest User',
      customerEmail: authState.user?.email || 'guest@email.com',
      items: orderItems,
      totalAmount: total,
      shippingAddress,
      paymentMethod: 'UPI',
      status: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: 'Order placed via web checkout'
    };

    const createdOrder = dataService.addOrder(newOrder);
    setOrderCreated(createdOrder.id);
    setPaymentCompleted(true);
    
    // Show success notification
    addNotification({
      type: 'success',
      title: 'Order Placed Successfully!',
      message: `Order #${createdOrder.id} created! Updated orders.ts file generated in console.`
    });
    
    // Show immediate info about file update
    setTimeout(() => {
      addNotification({
        type: 'info',
        title: 'orders.ts Updated!',
        message: 'Check console for updated file content, or run downloadUpdatedOrdersFile()'
      });
    }, 1500);
    
    // Clear cart after payment
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
    }, 3000);
  };

  if (state.items.length === 0 && !paymentCompleted) {
    return (
      <div className="payment-page">
        <div className="page-container">
          <div className="empty-cart">
            <h2>No items in cart</h2>
            <p>Add some products to your cart before proceeding to payment</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (paymentCompleted) {
    return (
      <div className="payment-page">
        <div className="page-container">
          <div className="payment-success">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase. Your order has been confirmed.</p>
            <div className="success-details">
              <p><strong>Order Amount:</strong> ₹{finalTotal.toLocaleString()}</p>
              <p><strong>Payment Method:</strong> UPI Payment</p>
              <p><strong>Order ID:</strong> {orderCreated || 'Processing...'}</p>
            </div>
            <div className="success-actions">
              <Link to="/" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="page-container">
        <div className="page-header">
          <Link to="/cart" className="back-btn">
            <ArrowLeft size={20} />
            Back to Cart
          </Link>
          <h1 className="page-title">{t('paymentTitle')}</h1>
        </div>

        <div className="payment-content">
          <div className="payment-section">
            <div className="payment-qr-section">
              <div className="qr-container-large">
                <h3>{t('scanQRCode')}</h3>
                <div className="qr-image-container-large">
                  <img src={qrCodeImage} alt="Payment QR Code" className="payment-qr-image" />
                </div>
                <p className="qr-instructions">{t('paymentInstructions')}</p>
                
                <div className="payment-apps">
                  <h4>Supported UPI Apps:</h4>
                  <div className="upi-apps">
                    <div className="upi-app">Google Pay</div>
                    <div className="upi-app">PhonePe</div>
                    <div className="upi-app">Paytm</div>
                    <div className="upi-app">Amazon Pay</div>
                    <div className="upi-app">BHIM UPI</div>
                  </div>
                </div>

                <div className="payment-info">
                  <div className="payment-detail">
                    <span>Merchant:</span>
                    <span>{companyInfo.name}</span>
                  </div>
                  <div className="payment-detail">
                    <span>Amount:</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <div className="payment-detail">
                    <span>Order ID:</span>
                    <span>TM{Date.now()}</span>
                  </div>
                </div>

                <button 
                  className="btn btn-success payment-complete-btn"
                  onClick={handlePaymentComplete}
                >
                  <CheckCircle size={20} />
                  Mark as Paid (Demo)
                </button>
              </div>
            </div>

            <div className="payment-alternative">
              <h3>Alternative Payment Methods</h3>
              <div className="payment-methods">
                <div className="payment-method">
                  <Smartphone size={24} />
                  <div>
                    <h4>UPI ID</h4>
                    <p>ABN HEATING SYSTEM@upi</p>
                  </div>
                </div>
                <div className="payment-method">
                  <span style={{fontSize: '24px'}}>💳</span>
                  <div>
                    <h4>Bank Transfer</h4>
                    <p>Contact us for bank details</p>
                  </div>
                </div>
                <div className="payment-method">
                  <span style={{fontSize: '24px'}}>💰</span>
                  <div>
                    <h4>Cash on Delivery</h4>
                    <p>Available in select areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-summary-payment">
            <div className="order-summary-card">
              <h3>Order Summary</h3>
              
              <div className="order-items">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="order-item">
                    <span className="item-name">
                      {item.name} ({item.selectedSize}) x {item.quantity}
                    </span>
                    <span className="item-price">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="total-divider"></div>
                <div className="total-row total-final">
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="security-info">
                <h4>🔒 Secure Payment</h4>
                <p>Your payment information is encrypted and secure. We do not store your payment details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
