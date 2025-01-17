import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from './card';
import { Input } from './input';
import { Button } from './button';
import { Textarea } from './textarea';
import { TreeNode } from '@/types';
import { useToast } from './use-toast';

interface NodeEditorProps {
  node?: TreeNode;
  onUpdate: (node: TreeNode) => void;
  onClose: () => void;
}

export function NodeEditor({ node, onUpdate, onClose }: NodeEditorProps) {
  const [content, setContent] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (node?.content) {
      setContent(node.content);
    }
  }, [node]);

  if (!node) {
    return null;
  }

  const handleSave = () => {
    const trimmedContent = content.trim();
    if (trimmedContent && node) {
      const updatedNode = {
        ...node,
        content: trimmedContent
      };
      onUpdate(updatedNode);
      
      toast({
        title: "Success",
        description: "Node updated successfully",
      });
      
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl p-6 w-96">
        <h3 className="text-xl font-bold mb-4">
          {node.type === 'question' ? '🤔 Edit Question' : '🎯 Edit Answer'}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              {node.type === 'question' ? 'Your Question:' : 'Your Answer:'}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows={3}
              placeholder={
                node.type === 'question'
                  ? 'Ask a yes/no question...'
                  : 'Write the answer...'
              }
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!content.trim()}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 