export interface GameState {
  score: number;
  level: number;
  isPlaying: boolean;
  isPaused: boolean;
  highScore: number;
}

export interface SnakeState {
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  snake: Array<{ x: number; y: number }>;
  food: { x: number; y: number };
  speed: number;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: boolean[];
  timeStarted: number | null;
  questionTimes: number[];
} 