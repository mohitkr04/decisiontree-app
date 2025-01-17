import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Badge } from '@/types';

interface ProgressState {
  level: number;
  experience: number;
  badges: Badge[];
  completedLessons: string[];
}

const initialState: ProgressState = {
  level: 1,
  experience: 0,
  badges: [],
  completedLessons: [],
};

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    addExperience: (state, action: PayloadAction<number>) => {
      state.experience += action.payload;
      // Level up logic
      if (state.experience >= state.level * 100) {
        state.level += 1;
      }
    },
    earnBadge: (state, action: PayloadAction<Badge>) => {
      if (!state.badges.find((badge: { id: any; }) => badge.id === action.payload.id)) {
        state.badges.push(action.payload);
      }
    },
    completeLesson: (state, action: PayloadAction<string>) => {
      if (!state.completedLessons.includes(action.payload)) {
        state.completedLessons.push(action.payload);
      }
    },
  },
});

export const { addExperience, earnBadge, completeLesson } = progressSlice.actions;
export default progressSlice.reducer; 