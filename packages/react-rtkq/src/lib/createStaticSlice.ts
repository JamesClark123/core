import {
  CreateSliceOptions,
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

export type CreateStaticSliceArgs<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
> = CreateSliceOptions<State, CaseReducers, Name>;

type ReturnKeys<S extends Slice> =
  | `${S['name']}Slice`
  | `usable${Capitalize<S['name']>}Actions`;

type CreateStaticSliceReturn<_State, S extends Slice> = {
  [key in ReturnKeys<S>]: key extends `${S['name']}Slice`
    ? S
    : key extends `usable${Capitalize<S['name']>}Actions`
    ? UsableActionsFromSlice<S>
    : never;
};

//   export type CreateStaticSlice<BaseState = any> = <
//     BS extends BaseState,
//     State,
//     CaseReducers extends SliceCaseReducers<State>,
//     Name extends string = string
//   >(
//     options: CreateStaticSliceArgs<State, CaseReducers, Name>
//   ) => CreateDynamicSliceReturn<
//     BS & { [key in Name]: State },
//     Slice<State, CaseReducers, Name>
//   >;

export const createStaticSlice = <
  BaseState,
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
>(
  options: CreateStaticSliceArgs<State, CaseReducers, Name>
): CreateStaticSliceReturn<
  BaseState & { [key in Name]: State },
  Slice<State, CaseReducers, Name>
> => {
  const slice = createSlice<State, CaseReducers, Name>(options);

  return {
    [`${slice.name}Slice`]: slice,
    [`usable${capitalizeFirst(slice.name)}Actions`]:
      createUsableActionsFromSlice(slice),
  } as CreateStaticSliceReturn<
    BaseState & { [key in Name]: State },
    Slice<State, CaseReducers, Name>
  >;
};
