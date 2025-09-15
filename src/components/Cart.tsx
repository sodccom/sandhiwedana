import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  totalAmount: number;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  totalAmount,
}) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', '₨');
  };

  const handleCheckout = () => {
    navigate('/checkout');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-charcoal bg-opacity-50 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 glass-panel m-4 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-rich-gold border-opacity-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-rich-gold" />
                  <h2 className="text-xl font-cinzel font-semibold text-rich-gold">Shopping Cart</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-soft-ivory" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-soft-ivory text-opacity-30 mx-auto mb-4" />
                  <p className="text-soft-ivory text-opacity-70">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      className="glass-panel-light p-4"
                      layout
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.product.images[0] || 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg'}
                          alt={item.product.name_en}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-soft-ivory mb-1">
                            {item.product.name_en}
                          </h3>
                          <p className="text-sm font-noto-sinhala text-soft-ivory text-opacity-70 mb-2">
                            {item.product.name_si}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 rounded-full hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200"
                              >
                                <Minus className="w-4 h-4 text-soft-ivory" />
                              </button>
                              <span className="text-soft-ivory font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 rounded-full hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200"
                              >
                                <Plus className="w-4 h-4 text-soft-ivory" />
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <span className="text-rich-gold font-semibold">
                                {formatPrice(item.product.price_lkr * item.quantity)}
                              </span>
                              <button
                                onClick={() => onRemoveItem(item.product.id)}
                                className="p-1 rounded-full hover:bg-red-500 hover:bg-opacity-20 transition-colors duration-200"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-rich-gold border-opacity-20 space-y-4">
                {/* Delivery Message */}
                <div className="text-center text-emerald-accent text-sm">
                  🚚 Free Delivery Anywhere in Sri Lanka
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-2 border-t border-rich-gold border-opacity-20">
                  <span className="text-lg font-semibold text-soft-ivory">Total:</span>
                  <span className="text-2xl font-bold text-rich-gold">
                    {formatPrice(totalAmount)}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold py-4 rounded-xl gold-glow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;