import { PayloadAction } from '@reduxjs/toolkit';
import { createDynamicSlice } from '.';

export const {
  dynamicSlice,
  usableDynamicActions: { useIncrement },
  useMountDynamicSlice,
  useDynamicSelector,
} = createDynamicSlice({
  initialState: { incrementCount: 0 },
  name: 'dynamic',
  reducers: {
    increment: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload !== undefined) {
        state.incrementCount += action.payload;
      } else {
        state.incrementCount++;
      }
    },
  },
});
