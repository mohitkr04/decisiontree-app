export interface TreeTemplate {
  id: string;
  title: string;
  description: string;
  initialNode: TreeNode;
}

export const treeTemplates: TreeTemplate[] = [
  {
    id: "pasta",
    title: "PastaLand Template",
    description: "Start with a basic pasta classification tree",
    initialNode: {
      id: "root",
      question: "Is the pasta small?",
      hint: "Compare the size to a regular penne pasta"
    }
  },
  {
    id: "animals",
    title: "Animal Classification",
    description: "Classify animals based on their features",
    initialNode: {
      id: "root",
      question: "Is the animal gray?",
      hint: "Look at the color of the animal's body"
    }
  },
  {
    id: "clothing",
    title: "Clothing Organizer",
    description: "Organize clothing items by their characteristics",
    initialNode: {
      id: "root",
      question: "Is it worn on your upper body?",
      hint: "Think about where on your body you wear this item"
    }
  }
];