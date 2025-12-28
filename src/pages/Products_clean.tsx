import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Filter, Star } from 'lucide-react';
import { products } from '../data/products';
import { getProductImage } from '../../public/images';

function Products() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const getProductImageForProducts = (product: any) => {
    const productName = getProductName(product);

    // Use the first image from the product's image array if available
    if (product.images && product.images.length > 0) {
      return getProductImage(product.images[0], productName, 0);
    }
    
    // Fallback to text placeholder
    return getProductImage('', productName, 0);
  };

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = getProductName(product).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getProductDescription(product).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>{t('products.title')}</h1>
          <p>{t('products.subtitle')}</p>
        </div>

        <div className="products-filters">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder={t('products.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="category-filter">
            <Filter className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>{t('products.noProducts')}</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={getProductImageForProducts(product)}
                    alt={getProductName(product)}
                    className="product-image"
                    onError={(e) => {
                      e.currentTarget.src = getProductImage('', getProductName(product), 0);
                    }}
                  />
                  {product.originalPrice > product.price && (
                    <div className="discount-badge">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{getProductName(product)}</h3>
                  <p className="product-description">{getProductDescription(product)}</p>
                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`star ${i < 4 ? 'filled' : ''}`} />
                    ))}
                    <span>(4.0)</span>
                  </div>
                  <div className="product-price">
                    <span className="current-price">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="product-category">{product.category}</div>
                  <div className={`stock-status ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                    {product.inStock ? t('products.inStock') : t('products.outOfStock')}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
