export interface TreeNode {
  id: string;
  type: NodeType;
  question?: string;
  hint?: string;
  outcome?: string;
  yesNodeId?: string;
  noNodeId?: string;
  yesNode?: TreeNode;
  noNode?: TreeNode;
  position?: {
    x: number;
    y: number;
  };
}

export type NodeType = 'decision' | 'outcome' | 'condition';

export interface DecisionNode extends TreeNode {
  question: string;
  type: 'decision';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: () => boolean;
}

export interface ToastProps {
  title: string;
  description: string | React.ReactNode;
  variant?: 'default' | 'destructive';
} 