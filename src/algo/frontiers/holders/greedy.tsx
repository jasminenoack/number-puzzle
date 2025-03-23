import { HolderInterface } from "./interface";
import { Node } from "../../frontiers/frontier";

export class SimpleGreedy implements HolderInterface {
    /*
    * This is a greedy algorithm that will always return the lowest simple score item. 
    */
    items: Node[] = [];
    push(item: any): void {
        this.items.push(item);
    }
    pop(): any {
        var lowestScore = Infinity;
        var lowestScoreIndex = -1;
        for (let i = 0; i < this.items.length; i++) {
            const score = this.items[i].puzzleState.simplePuzzleScore()
            if (score < lowestScore) {
                lowestScore = score;
                lowestScoreIndex = i;
            }
        }
        const item = this.items[lowestScoreIndex];
        this.items.splice(lowestScoreIndex, 1);
        return item;
    }
    peek(): any {
        return this.items[0];
    }
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    size(): number {
        return this.items.length;
    }
}
