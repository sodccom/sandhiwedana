import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Users, Clock } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      titleSi: 'ස්වභාවික අමුද්‍රව්‍ය',
      description: 'Carefully selected herbs following traditional Ayurvedic principles',
    },
    {
      icon: Award,
      title: 'Proven Results',
      titleSi: 'ඔප්පු වූ ප්‍රතිඵල',
      description: 'Thousands of satisfied customers across Sri Lanka',
    },
    {
      icon: Users,
      title: 'Expert Formulation',
      titleSi: 'විශේෂඥ සැකසුම',
      description: 'Developed by experienced Ayurvedic practitioners',
    },
    {
      icon: Clock,
      title: 'Time-Tested',
      titleSi: 'කාල පරීක්ෂාවට ලක් වූ',
      description: 'Based on centuries-old traditional knowledge',
    },
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-cinzel font-bold text-rich-gold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            About Our Heritage
          </motion.h2>
          <motion.p
            className="font-noto-sinhala text-xl text-soft-ivory text-opacity-80 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            අපගේ උරුමය ගැන
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">
                Ancient Wisdom, Modern Solutions
              </h3>
              <p className="text-soft-ivory text-opacity-80 leading-relaxed mb-4">
                Sandhi Wedanaharanie represents the perfect fusion of traditional Ayurvedic knowledge 
                and modern understanding of natural healing. Our formulation has been carefully crafted 
                using time-honored recipes passed down through generations of Ayurvedic practitioners.
              </p>
              <p className="text-soft-ivory text-opacity-80 leading-relaxed">
                Each ingredient is sourced locally from Sri Lankan farms, ensuring the highest quality 
                and supporting our local agricultural community. We believe in the power of nature to 
                heal and restore balance to the body.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-panel p-2">
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Ayurvedic herbs and preparation"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-panel p-6 text-center hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">
                <feature.icon className="w-12 h-12 text-rich-gold mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-soft-ivory mb-2">
                {feature.title}
              </h3>
              <p className="font-noto-sinhala text-soft-ivory text-opacity-70 text-sm mb-3">
                {feature.titleSi}
              </p>
              <p className="text-soft-ivory text-opacity-60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;