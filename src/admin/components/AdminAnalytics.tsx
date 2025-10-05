import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingCart, Users, DollarSign, Package, Eye } from 'lucide-react';
import { ordersService } from '../../services/ordersService';
import { productsService } from '../../services/productsService';
import { analyticsService } from '../../services/analyticsService';

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  averageOrderValue: number;
  pageViews: number;
  conversionRate: string;
}

const AdminAnalytics: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    averageOrderValue: 0,
    pageViews: 0,
    conversionRate: '0',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [orders, products, analytics] = await Promise.all([
        ordersService.getAll(),
        productsService.getAll(),
        analyticsService.getDashboardStats(),
      ]);

      const totalRevenue = orders.reduce((sum, order) => sum + order.total_lkr, 0);
      const totalOrders = orders.length;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      setStats({
        totalRevenue,
        totalOrders,
        totalProducts: products.length,
        averageOrderValue,
        pageViews: analytics.totalPageViews,
        conversionRate: analytics.conversionRate,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('LKR', '₨');
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toString(),
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500',
    },
    {
      title: 'Avg Order Value',
      value: formatPrice(stats.averageOrderValue),
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500',
    },
    {
      title: 'Page Views (7d)',
      value: stats.pageViews.toString(),
      icon: Eye,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-500',
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-rich-gold text-xl">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-cinzel font-bold text-rich-gold mb-2">Analytics Dashboard</h1>
        <p className="text-soft-ivory text-opacity-70">
          Overview of your business performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-6 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-soft-ivory text-opacity-70 text-sm mb-2">{stat.title}</p>
                <h3 className="text-3xl font-bold text-soft-ivory">{stat.value}</h3>
              </div>
              <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                <stat.icon className="w-8 h-8 text-soft-ivory" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel p-6"
        >
          <h2 className="text-2xl font-cinzel font-bold text-rich-gold mb-4">
            Recent Activity
          </h2>
          <p className="text-soft-ivory text-opacity-70">
            Track customer interactions, orders, and product views in real-time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-panel p-6"
        >
          <h2 className="text-2xl font-cinzel font-bold text-rich-gold mb-4">
            Top Products
          </h2>
          <p className="text-soft-ivory text-opacity-70">
            See which products are generating the most revenue and orders.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
