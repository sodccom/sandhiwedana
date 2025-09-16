import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RefundPolicy: React.FC = () => {
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
              <RefreshCw className="w-8 h-8 text-dark-charcoal" />
            </div>
            <h1 className="text-4xl font-cinzel font-bold text-rich-gold mb-2">Refund Policy</h1>
            <p className="font-noto-sinhala text-xl text-soft-ivory text-opacity-80">ආපසු ගෙවීම් ප්‍රතිපත්තිය</p>
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
              <RefreshCw className="w-6 h-6" />
              Our Commitment
            </h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                At Sandhi Wedanaharanie, we are committed to your satisfaction. We understand that sometimes products 
                may not meet your expectations, and we have established this refund policy to ensure a fair and 
                transparent process for all our customers.
              </p>
              <p>
                This policy outlines the conditions under which refunds are available and the process to request them.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Eligible for Refund
            </h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>You are eligible for a full refund in the following cases:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Damaged Products:</strong> If you receive a product that is physically damaged during shipping</li>
                <li><strong>Wrong Product:</strong> If you receive a different product than what you ordered</li>
                <li><strong>Defective Products:</strong> If the product has manufacturing defects or quality issues</li>
                <li><strong>Non-Delivery:</strong> If your order was not delivered within 10 business days of the expected delivery date</li>
                <li><strong>Duplicate Charges:</strong> If you were charged multiple times for the same order</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6" />
              Not Eligible for Refund
            </h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>Refunds are not available in the following situations:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Change of Mind:</strong> If you simply change your mind about the purchase</li>
                <li><strong>Used Products:</strong> Products that have been opened, used, or consumed</li>
                <li><strong>Delayed Claims:</strong> Refund requests made more than 7 days after delivery</li>
                <li><strong>Incorrect Address:</strong> If delivery failed due to incorrect address provided by customer</li>
                <li><strong>Refused Delivery:</strong> If you refused to accept the delivery without valid reason</li>
                <li><strong>Natural Variations:</strong> Minor variations in color, taste, or texture that are natural to herbal products</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Refund Process & Timeline
            </h2>
            <div className="space-y-6 text-soft-ivory text-opacity-80">
              <div>
                <h3 className="text-lg font-semibold text-rich-gold mb-2">Step 1: Contact Us (Within 7 Days)</h3>
                <p>Contact our customer service team within 7 days of receiving your order:</p>
                <div className="glass-panel-light p-4 mt-2 space-y-1">
                  <p><strong>WhatsApp:</strong> +94 XXX XXX XXX</p>
                  <p><strong>Email:</strong> refunds@sandhiwedanaharanie.lk</p>
                  <p><strong>Phone:</strong> +94 XXX XXX XXX</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-rich-gold mb-2">Step 2: Provide Information</h3>
                <p>Please provide the following information:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Order number</li>
                  <li>Reason for refund request</li>
                  <li>Photos of the product (if damaged or defective)</li>
                  <li>Your contact information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-rich-gold mb-2">Step 3: Review Process (1-3 Business Days)</h3>
                <p>Our team will review your request and may contact you for additional information if needed.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-rich-gold mb-2">Step 4: Refund Processing (5-10 Business Days)</h3>
                <p>Once approved, refunds will be processed according to your original payment method:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li><strong>Cash on Delivery:</strong> Bank transfer to your account</li>
                  <li><strong>Bank Transfer:</strong> Refund to the same account</li>
                  <li><strong>Online Payment:</strong> Refund to original payment method</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Partial Refunds</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>In some cases, partial refunds may be offered:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Products with minor defects that don't affect functionality</li>
                <li>Products returned without original packaging</li>
                <li>Products that show signs of use but have valid quality concerns</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Return Shipping</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>For eligible returns:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We will arrange pickup at no cost to you for damaged or defective products</li>
                <li>Original packaging and all accessories must be included</li>
                <li>Products must be in their original condition</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Important Notes
            </h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Refunds will be processed in the same currency as the original purchase</li>
                <li>Bank charges, if any, will be deducted from the refund amount</li>
                <li>We reserve the right to refuse refunds that don't meet our policy criteria</li>
                <li>This policy may be updated from time to time; the latest version will always be available on our website</li>
                <li>For international orders, additional terms may apply</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-cinzel font-semibold text-rich-gold mb-4">Customer Satisfaction Guarantee</h2>
            <div className="space-y-4 text-soft-ivory text-opacity-80">
              <p>
                While we have specific conditions for refunds, we are committed to customer satisfaction. 
                If you have concerns about our products or services that don't fall under this policy, 
                please contact us directly. We will work with you to find a satisfactory solution.
              </p>
              <div className="glass-panel-light p-4 space-y-2">
                <p><strong>Customer Service Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM</p>
                <p><strong>Response Time:</strong> Within 24 hours</p>
                <p><strong>Languages:</strong> Sinhala, English</p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicy;