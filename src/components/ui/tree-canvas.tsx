import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TreeNode } from '@/types';
import { DraggableNode } from './draggable-node';
import { TreeConnection } from './tree-connection';
import { useToast } from './use-toast';

interface TreeCanvasProps {
  nodes: TreeNode[];
  selectedNode: TreeNode | null;
  onNodeDrag: (id: string, position: { x: number; y: number }) => void;
  onNodeSelect: (node: TreeNode) => void;
  onNodeConnect: (sourceId: string, targetId: string, isYesPath: boolean) => void;
  onNodeDisconnect: (sourceId: string, isYesPath: boolean) => void;
}

export function TreeCanvas({
  nodes,
  selectedNode,
  onNodeDrag,
  onNodeSelect,
  onNodeConnect,
  onNodeDisconnect
}: TreeCanvasProps) {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [connectingFrom, setConnectingFrom] = useState<{
    nodeId: string;
    isYesPath: boolean;
    startPos: { x: number; y: number };
  } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current && connectingFrom) {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    if (connectingFrom) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [connectingFrom]);

  const handleConnectionStart = useCallback((nodeId: string, isYesPath: boolean, startPos: { x: number; y: number }) => {
    setConnectingFrom({ nodeId, isYesPath, startPos });
  }, []);

  const handleConnectionEnd = useCallback((targetId: string) => {
    if (connectingFrom) {
      if (connectingFrom.nodeId === targetId) {
        toast({
          title: "Invalid Connection",
          description: "Cannot connect a node to itself",
          variant: "destructive"
        });
        return;
      }

      const sourceNode = nodes.find(n => n.id === connectingFrom.nodeId);
      const targetNode = nodes.find(n => n.id === targetId);

      if (sourceNode?.type === 'answer') {
        toast({
          title: "Invalid Connection",
          description: "Answer nodes cannot create connections",
          variant: "destructive"
        });
        return;
      }

      onNodeConnect(connectingFrom.nodeId, targetId, connectingFrom.isYesPath);
      setConnectingFrom(null);
    }
  }, [connectingFrom, nodes, onNodeConnect, toast]);

  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-[600px] border-2 border-dashed border-gray-200 rounded-xl bg-white overflow-hidden"
    >
      <svg className="absolute inset-0 pointer-events-none">
        {nodes.map(node => {
          if (node.type === 'question') {
            const yesNode = nodes.find(n => n.id === node.yesConnection);
            const noNode = nodes.find(n => n.id === node.noConnection);

            return (
              <g key={node.id}>
                {yesNode && (
                  <TreeConnection
                    startX={node.position.x + 125}
                    startY={node.position.y + 100}
                    endX={yesNode.position.x + 125}
                    endY={yesNode.position.y}
                    isYesPath={true}
                  />
                )}
                {noNode && (
                  <TreeConnection
                    startX={node.position.x + 125}
                    startY={node.position.y + 100}
                    endX={noNode.position.x + 125}
                    endY={noNode.position.y}
                    isYesPath={false}
                  />
                )}
              </g>
            );
          }
          return null;
        })}
        {connectingFrom && (
          <TreeConnection
            startX={connectingFrom.startPos.x}
            startY={connectingFrom.startPos.y}
            endX={mousePos.x}
            endY={mousePos.y}
            isYesPath={connectingFrom.isYesPath}
            isDragging={true}
          />
        )}
      </svg>

      {nodes.map(node => (
        <DraggableNode
          key={node.id}
          node={node}
          onDragEnd={onNodeDrag}
          onClick={() => onNodeSelect(node)}
          isSelected={selectedNode?.id === node.id}
          onConnectionStart={(isYesPath) => {
            const nodeEl = document.getElementById(`node-${node.id}`);
            if (nodeEl) {
              const rect = nodeEl.getBoundingClientRect();
              const canvasRect = canvasRef.current?.getBoundingClientRect();
              if (canvasRect) {
                handleConnectionStart(node.id, isYesPath, {
                  x: rect.left - canvasRect.left + rect.width / 2,
                  y: rect.top - canvasRect.top + rect.height / 2
                });
              }
            }
          }}
          onConnectionEnd={() => handleConnectionEnd(node.id)}
        />
      ))}
    </div>
  );
}