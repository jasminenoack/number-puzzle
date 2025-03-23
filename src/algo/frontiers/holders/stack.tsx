import { PuzzleState } from '../../puzzle/puzzle';
import { HolderInterface } from './interface';

export class Stack implements HolderInterface {
    items: PuzzleState[];
    constructor() {
        this.items = [];
    }
    push(item: PuzzleState) {
        this.items.push(item);
    }
    pop(): PuzzleState {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items.pop()!;
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
}
