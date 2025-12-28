import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Star, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { products } from '../data/products';
import { companyInfo } from '../data/company';
import { getProductImage, heroBanner1, heroBanner2, heroBanner3, heroBanner4, heroBanner5 } from '../../public/images';

function Home() {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [productsPerSlide, setProductsPerSlide] = useState(4);

  const heroSlides = [
    {
      image: heroBanner1,
      title: "Latest Smartphones",
      subtitle: "Up to 50% OFF",
      description: "Premium Quality • Fast Delivery"
    },
    {
      image: heroBanner2,
      title: "Audio Collection",
      subtitle: "Premium Sound Experience",
      description: "Wireless • Noise Cancelling • HD Audio"
    },
    {
      image: heroBanner3,
      title: "Laptop & Computing",
      subtitle: "Powerful Performance",
      description: "Fast Processors • High Storage • Gaming Ready"
    },
    {
      image: heroBanner4,
      title: "Smart Watches",
      subtitle: "Fitness & Health Tracking",
      description: "Heart Rate • GPS • Water Resistant"
    },
    {
      image: heroBanner5,
      title: "Electronics Sale",
      subtitle: "Mega Electronics Festival",
      description: "Free Shipping • Easy Returns • 24/7 Support"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    // Set products per slide based on screen width
    const updateProductsPerSlide = () => {
      setProductsPerSlide(window.innerWidth <= 768 ? 2 : 4);
    };

    updateProductsPerSlide();
    window.addEventListener('resize', updateProductsPerSlide);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateProductsPerSlide);
    };
  }, [heroSlides.length]);

  // Auto-slide for products carousel
  useEffect(() => {
    const productInterval = setInterval(() => {
      setCurrentProductSlide((prev) => (prev + 1) % Math.ceil(products.length / productsPerSlide));
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(productInterval);
  }, [productsPerSlide, products.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Product carousel functions
  const totalProductSlides = Math.ceil(products.length / productsPerSlide);

  const nextProductSlide = () => {
    setCurrentProductSlide((prev) => (prev + 1) % totalProductSlides);
  };

  const prevProductSlide = () => {
    setCurrentProductSlide((prev) => (prev - 1 + totalProductSlides) % totalProductSlides);
  };

  const goToProductSlide = (index: number) => {
    setCurrentProductSlide(index);
  };

  const getProductName = (product: any) => {
    switch (i18n.language) {
      case 'hi': return product.nameHi;
      case 'ur': return product.nameUr;
      case 'ar': return product.nameAr;
      default: return product.name;
    }
  };

  const getProductDescription = (product: any) => {
    switch (i18n.language) {
      case 'hi': return product.descriptionHi;
      case 'ur': return product.descriptionUr;
      case 'ar': return product.descriptionAr;
      default: return product.description;
    }
  };

  const getProductImageForHome = (product: any) => {
    const productName = (() => {
      switch (i18n.language) {
        case 'hi': return product.nameHi;
        case 'ur': return product.nameUr;
        case 'ar': return product.nameAr;
        default: return product.name;
      }
    })();

    // Use the first image from the product's image array if available
    if (product.images && product.images.length > 0) {
      return getProductImage(product.images[0], productName, 0);
    }
    
    // Fallback to text placeholder
    return getProductImage('', productName, 0);
  };

  const featuredProducts = products.slice(0, 6);

  // Helper function to determine section order
  const shouldShowHeroFirst = companyInfo.homePageSettings.sectionOrder === 'hero-second';

  return (
    <div className="home">
      {/* Conditionally render sections based on admin order setting */}
      {shouldShowHeroFirst ? (
        <>
          {/* Hero Slider Section */}
          {companyInfo.homePageSettings.showHeroSection && (
        <section className="hero-slider">
          <div className="slider-container">
            <div className="slider-wrapper">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    transform: `translateX(${(index - currentSlide) * 100}%)`
                  }}
                >
                  {/* No overlay content - just pure banner images */}
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button className="slider-nav prev" onClick={prevSlide}>
              <ChevronLeft size={24} />
            </button>
            <button className="slider-nav next" onClick={nextSlide}>
              <ChevronRight size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="slider-indicators">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Carousel Section */}
      {companyInfo.homePageSettings.showTrendingSection && (
        <section className="products-carousel">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Trending Products</h2>
            <Link to="/products" className="section-link">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="carousel-container">
            <div className="carousel-wrapper">
              <div className="carousel-track" style={{
                transform: `translateX(-${currentProductSlide * 100}%)`
              }}>
                {Array.from({ length: totalProductSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="carousel-slide">
                    {products.slice(
                      slideIndex * productsPerSlide,
                      (slideIndex + 1) * productsPerSlide
                    ).map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="carousel-product-card"
                      >
                        <div className="product-image-container">
                          <img
                            src={getProductImageForHome(product)}
                            alt={getProductName(product)}
                            className="product-image"
                          />
                          {product.originalPrice > product.price && (
                            <div className="product-discount">
                              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </div>
                          )}
                        </div>
                        <div className="product-info">
                          <h3 className="product-name">{getProductName(product)}</h3>
                          <div className="product-pricing">
                            <span className="product-price">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice > product.price && (
                              <span className="product-original-price">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          <div className="product-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} size={12} fill="currentColor" />
                            ))}
                            <span>(4.8)</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button className="carousel-nav prev" onClick={prevProductSlide}>
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-nav next" onClick={nextProductSlide}>
              <ChevronRight size={20} />
            </button>

            {/* Slide Indicators */}
            <div className="carousel-indicators">
              {Array.from({ length: totalProductSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentProductSlide ? 'active' : ''}`}
                  onClick={() => goToProductSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      )}
        </>
      ) : (
        <>
          {/* Trending Products Section First */}
          {companyInfo.homePageSettings.showTrendingSection && (
            <section className="products-carousel">
              <div className="section-container">
                <div className="section-header">
                  <h2 className="section-title">Trending Products</h2>
                  <Link to="/products" className="section-link">
                    View All Products
                    <ArrowRight size={16} />
                  </Link>
                </div>
                
                <div className="carousel-container">
                  <div className="carousel-wrapper">
                    <div className="carousel-track" style={{
                      transform: `translateX(-${currentProductSlide * 100}%)`
                    }}>
                      {Array.from({ length: totalProductSlides }).map((_, slideIndex) => (
                        <div key={slideIndex} className="carousel-slide">
                          {products.slice(
                            slideIndex * productsPerSlide,
                            (slideIndex + 1) * productsPerSlide
                          ).map((product) => (
                            <Link
                              key={product.id}
                              to={`/product/${product.id}`}
                              className="carousel-product-card"
                            >
                              <div className="product-image-container">
                                <img
                                  src={getProductImageForHome(product)}
                                  alt={getProductName(product)}
                                  className="product-image"
                                />
                                {product.originalPrice > product.price && (
                                  <div className="product-discount">
                                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                  </div>
                                )}
                              </div>
                              <div className="product-info">
                                <h3 className="product-name">{getProductName(product)}</h3>
                                <div className="product-pricing">
                                  <span className="product-price">₹{product.price.toLocaleString()}</span>
                                  {product.originalPrice > product.price && (
                                    <span className="product-original-price">₹{product.originalPrice.toLocaleString()}</span>
                                  )}
                                </div>
                                <div className="product-rating">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={12} fill="currentColor" />
                                  ))}
                                  <span>(4.8)</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button className="carousel-nav prev" onClick={prevProductSlide}>
                    <ChevronLeft size={20} />
                  </button>
                  <button className="carousel-nav next" onClick={nextProductSlide}>
                    <ChevronRight size={20} />
                  </button>

                  {/* Slide Indicators */}
                  <div className="carousel-indicators">
                    {Array.from({ length: totalProductSlides }).map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentProductSlide ? 'active' : ''}`}
                        onClick={() => goToProductSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Hero Slider Section Second */}
          {companyInfo.homePageSettings.showHeroSection && (
            <section className="hero-slider">
              <div className="slider-container">
                <div className="slider-wrapper">
                  {heroSlides.map((slide, index) => (
                    <div
                      key={index}
                      className={`slide ${index === currentSlide ? 'active' : ''}`}
                      style={{
                        backgroundImage: `url(${slide.image})`,
                        transform: `translateX(${(index - currentSlide) * 100}%)`
                      }}
                    >
                      {/* No overlay content - just pure banner images */}
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button className="slider-nav prev" onClick={prevSlide}>
                  <ChevronLeft size={24} />
                </button>
                <button className="slider-nav next" onClick={nextSlide}>
                  <ChevronRight size={24} />
                </button>

                {/* Slide Indicators */}
                <div className="slider-indicators">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Special Offers Banner */}
      <section className="offers-banner">
        <div className="offers-container">
          <div className="offer-card offer-card-primary">
            <h3>{t('specialOffers')}</h3>
            <p>Up to 50% OFF on Electronics</p>
            <div className="offer-badge">
              <Star fill="currentColor" size={16} />
              <span>Limited Time</span>
            </div>
          </div>
          <div className="offer-card offer-card-secondary">
            <h3>Free Shipping</h3>
            <p>On orders above ₹2999</p>
          </div>
          <div className="offer-card offer-card-tertiary">
            <h3>24/7 Support</h3>
            <p>Customer service available</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">{t('featuredProducts')}</h2>
            <Link to="/products" className="section-link">
              {t('viewAll')}
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="product-card"
              >
                <div className="product-image-container">
                  <img
                    src={getProductImageForHome(product)}
                    alt={getProductName(product)}
                    className="product-image"
                  />
                  {product.originalPrice > product.price && (
                    <div className="product-discount">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{getProductName(product)}</h3>
                  <p className="product-description">{getProductDescription(product)}</p>
                  <div className="product-pricing">
                    <span className="product-price">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="product-original-price">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="product-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={14} fill="currentColor" />
                    ))}
                    <span>(4.8)</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Delivery</h3>
              <p>Free shipping on orders above ₹2999</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure payment with UPI</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>7-day easy return policy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Round the clock customer support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
