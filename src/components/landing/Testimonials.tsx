import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Data Scientist',
    content: 'This tool has revolutionized how we make decisions in our team.',
    avatar: '👩‍🔬'
  },
  {
    name: 'Mike Chen',
    role: 'Product Manager',
    content: 'Incredibly intuitive and powerful. A game-changer for our workflow.',
    avatar: '👨‍💼'
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-900 p-8 rounded-2xl"
            >
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
              <div className="text-white font-semibold">{testimonial.name}</div>
              <div className="text-blue-400">{testimonial.role}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 