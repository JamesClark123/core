import { Action, AnyAction, Slice } from '@reduxjs/toolkit';
import { useDynamicStore } from './useDynamicStore';
import { useRef } from 'react';

interface UseMountDynamicSliceArgs<S = any> {
  slice: Slice<S>;
}

export type UseMountDynamicSlice<S = any> = (
  args: UseMountDynamicSliceArgs<S>
) => void;

export const useMountDynamicSlice: UseMountDynamicSlice = <
  S = any,
  A extends Action = AnyAction
>({
  slice,
}: UseMountDynamicSliceArgs<S>) => {
  const store = useDynamicStore<S, A>();

  if (
    store.reducerManager.getReducersMap()[slice.name as keyof S] === undefined
  ) {
    store.reducerManager.add(slice.name as keyof S, slice.reducer);
    store.replaceReducer(store.reducerManager.reduce);
  }
};
