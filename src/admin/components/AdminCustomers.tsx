import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, Mail, MapPin, Calendar, ShoppingBag } from 'lucide-react';
import { Order, Customer } from '../../types';

const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchTerm]);

  const loadData = () => {
    // Load orders
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);

    // Extract unique customers from orders
    const customerMap = new Map<string, Customer>();
    
    storedOrders.forEach((order: Order) => {
      if (!customerMap.has(order.phone)) {
        customerMap.set(order.phone, {
          id: order.phone, // Using phone as ID for simplicity
          name: order.customer_name,
          phone: order.phone,
          email: '', // Not collected in current checkout
          created_at: order.created_at
        });
      }
    });

    const uniqueCustomers = Array.from(customerMap.values()).sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    setCustomers(uniqueCustomers);
  };

  const filterCustomers = () => {
    if (!searchTerm) {
      setFilteredCustomers(customers);
      return;
    }

    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
    
    setFilteredCustomers(filtered);
  };

  const getCustomerStats = (customerId: string) => {
    const customerOrders = orders.filter(order => order.phone === customerId);
    const totalSpent = customerOrders.reduce((sum, order) => sum + order.total_lkr, 0);
    const totalOrders = customerOrders.length;
    const lastOrderDate = customerOrders.length > 0 
      ? new Date(Math.max(...customerOrders.map(order => new Date(order.created_at).getTime())))
      : null;

    return { totalSpent, totalOrders, lastOrderDate };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', '₨');
  };

  const handleWhatsAppContact = (phone: string, name: string) => {
    const message = `Hello ${name}! Thank you for being a valued customer of Sandhi Wedanaharanie. How can we assist you today?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-cinzel font-bold text-rich-gold mb-2">Customer Management</h1>
        <p className="font-noto-sinhala text-soft-ivory text-opacity-80">පාරිභෝගික කළමනාකරණය</p>
        <p className="text-soft-ivory text-opacity-60">Manage and communicate with your customers</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-rich-gold">{customers.length}</h3>
              <p className="text-soft-ivory text-opacity-70">Total Customers</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-rich-gold">
                {customers.filter(c => {
                  const daysSinceJoined = (Date.now() - new Date(c.created_at).getTime()) / (1000 * 60 * 60 * 24);
                  return daysSinceJoined <= 30;
                }).length}
              </h3>
              <p className="text-soft-ivory text-opacity-70">New This Month</p>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rich-gold to-deep-gold rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-dark-charcoal" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-rich-gold">
                {formatPrice(orders.reduce((sum, order) => sum + order.total_lkr, 0) / Math.max(customers.length, 1))}
              </h3>
              <p className="text-soft-ivory text-opacity-70">Avg. Order Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="glass-panel p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-soft-ivory text-opacity-50" />
          <input
            type="text"
            placeholder="Search customers by name or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
          />
        </div>
      </div>

      {/* Customers List */}
      <div className="glass-panel p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold">Customers</h2>
            <p className="text-soft-ivory text-opacity-70">
              {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-soft-ivory text-opacity-30 mx-auto mb-4" />
            <p className="text-soft-ivory text-opacity-70">No customers found</p>
            <p className="text-sm text-soft-ivory text-opacity-50">
              {searchTerm 
                ? 'Try adjusting your search criteria'
                : 'Customers will appear here once they place orders'
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredCustomers.map((customer) => {
              const stats = getCustomerStats(customer.id);
              return (
                <motion.div
                  key={customer.id}
                  className="glass-panel-light p-6 hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Customer Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-rich-gold to-deep-gold rounded-full flex items-center justify-center">
                        <span className="text-dark-charcoal font-bold text-xl">
                          {customer.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-soft-ivory">{customer.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-soft-ivory text-opacity-70">
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Joined {new Date(customer.created_at).toLocaleDateString('en-GB')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Customer Stats */}
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-xl font-bold text-rich-gold">{stats.totalOrders}</div>
                        <div className="text-sm text-soft-ivory text-opacity-70">Orders</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-rich-gold">{formatPrice(stats.totalSpent)}</div>
                        <div className="text-sm text-soft-ivory text-opacity-70">Total Spent</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-soft-ivory">
                          {stats.lastOrderDate 
                            ? stats.lastOrderDate.toLocaleDateString('en-GB')
                            : 'Never'
                          }
                        </div>
                        <div className="text-sm text-soft-ivory text-opacity-70">Last Order</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleWhatsAppContact(customer.phone, customer.name)}
                        className="flex items-center gap-2 bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <Phone className="w-4 h-4" />
                        WhatsApp
                      </button>
                      <button
                        onClick={() => window.open(`tel:${customer.phone}`)}
                        className="p-2 glass-panel-light hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200 rounded-lg"
                      >
                        <Phone className="w-4 h-4 text-soft-ivory" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;