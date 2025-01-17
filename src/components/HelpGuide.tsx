import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const tips = [
  {
    title: "Starting Your Tree",
    content: "Begin with a simple yes/no question that helps divide your items into two groups."
  },
  {
    title: "Adding Questions",
    content: "Each new question should help narrow down the possibilities. Think about what makes items different from each other."
  },
  {
    title: "Finding Answers",
    content: "When you can identify exactly what something is, you've reached an answer! Add it as a final result."
  },
  {
    title: "Testing Your Tree",
    content: "Try following your tree with different examples to make sure it works correctly."
  }
];

export default function HelpGuide() {
  const [showTips, setShowTips] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  return (
    <div className="fixed bottom-4 right-4">
      <Button
        variant="outline"
        onClick={() => setShowTips(!showTips)}
        className="rounded-full"
      >
        {showTips ? "Hide Help" : "Need Help? 🤔"}
      </Button>

      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full right-0 mb-4 w-80 bg-white rounded-lg shadow-lg p-4"
          >
            <h3 className="font-bold mb-2">{tips[currentTip].title}</h3>
            <p className="text-sm mb-4">{tips[currentTip].content}</p>
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentTip(prev => (prev - 1 + tips.length) % tips.length)}
              >
                Previous Tip
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentTip(prev => (prev + 1) % tips.length)}
              >
                Next Tip
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 