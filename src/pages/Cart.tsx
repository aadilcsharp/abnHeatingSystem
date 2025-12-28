import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { phoneImage, headphonesImage, laptopImage, watchImage } from '../../public/images';
import { companyInfo } from '../data/company';

function Cart() {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useCart();
  const { addNotification } = useNotification();

  // Calculate shipping cost based on company settings
  const calculateShipping = () => {
    if (!companyInfo.shippingSettings.enableShipping) return 0;
    return state.total >= companyInfo.shippingSettings.freeShippingThreshold 
      ? 0 
      : companyInfo.shippingSettings.shippingCharge;
  };

  // Calculate GST based on company settings
  const calculateGST = () => {
    if (!companyInfo.taxSettings.enableGST) return 0;
    return Math.round(state.total * (companyInfo.taxSettings.gstRate / 100));
  };

  const shippingCost = calculateShipping();
  const gstAmount = calculateGST();
  const grandTotal = state.total + shippingCost + gstAmount;

  const getProductName = (product: any) => {
    switch (i18n.language) {
      case 'hi': return product.nameHi;
      case 'ur': return product.nameUr;
      case 'ar': return product.nameAr;
      default: return product.name;
    }
  };

  const getProductImage = (item: any) => {
    // Use the first image from the product's images array
    if (item.images && item.images.length > 0) {
      const imagePath = item.images[0];
      // Handle different image path formats
      if (imagePath.startsWith('/src/') || imagePath.startsWith('src/')) {
        return imagePath.replace(/^\/?(src\/)?/, '/src/');
      }
      // For images without proper path, construct the path
      if (item.category === 'Fashion') {
        return `/bra/${imagePath}`;
      }
      return `/mobile/${imagePath}`;
    }
    
    // Fallback to category-based images
    switch (item.category) {
      case 'Electronics': return phoneImage;
      case 'Audio': return headphonesImage;
      case 'Computers': return laptopImage;
      case 'Wearables': return watchImage;
      case 'Fashion': return '/bra/bra1.jpg';
      default: return phoneImage;
    }
  };

  const updateQuantity = (productId: string, selectedSize: string, newQuantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      productId,
      selectedSize,
      quantity: newQuantity
    });
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    // Find the item to get its name for the notification
    const item = state.items.find(i => i.id === productId && i.selectedSize === selectedSize);
    const itemName = item ? getProductName(item) : 'Product';
    
    dispatch({
      type: 'REMOVE_FROM_CART',
      productId,
      selectedSize
    });
    
    // Show notification
    addNotification({
      type: 'info',
      title: 'Item Removed',
      message: `${itemName} has been removed from your cart`
    });
  };

  if (state.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="page-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={64} />
            </div>
            <h2>{t('emptyCart')}</h2>
            <p>Add some products to your cart to get started</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">{t('cart')} ({state.itemCount} items)</h1>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            <h2>{t('cartItems')}</h2>
            <div className="cart-items-list">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                  <div className="cart-item-image">
                    <img src={getProductImage(item)} alt={getProductName(item)} />
                  </div>
                  
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{getProductName(item)}</h3>
                    <div className="cart-item-info">
                      <span className="cart-item-size">Size: {item.selectedSize}</span>
                      <span className="cart-item-price">₹{item.selectedPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="cart-item-total">
                      ₹{(item.selectedPrice * item.quantity).toLocaleString()}
                    </div>
                    
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      title={t('removeFromCart') || 'Remove from Cart'}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary">
            <div className="cart-summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal ({state.itemCount} items)</span>
                <span>₹{state.total.toLocaleString()}</span>
              </div>
              
              {companyInfo.shippingSettings.enableShipping && (
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "free-shipping" : ""}>
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>
              )}
              
              {companyInfo.taxSettings.enableGST && (
                <div className="summary-row">
                  <span>Tax (GST {companyInfo.taxSettings.gstRate}%)</span>
                  <span>₹{gstAmount.toLocaleString()}</span>
                </div>
              )}
              
              <div className="summary-divider"></div>
              
              <div className="summary-row summary-total">
                <span>{t('total')}</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>

              {companyInfo.shippingSettings.enableShipping && state.total < companyInfo.shippingSettings.freeShippingThreshold && (
                <div className="shipping-notice">
                  <p>Add ₹{(companyInfo.shippingSettings.freeShippingThreshold - state.total).toLocaleString()} more for FREE shipping!</p>
                </div>
              )}

              <div className="cart-actions">
                <Link to="/payment" className="btn btn-primary btn-full">
                  {t('proceedToPayment')}
                  <ArrowRight size={20} />
                </Link>
                
                <Link to="/products" className="btn btn-outline btn-full">
                  Continue Shopping
                </Link>
              </div>

              <div className="security-badges">
                <div className="security-badge">
                  <span>🔒</span>
                  <span>Secure Payment</span>
                </div>
                <div className="security-badge">
                  <span>🚚</span>
                  <span>Fast Delivery</span>
                </div>
                <div className="security-badge">
                  <span>↩️</span>
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
