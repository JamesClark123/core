import {
  Action,
  AnyAction,
  Middleware,
  Reducer,
  Slice,
} from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

export type ReducerMap<S = any, A extends Action = AnyAction> = {
  [SubState in keyof S]: Reducer<S[SubState], A>;
};

export type ReducersMapFromSlicesArray<Slices extends Slice[]> = ReducerMap<
  StateFromSlicesArray<Slices>
>;

export type ReducersMapFromSlicesMap<Slices extends Record<string, Slice>> = {
  [Name in keyof Slices as Slices[Name] extends Slice<
    infer _S,
    infer _A,
    infer N
  >
    ? string & number & N
    : never]: Slices[Name] extends Slice<infer S> ? Reducer<S, any> : never; //Slices[Name]['reducer'];
};

export type StateFromSlicesArray<Slices extends Slice[]> = {
  [S in keyof Pick<Slices, number> as Slices[S] extends Slice
    ? Slices[S]['name']
    : never]: Slices[S] extends Slice<infer S> ? S : never;
};

export type StateFromSlicesMap<Slices extends Record<string, Slice>> = {
  [Name in keyof Slices as Slices[Name] extends Slice<
    infer _S,
    infer _A,
    infer N
  >
    ? string & number & N
    : never]: Slices[Name] extends Slice<infer S> ? S : never; //ReturnType<Slices[Name]['reducer']>;
};

export interface ReducerManager<S = any, A extends Action = AnyAction> {
  getReducersMap: () => ReducerMap<S, A>;
  reduce: Reducer<S, A>;
  add: (key: keyof S, reducer: Reducer) => void;
}

export type DynamicStore<
  S = any,
  A extends Action = AnyAction,
  M extends ReadonlyArray<Middleware<{}, S>> = [ThunkMiddlewareFor<S>]
> = ToolkitStore<S, A, M> & {
  reducerManager: ReducerManager<S, A>;
};
