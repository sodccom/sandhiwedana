import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, ExternalLink } from 'lucide-react';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! Welcome to Sandhi Wedanaharanie. How can I help you today?',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    { label: 'Order Now - ₨3800, free delivery', action: 'order' },
    { label: 'How long does delivery take?', action: 'delivery' },
    { label: 'Track my order', action: 'track' },
    { label: 'Product information', action: 'product' },
    { label: 'Contact support', action: 'support' },
  ];

  const handleQuickReply = (action: string, label: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: label,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      let botResponse = '';
      
      switch (action) {
        case 'order':
          botResponse = 'Great choice! Our Sandhi Wedanaharanie is ₨3800 with free delivery across Sri Lanka. Would you like to place an order now?';
          break;
        case 'delivery':
          botResponse = 'Delivery across Sri Lanka takes 2-5 business days. We offer free delivery to all areas. You\'ll receive tracking information once your order ships.';
          break;
        case 'track':
          botResponse = 'Please provide your order number and I\'ll help you track your order. You can find it in your confirmation email or SMS.';
          break;
        case 'product':
          botResponse = 'Sandhi Wedanaharanie is a premium Ayurvedic formulation for natural joint pain relief. It\'s made with 100% natural ingredients following traditional recipes.';
          break;
        case 'support':
          botResponse = 'You can reach our support team via WhatsApp at +94 XXX XXX XXX or email us at info@sandhiwedanaharanie.lk. We\'re here to help!';
          break;
        default:
          botResponse = 'I\'m here to help! Please let me know what you\'d like to know about our products or services.';
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simple bot response logic
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: 'Thank you for your message! Our team will respond shortly. For immediate assistance, please use the quick replies above or contact us directly.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Bot Orb */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 floating-orb gold-glow z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-dark-charcoal" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-24 right-6 w-80 h-96 z-50"
          >
            <div className="glass-panel h-full flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-rich-gold border-opacity-20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rich-gold to-deep-gold flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-dark-charcoal" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-rich-gold">Support Assistant</h3>
                      <p className="text-xs text-soft-ivory text-opacity-70">Online now</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full hover:bg-rich-gold hover:bg-opacity-20 transition-colors duration-200"
                  >
                    <X className="w-4 h-4 text-soft-ivory" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-rich-gold text-dark-charcoal'
                          : 'glass-panel-light text-soft-ivory'
                      }`}
                    >
                      {message.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Replies */}
              <div className="p-4 border-t border-rich-gold border-opacity-20">
                <div className="grid grid-cols-1 gap-2 mb-3">
                  {quickReplies.slice(0, 3).map((reply) => (
                    <button
                      key={reply.action}
                      onClick={() => handleQuickReply(reply.action, reply.label)}
                      className="text-xs p-2 glass-panel-light text-soft-ivory hover:text-rich-gold transition-colors duration-200 text-left"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 text-sm glass-panel-light text-soft-ivory placeholder-soft-ivory placeholder-opacity-50 outline-none focus:ring-2 focus:ring-rich-gold focus:ring-opacity-50"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-rich-gold text-dark-charcoal rounded-lg hover:bg-deep-gold transition-colors duration-200"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;