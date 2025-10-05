import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package, Star, Eye, Loader } from 'lucide-react';
import { Product } from '../../types';
import { useProducts } from '../../hooks/useProducts';
import { productsService } from '../../services/productsService';
import toast from 'react-hot-toast';

const AdminProducts: React.FC = () => {
  const { products, loading, refreshProducts } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name_si: '',
    name_en: '',
    slug: '',
    description_si: '',
    description_en: '',
    price_lkr: 0,
    stock: 0,
    featured: false,
    images: ['']
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', '₨');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? Number(value) : value
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name_si: product.name_si,
        name_en: product.name_en,
        slug: product.slug,
        description_si: product.description_si,
        description_en: product.description_en,
        price_lkr: product.price_lkr,
        stock: product.stock,
        featured: product.featured,
        images: product.images
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name_si: '',
        name_en: '',
        slug: '',
        description_si: '',
        description_en: '',
        price_lkr: 0,
        stock: 0,
        featured: false,
        images: ['']
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const slug = formData.slug || generateSlug(formData.name_en);
      const productData = { ...formData, slug };

      if (editingProduct) {
        await productsService.update(editingProduct.id, productData);
        toast.success('Product updated successfully');
      } else {
        await productsService.create(productData as any);
        toast.success('Product added successfully');
      }

      await refreshProducts();
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const success = await productsService.delete(productId);
      if (success) {
        await refreshProducts();
        toast.success('Product deleted successfully');
      } else {
        toast.error('Failed to delete product');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-cinzel font-bold text-rich-gold mb-2">Products Management</h1>
          <p className="font-noto-sinhala text-soft-ivory text-opacity-80">නිෂ්පාදන කළමනාකරණය</p>
          <p className="text-soft-ivory text-opacity-60">Manage your product catalog</p>
        </div>
        <motion.button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold py-3 px-6 rounded-xl gold-glow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          Add Product
        </motion.button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="glass-panel p-6 hover:shadow-2xl transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="relative mb-4">
              <img
                src={product.images[0] || 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg'}
                alt={product.name_en}
                className="w-full h-48 object-cover rounded-lg"
              />
              {product.featured && (
                <div className="absolute top-2 right-2 bg-rich-gold text-dark-charcoal px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Featured
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="font-cinzel text-lg font-semibold text-rich-gold">{product.name_en}</h3>
                <p className="font-noto-sinhala text-soft-ivory text-opacity-80 text-sm">{product.name_si}</p>
              </div>

              <p className="text-soft-ivory text-opacity-70 text-sm line-clamp-2">
                {product.description_en}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-rich-gold">
                  {formatPrice(product.price_lkr)}
                </div>
                <div className="text-soft-ivory text-opacity-70 text-sm">
                  Stock: {product.stock}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-rich-gold border-opacity-20">
                <button
                  onClick={() => openModal(product)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 glass-panel-light hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="flex items-center justify-center gap-2 py-2 px-3 glass-panel-light hover:bg-red-500 hover:bg-opacity-20 transition-colors duration-200 rounded-lg text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="glass-panel p-12 text-center">
          <Package className="w-16 h-16 text-soft-ivory text-opacity-30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-soft-ivory mb-2">No Products Yet</h3>
          <p className="text-soft-ivory text-opacity-70 mb-6">Start by adding your first product to the catalog</p>
          <button
            onClick={() => openModal()}
            className="bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold py-3 px-6 rounded-xl gold-glow"
          >
            Add Your First Product
          </button>
        </div>
      )}

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-dark-charcoal bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="glass-panel max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-cinzel font-bold text-rich-gold">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200"
                >
                  <Plus className="w-6 h-6 text-soft-ivory transform rotate-45" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* English Name */}
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      Product Name (English) *
                    </label>
                    <input
                      type="text"
                      name="name_en"
                      value={formData.name_en}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                      placeholder="Enter English name"
                    />
                  </div>

                  {/* Sinhala Name */}
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      Product Name (Sinhala) *
                    </label>
                    <input
                      type="text"
                      name="name_si"
                      value={formData.name_si}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50 font-noto-sinhala"
                      placeholder="සිංහල නම ඇතුළත් කරන්න"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      Price (LKR) *
                    </label>
                    <input
                      type="number"
                      name="price_lkr"
                      value={formData.price_lkr}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                      placeholder="0"
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* English Description */}
                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Description (English) *
                  </label>
                  <textarea
                    name="description_en"
                    value={formData.description_en}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50 resize-vertical"
                    placeholder="Enter product description in English"
                  />
                </div>

                {/* Sinhala Description */}
                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Description (Sinhala) *
                  </label>
                  <textarea
                    name="description_si"
                    value={formData.description_si}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50 resize-vertical font-noto-sinhala"
                    placeholder="සිංහලෙන් නිෂ්පාදන විස්තරය ඇතුළත් කරන්න"
                  />
                </div>

                {/* Product Images */}
                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Product Images
                  </label>
                  <div className="space-y-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex gap-3">
                        <input
                          type="url"
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          className="flex-1 px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                          placeholder="Enter image URL"
                        />
                        {formData.images.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeImageField(index)}
                            className="p-3 glass-panel-light hover:bg-red-500 hover:bg-opacity-20 transition-colors duration-200 text-red-400"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addImageField}
                      className="flex items-center gap-2 px-4 py-2 glass-panel-light hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200 text-rich-gold"
                    >
                      <Plus className="w-4 h-4" />
                      Add Another Image
                    </button>
                  </div>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-rich-gold focus:ring-rich-gold focus:ring-opacity-50"
                  />
                  <label htmlFor="featured" className="text-soft-ivory font-medium">
                    Mark as Featured Product
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4 pt-6 border-t border-rich-gold border-opacity-20">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 py-3 px-6 glass-panel-light text-soft-ivory hover:bg-rich-gold hover:bg-opacity-10 transition-colors duration-200 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold py-3 px-6 rounded-xl gold-glow"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;