export interface TreeNode {
  hint: any;
  question: string;
  id: string;
  type: 'question' | 'answer';
  content: string;
  position: { x: number; y: number };
  yesConnection?: string;
  noConnection?: string;
  isRoot?: boolean;
}

export type NodeType = 'question' | 'answer'; 