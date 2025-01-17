import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { DecisionNode } from '../../types/index';

export default function InteractiveTreeBuilder() {
  const [currentNode, setCurrentNode] = useState<DecisionNode>({
    question: "Is it raining outside?",
    yesNode: {
      question: "Do you have an umbrella?",
      yesNode: { outcome: "Take the umbrella and go out!" },
      noNode: { outcome: "Better stay inside!" }
    },
    noNode: {
      question: "Is it sunny?",
      yesNode: { outcome: "Don't forget sunscreen!" },
      noNode: { outcome: "Enjoy your walk!" }
    }
  });

  const [path, setPath] = useState<string[]>([]);

  const handleDecision = (choice: 'yes' | 'no') => {
    const nextNode = choice === 'yes' ? currentNode.yesNode : currentNode.noNode;
    if (nextNode) {
      setPath([...path, choice]);
      setCurrentNode(nextNode);
      
      if (nextNode.outcome) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode.question || currentNode.outcome}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            {currentNode.outcome ? (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-green-600">
                  🎉 Decision Made! 🎉
                </h3>
                <p className="text-xl text-gray-700">{currentNode.outcome}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg mt-4"
                  onClick={() => {
                    setPath([]);
                    setCurrentNode({
                      question: "Is it raining outside?",
                      yesNode: {
                        question: "Do you have an umbrella?",
                        yesNode: { outcome: "Take the umbrella and go out!" },
                        noNode: { outcome: "Better stay inside!" }
                      },
                      noNode: {
                        question: "Is it sunny?",
                        yesNode: { outcome: "Don't forget sunscreen!" },
                        noNode: { outcome: "Enjoy your walk!" }
                      }
                    });
                  }}
                >
                  Try Again
                </motion.button>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-600">
                  {currentNode.question}
                </h3>
                <div className="flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg"
                    onClick={() => handleDecision('yes')}
                  >
                    Yes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg"
                    onClick={() => handleDecision('no')}
                  >
                    No
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 