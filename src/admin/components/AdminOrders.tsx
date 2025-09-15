import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Phone, 
  MapPin,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Truck
} from 'lucide-react';
import { Order } from '../../types';
import toast from 'react-hot-toast';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter]);

  const loadOrders = () => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders.sort((a: Order, b: Order) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ));
  };

  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    toast.success('Order status updated successfully');
    
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400 bg-opacity-20';
      case 'paid': return 'text-blue-400 bg-blue-400 bg-opacity-20';
      case 'shipped': return 'text-purple-400 bg-purple-400 bg-opacity-20';
      case 'delivered': return 'text-green-400 bg-green-400 bg-opacity-20';
      case 'cancelled': return 'text-red-400 bg-red-400 bg-opacity-20';
      default: return 'text-soft-ivory bg-soft-ivory bg-opacity-20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertTriangle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-cinzel font-bold text-rich-gold mb-2">Orders Management</h1>
        <p className="font-noto-sinhala text-soft-ivory text-opacity-80">ඇණවුම් කළමනාකරණය</p>
        <p className="text-soft-ivory text-opacity-60">Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <div className="glass-panel p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-soft-ivory text-opacity-50" />
            <input
              type="text"
              placeholder="Search by order number, customer name, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-soft-ivory text-opacity-50" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50 appearance-none"
            >
              <option value="all" className="bg-dark-charcoal">All Status</option>
              <option value="pending" className="bg-dark-charcoal">Pending</option>
              <option value="paid" className="bg-dark-charcoal">Paid</option>
              <option value="shipped" className="bg-dark-charcoal">Shipped</option>
              <option value="delivered" className="bg-dark-charcoal">Delivered</option>
              <option value="cancelled" className="bg-dark-charcoal">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-panel p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold">Orders</h2>
            <p className="text-soft-ivory text-opacity-70">
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-soft-ivory text-opacity-30 mx-auto mb-4" />
            <p className="text-soft-ivory text-opacity-70">No orders found</p>
            <p className="text-sm text-soft-ivory text-opacity-50">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Orders will appear here once customers start placing them'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-rich-gold border-opacity-20">
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Order #</th>
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Customer</th>
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Payment</th>
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-soft-ivory font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-rich-gold border-opacity-10 hover:bg-rich-gold hover:bg-opacity-5">
                    <td className="py-3 px-4 text-soft-ivory font-mono text-sm">{order.order_number}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="text-soft-ivory font-medium">{order.customer_name}</div>
                        <div className="text-sm text-soft-ivory text-opacity-70">{order.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-rich-gold font-semibold">{formatPrice(order.total_lkr)}</td>
                    <td className="py-3 px-4 text-soft-ivory text-opacity-70 capitalize text-sm">
                      {order.payment_method.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-soft-ivory text-opacity-70 text-sm">
                      {new Date(order.created_at).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openOrderModal(order)}
                          className="p-2 rounded-full hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-soft-ivory" />
                        </button>
                        <button
                          onClick={() => window.open(`tel:${order.phone}`)}
                          className="p-2 rounded-full hover:bg-green-500 hover:bg-opacity-20 transition-colors duration-200"
                          title="Call Customer"
                        >
                          <Phone className="w-4 h-4 text-green-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-dark-charcoal bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="glass-panel max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-cinzel font-bold text-rich-gold">
                    Order #{selectedOrder.order_number}
                  </h2>
                  <p className="text-soft-ivory text-opacity-70">
                    Placed on {new Date(selectedOrder.created_at).toLocaleDateString('en-GB')}
                  </p>
                </div>
                <button
                  onClick={closeOrderModal}
                  className="p-2 rounded-full hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200"
                >
                  <AlertTriangle className="w-6 h-6 text-soft-ivory transform rotate-45" />
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Order Items */}
                <div>
                  <h3 className="text-xl font-cinzel font-semibold text-rich-gold mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div key={item.product.id} className="flex gap-4 p-4 glass-panel-light">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name_en}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-soft-ivory">{item.product.name_en}</h4>
                          <p className="text-sm font-noto-sinhala text-soft-ivory text-opacity-70">
                            {item.product.name_si}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-soft-ivory text-opacity-70">Qty: {item.quantity}</span>
                            <span className="text-rich-gold font-semibold">
                              {formatPrice(item.product.price_lkr * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-rich-gold border-opacity-20 pt-4 mt-6">
                    <div className="flex justify-between items-center text-xl">
                      <span className="font-semibold text-soft-ivory">Total:</span>
                      <span className="font-bold text-rich-gold text-2xl">
                        {formatPrice(selectedOrder.total_lkr)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer & Order Info */}
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="glass-panel-light p-6">
                    <h3 className="text-lg font-semibold text-rich-gold mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Customer Information
                    </h3>
                    <div className="space-y-2 text-soft-ivory text-opacity-80">
                      <p><strong>Name:</strong> {selectedOrder.customer_name}</p>
                      <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                      <p><strong>Address:</strong> {selectedOrder.address}</p>
                      <p><strong>City:</strong> {selectedOrder.city}</p>
                      <p><strong>Province:</strong> {selectedOrder.province}</p>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div className="glass-panel-light p-6">
                    <h3 className="text-lg font-semibold text-rich-gold mb-4 flex items-center gap-2">
                      <Edit className="w-5 h-5" />
                      Order Status
                    </h3>
                    <div className="space-y-4">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        <span className="capitalize font-medium">{selectedOrder.status}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-soft-ivory">Update Status:</label>
                        <select
                          value={selectedOrder.status}
                          onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as Order['status'])}
                          className="w-full px-4 py-2 glass-panel-light text-soft-ivory outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                        >
                          <option value="pending" className="bg-dark-charcoal">Pending</option>
                          <option value="paid" className="bg-dark-charcoal">Paid</option>
                          <option value="shipped" className="bg-dark-charcoal">Shipped</option>
                          <option value="delivered" className="bg-dark-charcoal">Delivered</option>
                          <option value="cancelled" className="bg-dark-charcoal">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="glass-panel-light p-6">
                    <h3 className="text-lg font-semibold text-rich-gold mb-4">Payment Information</h3>
                    <div className="space-y-2 text-soft-ivory text-opacity-80">
                      <p><strong>Method:</strong> {selectedOrder.payment_method.replace('_', ' ').toUpperCase()}</p>
                      <p><strong>Amount:</strong> {formatPrice(selectedOrder.total_lkr)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;