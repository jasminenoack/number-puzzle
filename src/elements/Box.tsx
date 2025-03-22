import React from 'react';

function Box({ value }: { value: number }) {
    return (
        <div className="box">
            {value}
        </div>
    );
}

export default Box;
