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
    size: number;
    private solvedState: number[][];

    constructor(puzzleState: number[][] | null = null, size: number | null = null
    ) {
        if (!puzzleState && !size) {
            throw new Error("Either puzzle state or size must be provided");
        } else if (puzzleState && size && (puzzleState.length !== size || puzzleState[0].length !== size)) {
            throw new Error("Invalid puzzle state");
        } else if (puzzleState && !size) {
            size = puzzleState.length;
        }
        this.size = size!;

        this.solvedState = this.generatePuzzleBySize(this.size);

        this.state = puzzleState || fisherYates(this.solvedState);
    }

    generatePuzzleBySize(size: number) {
        var puzzleValues = []
        for (let i = 0; i < size; i++) {
            var row = [];
            for (let j = 0; j < size; j++) {
                if (i === size - 1 && j === size - 1) {
                    row.push(0);
                } else {
                    row.push(i * size + j + 1);
                }
            }
            puzzleValues.push(row);
        }
        return puzzleValues;
    }


    solved() {
        // returns if in a solved state
        return this.state.toString() === this.solvedState.toString();
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

        if (rowIndex !== this.size - 1) {
            actions.push(UP);
        }
        if (colIndex !== this.size - 1) {
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
