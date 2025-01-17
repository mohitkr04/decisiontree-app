import { TreeNode } from '@/types';

const STORAGE_KEY = 'decision-trees';

interface SavedTree {
  id: string;
  name: string;
  nodes: TreeNode[];
  lastModified: number;
}

export const storage = {
  saveTrees: (trees: SavedTree[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
  },

  loadTrees: (): SavedTree[] => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  saveCurrentTree: (tree: SavedTree) => {
    const trees = storage.loadTrees();
    const index = trees.findIndex(t => t.id === tree.id);
    if (index >= 0) {
      trees[index] = tree;
    } else {
      trees.push(tree);
    }
    storage.saveTrees(trees);
  },

  deleteTree: (id: string) => {
    const trees = storage.loadTrees();
    storage.saveTrees(trees.filter(t => t.id !== id));
  }
}; 