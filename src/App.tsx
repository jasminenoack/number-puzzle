import React from 'react';
import './App.css';
import Frame from './elements/Frame';
import { PuzzleState } from './algo/puzzle/puzzle';
import { Stack } from './algo/frontiers/holders/stack';
import { Frontier } from './algo/frontiers/frontier';

const puzzle = new PuzzleState(null, 3);
const stackFrontier = new Frontier(puzzle, new Stack());
stackFrontier.process();

function StartingPuzzle({ puzzle }: { puzzle: PuzzleState }) {
  return (
    <div className="app">
      <p>This is a program to help better understand search algorithms.</p>
      <p>Ideally, to eventually know a bit more about how to think about these concepts in machine learning and AI.</p>
      <p>We generate a random puzzle and attempt to solve it using various methods. This will give us more information about each method.</p>
      <Frame puzzle={puzzle.state} />
    </div>
  );
}

function BreadthFirstSearch() {
  return (
    <div>
      <h2>Depth First Search</h2>
      <p>This is attempting to solve the problem using a breadth first search.</p>
      {stackFrontier.processed.map((node, index) => (
        <div key={index}>
          <div className="step">
            <Frame puzzle={node.puzzleState.state} />
          </div>
        </div>
      ))}
    </div>
  );
}


function App() {
  return (
    <div className="app">
      <StartingPuzzle puzzle={puzzle} />
      <BreadthFirstSearch />
    </div>
  );
}

export default App;
