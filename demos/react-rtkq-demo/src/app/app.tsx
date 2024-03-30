import { Provider } from '@james_c/react-rtkq';
import { store } from './store';
import { ToggleIncrementer } from './components/ToggleIncrementer';
import { Incrementer } from './components/Incrementer';

export function App() {
  return (
    <div className="w-full h-full flex align-center justify-center flex-col space-y-2">
      <Provider store={store}>
        <ToggleIncrementer />
        <Incrementer />
      </Provider>
    </div>
  );
}

export default App;
