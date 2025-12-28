import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, SkipForward, SkipBack, Square, Settings, Timer, Maximize, Minimize } from 'lucide-react';
import { Product } from '../data/products';
import { dataService } from '../data/dataService';
import { useAuth } from '../context/AuthContext';
import { getProductImage } from '../../public/images';

function ProductSlideshow() {
  const { t, i18n } = useTranslation();
  const { state } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interval, setInterval] = useState(120); // 2 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Load products on component mount
  useEffect(() => {
    const productsList = dataService.getProducts();
    setProducts(productsList);
  }, []);

  // Redirect if not authenticated or not admin
  if (!state.isAuthenticated || state.user?.role !== 'admin') {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You need admin privileges to access this page.</p>
      </div>
    );
  }

  const currentProduct = products[currentIndex];

  const getProductName = (product: Product) => {
    switch (i18n.language) {
      case 'hi': return product.nameHi || product.name;
      case 'ur': return product.nameUr || product.name;
      case 'ar': return product.nameAr || product.name;
      default: return product.name;
    }
  };

  const getProductDescription = (product: Product) => {
    switch (i18n.language) {
      case 'hi': return product.descriptionHi || product.description;
      case 'ur': return product.descriptionUr || product.description;
      case 'ar': return product.descriptionAr || product.description;
      default: return product.description;
    }
  };

  const getProductFeatures = (product: Product) => {
    switch (i18n.language) {
      case 'hi': return product.featuresHi || product.features;
      case 'ur': return product.featuresUr || product.features;
      case 'ar': return product.featuresAr || product.features;
      default: return product.features;
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setTimeRemaining(interval);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setTimeRemaining(interval);
  };

  const startSlideshow = () => {
    setIsPlaying(true);
    setTimeRemaining(interval);
    
    // Start countdown timer
    countdownRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          return interval;
        }
        return prev - 1;
      });
    }, 1000);

    // Start slideshow timer
    intervalRef.current = window.setInterval(() => {
      nextSlide();
    }, interval * 1000);
  };

  const pauseSlideshow = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (countdownRef.current) {
      window.clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  const stopSlideshow = () => {
    pauseSlideshow();
    setCurrentIndex(0);
    setTimeRemaining(interval);
  };

  const updateInterval = (newInterval: number) => {
    setInterval(newInterval);
    setTimeRemaining(newInterval);
    if (isPlaying) {
      pauseSlideshow();
      setTimeout(() => startSlideshow(), 100);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (slideshowRef.current?.requestFullscreen) {
        slideshowRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'f':
        case 'F':
          event.preventDefault();
          toggleFullscreen();
          break;
        case ' ':
          event.preventDefault();
          if (isPlaying) {
            pauseSlideshow();
          } else {
            startSlideshow();
          }
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
        case 'Escape':
          if (isPlaying) {
            pauseSlideshow();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaying]); // Dependencies to ensure the latest state is used

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (countdownRef.current) window.clearInterval(countdownRef.current);
    };
  }, []);

  if (products.length === 0) {
    return (
      <div className="slideshow-loading">
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="product-slideshow" ref={slideshowRef}>
      <div className="slideshow-header">
        <h1 className="slideshow-title">Product Slideshow</h1>
        <div className="slideshow-info">
          <span className="slide-counter">
            {currentIndex + 1} of {products.length}
          </span>
          <div className="timer-display">
            <Timer size={16} />
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </div>

      <div className="slideshow-container">
        {currentProduct && (
          <div className="slide-content">
            <div className="product-image-section">
              <img
                src={getProductImage(currentProduct.images?.[0] || '', getProductName(currentProduct))}
                alt={getProductName(currentProduct)}
                className="slideshow-product-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLDivElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="image-fallback" style={{ display: 'none' }}>
                <span>{getProductName(currentProduct)}</span>
              </div>
              
              {currentProduct.originalPrice > currentProduct.price && (
                <div className="slideshow-discount-badge">
                  -{Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>

            <div className="product-info-section">
              <div className="product-category-badge">{currentProduct.category}</div>
              <h2 className="slideshow-product-name">{getProductName(currentProduct)}</h2>
              
              <div className="slideshow-pricing">
                <span className="slideshow-current-price">₹{currentProduct.price.toLocaleString()}</span>
                {currentProduct.originalPrice > currentProduct.price && (
                  <span className="slideshow-original-price">₹{currentProduct.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="slideshow-description">{getProductDescription(currentProduct)}</p>

              {getProductFeatures(currentProduct) && getProductFeatures(currentProduct).length > 0 && (
                <div className="slideshow-features">
                  <h3>Key Features:</h3>
                  <ul>
                    {getProductFeatures(currentProduct).slice(0, 5).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="product-availability-large">
                {currentProduct.inStock ? (
                  <span className="in-stock-badge">✅ In Stock</span>
                ) : (
                  <span className="out-of-stock-badge">❌ Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="slideshow-controls">
        <div className="control-buttons">
          <button
            className="control-btn"
            onClick={prevSlide}
            title="Previous product"
          >
            <SkipBack size={24} />
          </button>

          <button
            className={`control-btn play-pause ${isPlaying ? 'playing' : 'paused'}`}
            onClick={isPlaying ? pauseSlideshow : startSlideshow}
            title={isPlaying ? 'Pause slideshow' : 'Start slideshow'}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>

          <button
            className="control-btn"
            onClick={nextSlide}
            title="Next product"
          >
            <SkipForward size={24} />
          </button>

          <button
            className="control-btn"
            onClick={stopSlideshow}
            title="Stop slideshow"
          >
            <Square size={24} />
          </button>

          <button
            className={`control-btn settings ${showSettings ? 'active' : ''}`}
            onClick={() => setShowSettings(!showSettings)}
            title="Settings"
          >
            <Settings size={24} />
          </button>

          <button
            className={`control-btn fullscreen ${isFullscreen ? 'active' : ''}`}
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        </div>

        {showSettings && (
          <div className="settings-panel">
            <h3>Slideshow Settings</h3>
            <div className="setting-group">
              <label>Slide Duration:</label>
              <div className="duration-options">
                <button
                  className={interval === 60 ? 'active' : ''}
                  onClick={() => updateInterval(60)}
                >
                  1 min
                </button>
                <button
                  className={interval === 120 ? 'active' : ''}
                  onClick={() => updateInterval(120)}
                >
                  2 min
                </button>
                <button
                  className={interval === 180 ? 'active' : ''}
                  onClick={() => updateInterval(180)}
                >
                  3 min
                </button>
                <button
                  className={interval === 300 ? 'active' : ''}
                  onClick={() => updateInterval(300)}
                >
                  5 min
                </button>
              </div>
            </div>
            
            <div className="setting-group">
              <label>Keyboard Shortcuts:</label>
              <div className="shortcuts-help">
                <div className="shortcut-item">
                  <span className="shortcut-key">F</span>
                  <span>Toggle Fullscreen</span>
                </div>
                <div className="shortcut-item">
                  <span className="shortcut-key">Space</span>
                  <span>Play/Pause</span>
                </div>
                <div className="shortcut-item">
                  <span className="shortcut-key">←/→</span>
                  <span>Previous/Next</span>
                </div>
                <div className="shortcut-item">
                  <span className="shortcut-key">Esc</span>
                  <span>Pause Slideshow</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${((interval - timeRemaining) / interval) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ProductSlideshow;
