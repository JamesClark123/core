import { useDynamicSelector, useIncrement } from '../store/dynamicSlice';

export const Incrementer: React.FC = () => {
  const incrementCount = useDynamicSelector(
    (state) => state.dynamic.incrementCount
  );
  const isIncrementerVisible = useDynamicSelector(
    (state) => state.static.showDynamicIncrementer
  );
  const increment = useIncrement();

  if (!isIncrementerVisible) {
    return;
  }

  return (
    <div className="flex justify-center align-center flex-col space-y-2">
      <span data-testid="increment-count" className="self-center">
        {incrementCount}
      </span>
      <button
        className="p-4 border rounded self-center"
        onClick={() => increment(1)}
      >
        Increment
      </button>
    </div>
  );
};
