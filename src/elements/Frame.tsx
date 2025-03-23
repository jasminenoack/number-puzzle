import React from 'react';
import Box from './Box';
import { BOX_SIZE, BORDER_WIDTH } from '../constants';
import { PuzzleState } from '../algo/puzzle/puzzle';

function Frame({ puzzleState, depth }: { puzzleState: PuzzleState, depth: number }) {
    const puzzle = puzzleState.state;
    const lastLocation = puzzleState.lastMoveTo;
    return (
        <div className="frame-wrapper">
            <div className="frame" style={{ height: puzzle.length * BOX_SIZE, borderWidth: BORDER_WIDTH, width: puzzle[0].length * BOX_SIZE }}>
                {
                    puzzle.map((row, rowIndex) => (
                        <div key={rowIndex} className="row" style={{ width: row.length * BOX_SIZE }}>
                            {row.map((number, colIndex) => (
                                <Box key={colIndex} value={number} lastLocation={[rowIndex, colIndex] + "" == lastLocation + ""} />
                            ))}
                        </div>
                    ))
                }

            </div>
            <div>Score: {puzzleState.simplePuzzleScore()}</div>
            <div>Depth: {depth}</div>
        </div>
    );
}

export default Frame;
