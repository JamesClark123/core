import { cleanup, render } from '@testing-library/react';

import { configureDynamicStore } from '../configureDynamicStore';
import { PayloadAction } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

describe('useMountDynamicSlice', () => {
  afterEach(() => cleanup());

  it('it should only replace reducer once', async () => {
    mockConsoleError(); // Redux will complain about the initial empty reducer here
    const { store, createDynamicSlice } = configureDynamicStore({
      staticSlices: [],
    });
    restoreConsoleError();

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

    const dynamicSpy = jest.fn();
    const replaceReducerSpy = jest.fn(store.replaceReducer);

    store.replaceReducer = replaceReducerSpy;

    const DynamicComponent: React.FC = () => {
      useMountDynamicSlice1Slice();
      const dynamicIncrement = useDynamicSlice1Selector(
        (store) => store.dynamicSlice1.dynamicIncrement
      );

      dynamicSpy(dynamicIncrement);

      return <div>Hello</div>;
    };

    const RootComponent: React.FC<React.PropsWithChildren> = ({ children }) => {
      return (
        <Provider store={store}>
          <DynamicComponent />
          <DynamicComponent />
          <DynamicComponent />
        </Provider>
      );
    };

    render(<RootComponent />);

    expect(dynamicSpy).toHaveBeenCalledTimes(3);
    expect(replaceReducerSpy).toHaveBeenCalledTimes(1);
  });
});
