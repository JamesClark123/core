import { Action, ActionCreator, AnyAction } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

type ArgType<C> = C extends (...args: infer T) => void ? T : never;

export type UsableAction<
  A extends Action = AnyAction,
  C extends ActionCreator<A> = ActionCreator<A>
> = () => (...args: Parameters<C>) => void;

export const createUsableAction =
  <A extends Action = AnyAction, C extends ActionCreator<A> = ActionCreator<A>>(
    actionCreator: C
  ): UsableAction<A, C> =>
  () => {
    const dispatch = useDispatch();

    return useCallback((...args: Parameters<C>) => {
      dispatch(actionCreator(...args));
    }, []);
  };
