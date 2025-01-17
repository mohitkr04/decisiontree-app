import { useState } from 'react';
import { motion } from 'framer-motion';
import AppBar from '../components/layout/AppBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useToast } from "../components/ui/use-toast"

interface ExampleTree {
  id: string;
  title: string;
  description: string;
  nodes: TreeNode[];
  currentStep: number;
}

interface TreeNode {
  id: string;
  question: string;
  yesPath?: string;
  noPath?: string;
  isLeaf?: boolean;
  result?: string;
  hint?: string;
}

const animalClassification: ExampleTree = {
  id: "animals",
  title: "Animal Classification",
  description: "Let's classify different animals based on their features!",
  currentStep: 0,
  nodes: [
    {
      id: "root",
      question: "Is the animal gray?",
      yesPath: "gray",
      noPath: "not-gray",
      hint: "Look at the color of the animal's body"
    },
    {
      id: "gray",
      question: "Is it tall?",
      yesPath: "elephant",
      noPath: "otter",
      hint: "Compare its height to other animals"
    },
    {
      id: "not-gray",
      question: "Does it have two legs?",
      yesPath: "chick",
      noPath: "giraffe",
      hint: "Count the number of legs"
    },
    {
      id: "elephant",
      question: "It's an elephant!",
      isLeaf: true,
      result: "Elephants are large gray mammals known for their long trunks."
    },
    // Add more nodes for other animals...
  ]
};

const clothingClassification: ExampleTree = {
  id: "clothing",
  title: "Clothing Classification",
  description: "Help organize different types of clothing!",
  currentStep: 0,
  nodes: [
    {
      id: "root",
      question: "Is it worn on your upper body?",
      yesPath: "upper",
      noPath: "lower",
      hint: "Think about where on your body you wear this item"
    },
    // Add more nodes...
  ]
};

const pastaClassification: ExampleTree = {
  id: "pasta",
  title: "PastaLand",
  description: "Let's classify different types of pasta based on their characteristics!",
  currentStep: 0,
  nodes: [
    {
      id: "root",
      question: "Is the pasta small?",
      yesPath: "small",
      noPath: "large",
      hint: "Compare the size to a regular penne pasta"
    },
    {
      id: "small",
      question: "Is it shaped like a grain?",
      yesPath: "orzo",
      noPath: "stars",
      hint: "Look at the overall shape"
    },
    {
      id: "large",
      question: "Is it tube-shaped?",
      yesPath: "tube",
      noPath: "flat",
      hint: "Check if it has a hollow center"
    },
    {
      id: "orzo",
      question: "It's Orzo!",
      isLeaf: true,
      result: "Orzo is a small pasta shaped like a grain of rice."
    },
    // Add more pasta nodes...
  ]
};

export default function Examples() {
  const { toast } = useToast();
  console.log('Examples component rendering');
  const [activeExample, setActiveExample] = useState<ExampleTree | null>(null);
  const [currentNode, setCurrentNode] = useState<string>('root');

  const handleStartExample = (example: ExampleTree) => {
    setActiveExample(example);
    setCurrentNode('root');
    toast({
      title: "Let's begin!",
      description: "Follow the questions to build your decision tree.",
    });
  };

  const handleAnswer = (answer: 'yes' | 'no') => {
    if (!activeExample) return;
    
    const node = activeExample.nodes.find(n => n.id === currentNode);
    if (!node) return;

    const nextNodeId = answer === 'yes' ? node.yesPath : node.noPath;
    if (!nextNodeId) return;

    setCurrentNode(nextNodeId);
    const nextNode = activeExample.nodes.find(n => n.id === nextNodeId);
    
    if (nextNode?.isLeaf) {
      toast({
        title: "Congratulations! 🎉",
        description: "You've reached a conclusion!",
      });
    } else {
      toast({
        title: "Good choice!",
        description: node.hint,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppBar />
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Interactive Decision Trees</h1>
              <p className="text-muted-foreground mt-2">Learn by exploring examples!</p>
            </div>
          </div>

          {!activeExample ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[pastaClassification, animalClassification, clothingClassification].map((example) => (
                <motion.div
                  key={example.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="p-6 cursor-pointer" onClick={() => handleStartExample(example)}>
                    <h2 className="text-2xl font-semibold mb-2">{example.title}</h2>
                    <p className="text-muted-foreground">{example.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-4">
                    {activeExample.nodes.find(n => n.id === currentNode)?.question}
                  </h2>
                  
                  {!activeExample.nodes.find(n => n.id === currentNode)?.isLeaf && (
                    <div className="flex justify-center gap-4">
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                          variant="default"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleAnswer('yes')}
                        >
                          Yes
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                          variant="default"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleAnswer('no')}
                        >
                          No
                        </Button>
                      </motion.div>
                    </div>
                  )}
                  
                  {activeExample.nodes.find(n => n.id === currentNode)?.isLeaf && (
                    <div className="mt-4">
                      <p className="text-lg">
                        {activeExample.nodes.find(n => n.id === currentNode)?.result}
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => setActiveExample(null)}
                      >
                        Try Another Example
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}