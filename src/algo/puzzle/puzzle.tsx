import { fisherYates } from "../shake"

export const PUZZLE_SOLVED = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0]
]

export const UP = "up";
export const DOWN = "down";
export const LEFT = "left";
export const RIGHT = "right";

export class PuzzleState {
    state: number[][];
    constructor(puzzleState?: number[][]) {
        this.state = puzzleState || fisherYates(PUZZLE_SOLVED);
    }

    solved() {
        // returns if in a solved state
        return this.state.toString() === PUZZLE_SOLVED.toString();
    }

    actions() {
        // returns the possible actions
        // right: slide a tile right 
        // left: slide a tile left
        // up: slide a tile up
        // down: slide a tile down
        // you are always sliding into the 0 slot

        const zeroIndex = this.findZero();

        const rowIndex = zeroIndex[0];
        const colIndex = zeroIndex[1];

        var actions = [];

        if (rowIndex !== 3) {
            actions.push(UP);
        }
        if (colIndex !== 3) {
            actions.push(LEFT);
        }
        if (colIndex !== 0) {
            actions.push(RIGHT);
        }
        if (rowIndex !== 0) {
            actions.push(DOWN);
        }
        return actions;
    }

    findZero() {
        // returns the index of the zero tile
        for (let i = 0; i < this.state.length; i++) {
            for (let j = 0; j < this.state[i].length; j++) {
                if (this.state[i][j] === 0) {
                    return [i, j];
                }
            }
        }
        throw new Error("No zero tile found");
    }

    move(action: string) {
        // moves the tile in the given direction
        const zeroIndex = this.findZero();
        const rowIndex = zeroIndex[0];
        const colIndex = zeroIndex[1];
        const moves = this.actions();
        if (!moves.includes(action)) {
            throw new Error("Invalid move");
        }
        const newState = []
        for (let i = 0; i < this.state.length; i++) {
            newState.push([...this.state[i]]);
        }
        switch (action) {
            case UP:
                newState[rowIndex][colIndex] = newState[rowIndex + 1][colIndex];
                newState[rowIndex + 1][colIndex] = 0;
                break;
            case DOWN:
                newState[rowIndex][colIndex] = newState[rowIndex - 1][colIndex];
                newState[rowIndex - 1][colIndex] = 0;
                break;
            case LEFT:
                newState[rowIndex][colIndex] = newState[rowIndex][colIndex + 1];
                newState[rowIndex][colIndex + 1] = 0;
                break;
            case RIGHT:
                newState[rowIndex][colIndex] = newState[rowIndex][colIndex - 1];
                newState[rowIndex][colIndex - 1] = 0;
                break;
            default:
                throw new Error("Invalid action");
        }
        return new PuzzleState(newState);
    }
}
