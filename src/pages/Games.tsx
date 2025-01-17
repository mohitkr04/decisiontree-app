import { useEffect } from 'react';
import AppBar from '../components/layout/AppBar';

export default function Games() {
  useEffect(() => {
    // Any side effects or data fetching can be done here
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar />
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-4xl font-bold mb-6">Fun with Decision Trees</h1>
        <p className="text-lg text-gray-700 mb-4">
          Engage with decision trees through interactive games and quizzes!
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Game 1: Decision Tree Quiz</h2>
        <p className="text-lg text-gray-700 mb-4">
          Test your knowledge about decision trees with our quiz.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Game 2: Build Your Own Tree</h2>
        <p className="text-lg text-gray-700 mb-4">
          Create a decision tree based on a scenario and see how it performs.
        </p>
      </div>
    </div>
  );
}