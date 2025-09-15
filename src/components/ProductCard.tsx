import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Truck, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', '₨');
  };

  return (
    <motion.div
      className="glass-panel p-6 hover:shadow-2xl transition-all duration-300 group"
      whileHover={{ y: -10, scale: 1.02 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-6">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={product.images[0] || 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg'}
            alt={product.name_en}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.featured && (
            <div className="absolute top-4 right-4 bg-rich-gold text-dark-charcoal px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <h3 className="font-cinzel text-xl font-semibold text-rich-gold mb-1">
              {product.name_en}
            </h3>
            <p className="font-noto-sinhala text-soft-ivory text-opacity-80">
              {product.name_si}
            </p>
          </div>

          <p className="text-soft-ivory text-opacity-70 text-sm leading-relaxed">
            {product.description_en}
          </p>

          {/* Rating */}
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-rich-gold text-rich-gold"
              />
            ))}
            <span className="text-soft-ivory text-opacity-60 text-sm ml-2">(4.9)</span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-rich-gold gold-glow">
              {formatPrice(product.price_lkr)}
            </div>
            
            {/* Free Delivery Message */}
            <div className="flex items-center justify-center gap-2 text-emerald-accent">
              <Truck className="w-4 h-4" />
              <span className="text-sm font-medium">Free Delivery Anywhere in Sri Lanka</span>
            </div>
          </div>

          {/* Stock Status */}
          {product.stock > 0 ? (
            <div className="text-emerald-accent text-sm">
              ✅ In Stock ({product.stock} available)
            </div>
          ) : (
            <div className="text-red-400 text-sm">
              ❌ Out of Stock
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="floating-orb gold-glow mx-auto disabled:opacity-50 disabled:cursor-not-allowed group"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart className="w-6 h-6 text-dark-charcoal group-hover:scale-110 transition-transform duration-200" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;