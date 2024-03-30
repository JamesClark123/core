import {
  Action,
  AnyAction,
  ConfigureStoreOptions,
  Middleware,
  Slice,
  StoreEnhancer,
  configureStore,
} from '@reduxjs/toolkit';
import { createReducerManager } from './createReducerManager';
import { DynamicStore, StateFromSlicesArray } from './types';
import { CreateDynamicSlice, createDynamicSlice } from './createDynamicSlice';
import { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { useSelector } from 'react-redux';

type ConfigureDynamicStoreArgs<
  Slices extends Slice[],
  A extends Action = AnyAction,
  M extends ReadonlyArray<Middleware<{}, StateFromSlicesArray<Slices>>> = [
    ThunkMiddlewareFor<StateFromSlicesArray<Slices>>
  ],
  E extends ReadonlyArray<StoreEnhancer> = [StoreEnhancer]
> = {
  staticSlices: Slices;
} & Omit<
  ConfigureStoreOptions<StateFromSlicesArray<Slices>, A, M, E>,
  'reducer'
>;

type ConfigureDynamicStoreReturn<
  S,
  A extends Action = AnyAction,
  M extends ReadonlyArray<Middleware<{}, S>> = [ThunkMiddlewareFor<S>]
> = {
  store: DynamicStore<S, A, M>;
  useStaticSelector: <T>(selector: (state: S) => T) => T;
  createDynamicSlice: CreateDynamicSlice<S>;
};

export const configureDynamicStore = <
  Slices extends Slice[],
  A extends Action = AnyAction,
  M extends ReadonlyArray<Middleware<{}, StateFromSlicesArray<Slices>>> = [
    ThunkMiddlewareFor<StateFromSlicesArray<Slices>>
  ],
  E extends ReadonlyArray<StoreEnhancer> = [StoreEnhancer]
>({
  staticSlices,
  ...storeOptions
}: ConfigureDynamicStoreArgs<Slices, A, M, E>): ConfigureDynamicStoreReturn<
  StateFromSlicesArray<Slices>,
  A,
  M
> => {
  const reducerManager = createReducerManager({ staticSlices });

  const store = configureStore<StateFromSlicesArray<Slices>, A, M, E>({
    ...storeOptions,
    reducer: reducerManager.reduce,
  });

  (
    store as unknown as DynamicStore<StateFromSlicesArray<Slices>, A, M>
  ).reducerManager = reducerManager;

  return {
    store: store as unknown as DynamicStore<StateFromSlicesArray<Slices>, A, M>,
    useStaticSelector: useSelector,
    createDynamicSlice: createDynamicSlice as CreateDynamicSlice<
      StateFromSlicesArray<Slices>
    >,
  };
};
