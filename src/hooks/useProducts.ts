import { useState, useEffect } from 'react';
import { Product } from '../types';
import { productsService } from '../services/productsService';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await productsService.getAll();
    setProducts(data);
    setLoading(false);
  };

  const updateProducts = async () => {
    await loadProducts();
  };

  return {
    products,
    loading,
    updateProducts,
    refreshProducts: loadProducts,
  };
};