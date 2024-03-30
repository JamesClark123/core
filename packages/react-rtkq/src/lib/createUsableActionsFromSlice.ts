import { Action, ActionCreator, Slice } from '@reduxjs/toolkit';
import { UsableAction, createUsableAction } from './createUsableAction';
import { capitalizeFirst } from './capitalizeFirst';

export type UsableActionsFromSlice<S extends Slice> = {
  [ActionCreatorName in keyof S['actions'] as `use${Capitalize<
    string & ActionCreatorName
  >}`]: S['actions'][ActionCreatorName] extends ActionCreator<infer A>
    ? A extends Action
      ? UsableAction<A, S['actions'][ActionCreatorName]>
      : never
    : never;
};

export const createUsableActionsFromSlice = <S extends Slice>(
  slice: S
): UsableActionsFromSlice<S> => {
  return Object.entries(slice.actions).reduce(
    (usableActions, [key, actionCreator]) => {
      // @ts-expect-error
      usableActions[`use${capitalizeFirst(key)}`] =
        createUsableAction(actionCreator);
      return usableActions;
    },
    {} as UsableActionsFromSlice<S>
  );
};
