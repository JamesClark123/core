import { createStaticSlice } from '@james_c/react-rtkq';

export const {
  staticSlice,
  usableStaticActions: { useToggleShowDynamicIncrementer },
} = createStaticSlice({
  initialState: { showDynamicIncrementer: false },
  name: 'static',
  reducers: {
    toggleShowDynamicIncrementer: (state) => {
      state.showDynamicIncrementer = !state.showDynamicIncrementer;
    },
  },
});
