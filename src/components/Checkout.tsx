import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, Phone, MapPin, User, Mail } from 'lucide-react';
import { CartItem, Order } from '../types';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

interface CheckoutProps {
  items: CartItem[];
  totalAmount: number;
  onOrderComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, totalAmount, onOrderComplete }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: '',
    paymentMethod: 'cod' as 'cod' | 'bank_transfer' | 'payhere',
    specialInstructions: ''
  });

  const provinces = [
    'Western', 'Central', 'Southern', 'Northern', 'Eastern',
    'North Western', 'North Central', 'Uva', 'Sabaragamuwa'
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', '₨');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create order
      const orderId = uuidv4();
      const orderNumber = `SW${Date.now().toString().slice(-6)}`;
      
      const order: Order = {
        id: orderId,
        order_number: orderNumber,
        customer_name: formData.customerName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        items: items,
        total_lkr: totalAmount,
        payment_method: formData.paymentMethod,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      // Store order in localStorage (in real app, this would be API call)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Clear cart
      onOrderComplete();

      // Show success message
      toast.success('Order placed successfully!');

      // Navigate to success page
      navigate(`/order-success/${orderId}`);

    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-charcoal to-dark-charcoal-light flex items-center justify-center px-6">
        <div className="glass-panel p-8 text-center max-w-md">
          <h2 className="text-2xl font-cinzel font-bold text-rich-gold mb-4">Cart is Empty</h2>
          <p className="text-soft-ivory text-opacity-70 mb-6">Add some products to your cart before checkout.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold py-3 px-6 rounded-xl gold-glow"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-charcoal to-dark-charcoal-light py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-soft-ivory hover:text-rich-gold transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shop
          </button>
          <h1 className="text-4xl font-cinzel font-bold text-rich-gold">Checkout</h1>
          <p className="font-noto-sinhala text-soft-ivory text-opacity-80">ගෙවීම් කිරීම</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-6">Order Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-soft-ivory flex items-center gap-2">
                  <User className="w-5 h-5 text-rich-gold" />
                  Customer Information
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                      placeholder="+94 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-soft-ivory flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rich-gold" />
                  Delivery Address
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                    placeholder="Enter your full address"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      Province *
                    </label>
                    <select
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                    >
                      <option value="">Select Province</option>
                      {provinces.map(province => (
                        <option key={province} value={province} className="bg-dark-charcoal">
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-soft-ivory flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-rich-gold" />
                  Payment Method
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 glass-panel-light cursor-pointer hover:bg-opacity-20">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-rich-gold focus:ring-rich-gold"
                    />
                    <div>
                      <div className="font-medium text-soft-ivory">Cash on Delivery</div>
                      <div className="text-sm text-soft-ivory text-opacity-70">Pay when you receive your order</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 glass-panel-light cursor-pointer hover:bg-opacity-20">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={handleInputChange}
                      className="text-rich-gold focus:ring-rich-gold"
                    />
                    <div>
                      <div className="font-medium text-soft-ivory">Bank Transfer</div>
                      <div className="text-sm text-soft-ivory text-opacity-70">Transfer to our bank account</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 glass-panel-light cursor-pointer hover:bg-opacity-20">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="payhere"
                      checked={formData.paymentMethod === 'payhere'}
                      onChange={handleInputChange}
                      className="text-rich-gold focus:ring-rich-gold"
                    />
                    <div>
                      <div className="font-medium text-soft-ivory">PayHere (Online Payment)</div>
                      <div className="text-sm text-soft-ivory text-opacity-70">Pay securely with card or mobile wallet</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-sm font-medium text-soft-ivory mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50 resize-vertical"
                  placeholder="Any special delivery instructions..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold py-4 rounded-xl gold-glow disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isProcessing ? 'Processing Order...' : 'Place Order'}
              </motion.button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="glass-panel p-8 h-fit">
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 glass-panel-light">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name_en}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-soft-ivory">{item.product.name_en}</h3>
                    <p className="text-sm font-noto-sinhala text-soft-ivory text-opacity-70">
                      {item.product.name_si}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-soft-ivory text-opacity-70">Qty: {item.quantity}</span>
                      <span className="text-rich-gold font-semibold">
                        {formatPrice(item.product.price_lkr * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Info */}
            <div className="border-t border-rich-gold border-opacity-20 pt-6 mb-6">
              <div className="flex items-center gap-2 text-emerald-accent mb-2">
                <Truck className="w-5 h-5" />
                <span className="font-medium">Free Delivery</span>
              </div>
              <p className="text-sm text-soft-ivory text-opacity-70">
                Delivery anywhere in Sri Lanka (2-5 business days)
              </p>
            </div>

            {/* Total */}
            <div className="border-t border-rich-gold border-opacity-20 pt-6">
              <div className="flex justify-between items-center text-xl">
                <span className="font-semibold text-soft-ivory">Total:</span>
                <span className="font-bold text-rich-gold text-2xl">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;