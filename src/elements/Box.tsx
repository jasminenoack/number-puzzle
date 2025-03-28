import React from 'react';
import { BOX_SIZE, BORDER_WIDTH } from '../constants';

function Box({ value, lastLocation }: { value: number, lastLocation: boolean }) {
    var classes = "box";
    if (value === 0) {
        classes += " empty";
    }
    if (lastLocation) {
        classes += " lastLocation";
    }
    return (
        <div className={classes} style={{ height: BOX_SIZE, width: BOX_SIZE, lineHeight: BOX_SIZE - BORDER_WIDTH * 2 + "px", borderWidth: BORDER_WIDTH }}>
            {value}
        </div >
    );
}

export default Box;
