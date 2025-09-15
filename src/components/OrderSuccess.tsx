import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Phone, ArrowLeft, MessageCircle } from 'lucide-react';
import { Order } from '../types';

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      // Get order from localStorage (in real app, this would be API call)
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find((o: Order) => o.id === orderId);
      setOrder(foundOrder);
    }
  }, [orderId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', '₨');
  };

  const handleWhatsAppContact = () => {
    const message = `Hello! I just placed an order (${order?.order_number}) and wanted to confirm the details. Thank you!`;
    const whatsappUrl = `https://wa.me/94XXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-charcoal to-dark-charcoal-light flex items-center justify-center px-6">
        <div className="glass-panel p-8 text-center max-w-md">
          <h2 className="text-2xl font-cinzel font-bold text-rich-gold mb-4">Order Not Found</h2>
          <p className="text-soft-ivory text-opacity-70 mb-6">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold py-3 px-6 rounded-xl gold-glow"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-charcoal to-dark-charcoal-light py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-soft-ivory hover:text-rich-gold transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Success Message */}
        <motion.div
          className="glass-panel p-8 text-center mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-emerald-accent to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl font-cinzel font-bold text-rich-gold mb-4">
            Order Confirmed!
          </h1>
          <p className="font-noto-sinhala text-xl text-soft-ivory text-opacity-80 mb-4">
            ඇණවුම සනාථ කර ඇත!
          </p>
          <p className="text-lg text-soft-ivory text-opacity-70 mb-6">
            Thank you for your order. We'll process it shortly and keep you updated.
          </p>

          <div className="bg-rich-gold bg-opacity-10 border border-rich-gold border-opacity-30 rounded-xl p-4 mb-6">
            <div className="text-2xl font-bold text-rich-gold mb-2">
              Order #{order.order_number}
            </div>
            <div className="text-soft-ivory text-opacity-70">
              Placed on {new Date(order.created_at).toLocaleDateString('en-GB')}
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={handleWhatsAppContact}
              className="flex items-center gap-2 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5" />
              Contact via WhatsApp
            </motion.button>

            <motion.button
              onClick={() => window.open('tel:+94XXXXXXXXX')}
              className="flex items-center gap-2 glass-panel-light text-soft-ivory font-semibold py-3 px-6 hover:text-rich-gold transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              Call Us
            </motion.button>
          </div>
        </motion.div>

        {/* Order Details */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Items */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-6 flex items-center gap-2">
              <Package className="w-6 h-6" />
              Order Items
            </h2>
            
            <div className="space-y-4">
              {order.items.map((item) => (
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

            <div className="border-t border-rich-gold border-opacity-20 pt-4 mt-6">
              <div className="flex justify-between items-center text-xl">
                <span className="font-semibold text-soft-ivory">Total:</span>
                <span className="font-bold text-rich-gold text-2xl">
                  {formatPrice(order.total_lkr)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <div className="glass-panel p-8">
              <h3 className="text-xl font-cinzel font-semibold text-rich-gold mb-4">
                Delivery Address
              </h3>
              <div className="text-soft-ivory text-opacity-80 space-y-1">
                <p className="font-medium">{order.customer_name}</p>
                <p>{order.phone}</p>
                <p>{order.address}</p>
                <p>{order.city}, {order.province}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass-panel p-8">
              <h3 className="text-xl font-cinzel font-semibold text-rich-gold mb-4">
                Payment Method
              </h3>
              <div className="text-soft-ivory text-opacity-80">
                {order.payment_method === 'cod' && 'Cash on Delivery'}
                {order.payment_method === 'bank_transfer' && 'Bank Transfer'}
                {order.payment_method === 'payhere' && 'PayHere (Online Payment)'}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="glass-panel p-8">
              <h3 className="text-xl font-cinzel font-semibold text-rich-gold mb-4">
                Delivery Information
              </h3>
              <div className="space-y-3 text-soft-ivory text-opacity-80">
                <div className="flex items-center gap-2 text-emerald-accent">
                  <CheckCircle className="w-5 h-5" />
                  <span>Free delivery anywhere in Sri Lanka</span>
                </div>
                <p>Expected delivery: 2-5 business days</p>
                <p>You'll receive SMS/WhatsApp updates when your order ships</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <motion.div
          className="glass-panel p-8 mt-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">
            What happens next?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-soft-ivory text-opacity-80">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-rich-gold bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-rich-gold font-bold">1</span>
              </div>
              <h4 className="font-semibold">Order Processing</h4>
              <p className="text-sm">We'll prepare your order within 24 hours</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-rich-gold bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-rich-gold font-bold">2</span>
              </div>
              <h4 className="font-semibold">Shipping</h4>
              <p className="text-sm">Your order will be shipped via courier</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-rich-gold bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-rich-gold font-bold">3</span>
              </div>
              <h4 className="font-semibold">Delivery</h4>
              <p className="text-sm">Receive your order at your doorstep</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;