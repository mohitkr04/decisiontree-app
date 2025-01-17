import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './card';
import { Input } from './input';
import { Button } from './button';
import { Textarea } from './textarea';

interface NodeEditorProps {
  node: TreeNode;
  onUpdate: (updatedNode: TreeNode) => void;
  onClose: () => void;
}

export function NodeEditor({ node, onUpdate, onClose }: NodeEditorProps) {
  const [editedNode, setEditedNode] = useState(node);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md p-6 space-y-4">
        <h3 className="text-lg font-semibold">Edit Node</h3>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Question</label>
          <Input
            value={editedNode.question}
            onChange={(e) => setEditedNode(prev => ({
              ...prev,
              question: e.target.value
            }))}
            placeholder="Enter your yes/no question"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Hint</label>
          <Textarea
            value={editedNode.hint || ''}
            onChange={(e) => setEditedNode(prev => ({
              ...prev,
              hint: e.target.value
            }))}
            placeholder="Add a helpful hint for this question"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => {
            onUpdate(editedNode);
            onClose();
          }}>
            Save Changes
          </Button>
        </div>
      </Card>
    </motion.div>
  );
} 