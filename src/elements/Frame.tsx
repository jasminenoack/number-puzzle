import React from 'react';
import Box from './Box';

function Frame({ puzzle }: { puzzle: number[][] }) {
    return (
        <div className="frame">
            {
                puzzle.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
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
