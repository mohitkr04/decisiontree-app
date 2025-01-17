import { motion } from 'framer-motion';
import { useState } from 'react';

const IntroductionModule = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "What is a Decision Tree?",
      content: "A decision tree helps you make choices by asking simple Yes/No questions!",
      animation: "🤔",
      example: "Like choosing what to wear based on the weather!"
    },
    {
      title: "How Does it Work?",
      content: "Start with a question and follow the branches based on your answers.",
      animation: "🌳",
      example: "Is it raining? Yes → Take an umbrella, No → Leave umbrella at home"
    },
    {
      title: "Let's Try It!",
      content: "Ready to make your first decision tree?",
      animation: "🎯",
      example: "We'll help you create your very own decision tree!"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            {steps[currentStep].animation}
          </motion.div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            {steps[currentStep].title}
          </h2>
          <p className="text-xl text-gray-700 mb-4">
            {steps[currentStep].content}
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-lg text-blue-700">
              Example: {steps[currentStep].example}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
              } else {
                // Navigate to interactive tree builder
              }
            }}
          >
            {currentStep === steps.length - 1 ? "Start Building!" : "Next"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroductionModule; 