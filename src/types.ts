export interface TreeNode {
  id: string;
  type: 'question' | 'answer';
  content: string;
  position: { x: number; y: number };
  yesConnection?: string;
  noConnection?: string;
  isRoot?: boolean;
} 