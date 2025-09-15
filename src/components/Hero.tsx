import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
  onLearnMore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOrderNow, onLearnMore }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-charcoal via-dark-charcoal-light to-dark-charcoal opacity-95" />
      
      {/* Herbal Leaf Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Leaf className="w-96 h-96 text-emerald-accent transform rotate-12" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Title */}
          <div className="space-y-4">
            <motion.h1
              className="font-noto-sinhala text-5xl md:text-7xl font-bold text-rich-gold drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              සන්ධි වේදනාහරණී
            </motion.h1>
            
            <motion.h2
              className="font-cinzel text-3xl md:text-5xl font-semibold text-soft-ivory"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Sandhi Wedanaharanie
            </motion.h2>
          </div>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-soft-ivory text-opacity-90 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Natural Relief, Local Tradition
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-soft-ivory text-opacity-70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Experience the ancient wisdom of Ayurveda with our premium herbal formulation, 
            crafted for natural joint pain relief and wellness.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {/* Primary CTA */}
            <motion.button
              onClick={onOrderNow}
              className="floating-orb gold-glow text-dark-charcoal font-semibold text-lg px-8 py-4 w-auto h-auto animate-glow"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Order Now
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              onClick={onLearnMore}
              className="glass-panel-light px-8 py-4 text-soft-ivory font-medium hover:text-rich-gold transition-colors duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12 text-sm text-soft-ivory text-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-accent" />
              <span>100% Natural Ingredients</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-accent" />
              <span>Free Delivery Islandwide</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-accent" />
              <span>Trusted by Thousands</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-rich-gold rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;