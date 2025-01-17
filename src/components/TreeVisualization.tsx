import { motion } from 'framer-motion';

interface TreeNode {
  id: string;
  question: string;
  yesNode?: TreeNode;
  noNode?: TreeNode;
  isLeaf?: boolean;
  result?: string;
  hint?: string;
}

interface Props {
  node: TreeNode;
  onNodeHover?: (node: TreeNode) => void;
  onNodeLeave?: () => void;
}

export default function TreeVisualization({ node, onNodeHover, onNodeLeave }: Props) {
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="p-4 border rounded-lg bg-white mb-4 cursor-pointer hover:shadow-lg transition-shadow"
        whileHover={{ scale: 1.02 }}
        onMouseEnter={() => onNodeHover?.(node)}
        onMouseLeave={onNodeLeave}
      >
        {node.question}
      </motion.div>
      
      {!node.isLeaf && (
        <div className="flex gap-8">
          {node.yesNode && (
            <div className="flex flex-col items-center">
              <motion.div 
                className="h-8 w-px bg-green-300"
                initial={{ height: 0 }}
                animate={{ height: 32 }}
              />
              <div className="text-sm text-green-600 mb-2">Yes</div>
              <TreeVisualization 
                node={node.yesNode}
                onNodeHover={onNodeHover}
                onNodeLeave={onNodeLeave}
              />
            </div>
          )}
          
          {node.noNode && (
            <div className="flex flex-col items-center">
              <motion.div 
                className="h-8 w-px bg-red-300"
                initial={{ height: 0 }}
                animate={{ height: 32 }}
              />
              <div className="text-sm text-red-600 mb-2">No</div>
              <TreeVisualization 
                node={node.noNode}
                onNodeHover={onNodeHover}
                onNodeLeave={onNodeLeave}
              />
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
} 