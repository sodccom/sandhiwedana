import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import ProductCard from './components/ProductCard';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import ChatBot from './components/ChatBot';
import { useCart } from './hooks/useCart';
import { sampleProducts } from './data/products';
import { motion } from 'framer-motion';

function CustomerApp() {
  const {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalAmount,
    openCart,
    closeCart,
    clearCart,
  } = useCart();

  const handleOrderNow = () => {
    if (sampleProducts.length > 0) {
      addToCart(sampleProducts[0]);
      openCart();
    }
  };

  const handleLearnMore = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-charcoal to-dark-charcoal-light">
      <Routes>
        <Route path="/checkout" element={
          <Checkout 
            items={cartItems}
            totalAmount={getTotalAmount()}
            onOrderComplete={clearCart}
          />
        } />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/" element={
          <>
            <Navigation cartItemsCount={getTotalItems()} onCartOpen={openCart} />
            
            <Hero onOrderNow={handleOrderNow} onLearnMore={handleLearnMore} />
            
            <About />
            
            {/* Products Section */}
            <section id="products" className="py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <motion.h2
                    className="text-4xl md:text-5xl font-cinzel font-bold text-rich-gold mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    Our Products
                  </motion.h2>
                  <motion.p
                    className="font-noto-sinhala text-xl text-soft-ivory text-opacity-80 mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    අපගේ නිෂ්පාදන
                  </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {sampleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            </section>

            <Benefits />
            <Testimonials />
            <Contact />

            <Cart
              isOpen={isCartOpen}
              onClose={closeCart}
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromCart}
              totalAmount={getTotalAmount()}
            />

            <ChatBot />

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-rich-gold border-opacity-20">
              <div className="max-w-7xl mx-auto text-center">
                <div className="mb-4">
                  <h3 className="font-cinzel text-2xl font-bold text-rich-gold mb-2">
                    Sandhi Wedanaharanie
                  </h3>
                  <p className="font-noto-sinhala text-soft-ivory text-opacity-70">
                    සන්ධි වේදනාහරණී
                  </p>
                </div>
                <div className="text-soft-ivory text-opacity-60 text-sm">
                  <p>&copy; 2024 Sandhi Wedanaharanie. All rights reserved.</p>
                  <p className="mt-2">Natural Relief, Local Tradition</p>
                </div>
              </div>
            </footer>
          </>
        } />
      </Routes>
    </div>
  );
}

export default CustomerApp;