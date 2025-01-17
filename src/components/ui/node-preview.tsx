import { motion } from 'framer-motion';
import { TreeNode } from '@/types';

interface NodePreviewProps {
  node: TreeNode;
}

export function NodePreview({ node }: NodePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 border rounded-lg bg-white shadow-sm"
    >
      <h4 className="font-medium mb-2">Node Preview</h4>
      <div className="space-y-2">
        <div>
          <p className="text-sm font-medium">Question</p>
          <p className="text-sm text-muted-foreground">{node.question || 'No question set'}</p>
        </div>
        {node.hint && (
          <div>
            <p className="text-sm font-medium">Hint</p>
            <p className="text-sm text-muted-foreground">{node.hint}</p>
          </div>
        )}
        <div className="flex gap-4">
          <div>
            <p className="text-sm font-medium text-green-600">Yes Path</p>
            <p className="text-sm text-muted-foreground">
              {node.yesNode ? 'Connected' : 'Not connected'}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-red-600">No Path</p>
            <p className="text-sm text-muted-foreground">
              {node.noNode ? 'Connected' : 'Not connected'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 