import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabled] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{counter}</h3>

        <div>
          <button
            data-testid="minus-button"
            onClick={() => setCounter((counter) => counter - 1)}
            disabled={disabled}
          >
            -
          </button>
          <button
            data-testid="plus-button"
            onClick={() => setCounter((counter) => counter + 1)}
            disabled={disabled}
          >
            +
          </button>
        </div>

        <button
          data-testid="on/off-button"
          style={{ backgroundColor: 'blue' }}
          onClick={() => setDisabled((disabled) => !disabled)}
        >
          on/off
        </button>
      </header>
    </div>
  );
}

export default App;
