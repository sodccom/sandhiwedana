import React, { useState, useMemo } from 'react';
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
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import RefundPolicy from './components/RefundPolicy';
import SearchBar from './components/SearchBar';
import ProductFilters from './components/ProductFilters';
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Loader } from 'lucide-react';
import { analyticsService } from './services/analyticsService';

function CustomerApp() {
  const { products, loading } = useProducts();
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

  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 999999 },
    sortBy: 'featured' as 'price-asc' | 'price-desc' | 'name' | 'featured',
    inStock: false,
  });

  const handleOrderNow = () => {
    if (products.length > 0) {
      addToCart(products[0]);
      openCart();
      analyticsService.trackEvent('hero_cta_click', { action: 'order_now' });
    }
  };

  const handleLearnMore = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    analyticsService.trackEvent('hero_cta_click', { action: 'learn_more' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      analyticsService.trackEvent('product_search', { query });
    }
  };

  const resetFilters = () => {
    setFilters({
      priceRange: { min: 0, max: 999999 },
      sortBy: 'featured',
      inStock: false,
    });
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name_en.toLowerCase().includes(query) ||
          p.name_si.toLowerCase().includes(query) ||
          p.description_en.toLowerCase().includes(query)
      );
    }

    filtered = filtered.filter(
      (p) =>
        p.price_lkr >= filters.priceRange.min &&
        p.price_lkr <= filters.priceRange.max
    );

    if (filters.inStock) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price_lkr - b.price_lkr;
        case 'price-desc':
          return b.price_lkr - a.price_lkr;
        case 'name':
          return a.name_en.localeCompare(b.name_en);
        case 'featured':
        default:
          return b.featured === a.featured ? 0 : b.featured ? 1 : -1;
      }
    });

    return filtered;
  }, [products, searchQuery, filters]);

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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
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

                <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <SearchBar
                    onSearch={handleSearch}
                    placeholder="Search products..."
                  />
                  <motion.button
                    onClick={() => setIsFiltersOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 glass-panel hover:bg-rich-gold hover:bg-opacity-20 transition-all rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SlidersHorizontal className="w-5 h-5 text-rich-gold" />
                    <span className="text-soft-ivory font-medium">Filters</span>
                  </motion.button>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader className="w-12 h-12 text-rich-gold animate-spin" />
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-soft-ivory text-opacity-70 text-xl">
                      No products found matching your criteria.
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={resetFilters}
              isOpen={isFiltersOpen}
              onClose={() => setIsFiltersOpen(false)}
            />

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
                
                {/* Footer Links */}
                <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
                  <a 
                    href="/privacy-policy" 
                    className="text-soft-ivory text-opacity-70 hover:text-rich-gold transition-colors duration-200"
                  >
                    Privacy Policy
                  </a>
                  <a 
                    href="/terms-conditions" 
                    className="text-soft-ivory text-opacity-70 hover:text-rich-gold transition-colors duration-200"
                  >
                    Terms & Conditions
                  </a>
                  <a 
                    href="/refund-policy" 
                    className="text-soft-ivory text-opacity-70 hover:text-rich-gold transition-colors duration-200"
                  >
                    Refund Policy
                  </a>
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