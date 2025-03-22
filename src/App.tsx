import React from 'react';
import './App.css';
import Frame from './elements/Frame';

const NUMBERS = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15],
]

function App() {
  return (
    <div className="app">
      <Frame puzzle={NUMBERS} />
    </div>
  );
}

export default App;
