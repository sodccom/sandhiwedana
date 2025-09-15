import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Order } from '../../types';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    todaySales: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);

    // Calculate stats
    const today = new Date().toDateString();
    const todayOrders = storedOrders.filter((order: Order) => 
      new Date(order.created_at).toDateString() === today
    );
    
    const todaySales = todayOrders.reduce((sum: number, order: Order) => sum + order.total_lkr, 0);
    const pendingOrders = storedOrders.filter((order: Order) => order.status === 'pending').length;
    const totalRevenue = storedOrders.reduce((sum: number, order: Order) => sum + order.total_lkr, 0);
    const uniqueCustomers = new Set(storedOrders.map((order: Order) => order.phone)).size;

    setStats({
      todaySales,
      pendingOrders,
      totalRevenue,
      totalCustomers: uniqueCustomers
    });
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', '₨');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'paid': return 'text-blue-400';
      case 'shipped': return 'text-purple-400';
      case 'delivered': return 'text-green-400';
      case 'cancelled': return 'text-red-400';
      default: return 'text-soft-ivory';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertTriangle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const statCards = [
    {
      title: 'Today\'s Sales',
      titleSi: 'අද විකුණුම්',
      value: formatPrice(stats.todaySales),
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Pending Orders',
      titleSi: 'පොරොත්තු ඇණවුම්',
      value: stats.pendingOrders.toString(),
      icon: Clock,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Total Revenue',
      titleSi: 'මුළු ආදායම',
      value: formatPrice(stats.totalRevenue),
      icon: TrendingUp,
      color: 'from-rich-gold to-deep-gold'
    },
    {
      title: 'Total Customers',
      titleSi: 'මුළු පාරිභෝගිකයන්',
      value: stats.totalCustomers.toString(),
      icon: Users,
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-cinzel font-bold text-rich-gold mb-2">Dashboard</h1>
        <p className="font-noto-sinhala text-soft-ivory text-opacity-80">උපකරණ පුවරුව</p>
        <p className="text-soft-ivory text-opacity-60">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            className="glass-panel p-6 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-full flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-soft-ivory">{card.title}</h3>
              <p className="text-sm font-noto-sinhala text-soft-ivory text-opacity-70">{card.titleSi}</p>
              <p className="text-2xl font-bold text-rich-gold">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="glass-panel p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold">Recent Orders</h2>
            <p className="font-noto-sinhala text-soft-ivory text-opacity-70">මෑත ඇණවුම්</p>
          </div>
          <div className="text-sm text-soft-ivory text-opacity-60">
            Showing last 10 orders
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-soft-ivory text-opacity-30 mx-auto mb-4" />
            <p className="text-soft-ivory text-opacity-70">No orders yet</p>
            <p className="text-sm text-soft-ivory text-opacity-50">Orders will appear here once customers start placing them</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-rich-gold border-opacity-20">
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Order #</th>
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr key={order.id} className="border-b border-rich-gold border-opacity-10 hover:bg-rich-gold hover:bg-opacity-5">
                    <td className="py-3 px-4 text-soft-ivory font-mono text-sm">{order.order_number}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-soft-ivory font-medium">{order.customer_name}</div>
                        <div className="text-sm text-soft-ivory text-opacity-70">{order.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-rich-gold font-semibold">{formatPrice(order.total_lkr)}</td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center gap-2 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-soft-ivory text-opacity-70 text-sm">
                      {new Date(order.created_at).toLocaleDateString('en-GB')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-xl font-cinzel font-semibold text-rich-gold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 glass-panel-light hover:bg-rich-gold hover:bg-opacity-10 transition-colors duration-200 rounded-lg">
              <div className="font-medium text-soft-ivory">Process Pending Orders</div>
              <div className="text-sm text-soft-ivory text-opacity-70">Review and update order statuses</div>
            </button>
            <button className="w-full text-left p-3 glass-panel-light hover:bg-rich-gold hover:bg-opacity-10 transition-colors duration-200 rounded-lg">
              <div className="font-medium text-soft-ivory">Update Product Stock</div>
              <div className="text-sm text-soft-ivory text-opacity-70">Manage inventory levels</div>
            </button>
            <button className="w-full text-left p-3 glass-panel-light hover:bg-rich-gold hover:bg-opacity-10 transition-colors duration-200 rounded-lg">
              <div className="font-medium text-soft-ivory">Customer Messages</div>
              <div className="text-sm text-soft-ivory text-opacity-70">Respond to customer inquiries</div>
            </button>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-xl font-cinzel font-semibold text-rich-gold mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-soft-ivory">Website Status</span>
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-soft-ivory">Payment Gateway</span>
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-soft-ivory">Inventory Sync</span>
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Updated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;