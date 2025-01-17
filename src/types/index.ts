export interface TreeNode {
  id: string;
  type: 'question' | 'answer' | 'decision';
  text?: string;
  question?: string;
  hint?: string;
  yesNodeId?: string;
  noNodeId?: string;
}

export interface DecisionNode {
  id?: string;
  type?: 'decision' | 'outcome';
  question?: string;
  outcome?: string;
  yesNode?: DecisionNode;
  noNode?: DecisionNode;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}