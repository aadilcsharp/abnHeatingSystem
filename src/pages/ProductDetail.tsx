import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { getProductImage } from '../../public/images';
import { 
  getPriceForSize, 
  getAvailableSizes, 
  getDefaultSize, 
  isSizeInStock, 
  getDiscountPercentage, 
  formatPrice 
} from '../utils/productPricing';

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const { dispatch } = useCart();
  const { addNotification } = useNotification();
  const product = products.find(p => p.id === id);
  
  // Initialize selectedSize with the default size for the product
  const [selectedSize, setSelectedSize] = useState(
    product ? getDefaultSize(product) : ''
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  // Update selected size when product changes (e.g., navigating between products)
  useEffect(() => {
    if (product) {
      setSelectedSize(getDefaultSize(product));
    } else {
      setSelectedSize('');
    }
  }, [product?.id]); // Dependency on product ID to trigger when product changes

  // Get current pricing based on selected size
  const currentPricing = product ? getPriceForSize(product, selectedSize) : { price: 0, originalPrice: 0, inStock: false };
  const discountPercentage = product ? getDiscountPercentage(product, selectedSize) : 0;
  const availableSizes = product ? getAvailableSizes(product) : [];

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-primary">
          <ArrowLeft size={20} />
          Back to Products
        </Link>
      </div>
    );
  }

  const getProductName = () => {
    switch (i18n.language) {
      case 'hi': return product.nameHi;
      case 'ur': return product.nameUr;
      case 'ar': return product.nameAr;
      default: return product.name;
    }
  };

  const getProductDescription = () => {
    switch (i18n.language) {
      case 'hi': return product.descriptionHi;
      case 'ur': return product.descriptionUr;
      case 'ar': return product.descriptionAr;
      default: return product.description;
    }
  };

  const getProductFeatures = () => {
    switch (i18n.language) {
      case 'hi': return product.featuresHi;
      case 'ur': return product.featuresUr;
      case 'ar': return product.featuresAr;
      default: return product.features;
    }
  };

  const getProductImages = () => {
    const productName = getProductName();
    
    // Use actual product images from the data if available
    if (product.images && product.images.length > 0) {
      return product.images.map((imagePath, index) => 
        getProductImage(imagePath, productName, index)
      );
    }
    
    // Fallback to generate placeholder images
    return Array.from({ length: 4 }, (_, index) => 
      getProductImage('', productName, index)
    );
  };

  const productImages = getProductImages();

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const getImageSrc = (index: number) => {
    if (imageErrors[index]) {
      // Return text placeholder if image failed to load
      const productName = getProductName();
      return `data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23667eea'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-size='16' font-weight='bold'%3E${encodeURIComponent(productName)}%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' fill='rgba(255,255,255,0.8)' font-family='Arial, sans-serif' font-size='12'%3EImage Not Available%3C/text%3E%3C/svg%3E`;
    }
    return productImages[index];
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(t('selectSize'));
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      product,
      selectedSize
    });

    // Show success notification
    addNotification({
      type: 'success',
      title: 'Added to Cart!',
      message: `${getProductName()} (${selectedSize}) added to your cart`
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="product-detail">
      <div className="page-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/products" className="breadcrumb-link">{t('products')}</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{getProductName()}</span>
        </div>

        <div className="product-detail-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image-container">
              <img
                src={getImageSrc(selectedImageIndex)}
                alt={getProductName()}
                className="main-image"
                onError={() => handleImageError(selectedImageIndex)}
              />
              {discountPercentage > 0 && (
                <div className="product-discount-large">
                  -{discountPercentage}% OFF
                </div>
              )}
            </div>
            <div className="image-thumbnails">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImageIndex === index ? 'thumbnail-active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={getImageSrc(index)} 
                    alt={`${getProductName()} ${index + 1}`}
                    onError={() => handleImageError(index)}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-detail">
            <div className="product-header">
              <div className="product-category">{product.category}</div>
              <h1 className="product-title">{getProductName()}</h1>
              <div className="product-rating-detail">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="rating-text">(4.8) • 1,234 reviews</span>
              </div>
            </div>

            <div className="product-pricing-detail">
              <span className="current-price">{formatPrice(currentPricing.price)}</span>
              {currentPricing.originalPrice > currentPricing.price && (
                <>
                  <span className="original-price">{formatPrice(currentPricing.originalPrice)}</span>
                  <span className="savings">
                    You save {formatPrice(currentPricing.originalPrice - currentPricing.price)}
                  </span>
                </>
              )}
            </div>

            <div className="product-description-detail">
              <h3>{t('description')}</h3>
              <p>{getProductDescription()}</p>
            </div>

            {/* Size Selection */}
            <div className="size-selection">
              <h3>{t('selectSize')}</h3>
              <div className="size-options">
                {availableSizes.map((sizeOption) => {
                  const isSelected = selectedSize === sizeOption.size;
                  const isInStock = sizeOption.inStock;
                  return (
                    <button
                      key={sizeOption.size}
                      className={`size-option ${isSelected ? 'size-option-selected' : ''} ${!isInStock ? 'size-option-disabled' : ''}`}
                      onClick={() => setSelectedSize(sizeOption.size)}
                      disabled={!isInStock}
                      title={!isInStock ? 'Out of Stock' : `${sizeOption.size} - ${formatPrice(sizeOption.price)}`}
                    >
                      <span className="size-label">{sizeOption.size}</span>
                      {!isInStock && <span className="size-stock-status">Out of Stock</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Features */}
            <div className="product-features-detail">
              <h3>{t('features')}</h3>
              <ul className="features-list">
                {getProductFeatures().map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-bullet">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button
                className={`btn btn-primary add-to-cart-btn ${addedToCart ? 'added-to-cart' : ''}`}
                onClick={handleAddToCart}
                disabled={!isSizeInStock(product, selectedSize)}
              >
                <ShoppingCart size={20} />
                {!isSizeInStock(product, selectedSize) 
                  ? `Out of Stock - ${selectedSize}` 
                  : addedToCart 
                    ? 'Added to Cart!' 
                    : t('addToCart')
                }
              </button>
              
              <button className="btn btn-secondary wishlist-btn">
                <Heart size={20} />
                Add to Wishlist
              </button>

              <button className="btn btn-outline share-btn">
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
