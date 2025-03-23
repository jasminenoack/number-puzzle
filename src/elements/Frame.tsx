import React from 'react';
import Box from './Box';
import { BOX_SIZE, BORDER_WIDTH } from '../constants';

function Frame({ puzzle }: { puzzle: number[][] }) {
    return (
        <div className="frame" style={{ height: puzzle.length * BOX_SIZE, borderWidth: BORDER_WIDTH, width: puzzle[0].length * BOX_SIZE }}>
            {
                puzzle.map((row, rowIndex) => (
                    <div key={rowIndex} className="row" style={{ width: row.length * BOX_SIZE }}>
                        {row.map((number, colIndex) => (
                            <Box key={colIndex} value={number} />
                        ))}
                    </div>
                ))
            }
        </div>
    );
}

export default Frame;
