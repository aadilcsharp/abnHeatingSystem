import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, Search, Filter, Save, X, Download, FileText } from 'lucide-react';
import { Product } from '../data/products';
import { dataService } from '../data/dataService';
import { useAuth } from '../context/AuthContext';
import { generateProductCatalogHTML, CatalogOptions } from '../utils/pdfGenerator';
import { getProductImage } from '../../public/images';

function ManageProducts() {
  const { t } = useTranslation();
  const { state } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    nameHi: '',
    nameUr: '',
    nameAr: '',
    description: '',
    descriptionHi: '',
    descriptionUr: '',
    descriptionAr: '',
    price: 0,
    originalPrice: 0,
    category: '',
    images: [''],
    sizes: [''],
    inStock: true,
    features: [''],
    featuresHi: [''],
    featuresUr: [''],
    featuresAr: ['']
  });

  // Load products on component mount
  useEffect(() => {
    setProductsList(dataService.getProducts());
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

  const categories = [...new Set(productsList.map(p => p.category))];
  
  const filteredProducts = productsList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      name: '',
      nameHi: '',
      nameUr: '',
      nameAr: '',
      description: '',
      descriptionHi: '',
      descriptionUr: '',
      descriptionAr: '',
      price: 0,
      originalPrice: 0,
      category: '',
      images: [''],
      sizes: [''],
      inStock: true,
      features: [''],
      featuresHi: [''],
      featuresUr: [''],
      featuresAr: ['']
    });
    setEditingProduct(null);
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: keyof Product, index: number, value: string) => {
    setFormData(prev => {
      const currentArray = (prev[field] as string[]) || [''];
      const newArray = [...currentArray];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field: keyof Product) => {
    setFormData(prev => {
      const currentArray = (prev[field] as string[]) || [];
      return {
        ...prev,
        [field]: [...currentArray, '']
      };
    });
  };

  const removeArrayItem = (field: keyof Product, index: number) => {
    setFormData(prev => {
      const currentArray = (prev[field] as string[]) || [];
      const newArray = currentArray.filter((_, i) => i !== index);
      return {
        ...prev,
        [field]: newArray.length > 0 ? newArray : ['']
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      name: formData.name || '',
      nameHi: formData.nameHi || '',
      nameUr: formData.nameUr || '',
      nameAr: formData.nameAr || '',
      description: formData.description || '',
      descriptionHi: formData.descriptionHi || '',
      descriptionUr: formData.descriptionUr || '',
      descriptionAr: formData.descriptionAr || '',
      price: Number(formData.price) || 0,
      originalPrice: Number(formData.originalPrice) || 0,
      category: formData.category || '',
      images: formData.images?.filter(img => img.trim()) || [''],
      sizes: formData.sizes?.filter(size => size.trim()) || [''],
      inStock: formData.inStock ?? true,
      features: formData.features?.filter(feature => feature.trim()) || [''],
      featuresHi: formData.featuresHi?.filter(feature => feature.trim()) || [''],
      featuresUr: formData.featuresUr?.filter(feature => feature.trim()) || [''],
      featuresAr: formData.featuresAr?.filter(feature => feature.trim()) || ['']
    };

    if (editingProduct) {
      // Update existing product using data service
      dataService.updateProduct(newProduct);
      alert('Product updated successfully!');
    } else {
      // Add new product using data service
      dataService.addProduct(newProduct);
      alert('Product added successfully!');
    }

    // Refresh the products list
    setProductsList(dataService.getProducts());
    setShowAddForm(false);
    resetForm();
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dataService.deleteProduct(productId);
      setProductsList(dataService.getProducts());
      alert('Product deleted successfully!');
    }
  };

  const handleEditProduct = (product: Product) => {
    setFormData(product);
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDownloadCatalog = (format: 'standard' | 'compact' | 'detailed') => {
    const products = filteredProducts.length > 0 ? filteredProducts : productsList;
    
    let options: CatalogOptions;
    switch (format) {
      case 'compact':
        options = {
          includeImages: false,
          includeFeatures: false,
          includePricing: true,
          groupByCategory: true,
          language: 'en'
        };
        break;
      case 'detailed':
        options = {
          includeImages: true,
          includeFeatures: true,
          includePricing: true,
          groupByCategory: true,
          language: 'en'
        };
        break;
      default: // standard
        options = {
          includeImages: true,
          includeFeatures: false,
          includePricing: true,
          groupByCategory: true,
          language: 'en'
        };
    }
    
    const htmlContent = generateProductCatalogHTML(products, options);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      
      // Automatically trigger print dialog
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
    }
  };

  return (
    <div className="manage-products">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Manage Products</h1>
          <div className="header-actions">
            <div className="catalog-download-section">
              <h3>Download Product Catalog</h3>
              <div className="download-buttons">
                <button
                  className="btn btn-outline"
                  onClick={() => handleDownloadCatalog('compact')}
                  title="Download compact catalog (no images, no features)"
                >
                  <FileText size={16} />
                  Compact PDF
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => handleDownloadCatalog('standard')}
                  title="Download standard catalog (with images, no features)"
                >
                  <Download size={16} />
                  Standard PDF
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => handleDownloadCatalog('detailed')}
                  title="Download detailed catalog (with images and features)"
                >
                  <FileText size={16} />
                  Detailed PDF
                </button>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={20} />
              Add New Product
            </button>
          </div>
        </div>

        <div className="products-controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-box">
            <Filter size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Original Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td className="product-image-cell">
                    <div className="product-image-wrapper">
                      <img
                        src={getProductImage(product.images[0] || '', product.name, 0)}
                        alt={product.name}
                        className="product-image"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = getProductImage('', product.name, 0);
                        }}
                      />
                    </div>
                  </td>
                  <td className="product-name">
                    <div>
                      <strong>{product.name}</strong>
                      <p className="product-description">{product.description}</p>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>₹{product.price.toLocaleString()}</td>
                  <td>₹{product.originalPrice.toLocaleString()}</td>
                  <td>
                    <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="product-actions">
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => handleEditProduct(product)}
                      title="Edit Product"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDeleteProduct(product.id)}
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}

        {(showAddForm || editingProduct) && (
          <div className="modal-overlay">
            <div className="modal product-form-modal">
              <div className="modal-header">
                <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <button
                  className="modal-close"
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="modal-content">
                <form onSubmit={handleSubmit} className="product-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Product Name *</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="category">Category *</label>
                      <input
                        type="text"
                        id="category"
                        value={formData.category || ''}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="price">Price *</label>
                      <input
                        type="number"
                        id="price"
                        value={formData.price || ''}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="originalPrice">Original Price</label>
                      <input
                        type="number"
                        id="originalPrice"
                        value={formData.originalPrice || ''}
                        onChange={(e) => handleInputChange('originalPrice', parseFloat(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                      id="description"
                      value={formData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inStock">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={formData.inStock ?? true}
                        onChange={(e) => handleInputChange('inStock', e.target.checked)}
                      />
                      In Stock
                    </label>
                  </div>

                  <div className="form-group">
                    <label>Images</label>
                    {(formData.images || ['']).map((image, index) => (
                      <div key={index} className="array-input">
                        <input
                          type="text"
                          value={image}
                          onChange={(e) => handleArrayChange('images', index, e.target.value)}
                          placeholder="Image URL"
                        />
                        {(formData.images?.length || 0) > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('images', index)}
                            className="remove-btn"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('images')}
                      className="add-btn"
                    >
                      <Plus size={16} /> Add Image
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Sizes</label>
                    {(formData.sizes || ['']).map((size, index) => (
                      <div key={index} className="array-input">
                        <input
                          type="text"
                          value={size}
                          onChange={(e) => handleArrayChange('sizes', index, e.target.value)}
                          placeholder="Size"
                        />
                        {(formData.sizes?.length || 0) > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('sizes', index)}
                            className="remove-btn"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('sizes')}
                      className="add-btn"
                    >
                      <Plus size={16} /> Add Size
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Features (English)</label>
                    {(formData.features || ['']).map((feature, index) => (
                      <div key={index} className="array-input">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleArrayChange('features', index, e.target.value)}
                          placeholder="Feature"
                        />
                        {(formData.features?.length || 0) > 1 && (
                          <button
                            type="button"
                            onClick={() => removeArrayItem('features', index)}
                            className="remove-btn"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addArrayItem('features')}
                      className="add-btn"
                    >
                      <Plus size={16} /> Add Feature
                    </button>
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowAddForm(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <Save size={16} />
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageProducts;
