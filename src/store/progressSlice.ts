import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState {
  completedLessons: string[];
}

const initialState: ProgressState = {
  completedLessons: [],
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    completeLesson: (state, action: PayloadAction<string>) => {
      state.completedLessons.push(action.payload);
    },
  },
});

export const { completeLesson } = progressSlice.actions;
export default progressSlice.reducer; 