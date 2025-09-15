import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  Truck, 
  Shield,
  Bell,
  Palette
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Site Settings
    siteName: 'Sandhi Wedanaharanie',
    siteNameSi: 'සන්ධි වේදනාහරණී',
    tagline: 'Natural Relief, Local Tradition',
    
    // Contact Information
    phone: '+94 XXX XXX XXX',
    whatsapp: '+94 XXX XXX XXX',
    email: 'info@sandhiwedanaharanie.lk',
    address: 'Colombo, Sri Lanka',
    
    // Business Settings
    freeDelivery: true,
    deliveryMessage: 'Free Delivery Anywhere in Sri Lanka',
    currency: 'LKR',
    
    // Payment Settings
    codEnabled: true,
    bankTransferEnabled: true,
    payhereEnabled: true,
    bankAccountDetails: 'Bank: Commercial Bank\nAccount: 1234567890\nBranch: Colombo',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true,
    
    // SEO Settings
    metaTitle: 'Premium Ayurvedic Products - Sandhi Wedanaharanie',
    metaDescription: 'Natural joint pain relief with traditional Ayurvedic medicine. Free delivery across Sri Lanka.',
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 30
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'delivery', label: 'Delivery', icon: Truck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-cinzel font-bold text-rich-gold mb-2">Settings</h1>
          <p className="font-noto-sinhala text-soft-ivory text-opacity-80">සැකසුම්</p>
          <p className="text-soft-ivory text-opacity-60">Configure your store settings</p>
        </div>
        <motion.button
          onClick={handleSave}
          className="flex items-center gap-2 bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold py-3 px-6 rounded-xl gold-glow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save className="w-5 h-5" />
          Save Changes
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-rich-gold bg-opacity-20 text-rich-gold border border-rich-gold border-opacity-30'
                      : 'text-soft-ivory hover:bg-rich-gold hover:bg-opacity-10 hover:text-rich-gold'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="glass-panel p-8">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-6">General Settings</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      Site Name (English)
                    </label>
                    <input
                      type="text"
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      Site Name (Sinhala)
                    </label>
                    <input
                      type="text"
                      name="siteNameSi"
                      value={settings.siteNameSi}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50 font-noto-sinhala"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={settings.tagline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={settings.currency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                  >
                    <option value="LKR" className="bg-dark-charcoal">Sri Lankan Rupee (LKR)</option>
                    <option value="USD" className="bg-dark-charcoal">US Dollar (USD)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Contact Settings */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-6">Contact Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={settings.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={settings.whatsapp}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
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
                    value={settings.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Business Address
                  </label>
                  <textarea
                    name="address"
                    value={settings.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50 resize-vertical"
                  />
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-6">Payment Methods</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="codEnabled"
                      name="codEnabled"
                      checked={settings.codEnabled}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-rich-gold focus:ring-rich-gold"
                    />
                    <label htmlFor="codEnabled" className="text-soft-ivory font-medium">
                      Cash on Delivery (COD)
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="bankTransferEnabled"
                      name="bankTransferEnabled"
                      checked={settings.bankTransferEnabled}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-rich-gold focus:ring-rich-gold"
                    />
                    <label htmlFor="bankTransferEnabled" className="text-soft-ivory font-medium">
                      Bank Transfer
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="payhereEnabled"
                      name="payhereEnabled"
                      checked={settings.payhereEnabled}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-rich-gold focus:ring-rich-gold"
                    />
                    <label htmlFor="payhereEnabled" className="text-soft-ivory font-medium">
                      PayHere (Online Payment)
                    </label>
                  </div>
                </div>

                {settings.bankTransferEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-soft-ivory mb-2">
                      Bank Account Details
                    </label>
                    <textarea
                      name="bankAccountDetails"
                      value={settings.bankAccountDetails}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50 resize-vertical"
                      placeholder="Enter bank account details for customers"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Delivery Settings */}
            {activeTab === 'delivery' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-6">Delivery Settings</h2>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="freeDelivery"
                    name="freeDelivery"
                    checked={settings.freeDelivery}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-rich-gold focus:ring-rich-gold"
                  />
                  <label htmlFor="freeDelivery" className="text-soft-ivory font-medium">
                    Enable Free Delivery
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Delivery Message
                  </label>
                  <input
                    type="text"
                    name="deliveryMessage"
                    value={settings.deliveryMessage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                    placeholder="Message to display about delivery"
                  />
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-6">Notification Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-rich-gold focus:ring-rich-gold"
                    />
                    <label htmlFor="emailNotifications" className="text-soft-ivory font-medium">
                      Email Notifications
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      name="smsNotifications"
                      checked={settings.smsNotifications}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-rich-gold focus:ring-rich-gold"
                    />
                    <label htmlFor="smsNotifications" className="text-soft-ivory font-medium">
                      SMS Notifications
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="whatsappNotifications"
                      name="whatsappNotifications"
                      checked={settings.whatsappNotifications}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-rich-gold focus:ring-rich-gold"
                    />
                    <label htmlFor="whatsappNotifications" className="text-soft-ivory font-medium">
                      WhatsApp Notifications
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* SEO Settings */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-6">SEO Settings</h2>
                
                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={settings.metaTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                  />
                  <p className="text-xs text-soft-ivory text-opacity-50 mt-1">
                    Recommended: 50-60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={settings.metaDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50 resize-vertical"
                  />
                  <p className="text-xs text-soft-ivory text-opacity-50 mt-1">
                    Recommended: 150-160 characters
                  </p>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-6">Security Settings</h2>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="twoFactorAuth"
                    name="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-rich-gold focus:ring-rich-gold"
                  />
                  <label htmlFor="twoFactorAuth" className="text-soft-ivory font-medium">
                    Enable Two-Factor Authentication
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-soft-ivory mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    name="sessionTimeout"
                    value={settings.sessionTimeout}
                    onChange={handleInputChange}
                    min="5"
                    max="120"
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;