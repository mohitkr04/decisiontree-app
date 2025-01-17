import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useToast } from "../components/ui/use-toast";
import AppBar from '../components/layout/AppBar';
import { ProgressTracker } from '../components/ui/progress-tracker';
import { Feedback } from '../components/ui/feedback';
import { Hint } from '../components/ui/hint';
import { NodePalette } from '../components/ui/node-palette';
import { InteractiveTutorial } from '../components/ui/interactive-tutorial';
import { NodeEditor } from '../components/ui/node-editor';
import { TreeCanvas } from '../components/ui/tree-canvas';
import { DecisionTreeExample, decisionTreeExamples } from '../data/decisionTrees';
import { TreeNode } from '@/types';

interface HistoryState {
  nodes: TreeNode[];
  selectedNode: TreeNode | null;
  buildStep: number;
}

export default function BuildTree() {
  const { toast } = useToast();
  
  // State declarations
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [showNodeEditor, setShowNodeEditor] = useState(false);
  const [buildStep, setBuildStep] = useState(1);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<DecisionTreeExample | null>(null);
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // History management functions
  const saveToHistory = useCallback((state: HistoryState) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, state];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setNodes(previousState.nodes);
      setSelectedNode(previousState.selectedNode);
      setBuildStep(previousState.buildStep);
      setHistoryIndex(prev => prev - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      setNodes(nextState.nodes);
      setSelectedNode(nextState.selectedNode);
      setBuildStep(nextState.buildStep);
      setHistoryIndex(prev => prev + 1);
    }
  }, [history, historyIndex]);

  // Node operations
  const handleNodeDrop = useCallback((id: string, position: { x: number; y: number }) => {
    setNodes(prev => {
      const newNodes = prev.map(node => 
        node.id === id ? { ...node, position } : node
      );
      saveToHistory({
        nodes: newNodes,
        selectedNode,
        buildStep
      });
      return newNodes;
    });
  }, [selectedNode, buildStep, saveToHistory]);

  const handleNodeUpdate = useCallback((updatedNode: TreeNode) => {
    setNodes(prev => {
      const newNodes = prev.map(node => 
        node.id === updatedNode.id ? updatedNode : node
      );
      saveToHistory({
        nodes: newNodes,
        selectedNode: updatedNode,
        buildStep
      });
      return newNodes;
    });

    toast({
      title: "Node Updated",
      description: "Your changes have been saved successfully!",
    });
  }, [toast, buildStep, saveToHistory]);

  // Template handling
  const handleTemplateSelect = useCallback((template: DecisionTreeExample) => {
    setSelectedTemplate(template);
    setNodes(template.nodes);
    setBuildStep(1);
    saveToHistory({
      nodes: template.nodes,
      selectedNode: null,
      buildStep: 1
    });
    toast({
      title: `Starting ${template.title}`,
      description: "Let's build this decision tree together!",
    });
  }, [toast, saveToHistory]);

  // Node deletion
  const handleNodeDelete = useCallback((node: TreeNode) => {
    setNodes(prev => {
      const newNodes = prev.filter(n => n.id !== node.id);
      saveToHistory({
        nodes: newNodes,
        selectedNode: null,
        buildStep
      });
      return newNodes;
    });
    setSelectedNode(null);
    toast({
      title: "Node Deleted",
      description: "The node has been removed from your tree.",
    });
  }, [buildStep, saveToHistory, toast]);

  // Progress tracking
  useEffect(() => {
    if (nodes.length && buildStep === 1) {
      setBuildStep(2);
      setHintText("Great! Now connect your nodes using Yes/No paths.");
    }
  }, [nodes.length, buildStep]);

  // Node connection and disconnection handlers
  const handleNodeConnect = useCallback((sourceId: string, targetId: string) => {
    // Implement the logic for connecting nodes
    // This is a placeholder implementation
    console.log(`Connecting node ${sourceId} to ${targetId}`);
  }, []);

  const handleNodeDisconnect = useCallback((sourceId: string, targetId: string) => {
    // Implement the logic for disconnecting nodes
    // This is a placeholder implementation
    console.log(`Disconnecting node ${sourceId} from ${targetId}`);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24">
        <AppBar />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Build Your Decision Tree</h1>
              <p className="text-muted-foreground mt-2">
                {selectedTemplate ? selectedTemplate.title : "Choose a template to start"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={undo}
                disabled={historyIndex <= 0}
              >
                Undo
              </Button>
              <Button
                variant="outline"
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
              >
                Redo
              </Button>
              <Button onClick={() => setShowTutorial(true)}>
                Tutorial
              </Button>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left sidebar */}
            <div className="md:col-span-1 space-y-4">
              <NodePalette
                onNodeSelect={(type) => {
                  const newNode: TreeNode = {
                    id: `node-${Date.now()}`,
                    question: '',
                    position: { x: 400, y: 200 }
                  };
                  setNodes(prev => [...prev, newNode]);
                  setSelectedNode(newNode);
                  setShowNodeEditor(true);
                }}
              />

              <ProgressTracker
                steps={[
                  {
                    title: 'Add Nodes', completed: buildStep > 1,
                    description: ''
                  },
                  {
                    title: 'Connect Nodes', completed: buildStep > 2,
                    description: ''
                  },
                  {
                    title: 'Add Results', completed: buildStep > 3,
                    description: ''
                  }
                ]}
                currentStep={buildStep - 1}
              />
            </div>

            {/* Main canvas */}
            <div className="md:col-span-3">
              <TreeCanvas
                nodes={nodes}
                selectedNode={selectedNode}
                onNodeDrag={handleNodeDrop}
                onNodeSelect={(node) => {
                  setSelectedNode(node);
                  setShowNodeEditor(true);
                }}
                onNodeDelete={handleNodeDelete}
                onNodeConnect={handleNodeConnect}
                onNodeDisconnect={handleNodeDisconnect}
              />
            </div>
          </div>

          {/* Modals and overlays */}
          {showNodeEditor && selectedNode && (
            <NodeEditor
              node={selectedNode}
              onUpdate={handleNodeUpdate}
              onClose={() => setShowNodeEditor(false)}
            />
          )}

          {showTutorial && (
            <InteractiveTutorial
              onClose={() => setShowTutorial(false)}
            />
          )}

          {showHint && (
            <Hint
              text={hintText}
              onClose={() => setShowHint(false)}
            />
          )}

          <Feedback
            type="info"
            message={`Step ${buildStep}: ${
              buildStep === 1 ? "Add your first node" :
              buildStep === 2 ? "Connect your nodes" :
              buildStep === 3 ? "Add result nodes" :
              "Complete!"
            }`}
            visible={true}
            onClose={() => {}}
          />
        </motion.div>
      </div>
    </div>
  );
}