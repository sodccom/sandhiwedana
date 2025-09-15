import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Zap, CheckCircle } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Heart,
      title: 'Joint Pain Relief',
      titleSi: 'සන්ධි වේදනා සහන',
      description: 'Natural relief from joint pain and stiffness without side effects',
      features: ['Reduces inflammation', 'Improves mobility', 'Long-lasting relief']
    },
    {
      icon: Shield,
      title: 'Anti-Inflammatory',
      titleSi: 'ප්‍රති ගිනි අවුලුව',
      description: 'Powerful anti-inflammatory properties to reduce swelling and discomfort',
      features: ['Natural ingredients', 'No harmful chemicals', 'Gentle on stomach']
    },
    {
      icon: Zap,
      title: 'Enhanced Mobility',
      titleSi: 'වැඩි සංචලතාව',
      description: 'Improve your range of motion and daily activities',
      features: ['Better flexibility', 'Increased strength', 'Active lifestyle']
    },
  ];

  return (
    <section id="benefits" className="py-20 px-6 bg-gradient-to-b from-dark-charcoal-light to-dark-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-cinzel font-bold text-rich-gold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Health Benefits
          </motion.h2>
          <motion.p
            className="font-noto-sinhala text-xl text-soft-ivory text-opacity-80 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            සෞඛ්‍ය ප්‍රතිලාභ
          </motion.p>
          <motion.p
            className="text-lg text-soft-ivory text-opacity-70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Experience the transformative power of our carefully formulated Ayurvedic remedy, 
            designed to provide comprehensive joint health support.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="glass-panel p-8 text-center hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-rich-gold to-deep-gold rounded-full flex items-center justify-center mx-auto gold-glow">
                  <benefit.icon className="w-10 h-10 text-dark-charcoal" />
                </div>
              </div>

              <h3 className="text-2xl font-cinzel font-semibold text-rich-gold mb-2">
                {benefit.title}
              </h3>
              <p className="font-noto-sinhala text-soft-ivory text-opacity-80 mb-4">
                {benefit.titleSi}
              </p>
              <p className="text-soft-ivory text-opacity-70 leading-relaxed mb-6">
                {benefit.description}
              </p>

              <div className="space-y-3">
                {benefit.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-accent flex-shrink-0" />
                    <span className="text-soft-ivory text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clinical Evidence */}
        <motion.div
          className="glass-panel p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-rich-gold mb-2">98%</div>
              <p className="text-soft-ivory text-opacity-70">Customer Satisfaction</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-rich-gold mb-2">7 Days</div>
              <p className="text-soft-ivory text-opacity-70">Average Relief Time</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-rich-gold mb-2">5000+</div>
              <p className="text-soft-ivory text-opacity-70">Happy Customers</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;