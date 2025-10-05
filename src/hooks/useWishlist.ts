import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../types';
import toast from 'react-hot-toast';

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const loadWishlist = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: wishlistData } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', user.id);

      if (wishlistData && wishlistData.length > 0) {
        const productIds = wishlistData.map((item) => item.product_id);

        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds)
          .eq('active', true);

        if (productsData) {
          const products = productsData.map(product => ({
            id: product.id,
            name_si: product.name_si,
            name_en: product.name_en,
            slug: product.slug,
            description_si: product.description_si,
            description_en: product.description_en,
            price_lkr: Number(product.price_lkr),
            stock: product.stock,
            images: Array.isArray(product.images) ? product.images as string[] : [],
            created_at: product.created_at,
            updated_at: product.updated_at,
            featured: product.featured,
          }));
          setWishlistItems(products);
        }
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product: Product) => {
    if (!user) {
      toast.error('Please sign in to add items to wishlist');
      return;
    }

    try {
      const { error } = await supabase
        .from('wishlists')
        .insert({
          user_id: user.id,
          product_id: product.id,
        });

      if (error) {
        if (error.code === '23505') {
          toast.error('Item already in wishlist');
        } else {
          throw error;
        }
        return;
      }

      setWishlistItems((prev) => [...prev, product]);
      toast.success('Added to wishlist');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};
