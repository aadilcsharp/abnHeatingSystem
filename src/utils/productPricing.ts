import { Product, SizeOption } from '../data/products';

// Get pricing for a specific size
export const getPriceForSize = (product: Product, selectedSize: string): { price: number; originalPrice: number; inStock: boolean } => {
  // If product has sizeOptions, use those
  if (product.sizeOptions && product.sizeOptions.length > 0) {
    const sizeOption = product.sizeOptions.find(option => option.size === selectedSize);
    if (sizeOption) {
      return {
        price: sizeOption.price,
        originalPrice: sizeOption.originalPrice,
        inStock: sizeOption.inStock
      };
    }
  }
  
  // Fallback to base price if no size options or size not found
  return {
    price: product.price,
    originalPrice: product.originalPrice,
    inStock: product.inStock ?? true // Default to true if inStock is undefined
  };
};

// Get available sizes for a product
export const getAvailableSizes = (product: Product): SizeOption[] => {
  if (product.sizeOptions && product.sizeOptions.length > 0) {
    return product.sizeOptions;
  }
  
  // Fallback to basic sizes array
  return product.sizes.map(size => ({
    size,
    price: product.price,
    originalPrice: product.originalPrice,
    inStock: product.inStock
  }));
};

// Get the default/first available size
export const getDefaultSize = (product: Product): string => {
  const availableSizes = getAvailableSizes(product);
  const inStockSize = availableSizes.find(option => option.inStock);
  return inStockSize ? inStockSize.size : availableSizes[0]?.size || '';
};

// Check if a specific size is in stock
export const isSizeInStock = (product: Product, size: string): boolean => {
  const pricing = getPriceForSize(product, size);
  return pricing.inStock;
};

// Calculate discount percentage for a size
export const getDiscountPercentage = (product: Product, size: string): number => {
  const { price, originalPrice } = getPriceForSize(product, size);
  if (originalPrice > price) {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  }
  return 0;
};

// Format price for display
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Get price range for a product (min - max)
export const getPriceRange = (product: Product): { min: number; max: number; minOriginal: number; maxOriginal: number } => {
  const availableSizes = getAvailableSizes(product);
  
  const prices = availableSizes.map(option => option.price);
  const originalPrices = availableSizes.map(option => option.originalPrice);
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    minOriginal: Math.min(...originalPrices),
    maxOriginal: Math.max(...originalPrices)
  };
};

// Check if product has variable pricing
export const hasVariablePricing = (product: Product): boolean => {
  if (!product.sizeOptions || product.sizeOptions.length <= 1) {
    return false;
  }
  
  const prices = product.sizeOptions.map(option => option.price);
  return new Set(prices).size > 1; // More than one unique price
};

// Get price display text for product listings
export const getPriceDisplayText = (product: Product): string => {
  if (!hasVariablePricing(product)) {
    return formatPrice(product.price);
  }
  
  const { min, max } = getPriceRange(product);
  if (min === max) {
    return formatPrice(min);
  }
  
  return `${formatPrice(min)} - ${formatPrice(max)}`;
};

// Export for console debugging
if (typeof window !== 'undefined') {
  (window as any).productPricingUtils = {
    getPriceForSize,
    getAvailableSizes,
    getDefaultSize,
    isSizeInStock,
    getDiscountPercentage,
    formatPrice,
    getPriceRange,
    hasVariablePricing,
    getPriceDisplayText
  };
}
