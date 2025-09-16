import { useState, useEffect } from 'react';
import { Product } from '../types';
import { sampleProducts } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from localStorage or use sample data
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error parsing stored products:', error);
        setProducts(sampleProducts);
      }
    } else {
      setProducts(sampleProducts);
    }

    // Listen for storage changes to update products in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'products' && e.newValue) {
        try {
          const updatedProducts = JSON.parse(e.newValue);
          setProducts(updatedProducts);
        } catch (error) {
          console.error('Error parsing updated products:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event listener for same-tab updates
    const handleProductUpdate = (e: CustomEvent) => {
      setProducts(e.detail);
    };

    window.addEventListener('productsUpdated', handleProductUpdate as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productsUpdated', handleProductUpdate as EventListener);
    };
  }, []);

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('products', JSON.stringify(newProducts));
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('productsUpdated', { detail: newProducts }));
  };

  return {
    products,
    updateProducts
  };
};