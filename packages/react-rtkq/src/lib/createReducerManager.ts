import { AnyAction, Slice, combineReducers } from '@reduxjs/toolkit';
import {
  ReducerManager,
  ReducersMapFromSlicesArray,
  StateFromSlicesArray,
} from './types';

interface CreateReducerManagerArrayArgs<Slices extends Slice[]> {
  staticSlices: Slices;
}

export const createReducerManager = <Slices extends Slice[]>({
  staticSlices,
}: CreateReducerManagerArrayArgs<Slices>): ReducerManager<
  StateFromSlicesArray<Slices>,
  AnyAction
> => {
  const reducersMap: ReducersMapFromSlicesArray<Slices> =
    {} as ReducersMapFromSlicesArray<Slices>;
  staticSlices.forEach((slice) => {
    // @ts-expect-error
    reducersMap[slice.name] = slice.reducer;
  });

  let combinedReducers = combineReducers(reducersMap);

  return {
    getReducersMap: () => {
      return reducersMap;
    },
    reduce: (state, action) => {
      return combinedReducers(state, action);
    },
    add: (key, reducer) => {
      if (!key || !!reducersMap[key]) {
        return;
      }

      reducersMap[key] = reducer;

      combinedReducers = combineReducers(reducersMap);
    },
  };
};
