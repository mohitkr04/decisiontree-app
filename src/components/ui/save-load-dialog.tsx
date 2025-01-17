import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './card';
import { Button } from './button';
import { Input } from './input';
import { storage } from '@/lib/storage';

interface SaveLoadDialogProps {
  onClose: () => void;
  onLoad: (nodes: TreeNode[]) => void;
  currentNodes: TreeNode[];
}

export function SaveLoadDialog({ onClose, onLoad, currentNodes }: SaveLoadDialogProps) {
  const [treeName, setTreeName] = useState('');
  const [savedTrees] = useState(() => storage.loadTrees());

  const handleSave = () => {
    if (!treeName) return;
    
    storage.saveCurrentTree({
      id: Date.now().toString(),
      name: treeName,
      nodes: currentNodes,
      lastModified: Date.now()
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md p-6 space-y-4">
        <h3 className="text-lg font-semibold">Save/Load Decision Tree</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Save Current Tree</h4>
            <div className="flex gap-2">
              <Input
                value={treeName}
                onChange={(e) => setTreeName(e.target.value)}
                placeholder="Enter tree name"
              />
              <Button onClick={handleSave} disabled={!treeName}>
                Save
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Load Saved Trees</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {savedTrees.map(tree => (
                <div
                  key={tree.id}
                  className="flex items-center justify-between p-2 border rounded hover:bg-accent"
                >
                  <div>
                    <p className="font-medium">{tree.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Last modified: {new Date(tree.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onLoad(tree.nodes)}
                    >
                      Load
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        storage.deleteTree(tree.id);
                        // Force re-render
                        window.location.reload();
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </Card>
    </motion.div>
  );
} 