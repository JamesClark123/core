import {
  CreateSliceOptions,
  PayloadAction,
  Slice,
  SliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import { useMountDynamicSlice } from './useMountDynamicSlice';
import { useSelector } from 'react-redux';
import { capitalizeFirst } from './capitalizeFirst';
import {
  UsableActionsFromSlice,
  createUsableActionsFromSlice,
} from './createUsableActionsFromSlice';

export type CreateDynamicSliceArgs<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
> = CreateSliceOptions<State, CaseReducers, Name>;

type ReturnKeys<S extends Slice> =
  | `${S['name']}Slice`
  | `useMount${Capitalize<S['name']>}Slice`
  | `use${Capitalize<S['name']>}Selector`
  | `usable${Capitalize<S['name']>}Actions`;

type CreateDynamicSliceReturn<State, S extends Slice> = {
  [key in ReturnKeys<S>]: key extends `${S['name']}Slice`
    ? S
    : key extends `useMount${Capitalize<S['name']>}Slice`
    ? () => void
    : key extends `use${Capitalize<S['name']>}Selector`
    ? <T>(selector: (state: State) => T) => T
    : key extends `usable${Capitalize<S['name']>}Actions`
    ? UsableActionsFromSlice<S>
    : never;
};

export type CreateDynamicSlice<BaseState = any> = <
  BS extends BaseState,
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
>(
  options: CreateDynamicSliceArgs<State, CaseReducers, Name>
) => CreateDynamicSliceReturn<
  BS & { [key in Name]: State },
  Slice<State, CaseReducers, Name>
>;

export const createDynamicSlice = <
  BaseState,
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
>(
  options: CreateDynamicSliceArgs<State, CaseReducers, Name>
): CreateDynamicSliceReturn<
  BaseState & { [key in Name]: State },
  Slice<State, CaseReducers, Name>
> => {
  const slice = createSlice<State, CaseReducers, Name>(options);

  return {
    [`${slice.name}Slice`]: slice,
    [`useMount${capitalizeFirst(slice.name)}Slice`]: () =>
      useMountDynamicSlice({ slice }),
    [`use${capitalizeFirst(slice.name)}Selector`]: useSelector,
    [`usable${capitalizeFirst(slice.name)}Actions`]:
      createUsableActionsFromSlice(slice),
  } as CreateDynamicSliceReturn<
    BaseState & { [key in Name]: State },
    Slice<State, CaseReducers, Name>
  >;
};
