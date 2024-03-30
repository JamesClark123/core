import { cleanup, render } from '@testing-library/react';

import { configureDynamicStore } from '../configureDynamicStore';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

describe('configureDynamicStore', () => {
  afterEach(() => cleanup());

  it('should create a store with static slices', async () => {
    const staticSlice1 = createSlice({
      initialState: { incrementCount: 0 },
      name: 'staticSlice1',
      reducers: {
        increment: (state, _action: PayloadAction<void>) => {
          state.incrementCount++;
        },
      },
    });
    const { store, createDynamicSlice, useStaticSelector } =
      configureDynamicStore({ staticSlices: [staticSlice1] });

    const { useDynamicSlice1Selector, useMountDynamicSlice1Slice } =
      createDynamicSlice({
        initialState: { dynamicIncrement: 0 },
        name: 'dynamicSlice1',
        reducers: {
          dynamicIncrement: (state, _action: PayloadAction<void>) => {
            state.dynamicIncrement++;
          },
        },
      });

    const staticSpy = jest.fn();
    const dynamicSpy = jest.fn();

    const DynamicMounter: React.FC<React.PropsWithChildren> = ({
      children,
    }) => {
      useMountDynamicSlice1Slice();

      return children;
    };

    const DynamicComponent: React.FC = () => {
      const dynamicIncrement = useDynamicSlice1Selector(
        (store) => store.dynamicSlice1.dynamicIncrement
      );

      dynamicSpy(dynamicIncrement);

      return <div>There</div>;
    };

    const StaticComponent: React.FC = () => {
      const incrementCount = useStaticSelector(
        (state) => state.staticSlice1.incrementCount
      );

      staticSpy(incrementCount);

      return <div>Hello</div>;
    };

    const RootComponent: React.FC<React.PropsWithChildren> = ({ children }) => {
      return (
        <Provider store={store}>
          <StaticComponent />
          {children}
        </Provider>
      );
    };

    render(<RootComponent />);

    expect(staticSpy).toHaveBeenCalledTimes(1);
    expect(staticSpy).toHaveBeenNthCalledWith(1, 0);
    expect(dynamicSpy).toHaveBeenCalledTimes(0);

    cleanup();

    mockConsoleError(); // We expect errors to be thrown here
    expect(() =>
      render(
        <RootComponent>
          <DynamicComponent />
        </RootComponent>
      )
    ).toThrow();
    restoreConsoleError();

    render(
      <RootComponent>
        <DynamicMounter>
          <DynamicComponent />
        </DynamicMounter>
      </RootComponent>
    );

    expect(dynamicSpy).toHaveBeenCalledTimes(1);
    expect(dynamicSpy).toHaveBeenNthCalledWith(1, 0);
  });
});
