// PDF Generation utility for product catalog
// Since we can't install jsPDF in this environment, I'll create a comprehensive solution
// that generates a print-friendly HTML page that can be saved as PDF using browser's print function

import { Product } from '../data/products';
import { companyInfo } from '../data/company';
import { getProductImage } from '../../public/images';

export interface CatalogOptions {
  includeImages: boolean;
  includeFeatures: boolean;
  includePricing: boolean;
  groupByCategory: boolean;
  language: string;
}

export const generateProductCatalogHTML = (
  products: Product[], 
  options: CatalogOptions = {
    includeImages: true,
    includeFeatures: true,
    includePricing: true,
    groupByCategory: true,
    language: 'en'
  }
): string => {
  const getLocalizedText = (product: any, field: string, language: string) => {
    switch (language) {
      case 'hi': return product[`${field}Hi`] || product[field];
      case 'ur': return product[`${field}Ur`] || product[field];
      case 'ar': return product[`${field}Ar`] || product[field];
      default: return product[field];
    }
  };

  const getCompanyName = (language: string) => {
    switch (language) {
      case 'hi': return companyInfo.nameHi;
      case 'ur': return companyInfo.nameUr;
      case 'ar': return companyInfo.nameAr;
      default: return companyInfo.name;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Group products by category if required
  const groupedProducts = options.groupByCategory 
    ? products.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
      }, {} as Record<string, Product[]>)
    : { 'All Products': products };

  const catalogHTML = `
<!DOCTYPE html>
<html lang="${options.language}" dir="${options.language === 'ar' || options.language === 'ur' ? 'rtl' : 'ltr'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${getCompanyName(options.language)} - Product Catalog</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
        }
        
        .catalog-container {
            max-width: 210mm;
            margin: 0 auto;
            padding: 20mm;
            background: white;
        }
        
        .catalog-header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 3px solid #667eea;
        }
        
        .company-logo {
            font-size: 3rem;
            margin-bottom: 10px;
            color: #667eea;
        }
        
        .company-name {
            font-size: 2.5rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 10px;
        }
        
        .catalog-title {
            font-size: 1.5rem;
            color: #666;
            margin-bottom: 15px;
        }
        
        .catalog-date {
            color: #888;
            font-size: 1rem;
        }
        
        .company-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 40px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        
        .info-section h3 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }
        
        .info-section p {
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
        
        .category-section {
            margin-bottom: 50px;
            page-break-inside: avoid;
        }
        
        .category-title {
            font-size: 2rem;
            color: #667eea;
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e9ecef;
            page-break-after: avoid;
        }
        
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .product-card {
            border: 1px solid #e9ecef;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            page-break-inside: avoid;
            background: white;
        }
        
        .product-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #666;
            font-size: 14px;
        }
        
        .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .product-content {
            padding: 20px;
        }
        
        .product-name {
            font-size: 1.3rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
        }
        
        .product-category {
            color: #667eea;
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 10px;
        }
        
        .product-description {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 15px;
            line-height: 1.5;
        }
        
        .product-pricing {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .current-price {
            font-size: 1.4rem;
            font-weight: 700;
            color: #28a745;
        }
        
        .original-price {
            font-size: 1rem;
            color: #999;
            text-decoration: line-through;
        }
        
        .discount-badge {
            background: #f5576c;
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .product-features {
            margin-bottom: 15px;
        }
        
        .features-title {
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
            font-size: 0.9rem;
        }
        
        .features-list {
            list-style: none;
            padding: 0;
        }
        
        .features-list li {
            padding: 2px 0;
            color: #666;
            font-size: 0.85rem;
            position: relative;
            padding-left: 15px;
        }
        
        .features-list li:before {
            content: "✓";
            color: #28a745;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .product-availability {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .in-stock {
            background: #d4edda;
            color: #155724;
        }
        
        .out-of-stock {
            background: #f8d7da;
            color: #721c24;
        }
        
        .catalog-footer {
            margin-top: 60px;
            padding-top: 30px;
            border-top: 2px solid #e9ecef;
            text-align: center;
            color: #666;
            font-size: 0.9rem;
        }
        
        .contact-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .summary-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 40px;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 10px;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        @media print {
            body { margin: 0; }
            .catalog-container { 
                max-width: none; 
                margin: 0;
                padding: 15mm;
            }
            .product-card { 
                break-inside: avoid; 
                margin-bottom: 20px;
            }
            .category-section { 
                break-inside: avoid; 
            }
        }
        
        @page {
            size: A4;
            margin: 15mm;
        }
    </style>
</head>
<body>
    <div class="catalog-container">
        <!-- Header -->
        <div class="catalog-header">
            <div class="company-logo">${companyInfo.logo}</div>
            <h1 class="company-name">${getCompanyName(options.language)}</h1>
            <h2 class="catalog-title">Product Catalog</h2>
            <p class="catalog-date">Generated on ${currentDate}</p>
        </div>
        
        <!-- Company Information -->
        <div class="company-info">
            <div class="info-section">
                <h3>Contact Information</h3>
                <p><strong>Phone:</strong> ${companyInfo.phone}</p>
                <p><strong>Email:</strong> ${companyInfo.email}</p>
                <p><strong>Website:</strong> ${companyInfo.website}</p>
            </div>
            <div class="info-section">
                <h3>Address</h3>
                <p>${getLocalizedText(companyInfo, 'address', options.language)}</p>
            </div>
        </div>
        
        <!-- Summary Statistics -->
        <div class="summary-stats">
            <div class="stat-item">
                <div class="stat-number">${products.length}</div>
                <div class="stat-label">Total Products</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${Object.keys(groupedProducts).length}</div>
                <div class="stat-label">Categories</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${products.filter(p => p.inStock).length}</div>
                <div class="stat-label">In Stock</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">${products.filter(p => p.originalPrice > p.price).length}</div>
                <div class="stat-label">On Sale</div>
            </div>
        </div>
        
        <!-- Products by Category -->
        ${Object.entries(groupedProducts).map(([category, categoryProducts]) => `
            <div class="category-section">
                <h2 class="category-title">${category}</h2>
                <div class="products-grid">
                    ${categoryProducts.map(product => `
                        <div class="product-card">
                            ${options.includeImages ? `
                                <div class="product-image">
                                    <img src="${getProductImage(product.images?.[0] || '', getLocalizedText(product, 'name', options.language))}" 
                                         alt="${getLocalizedText(product, 'name', options.language)}"
                                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                    <div style="display:none; width:100%; height:100%; background:#f8f9fa; align-items:center; justify-content:center; color:#666;">
                                        ${getLocalizedText(product, 'name', options.language)}
                                    </div>
                                </div>
                            ` : ''}
                            
                            <div class="product-content">
                                <h3 class="product-name">${getLocalizedText(product, 'name', options.language)}</h3>
                                <div class="product-category">${product.category}</div>
                                <p class="product-description">${getLocalizedText(product, 'description', options.language)}</p>
                                
                                ${options.includePricing ? `
                                    <div class="product-pricing">
                                        <span class="current-price">${formatCurrency(product.price)}</span>
                                        ${product.originalPrice > product.price ? `
                                            <span class="original-price">${formatCurrency(product.originalPrice)}</span>
                                            <span class="discount-badge">
                                                ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                            </span>
                                        ` : ''}
                                    </div>
                                ` : ''}
                                
                                ${options.includeFeatures && product.features?.length ? `
                                    <div class="product-features">
                                        <div class="features-title">Key Features:</div>
                                        <ul class="features-list">
                                            ${(getLocalizedText(product, 'features', options.language) || product.features || [])
                                              .slice(0, 5)
                                              .map((feature: string) => `<li>${feature}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                
                                <div class="product-availability ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                                    ${product.inStock ? 'In Stock' : 'Out of Stock'}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}
        
        <!-- Footer -->
        <div class="catalog-footer">
            <div class="contact-info">
                <div>
                    <strong>Customer Service</strong><br>
                    Phone: ${companyInfo.phone}<br>
                    Email: ${companyInfo.email}
                </div>
                <div>
                    <strong>Visit Our Store</strong><br>
                    ${getLocalizedText(companyInfo, 'address', options.language)}
                </div>
                <div>
                    <strong>Online Store</strong><br>
                    Website: ${companyInfo.website}<br>
                    24/7 Online Shopping
                </div>
            </div>
            <p>This catalog was generated on ${currentDate} and is subject to change without notice. 
               Prices and availability may vary. Please contact us for the most current information.</p>
            <p><strong>${getCompanyName(options.language)}</strong> - Your trusted partner</p>
        </div>
    </div>
    
    <script>
        // Auto-print when page loads (optional)
        window.addEventListener('load', function() {
            // Uncomment the next line to auto-print
            // window.print();
        });
    </script>
</body>
</html>`;

  return catalogHTML;
};

export const downloadProductCatalog = (products: Product[], options?: CatalogOptions) => {
  const html = generateProductCatalogHTML(products, options);
  
  // Create a new window/tab with the catalog
  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(html);
    newWindow.document.close();
    
    // Focus the new window and show print dialog
    newWindow.focus();
    setTimeout(() => {
      newWindow.print();
    }, 1000);
  } else {
    // Fallback: create download link for HTML file
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${companyInfo.name.replace(/\s+/g, '_')}_Product_Catalog_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

// Export function to generate simple CSV catalog
export const downloadProductCSV = (products: Product[]) => {
  const headers = ['ID', 'Name', 'Category', 'Price', 'Original Price', 'In Stock', 'Description'];
  const csvContent = [
    headers.join(','),
    ...products.map(product => [
      product.id,
      `"${product.name.replace(/"/g, '""')}"`,
      product.category,
      product.price,
      product.originalPrice,
      product.inStock ? 'Yes' : 'No',
      `"${product.description.replace(/"/g, '""')}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${companyInfo.name.replace(/\s+/g, '_')}_Products_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
