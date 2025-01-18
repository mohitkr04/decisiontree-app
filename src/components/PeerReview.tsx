import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface PeerReviewProps {
  treeData: any;
  studentName: string;
}

export default function PeerReview({ studentName }: Omit<PeerReviewProps, 'treeData'>) {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmitReview = () => {
    if (feedback.length < 10) {
      toast({
        title: "Oops!",
        description: "Please provide more detailed feedback to help your classmate.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Review Submitted! 🌟",
      description: "Thank you for helping your classmate improve!"
    });

    setFeedback('');
    setRating(0);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Review {studentName}'s Tree</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Rate this decision tree:</h3>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ⭐
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Your Feedback:</h3>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What did they do well? What could be improved?"
            className="min-h-[100px]"
          />
        </div>

        <Button 
          onClick={handleSubmitReview}
          className="w-full"
          disabled={!rating || !feedback}
        >
          Submit Review
        </Button>
      </div>
    </Card>
  );
}