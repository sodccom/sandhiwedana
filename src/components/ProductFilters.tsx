import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: 'price-asc' | 'price-desc' | 'name' | 'featured';
  inStock: boolean;
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    onFilterChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: numValue,
      },
    });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFilterChange({ ...filters, sortBy });
  };

  const handleStockChange = (inStock: boolean) => {
    onFilterChange({ ...filters, inStock });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="glass-panel w-full max-w-md p-6 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-rich-gold" />
            <h2 className="text-2xl font-cinzel font-bold text-rich-gold">Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-rich-gold hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-soft-ivory" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-soft-ivory mb-3">Sort By</h3>
            <div className="space-y-2">
              {[
                { value: 'featured', label: 'Featured' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
                { value: 'name', label: 'Name' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 p-3 glass-panel-light cursor-pointer hover:bg-opacity-20"
                >
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={() => handleSortChange(option.value as FilterOptions['sortBy'])}
                    className="text-rich-gold focus:ring-rich-gold"
                  />
                  <span className="text-soft-ivory">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-soft-ivory mb-3">Price Range (LKR)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-soft-ivory mb-2">Min</label>
                <input
                  type="number"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full px-3 py-2 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm text-soft-ivory mb-2">Max</label>
                <input
                  type="number"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full px-3 py-2 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                  placeholder="999999"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-soft-ivory mb-3">Availability</h3>
            <label className="flex items-center gap-3 p-3 glass-panel-light cursor-pointer hover:bg-opacity-20">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleStockChange(e.target.checked)}
                className="text-rich-gold focus:ring-rich-gold rounded"
              />
              <span className="text-soft-ivory">In Stock Only</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onReset}
              className="flex-1 py-3 glass-panel-light text-soft-ivory font-semibold rounded-xl hover:bg-opacity-20 transition-all"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold rounded-xl gold-glow"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductFilters;
