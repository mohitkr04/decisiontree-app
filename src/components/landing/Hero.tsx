import { motion } from 'framer-motion';
import { useState } from 'react';
import SignInModal from '../auth/SignInModal';

export default function Hero() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-900 opacity-90" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Decision Trees
            <span className="text-blue-400"> Application</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Your exciting journey into the world of decision trees starts here! 
            Perfect for curious minds aged 10-14 years! 🚀
          </p>

          {/* Interactive CTA buttons */}
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
              onClick={() => setIsSignInOpen(true)}
            >
              Get Started
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-6 py-3 rounded-lg text-lg font-semibold"
            >
              View Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"
        />
      </div>

      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
      />
    </section>
  );
} 