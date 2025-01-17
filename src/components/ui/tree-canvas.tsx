import { useRef, useEffect, useState, useCallback } from 'react';
import { TreeNode } from '@/types';
import { DraggableNode } from './draggable-node';
import { useToast } from './use-toast';

interface TreeCanvasProps {
  nodes: TreeNode[];
  selectedNode: TreeNode | null;
  onNodeDrag: (id: string, position: { x: number; y: number }) => void;
  onNodeSelect: (node: TreeNode) => void;
  onNodeDelete: (node: TreeNode) => void;
  onNodeConnect: (sourceId: string, isYesPath: boolean) => void;
  onNodeDisconnect: (sourceId: string, isYesPath: boolean) => void;
}

export function TreeCanvas({
  nodes,
  selectedNode,
  onNodeDrag,
  onNodeSelect,
  onNodeConnect,
}: TreeCanvasProps) {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [connectingFrom, setConnectingFrom] = useState<{
    nodeId: string;
    isYesPath: boolean;
    startPos: { x: number; y: number };
  } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleNodeClick = useCallback((node: TreeNode) => {
    // Set the selected node
    onNodeSelect(node);

    // If the node doesn't have content, the editor will open automatically
    if (!node.content) {
      toast({
        title: node.type === 'question' ? 'Add Question' : 'Add Answer',
        description: node.type === 'question' 
          ? 'Type your yes/no question...' 
          : 'Type your answer...',
      });
      return;
    }

    // If node has content, show it
    toast({
      title: node.type === 'question' ? 'Question' : 'Answer',
      description: node.content,
    });
  }, [onNodeSelect, toast]);

  const handleConnectionStart = useCallback((nodeId: string, isYesPath: boolean) => {
    const sourceNode = nodes.find(n => n.id === nodeId);
    if (!sourceNode?.content) {
      toast({
        title: "Error",
        description: "Please add a question first",
        variant: "destructive"
      });
      return;
    }

    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const node = document.getElementById(`node-${nodeId}`);
    if (!node) return;

    const nodeRect = node.getBoundingClientRect();
    const startPos = {
      x: nodeRect.left + nodeRect.width / 2 - rect.left,
      y: nodeRect.top + nodeRect.height / 2 - rect.top
    };

    setConnectingFrom({ nodeId, isYesPath, startPos });
    
    toast({
      title: isYesPath ? "Yes Path" : "No Path",
      description: "Click an answer node to connect",
    });
  }, [nodes, toast]);

  const handleConnectionEnd = useCallback((targetId: string) => {
    if (!connectingFrom) return;
    
    const sourceNode = nodes.find(n => n.id === connectingFrom.nodeId);
    const targetNode = nodes.find(n => n.id === targetId);
    
    if (!sourceNode || !targetNode) return;
    
    // Prevent connecting to another question node
    if (targetNode.type === 'question') {
      toast({
        title: "Invalid Connection",
        description: "You can only connect to answer nodes",
        variant: "destructive"
      });
      return;
    }
    
    onNodeConnect(connectingFrom.nodeId, connectingFrom.isYesPath);
    setConnectingFrom(null);
  }, [connectingFrom, nodes, onNodeConnect, toast]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current || !connectingFrom) return;
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    if (connectingFrom) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [connectingFrom]);

  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-[600px] border-2 border-dashed border-gray-200 rounded-xl bg-white overflow-hidden"
      onClick={() => setConnectingFrom(null)} // Cancel connection on canvas click
    >
      <svg className="absolute inset-0 pointer-events-none">
        {/* Existing connections */}
        {nodes.map(node => {
          if (node.type !== 'question') return null;
          
          const yesNode = nodes.find(n => n.id === node.yesConnection);
          const noNode = nodes.find(n => n.id === node.noConnection);
          
          return (
            <g key={node.id}>
              {yesNode && (
                <path
                  d={`M ${node.position.x} ${node.position.y} L ${yesNode.position.x} ${yesNode.position.y}`}
                  stroke="#22c55e"
                  strokeWidth="2"
                  fill="none"
                />
              )}
              {noNode && (
                <path
                  d={`M ${node.position.x} ${node.position.y} L ${noNode.position.x} ${noNode.position.y}`}
                  stroke="#ef4444"
                  strokeWidth="2"
                  fill="none"
                />
              )}
            </g>
          );
        })}
        
        {/* Active connection line */}
        {connectingFrom && (
          <path
            d={`M ${connectingFrom.startPos.x} ${connectingFrom.startPos.y} L ${mousePos.x} ${mousePos.y}`}
            stroke={connectingFrom.isYesPath ? "#22c55e" : "#ef4444"}
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
          />
        )}
      </svg>

      {nodes.map(node => (
        <DraggableNode
          key={node.id}
          node={node}
          onDragEnd={onNodeDrag}
          onClick={() => handleNodeClick(node)}
          isSelected={selectedNode?.id === node.id}
          onConnectionStart={(isYesPath) => handleConnectionStart(node.id, isYesPath)}
          onConnectionEnd={() => handleConnectionEnd(node.id)}
        />
      ))}
    </div>
  );
}