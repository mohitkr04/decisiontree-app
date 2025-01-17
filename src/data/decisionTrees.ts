import { TreeNode } from '../types';

export interface DecisionTreeExample {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'food' | 'animals' | 'clothing' | 'nature';
  nodes: TreeNode[];
  hints: string[];
  learningObjectives: string[];
}

export const decisionTreeExamples: DecisionTreeExample[] = [
  {
    id: "pasta-classification",
    title: "PastaLand Explorer",
    description: "Learn to classify different types of pasta based on their features!",
    difficulty: "easy",
    category: "food",
    hints: [
      "Start by thinking about the size of pasta",
      "Consider the shape - is it long, short, or tiny?",
      "Think about whether it's hollow or solid"
    ],
    learningObjectives: [
      "Understand how to classify objects based on visible features",
      "Learn to ask yes/no questions effectively",
      "Practice making logical decisions"
    ],
    nodes: [
      {
        id: "root",
        question: "Is the pasta small?",
        hint: "Compare it to a regular penne pasta",
        position: { x: 400, y: 100 }
      },
      {
        id: "small-pasta",
        question: "Is it shaped like a grain?",
        hint: "Look at the overall shape",
        position: { x: 200, y: 200 }
      },
      {
        id: "large-pasta",
        question: "Is it long and thin?",
        hint: "Think about spaghetti vs penne",
        position: { x: 600, y: 200 }
      }
    ]
  }
] 