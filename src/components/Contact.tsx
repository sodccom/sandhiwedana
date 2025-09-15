import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      titleSi: 'දුරකථනය',
      info: '+94 XXX XXX XXX',
      action: 'tel:+94XXXXXXXXX'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      titleSi: 'වට්සැප්',
      info: '+94 XXX XXX XXX',
      action: 'https://wa.me/94XXXXXXXXX'
    },
    {
      icon: Mail,
      title: 'Email',
      titleSi: 'ඊමේල්',
      info: 'info@sandhiwedanaharanie.lk',
      action: 'mailto:info@sandhiwedanaharanie.lk'
    },
    {
      icon: MapPin,
      title: 'Location',
      titleSi: 'ස්ථානය',
      info: 'Colombo, Sri Lanka',
      action: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-dark-charcoal to-dark-charcoal-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-cinzel font-bold text-rich-gold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Contact Us
          </motion.h2>
          <motion.p
            className="font-noto-sinhala text-xl text-soft-ivory text-opacity-80 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            අප හා සම්බන්ධ වන්න
          </motion.p>
          <motion.p
            className="text-lg text-soft-ivory text-opacity-70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Have questions about our products or need assistance with your order? 
            We're here to help you on your journey to natural healing.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.action}
                  className="glass-panel p-6 text-center hover:shadow-2xl transition-all duration-300 block"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-rich-gold to-deep-gold rounded-full flex items-center justify-center mx-auto gold-glow">
                      <info.icon className="w-8 h-8 text-dark-charcoal" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-rich-gold mb-1">
                    {info.title}
                  </h3>
                  <p className="font-noto-sinhala text-soft-ivory text-opacity-70 text-sm mb-2">
                    {info.titleSi}
                  </p>
                  <p className="text-soft-ivory text-sm">
                    {info.info}
                  </p>
                </motion.a>
              ))}
            </div>

            {/* Quick Order Info */}
            <motion.div
              className="glass-panel p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">
                Quick Order Information
              </h3>
              <div className="space-y-3 text-soft-ivory text-opacity-80">
                <p>💰 <strong>Price:</strong> ₨3,800 per bottle</p>
                <p>🚚 <strong>Delivery:</strong> Free delivery anywhere in Sri Lanka</p>
                <p>⏰ <strong>Delivery Time:</strong> 2-5 business days</p>
                <p>💳 <strong>Payment:</strong> Cash on Delivery, Bank Transfer, or Online</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-cinzel font-semibold text-rich-gold mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-soft-ivory mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-soft-ivory mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                      placeholder="+94 XXX XXX XXX"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-soft-ivory mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-soft-ivory mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50 resize-vertical"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rich-gold to-deep-gold text-dark-charcoal font-semibold py-4 rounded-xl gold-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;