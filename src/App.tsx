import React from 'react';
import './App.css';
import Frame from './elements/Frame';
import { PuzzleState } from './algo/puzzle/puzzle';


function App() {
  const startPuzzle = new PuzzleState();

  return (
    <div className="app">
      <Frame puzzle={startPuzzle.state} />
    </div>
  );
}

export default App;
