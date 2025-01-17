import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ConnectionLine from './ConnectionLine';

interface TreeNodeProps {
  node: {
    id: string;
    text: string;
    children: any[];
  };
  onUpdate: (node: any) => void;
}

export default function TreeNode({ node, onUpdate }: TreeNodeProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [connections, setConnections] = useState<{ start: DOMRect; end: DOMRect }[]>([]);

  useEffect(() => {
    if (nodeRef.current) {
      const childNodes = nodeRef.current.querySelectorAll('.tree-node');
      const parentRect = nodeRef.current.getBoundingClientRect();
      
      const newConnections = Array.from(childNodes).map(child => ({
        start: parentRect,
        end: child.getBoundingClientRect()
      }));
      
      setConnections(newConnections);
    }
  }, [node.children]);

  const handleAddChild = () => {
    const newNode = {
      id: Math.random().toString(),
      text: 'New Decision',
      children: []
    };
    
    const updatedNode = {
      ...node,
      children: [...node.children, newNode]
    };
    
    onUpdate(updatedNode);
  };

  return (
    <motion.div
      ref={nodeRef}
      className="relative tree-node"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <input
          type="text"
          value={node.text}
          onChange={(e) => onUpdate({ ...node, text: e.target.value })}
          className="w-full border-none focus:ring-2 focus:ring-blue-500 rounded"
        />
        
        <div className="flex gap-2 mt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddChild}
            className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
          >
            + Add Option
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {/* Delete node logic */}}
            className="text-sm px-3 py-1 bg-red-50 text-red-600 rounded-full hover:bg-red-100"
          >
            Delete
          </motion.button>
        </div>
      </div>

      {connections.length > 0 && (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {connections.map((connection, index) => (
            <ConnectionLine
              key={index}
              startX={connection.start.x}
              startY={connection.start.y}
              endX={connection.end.x}
              endY={connection.end.y}
            />
          ))}
        </svg>
      )}

      {node.children.length > 0 && (
        <div className="ml-12 mt-4 space-y-4">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onUpdate={(updatedChild) => {
                const updatedChildren = node.children.map((c) =>
                  c.id === updatedChild.id ? updatedChild : c
                );
                onUpdate({ ...node, children: updatedChildren });
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}