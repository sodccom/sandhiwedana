import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Demo credentials - in real app, this would be API call
      if (formData.username === 'admin' && formData.password === 'admin123') {
        const token = 'demo-admin-token-' + Date.now();
        onLogin(token);
        toast.success('Login successful!');
      } else {
        toast.error('Invalid credentials. Use admin/admin123');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-charcoal to-dark-charcoal-light flex items-center justify-center px-6">
      <motion.div
        className="glass-panel p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-rich-gold to-deep-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-dark-charcoal" />
          </div>
          <h1 className="text-3xl font-cinzel font-bold text-rich-gold mb-2">
            Admin Panel
          </h1>
          <p className="font-noto-sinhala text-soft-ivory text-opacity-80">
            පරිපාලක පැනලය
          </p>
          <p className="text-soft-ivory text-opacity-60 text-sm mt-2">
            Sandhi Wedanaharanie Management
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-rich-gold bg-opacity-10 border border-rich-gold border-opacity-30 rounded-lg p-4 mb-6">
          <h3 className="text-rich-gold font-semibold mb-2">Demo Credentials:</h3>
          <p className="text-soft-ivory text-opacity-80 text-sm">
            Username: <code className="bg-dark-charcoal px-2 py-1 rounded">admin</code>
          </p>
          <p className="text-soft-ivory text-opacity-80 text-sm">
            Password: <code className="bg-dark-charcoal px-2 py-1 rounded">admin123</code>
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-soft-ivory mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-soft-ivory text-opacity-50" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-soft-ivory mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-soft-ivory text-opacity-50" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-12 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-soft-ivory text-opacity-50 hover:text-soft-ivory transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold py-3 rounded-xl gold-glow disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-soft-ivory text-opacity-60 text-sm">
          <p>&copy; 2024 Sandhi Wedanaharanie</p>
          <p>Secure Admin Access</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;