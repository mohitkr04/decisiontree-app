import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface ShareTreeProps {
  treeData: any;
  treeName: string;
}

export default function ShareTree({ treeData, treeName }: ShareTreeProps) {
  const [showShare, setShowShare] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const handleShare = async () => {
    // Generate a unique share ID
    const shareId = Math.random().toString(36).substring(2, 15);
    
    // In a real app, you'd save this to a database
    const shareData = {
      id: shareId,
      name: treeName,
      tree: treeData,
      createdAt: new Date().toISOString()
    };

    // For now, we'll store in localStorage
    const sharedTrees = JSON.parse(localStorage.getItem('sharedTrees') || '{}');
    sharedTrees[shareId] = shareData;
    localStorage.setItem('sharedTrees', JSON.stringify(sharedTrees));

    // Generate share link
    const link = `${window.location.origin}/shared/${shareId}`;
    setShareLink(link);
    setShowShare(true);

    toast({
      title: "Tree shared successfully! 🌳",
      description: "Share this link with your classmates!"
    });
  };

  return (
    <div className="mt-4">
      <Button 
        variant="outline" 
        onClick={handleShare}
        className="mb-4"
      >
        Share My Tree 🤝
      </Button>

      {showShare && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-muted rounded-lg"
        >
          <p className="text-sm mb-2">Share this link with others:</p>
          <div className="flex gap-2">
            <Input 
              value={shareLink} 
              readOnly 
              className="flex-1"
            />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(shareLink);
                toast({
                  title: "Link copied! 📋",
                  description: "Share it with your friends!"
                });
              }}
            >
              Copy
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
} 