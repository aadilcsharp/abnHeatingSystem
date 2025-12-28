import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';
import { getPriceForSize } from '../utils/productPricing';

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedPrice: number; // Add size-specific price
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; selectedSize: string }
  | { type: 'REMOVE_FROM_CART'; productId: string; selectedSize: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; selectedSize: string; quantity: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const sizePricing = getPriceForSize(action.product, action.selectedSize);
      const selectedPrice = sizePricing.price;
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.product.id && item.selectedSize === action.selectedSize
      );
      
      let newItems: CartItem[];
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          { 
            ...action.product, 
            quantity: 1, 
            selectedSize: action.selectedSize,
            selectedPrice: selectedPrice
          }
        ];
      }
      
      const total = newItems.reduce((sum, item) => sum + item.selectedPrice * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: newItems, total, itemCount };
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(
        item => !(item.id === action.productId && item.selectedSize === action.selectedSize)
      );
      const total = newItems.reduce((sum, item) => sum + item.selectedPrice * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: newItems, total, itemCount };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.productId && item.selectedSize === action.selectedSize
          ? { ...item, quantity: Math.max(0, action.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      const total = newItems.reduce((sum, item) => sum + item.selectedPrice * item.quantity, 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: newItems, total, itemCount };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
