import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '@/types/game';

const initialState: GameState = {
  score: 0,
  level: 1,
  isPlaying: false,
  isPaused: false,
  highScore: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
      if (state.score > state.highScore) {
        state.highScore = state.score;
      }
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    togglePause: (state) => {
      state.isPaused = !state.isPaused;
    },
    startGame: (state) => {
      state.isPlaying = true;
      state.isPaused = false;
      state.score = 0;
    },
    endGame: (state) => {
      state.isPlaying = false;
    },
  },
});

export const { setScore, setLevel, togglePause, startGame, endGame } = gameSlice.actions;
export default gameSlice.reducer; 