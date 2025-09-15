import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Jayawardena',
      nameSi: 'ප්‍රියා ජයවර්ධන',
      location: 'Colombo',
      rating: 5,
      text: 'After using Sandhi Wedanaharanie for just one week, my knee pain has significantly reduced. I can now walk without discomfort. Highly recommended!',
      textSi: 'සන්ධි වේදනාහරණී භාවිතා කර සතියකින් මගේ දණහිසේ වේදනාව සැලකිය යුතු ලෙස අඩු වී ඇත.',
    },
    {
      id: 2,
      name: 'Sunil Fernando',
      nameSi: 'සුනිල් ප්‍රනාන්දු',
      location: 'Kandy',
      rating: 5,
      text: 'Excellent product! My back pain has almost disappeared after 2 weeks of use. The natural ingredients give me confidence in its safety.',
      textSi: 'විශිෂ්ට නිෂ්පාදනයක්! සති 2ක භාවිතයෙන් පසු මගේ කොන්ද වේදනාව සම්පූර්ණයෙන්ම පාහේ අතුරුදහන් වී ඇත.',
    },
    {
      id: 3,
      name: 'Malini Silva',
      nameSi: 'මාලිනී සිල්වා',
      location: 'Galle',
      rating: 5,
      text: 'I was skeptical at first, but this medicine really works. My shoulder pain is gone and I feel much more energetic.',
      textSi: 'මුලදී සැක සංකා තිබුණත්, මෙම ඖෂධය ඇත්තෙන්ම ක්‍රියා කරයි. මගේ උරහිසේ වේදනාව අතුරුදහන් වී ඇත.',
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-cinzel font-bold text-rich-gold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Customer Stories
          </motion.h2>
          <motion.p
            className="font-noto-sinhala text-xl text-soft-ivory text-opacity-80 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            පාරිභෝගික කථා
          </motion.p>
          <motion.p
            className="text-lg text-soft-ivory text-opacity-70 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Hear from our satisfied customers who have experienced the healing power of our natural remedy.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="glass-panel p-8 hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-rich-gold opacity-50" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-rich-gold text-rich-gold"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-soft-ivory text-opacity-90 leading-relaxed mb-6 text-lg">
                "{testimonial.text}"
              </blockquote>

              {/* Sinhala Translation */}
              <div className="font-noto-sinhala text-soft-ivory text-opacity-70 text-sm mb-6 italic">
                "{testimonial.textSi}"
              </div>

              {/* Author */}
              <div className="border-t border-rich-gold border-opacity-20 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rich-gold to-deep-gold rounded-full flex items-center justify-center">
                    <span className="text-dark-charcoal font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-rich-gold">
                      {testimonial.name}
                    </h4>
                    <p className="font-noto-sinhala text-soft-ivory text-opacity-70 text-sm">
                      {testimonial.nameSi}
                    </p>
                    <p className="text-soft-ivory text-opacity-60 text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glass-panel p-8">
            <h3 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">
              Join Thousands of Satisfied Customers
            </h3>
            <p className="font-noto-sinhala text-soft-ivory text-opacity-80 mb-6">
              සෑම දිනකම සතුටට පත් වන පාරිභෝගිකයන් සහ සම්බන්ධ වන්න
            </p>
            <motion.button
              className="floating-orb gold-glow text-dark-charcoal font-semibold text-lg px-8 py-4 w-auto h-auto"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Your Relief Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;