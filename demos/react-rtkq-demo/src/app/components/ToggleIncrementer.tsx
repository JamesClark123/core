import { useStaticSelector } from '../store';
import { useMountDynamicSlice } from '../store/dynamicSlice';
import { useToggleShowDynamicIncrementer } from '../store/staticSlice';

export const ToggleIncrementer: React.FC = () => {
  useMountDynamicSlice();
  const isIncrementerVisisble = useStaticSelector(
    (state) => state.static.showDynamicIncrementer
  );
  const toggleIncrement = useToggleShowDynamicIncrementer();

  return (
    <button
      onClick={() => {
        toggleIncrement();
      }}
      className="p-4 border rounded self-center"
    >
      {isIncrementerVisisble ? 'Hide Incrementer' : 'Show Incrementer'}
    </button>
  );
};
