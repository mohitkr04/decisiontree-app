import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Dr. Rajat Dandekar',
    role: 'Teacher',
    content: 'This platform makes learning decision trees fun and engaging for students. The interactive games and visual examples are perfect for young learners!',
    avatar: '👩‍🏫'
  },
  {
    name: 'Dr. Sreedath Panat',
    role: 'Teacher',
    content: 'It is a amazing platform that makes learning decision trees fun and engaging for students.',
    avatar: '👩‍🏫'
  },
  {
    name: 'Mohit Kumar',
    role: 'Student',
    content: 'I love the games and quizzes! They helped me understand decision trees in a way that textbooks never could.',
    avatar: '👨‍🎓'
  },
  {
    name: 'Lisa Wang',
    role: 'Parent',
    content: 'The progress tracking and achievements keep my child motivated. Its amazing to see them learn while having fun!',
    avatar: '👩‍👦'
  },
  {
    name: 'Dr. Raj Dandekar',
    role: 'Education Specialist',
    content: 'A comprehensive learning tool that perfectly balances education and entertainment. The video lessons are particularly well-crafted.',
    avatar: '👨‍💼'
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-400">
            Join thousands of satisfied learners on their journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900 p-6 rounded-xl"
            >
              <div className="text-3xl mb-4">{testimonial.avatar}</div>
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