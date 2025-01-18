import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';

interface TutorialStep {
  title: string;
  content: string;
  animation: 'wave' | 'drag' | 'connect' | 'complete';
}

interface InteractiveTutorialProps {
  onClose: () => void;
}

export function InteractiveTutorial({ onClose }: InteractiveTutorialProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const steps: TutorialStep[] = [
    {
      title: "Welcome to Decision Tree Builder! 🌟",
      content: "Let's learn how to make awesome decision trees together!",
      animation: "wave"
    },
    {
      title: "Start with Questions 🤔",
      content: "Drag a Question Box from the Magic Boxes to start. These are like magic circles that help us make decisions!",
      animation: "drag"
    },
    {
      title: "Connect with Yes/No! 👍👎",
      content: "Click Yes or No buttons to connect your questions. It's like building a path through your decisions!",
      animation: "connect"
    },
    {
      title: "Find the Answer! 🎯",
      content: "End your paths with Answer Boxes to show what decision you made. It's like reaching the end of a treasure map!",
      animation: "complete"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl p-8 max-w-md">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          <h3 className="text-2xl font-bold">{steps[step - 1].title}</h3>
          <p className="text-gray-600">{steps[step - 1].content}</p>
          
          <div className="h-40 flex items-center justify-center">
            {/* Add fun animations for each step */}
            <motion.div
              animate={steps[step - 1].animation === "wave" ? {
                rotate: [0, 10, -10, 10, 0],
                transition: { repeat: Infinity, duration: 2 }
              } : {}}
              className="text-6xl"
            >
              {step === 1 && "👋"}
              {step === 2 && "🔄"}
              {step === 3 && "🔗"}
              {step === 4 && "⭐"}
            </motion.div>
          </div>

          <div className="flex justify-between items-center">
            <div className="space-x-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  className={`inline-block w-2 h-2 rounded-full ${
                    i + 1 === step ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="space-x-2">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(s => s - 1)}
                >
                  Back
                </Button>
              )}
              {step < totalSteps ? (
                <Button onClick={() => setStep(s => s + 1)}>
                  Next
                </Button>
              ) : (
                <Button onClick={onClose}>
                  Let's Start! 🚀
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 