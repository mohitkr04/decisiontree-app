import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Card } from './card';

interface TutorialStep {
  title: string;
  content: string;
  image?: string;
  action?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome to Decision Tree Builder!",
    content: "Learn how to create decision trees by answering simple yes/no questions.",
    action: "Next"
  },
  {
    title: "Start with a Question",
    content: "Drag a Question Node from the palette to start building your tree.",
    action: "Got it"
  },
  {
    title: "Connect Your Nodes",
    content: "Use the Yes/No buttons to connect nodes and create paths.",
    action: "Continue"
  },
  {
    title: "Add Results",
    content: "Add Result Nodes to show the final classifications.",
    action: "Let's Start!"
  }
];

interface InteractiveTutorialProps {
  onClose: () => void;
}

export function InteractiveTutorial({ onClose }: InteractiveTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <Card className="w-full max-w-md p-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold">
                {tutorialSteps[currentStep].title}
              </h3>
              <p className="text-muted-foreground">
                {tutorialSteps[currentStep].content}
              </p>
              {tutorialSteps[currentStep].image && (
                <img
                  src={tutorialSteps[currentStep].image}
                  alt="Tutorial step"
                  className="rounded-lg border"
                />
              )}
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentStep
                          ? 'bg-primary'
                          : 'bg-primary/20'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Skip
                  </Button>
                  <Button onClick={handleNext}>
                    {tutorialSteps[currentStep].action}
                  </Button>
                </div>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 