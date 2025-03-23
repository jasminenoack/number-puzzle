import { PuzzleState } from "../../puzzle/puzzle";

export interface HolderInterface {
    push(item: PuzzleState): void;
    pop(): PuzzleState;
    peek(): PuzzleState;
    isEmpty(): boolean;
    size(): number;
}
