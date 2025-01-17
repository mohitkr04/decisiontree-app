export interface TreeNode {
  id: string;
  question: string;
  yesNode?: TreeNode;
  noNode?: TreeNode;
  isLeaf?: boolean;
  result?: string;
  hint?: string;
  position?: {
    x: number;
    y: number;
  };
}

export interface NodeType {
  id: string;
  type: 'question' | 'result';
  label: string;
  description: string;
} 