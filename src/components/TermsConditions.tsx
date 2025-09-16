import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsConditions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-charcoal to-dark-charcoal-light py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-soft-ivory hover:text-rich-gold transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-rich-gold to-deep-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-dark-charcoal" />
            </div>
            <h1 className="text-4xl font-cinzel font-bold text-rich-gold mb-2">Terms & Conditions</h1>
            <p className="font-noto-sinhala text-xl text-soft-ivory text-opacity-80">නියම සහ කොන්දේසි</p>
            <p className="text-soft-ivory text-opacity-60 mt-2">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          className="glass-panel p-8 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6" />
              Agreement to Terms
            </h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                By accessing and using the Sandhi Wedanaharanie website and services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                These terms apply to all visitors, users, and others who access or use our service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Product Information</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                Sandhi Wedanaharanie is a traditional Ayurvedic medicine formulated for joint pain relief. 
                By purchasing our products, you acknowledge that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our products are traditional herbal remedies and are not intended to diagnose, treat, cure, or prevent any disease</li>
                <li>Results may vary from person to person</li>
                <li>You should consult with a healthcare professional before use, especially if you have medical conditions</li>
                <li>Product information is provided for educational purposes only</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Orders and Payment
            </h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>When you place an order with us:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All orders are subject to availability and confirmation of the order price</li>
                <li>We reserve the right to refuse or cancel any order for any reason</li>
                <li>Payment must be made in full before dispatch (except for Cash on Delivery orders)</li>
                <li>Prices are subject to change without notice</li>
                <li>We accept Cash on Delivery, Bank Transfer, and Online Payments</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Delivery Terms</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>Our delivery terms include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Free delivery anywhere in Sri Lanka</li>
                <li>Delivery time: 2-5 business days</li>
                <li>We are not responsible for delays caused by courier services or external factors</li>
                <li>You must provide accurate delivery information</li>
                <li>Risk of loss passes to you upon delivery</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Product Quality and Returns</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>We are committed to providing high-quality products:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All products are manufactured following traditional Ayurvedic practices</li>
                <li>We use only natural, high-quality ingredients</li>
                <li>Products are subject to quality control before dispatch</li>
                <li>Returns are accepted only for damaged or defective products</li>
                <li>Please refer to our Refund Policy for detailed return procedures</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Limitation of Liability
            </h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                To the fullest extent permitted by law, Sandhi Wedanaharanie shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses.
              </p>
              <p>
                Our total liability to you for all claims arising from or relating to our products or services 
                shall not exceed the amount you paid for the specific product or service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Intellectual Property</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                The content, organization, graphics, design, compilation, magnetic translation, digital conversion, 
                and other matters related to the site are protected under applicable copyrights, trademarks, and other proprietary rights.
              </p>
              <p>
                You may not reproduce, distribute, or create derivative works from our content without express written permission.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Governing Law</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of Sri Lanka. 
                Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Contact Information</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="glass-panel-light p-4 space-y-2">
                <p><strong>Email:</strong> legal@sandhiwedanaharanie.lk</p>
                <p><strong>Phone:</strong> +94 XXX XXX XXX</p>
                <p><strong>Address:</strong> Colombo, Sri Lanka</p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditions;