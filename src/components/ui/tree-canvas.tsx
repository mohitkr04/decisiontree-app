import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TreeNode } from '@/types'; // Make sure this type is defined
import { DraggableNode } from './draggable-node';
import { TreeConnection } from './tree-connection';

interface TreeCanvasProps {
  nodes: TreeNode[];
  selectedNode: TreeNode | null;
  onNodeDrag: (id: string, position: { x: number; y: number }) => void;
  onNodeSelect: (node: TreeNode) => void;
  onNodeConnect: (sourceId: string, targetId: string, isYesPath: boolean) => void;
  onNodeDisconnect: (sourceId: string, isYesPath: boolean) => void;
}

export function TreeCanvas({ nodes, selectedNode, onNodeDrag, onNodeSelect, onNodeConnect, onNodeDisconnect }: TreeCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [connectingFrom, setConnectingFrom] = useState<{ nodeId: string; isYesPath: boolean } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleConnectionStart = (nodeId: string, isYesPath: boolean) => {
    setConnectingFrom({ nodeId, isYesPath });
  };

  const handleConnectionEnd = (targetId: string) => {
    if (connectingFrom) {
      onNodeConnect(connectingFrom.nodeId, targetId, connectingFrom.isYesPath);
      setConnectingFrom(null);
    }
  };

  return (
    <div className="relative w-full h-[600px] border rounded-lg bg-white overflow-hidden">
      <svg
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      >
        {nodes.map(node => {
          if (node.yesNode) {
            const targetNode = nodes.find(n => n.id === node.yesNode?.id);
            if (targetNode && node.position && targetNode.position) {
              return (
                <TreeConnection
                  key={`${node.id}-yes-${targetNode.id}`}
                  startX={node.position.x + 100}
                  startY={node.position.y + 30}
                  endX={targetNode.position.x + 100}
                  endY={targetNode.position.y}
                  isYesPath
                />
              );
            }
          }
          if (node.noNode) {
            const targetNode = nodes.find(n => n.id === node.noNode?.id);
            if (targetNode && node.position && targetNode.position) {
              return (
                <TreeConnection
                  key={`${node.id}-no-${targetNode.id}`}
                  startX={node.position.x + 100}
                  startY={node.position.y + 30}
                  endX={targetNode.position.x + 100}
                  endY={targetNode.position.y}
                  isYesPath={false}
                />
              );
            }
          }
          return null;
        })}
      </svg>

      {nodes.map(node => (
        <DraggableNode
          key={node.id}
          node={node}
          onDragEnd={onNodeDrag}
          onClick={() => onNodeSelect(node)}
          isSelected={selectedNode?.id === node.id}
          onConnectionStart={(isYesPath) => handleConnectionStart(node.id, isYesPath)}
          onConnectionEnd={() => handleConnectionEnd(node.id)}
        />
      ))}

      {connectingFrom && (
        <motion.div
          className="absolute w-2 h-2 bg-primary rounded-full"
          style={{ x: mousePosition.x - 10, y: mousePosition.y - 10 }}
        />
      )}
    </div>
  );
}