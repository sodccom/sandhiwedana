import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, FileText, Shield, RefreshCw, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPolicies: React.FC = () => {
  const [activeTab, setActiveTab] = useState('privacy');
  const [policies, setPolicies] = useState({
    privacy: {
      title: 'Privacy Policy',
      content: `At Sandhi Wedanaharanie, we collect information to provide you with the best possible service and products. The information we collect includes:

• Personal Information: Name, phone number, email address, and delivery address when you place an order
• Order Information: Products purchased, quantities, payment method, and delivery preferences
• Communication Data: Messages sent through our contact forms, chat system, or customer support
• Usage Information: How you interact with our website, pages visited, and time spent

We use the collected information for:
• Processing and fulfilling your orders
• Communicating with you about your orders and delivery status
• Providing customer support and responding to inquiries
• Improving our products and services
• Sending promotional offers and updates (with your consent)
• Complying with legal obligations

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.`,
      lastUpdated: new Date().toISOString()
    },
    terms: {
      title: 'Terms & Conditions',
      content: `By accessing and using the Sandhi Wedanaharanie website and services, you accept and agree to be bound by the terms and provision of this agreement.

Product Information:
Sandhi Wedanaharanie is a traditional Ayurvedic medicine formulated for joint pain relief. By purchasing our products, you acknowledge that:
• Our products are traditional herbal remedies and are not intended to diagnose, treat, cure, or prevent any disease
• Results may vary from person to person
• You should consult with a healthcare professional before use, especially if you have medical conditions
• Product information is provided for educational purposes only

Orders and Payment:
• All orders are subject to availability and confirmation of the order price
• We reserve the right to refuse or cancel any order for any reason
• Payment must be made in full before dispatch (except for Cash on Delivery orders)
• Prices are subject to change without notice
• We accept Cash on Delivery, Bank Transfer, and Online Payments

Delivery Terms:
• Free delivery anywhere in Sri Lanka
• Delivery time: 2-5 business days
• We are not responsible for delays caused by courier services or external factors
• You must provide accurate delivery information
• Risk of loss passes to you upon delivery`,
      lastUpdated: new Date().toISOString()
    },
    refund: {
      title: 'Refund Policy',
      content: `At Sandhi Wedanaharanie, we are committed to your satisfaction. This policy outlines the conditions under which refunds are available and the process to request them.

Eligible for Refund:
• Damaged Products: If you receive a product that is physically damaged during shipping
• Wrong Product: If you receive a different product than what you ordered
• Defective Products: If the product has manufacturing defects or quality issues
• Non-Delivery: If your order was not delivered within 10 business days of the expected delivery date
• Duplicate Charges: If you were charged multiple times for the same order

Not Eligible for Refund:
• Change of Mind: If you simply change your mind about the purchase
• Used Products: Products that have been opened, used, or consumed
• Delayed Claims: Refund requests made more than 7 days after delivery
• Incorrect Address: If delivery failed due to incorrect address provided by customer
• Refused Delivery: If you refused to accept the delivery without valid reason
• Natural Variations: Minor variations in color, taste, or texture that are natural to herbal products

Refund Process:
1. Contact us within 7 days of receiving your order
2. Provide order number, reason for refund, and photos if applicable
3. Our team will review your request (1-3 business days)
4. Once approved, refunds will be processed (5-10 business days)

Contact Information:
• WhatsApp: +94 XXX XXX XXX
• Email: refunds@sandhiwedanaharanie.lk
• Phone: +94 XXX XXX XXX`,
      lastUpdated: new Date().toISOString()
    }
  });

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'refund', label: 'Refund Policy', icon: RefreshCw }
  ];

  const handleContentChange = (policyType: string, content: string) => {
    setPolicies(prev => ({
      ...prev,
      [policyType]: {
        ...prev[policyType as keyof typeof prev],
        content,
        lastUpdated: new Date().toISOString()
      }
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    localStorage.setItem('policies', JSON.stringify(policies));
    toast.success('Policies saved successfully!');
  };

  const previewPolicy = (policyType: string) => {
    const routes = {
      privacy: '/privacy-policy',
      terms: '/terms-conditions',
      refund: '/refund-policy'
    };
    window.open(routes[policyType as keyof typeof routes], '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-cinzel font-bold text-rich-gold mb-2">Policy Management</h1>
          <p className="font-noto-sinhala text-soft-ivory text-opacity-80">ප්‍රතිපත්ති කළමනාකරණය</p>
          <p className="text-soft-ivory text-opacity-60">Manage your website policies and legal documents</p>
        </div>
        <motion.button
          onClick={handleSave}
          className="flex items-center gap-2 bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold py-3 px-6 rounded-xl gold-glow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save className="w-5 h-5" />
          Save All Changes
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
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="glass-panel p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-cinzel font-semibold text-rich-gold">
                  {policies[activeTab as keyof typeof policies].title}
                </h2>
                <p className="text-sm text-soft-ivory text-opacity-70">
                  Last updated: {new Date(policies[activeTab as keyof typeof policies].lastUpdated).toLocaleDateString('en-GB')}
                </p>
              </div>
              <button
                onClick={() => previewPolicy(activeTab)}
                className="flex items-center gap-2 glass-panel-light text-soft-ivory hover:text-rich-gold transition-colors duration-200 py-2 px-4 rounded-lg"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-soft-ivory mb-2">
                  Policy Content
                </label>
                <textarea
                  value={policies[activeTab as keyof typeof policies].content}
                  onChange={(e) => handleContentChange(activeTab, e.target.value)}
                  rows={20}
                  className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50 resize-vertical font-mono text-sm leading-relaxed"
                  placeholder="Enter policy content..."
                />
                <p className="text-xs text-soft-ivory text-opacity-50 mt-2">
                  Use bullet points (•) and line breaks to format your content. Changes will be reflected on the live website.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="border-t border-rich-gold border-opacity-20 pt-6">
                <h3 className="text-lg font-semibold text-rich-gold mb-4">Quick Actions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => previewPolicy(activeTab)}
                    className="flex items-center gap-2 glass-panel-light text-soft-ivory hover:text-rich-gold transition-colors duration-200 py-3 px-4 rounded-lg"
                  >
                    <Eye className="w-5 h-5" />
                    Preview on Website
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-rich-gold bg-opacity-20 text-rich-gold hover:bg-opacity-30 transition-colors duration-200 py-3 px-4 rounded-lg"
                  >
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Policy Statistics */}
              <div className="border-t border-rich-gold border-opacity-20 pt-6">
                <h3 className="text-lg font-semibold text-rich-gold mb-4">Content Statistics</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="glass-panel-light p-4 rounded-lg">
                    <div className="text-2xl font-bold text-rich-gold">
                      {policies[activeTab as keyof typeof policies].content.split(' ').length}
                    </div>
                    <div className="text-sm text-soft-ivory text-opacity-70">Words</div>
                  </div>
                  <div className="glass-panel-light p-4 rounded-lg">
                    <div className="text-2xl font-bold text-rich-gold">
                      {policies[activeTab as keyof typeof policies].content.length}
                    </div>
                    <div className="text-sm text-soft-ivory text-opacity-70">Characters</div>
                  </div>
                  <div className="glass-panel-light p-4 rounded-lg">
                    <div className="text-2xl font-bold text-rich-gold">
                      {policies[activeTab as keyof typeof policies].content.split('\n').length}
                    </div>
                    <div className="text-sm text-soft-ivory text-opacity-70">Lines</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPolicies;