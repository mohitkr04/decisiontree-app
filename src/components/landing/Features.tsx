import { motion } from 'framer-motion';

const features = [
  {
    title: 'Interactive Builder',
    description: 'Drag and drop interface for building decision trees',
    icon: '🎯'
  },
  {
    title: 'Real-time Preview',
    description: 'See your changes instantly as you build',
    icon: '👁️'
  },
  {
    title: 'Export Options',
    description: 'Export your trees in multiple formats',
    icon: '📤'
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400">
            Everything you need to build and manage decision trees
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-xl cursor-pointer"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 