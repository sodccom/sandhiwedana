import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
              <Shield className="w-8 h-8 text-dark-charcoal" />
            </div>
            <h1 className="text-4xl font-cinzel font-bold text-rich-gold mb-2">Privacy Policy</h1>
            <p className="font-noto-sinhala text-xl text-soft-ivory text-opacity-80">පෞද්ගලිකත්ව ප්‍රතිපත්තිය</p>
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
              <Eye className="w-6 h-6" />
              Information We Collect
            </h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                At Sandhi Wedanaharanie, we collect information to provide you with the best possible service and products. 
                The information we collect includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Personal Information:</strong> Name, phone number, email address, and delivery address when you place an order</li>
                <li><strong>Order Information:</strong> Products purchased, quantities, payment method, and delivery preferences</li>
                <li><strong>Communication Data:</strong> Messages sent through our contact forms, chat system, or customer support</li>
                <li><strong>Usage Information:</strong> How you interact with our website, pages visited, and time spent</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              How We Use Your Information
            </h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Processing and fulfilling your orders</li>
                <li>Communicating with you about your orders and delivery status</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Improving our products and services</li>
                <li>Sending promotional offers and updates (with your consent)</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Data Protection</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Secure data transmission using SSL encryption</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure storage of customer data</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Information Sharing</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With delivery partners to fulfill your orders</li>
                <li>With payment processors to handle transactions</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights, property, or safety</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Your Rights</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>File a complaint with relevant authorities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6" />
              Contact Us
            </h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                If you have any questions about this Privacy Policy or how we handle your personal information, 
                please contact us:
              </p>
              <div className="glass-panel-light p-4 space-y-2">
                <p><strong>Email:</strong> privacy@sandhiwedanaharanie.lk</p>
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

export default PrivacyPolicy;