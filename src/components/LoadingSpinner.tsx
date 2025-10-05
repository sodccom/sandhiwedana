import React from 'react';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <Loader className="w-12 h-12 text-rich-gold" />
      </motion.div>
      <p className="mt-4 text-soft-ivory text-opacity-70">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
