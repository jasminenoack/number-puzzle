import React from 'react';

function Box({ value }: { value: number }) {
    var classes = "box";
    if (value === 0) {
        classes += " empty";
    }
    return (
        <div className={classes}>
            {value}
        </div>
    );
}

export default Box;
