import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  cartItemsCount: number;
  onCartOpen: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ cartItemsCount, onCartOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home', labelSi: 'මුල් පිටුව' },
    { label: 'About', href: '#about', labelSi: 'අප ගැන' },
    { label: 'Products', href: '#products', labelSi: 'නිෂ්පාදන' },
    { label: 'Benefits', href: '#benefits', labelSi: 'ප්‍රතිලාභ' },
    { label: 'Testimonials', href: '#testimonials', labelSi: 'සාක්ෂි' },
    { label: 'Contact', href: '#contact', labelSi: 'සම්බන්ධ වන්න' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? 'animate-float' : ''
        }`}
      >
        <div className="glass-panel px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-soft-ivory hover:text-rich-gold transition-colors duration-200 text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden floating-orb gold-glow"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-dark-charcoal" />
            </button>

            {/* Cart and Search */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200">
                <Search className="w-5 h-5 text-soft-ivory" />
              </button>
              <button
                onClick={onCartOpen}
                className="relative p-2 rounded-full hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200"
              >
                <ShoppingCart className="w-5 h-5 text-soft-ivory" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rich-gold text-dark-charcoal text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 md:hidden"
          >
            <div className="absolute inset-0 bg-dark-charcoal bg-opacity-90 backdrop-blur-md" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 h-full w-80 glass-panel m-4 p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-rich-gold font-cinzel text-xl font-semibold">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-soft-ivory" />
                </button>
              </div>

              <div className="space-y-6">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-soft-ivory hover:text-rich-gold transition-colors duration-200 text-lg font-medium py-2"
                  >
                    <div className="flex flex-col">
                      <span>{item.label}</span>
                      <span className="text-sm font-noto-sinhala text-soft-ivory text-opacity-70">
                        {item.labelSi}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;