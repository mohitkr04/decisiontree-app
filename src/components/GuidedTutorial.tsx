import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const tutorialSteps = [
  {
    title: "Welcome to Decision Trees! 👋",
    content: "Let's learn how to make decisions step by step using a tree structure.",
    image: "/tutorial/welcome.png"
  },
  {
    title: "Start with a Question 🤔",
    content: "Begin by asking a yes/no question that helps separate your items into two groups.",
    image: "/tutorial/question.png"
  },
  {
    title: "Add More Questions 🌳",
    content: "Keep adding questions until you can identify specific items. Each question should help narrow down the possibilities.",
    image: "/tutorial/build.png"
  },
  {
    title: "Reach Your Answer! ⭐",
    content: "When you can identify exactly what something is, you've reached an answer! Add it as a final result.",
    image: "/tutorial/result.png"
  }
];

export default function GuidedTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowTutorial(false);
      localStorage.setItem('tutorialCompleted', 'true');
    }
  };

  if (!showTutorial) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {tutorialSteps[currentStep].title}
            </h2>
            <p className="text-muted-foreground">
              {tutorialSteps[currentStep].content}
            </p>
          </div>

          <div className="mb-6">
            <img
              src={tutorialSteps[currentStep].image}
              alt={`Tutorial step ${currentStep + 1}`}
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {tutorialSteps.length}
            </span>
            <Button onClick={handleNext}>
              {currentStep === tutorialSteps.length - 1 ? "Get Started!" : "Next"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 