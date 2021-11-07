import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{counter}</h3>

        <div>
          <button
            data-testid="minus-button"
            onClick={() => setCounter((prev) => prev - 1)}
          >
            -
          </button>
          <button
            data-testid="plus-button"
            onClick={() => setCounter((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
