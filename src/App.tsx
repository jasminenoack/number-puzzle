import React from 'react';
import './App.css';
import Frame from './elements/Frame';
import { PuzzleState } from './algo/puzzle/puzzle';
import { Stack } from './algo/frontiers/holders/stack';
import { Queue } from './algo/frontiers/holders/queue';
import { SimpleGreedy } from './algo/frontiers/holders/greedy';
import { Frontier } from './algo/frontiers/frontier';

const puzzle = new PuzzleState(null, 3);
const stackFrontier = new Frontier(puzzle, new Stack());
stackFrontier.process();
const queueFrontier = new Frontier(puzzle, new Queue());
queueFrontier.process();
const greedyFrontier = new Frontier(puzzle, new SimpleGreedy());
greedyFrontier.process();

function StartingPuzzle({ puzzle }: { puzzle: PuzzleState }) {
  return (
    <div className="app">
      <p>This is a program to help better understand search algorithms.</p>
      <p>Ideally, to eventually know a bit more about how to think about these concepts in machine learning and AI.</p>
      <p>We generate a random puzzle and attempt to solve it using various methods. This will give us more information about each method.</p>
      <Frame puzzleState={puzzle} depth={1} />
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
      <p>Best Path Length: {stats?.bestPathLength}</p>
    </div>
  );
}

function ProcessedNodes({ frontier }: { frontier: Frontier }) {
  var [startingIndex, setStartingIndex] = React.useState(0);
  const pageSize = 10;
  const items = frontier.processed.slice(startingIndex, startingIndex + pageSize);
  return (
    <div className="clearfix">
      <h2>Processed Nodes</h2>
      <div>{startingIndex + 1} to {startingIndex + 1 + pageSize} of {frontier.processed.length}</div>
      {items.map((node, index) => (
        <div key={index}>
          <div className="step">
            <Frame puzzleState={node.puzzleState} depth={node.depth} />
          </div>
        </div>
      ))}
      <button onClick={() => setStartingIndex(startingIndex - pageSize)} disabled={startingIndex === 0}>Previous</button>
      <button onClick={() => setStartingIndex(startingIndex + pageSize)} disabled={startingIndex + 10 > frontier.processed.length}>Next</button>
    </div>
  );
}

function FrontierInfo({ frontier }: { frontier: Frontier }) {
  return (
    <div>
      <Statistics frontier={frontier} />
      <ProcessedNodes frontier={frontier} />
    </div>
  );
}

function SearchSection({ title, description, frontier }: { title: string, description: string, frontier: Frontier }) {
  return (
    <div className="search-section">
      <h2>{title}</h2>
      <p>{description}</p>
      <FrontierInfo frontier={frontier} />
    </div>
  );
}

function DepthFirstSearch() {
  return (
    <SearchSection title="Depth First Search" description="This is attempting to solve the problem using a depth first search." frontier={stackFrontier} />
  )
}

function BreadthFirstSearch() {
  return (
    <SearchSection title="Breadth First Search" description="This is attempting to solve the problem using a breadth first search." frontier={queueFrontier} />
  )
}

function GreedySearch() {
  return (
    <SearchSection title="Greedy Search" description="This is attempting to solve the problem using a greedy search." frontier={greedyFrontier} />
  )
}

function TableRow({ name, frontier }: { name: string, frontier: Frontier }) {
  return (
    <tr className={frontier.solved ? "solved" : "not-solved"}>
      <td>{name}</td>
      <td>{frontier.stats?.nodesSeen}</td>
      <td>{frontier.stats?.nodesProcessed}</td>
      <td>{frontier.stats?.nodesNotProcessed}</td>
      <td>{frontier.stats?.pathLength}</td>
      <td>{frontier.stats?.maxDepth}</td>
      <td>{frontier.stats?.nodesThrownAway}</td>
      <td>{frontier.stats?.bestScore}</td>
      <td>{Math.round(frontier.stats?.averageScore!)}</td>
    </tr>
  )
}

function ResultTable() {
  return (
    <div className="result-table">
      <h2>Result Table</h2>
      <table>
        <thead>
          <tr>
            <th>Search Method</th>
            <th>Nodes Seen</th>
            <th>Nodes Processed</th>
            <th>Nodes Not Processed</th>
            <th>Solution Path Length</th>
            <th>Max Depth</th>
            <th>Nodes Thrown Away</th>
            <th>Best Score</th>
            <th>Average Score</th>
            <th>Best Path Length</th>
          </tr>
        </thead>
        <tbody>
          <TableRow name="Depth First Search" frontier={stackFrontier} />
          <TableRow name="Breadth First Search" frontier={queueFrontier} />
          <TableRow name="Simple Greedy Search" frontier={greedyFrontier} />
        </tbody>
      </table>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <StartingPuzzle puzzle={puzzle} />
      <ResultTable />
      <DepthFirstSearch />
      <BreadthFirstSearch />
      <GreedySearch />
    </div>
  );
}

export default App;
