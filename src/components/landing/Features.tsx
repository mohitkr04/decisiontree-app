import { motion, useAnimationControls } from 'framer-motion';
import { useState, useEffect } from 'react';

const features = [
  {
    title: 'Interactive Learning',
    description: 'Learn through fun games and visual examples with our interactive builder and real-time preview',
    icon: '🎮',
    details: 'Play games like Decision Snake and take quizzes to master concepts!'
  },
  {
    title: 'Video Lessons',
    description: 'Watch engaging video tutorials about decision trees with step-by-step guidance',
    icon: '🎥',
    details: 'Learn from carefully selected YouTube playlists and tutorials'
  },
  {
    title: 'Progress Tracking',
    description: 'Track your journey with cool progress bars and earn achievements as you learn',
    icon: '📊',
    details: 'See your growth and stay motivated'
  },
  {
    title: 'Real Examples',
    description: 'Explore interactive decision trees about daily life, games, and health scenarios',
    icon: '🌟',
    details: 'See how decisions work in real-world situations'
  },
  {
    title: 'Export Options',
    description: 'Export your decision trees in multiple formats for sharing and presentation',
    icon: '📤',
    details: 'Share your work easily with others'
  },
  {
    title: 'Fun Challenges',
    description: 'Test your knowledge with interactive quizzes and earn points',
    icon: '🎯',
    details: 'Compete with friends and learn from mistakes'
  }
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoScrollIndex, setAutoScrollIndex] = useState(0);
  const controls = useAnimationControls();

  // Auto-scroll animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoScrollIndex((prev) => (prev + 1) % features.length);
    }, 3000); // Change feature every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Animate scroll position when autoScrollIndex changes
  useEffect(() => {
    if (!hoveredIndex) {
      controls.start({
        x: `${-autoScrollIndex * 340}px`, // Adjust based on card width + gap
        transition: { duration: 0.8, ease: "easeInOut" }
      });
    }
  }, [autoScrollIndex, hoveredIndex, controls]);

  return (
    <section className="py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400">
            Everything you need to learn and master decision trees
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div 
            className="flex space-x-6"
            animate={controls}
            initial={{ x: 0 }}
            style={{ width: 'fit-content' }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-80"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: hoveredIndex === index || (!hoveredIndex && autoScrollIndex === index) ? 1.05 : 1,
                  filter: hoveredIndex !== null && hoveredIndex !== index 
                    ? 'blur(2px)' 
                    : (!hoveredIndex && autoScrollIndex !== index)
                    ? 'blur(1px)'
                    : 'none'
                }}
                transition={{ 
                  duration: 0.3,
                  scale: { type: "spring", stiffness: 300 }
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div className="bg-gray-800 p-6 rounded-xl h-full transform transition-all duration-300">
                  <motion.div 
                    className="text-3xl mb-3"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: autoScrollIndex === index ? 1 : 0
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-2">{feature.description}</p>
                  <p className="text-sm text-blue-400">{feature.details}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none" />
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {features.map((_, index) => (
            <motion.button
              key={index}
              className="w-2 h-2 rounded-full bg-gray-600"
              animate={{
                scale: autoScrollIndex === index ? 1.5 : 1,
                backgroundColor: autoScrollIndex === index ? "#3B82F6" : "#4B5563"
              }}
              onClick={() => setAutoScrollIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 