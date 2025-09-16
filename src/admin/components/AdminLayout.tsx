import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Leaf,
  FileText
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', labelSi: 'උපකරණ පුවරුව' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'Orders', labelSi: 'ඇණවුම්' },
    { path: '/admin/products', icon: Package, label: 'Products', labelSi: 'නිෂ්පාදන' },
    { path: '/admin/customers', icon: Users, label: 'Customers', labelSi: 'පාරිභෝගිකයන්' },
    { path: '/admin/policies', icon: FileText, label: 'Policies', labelSi: 'ප්‍රතිපත්ති' },
    { path: '/admin/settings', icon: Settings, label: 'Settings', labelSi: 'සැකසුම්' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-charcoal to-dark-charcoal-light">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="floating-orb gold-glow"
        >
          <Menu className="w-6 h-6 text-dark-charcoal" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="glass-panel h-full m-4 p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rich-gold to-deep-gold rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-dark-charcoal" />
              </div>
              <div>
                <h2 className="font-cinzel text-lg font-bold text-rich-gold">Admin Panel</h2>
                <p className="text-xs font-noto-sinhala text-soft-ivory text-opacity-70">පරිපාලක පැනලය</p>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-full hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-soft-ivory" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-rich-gold bg-opacity-20 text-rich-gold border border-rich-gold border-opacity-30'
                    : 'text-soft-ivory hover:bg-rich-gold hover:bg-opacity-10 hover:text-rich-gold'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs font-noto-sinhala opacity-70">{item.labelSi}</div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-soft-ivory hover:bg-red-500 hover:bg-opacity-20 hover:text-red-400 transition-all duration-200 mt-4"
          >
            <LogOut className="w-5 h-5" />
            <div>
              <div className="font-medium">Logout</div>
              <div className="text-xs font-noto-sinhala opacity-70">ඉවත් වන්න</div>
            </div>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-dark-charcoal bg-opacity-50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-72 p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;