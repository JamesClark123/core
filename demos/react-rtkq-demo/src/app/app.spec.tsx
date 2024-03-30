import { act, render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('can toggle increment button and increment', () => {
    const { getByText, queryByText, getByTestId, rerender } = render(<App />);

    const toggleIncrementer = getByText(/Show incrementer/i);
    let incrementer = queryByText(/^Increment/i);

    expect(toggleIncrementer).toBeTruthy();
    expect(incrementer).toBeFalsy();

    act(() => {
      toggleIncrementer.click();
    });
    rerender(<App />);

    incrementer = getByText(/^Increment/i);

    expect(incrementer).toBeTruthy();

    act(() => {
      incrementer?.click();
      incrementer?.click();
    });
    rerender(<App />);

    const incrementCount = getByTestId('increment-count');

    expect(incrementCount).toBeTruthy();
    expect(incrementCount.textContent).toBe('2');
  });
});
