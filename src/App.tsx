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
      <Frame puzzleState={puzzle} />
    </div>
  );
}

function BreadthFirstSearch() {
  return (
    <div>
      <h2>Depth First Search</h2>
      <p>This is attempting to solve the problem using a depth first search.</p>
      <FrontierInfo frontier={stackFrontier} />
    </div>
  );
}

function FrontierInfo({ frontier }: { frontier: Frontier }) {
  return (
    <div>
      <Statistics frontier={stackFrontier} />
      {/* <ProcessedNodes frontier={stackFrontier} /> */}
    </div>
  );
}

function Statistics({ frontier }: { frontier: Frontier }) {
  const stats = frontier.stats;
  return (
    <div>
      <h2>Statistics</h2>
      <p>Solved: {frontier.solved ? "True" : "False"}</p>
      <p>Nodes Seen: {stats?.nodesSeen}</p>
      <p>Nodes Processed: {stats?.nodesProcessed}</p>
      <p>Nodes Not Processed: {stats?.nodesNotProcessed}</p>
      <p>Solution Path Length: {stats?.pathLength}</p>
      <p>Max Depth: {stats?.maxDepth}</p>
      <p>Nodes Thrown Away: {stats?.nodesThrownAway}</p>
      <p>Best Score: {stats?.bestScore}</p>
      <p>Average Score: {stats?.averageScore}</p>
    </div>
  );
}

function ProcessedNodes({ frontier }: { frontier: Frontier }) {
  return (
    <div>
      <h2>Processed Nodes</h2>
      {frontier.processed.map((node, index) => (
        <div key={index}>
          <div className="step">
            <Frame puzzleState={node.puzzleState} />
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
