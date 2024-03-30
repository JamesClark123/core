import { Action, AnyAction } from '@reduxjs/toolkit';
import { DynamicStore } from './types';
import { useStore } from 'react-redux';

export const useDynamicStore = <
  S = any,
  A extends Action = AnyAction
>(): DynamicStore<S, A> => {
  const store = useStore<S, A>();

  return store as DynamicStore<S, A>;
};
