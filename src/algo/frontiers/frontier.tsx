import { PuzzleState } from "../puzzle/puzzle";
import { HolderInterface } from "./holders/interface";

export class Node {
    puzzleState: PuzzleState;
    parent: Node | null;
    depth: number
    // these are set after processing when we determine something is a solution
    solution: boolean = false;
    solutionPath: boolean = false;

    constructor(puzzleState: PuzzleState, parent: Node | null, depth: number) {
        this.puzzleState = puzzleState;
        this.parent = parent;
        this.depth = depth;
    }

    createHashKey() {
        return this.puzzleState.state.toString();
    }

    setSolution() {
        this.solution = true;
        if (this.parent) {
            this.parent.setSolutionPath();
        }
    }

    setSolutionPath() {
        this.solutionPath = true;
        if (this.parent) {
            this.parent.setSolutionPath();
        }
    }
}

type Stats = {
    nodesSeen: number;
    nodesProcessed: number;
    nodesThrownAway: number;
    pathLength: number;
    maxDepth: number;
}

export class Frontier {
    holder: HolderInterface;
    processed: Node[] = [];
    seen: Set<string>;
    solution: Node | null = null;
    stats: Stats | null = null;
    solved: boolean = false;

    constructor(start: PuzzleState, holder: HolderInterface) {
        this.holder = holder;
        this.seen = new Set();
        this.addElementToHolder(this.createNode(start, null));
    }

    addElementToHolder(element: Node) {
        const hashKey = element.createHashKey();
        if (this.seen.has(hashKey)) {
            return;
        }
        this.seen.add(hashKey);
        this.holder.push(element);
    }

    createNode(puzzleState: PuzzleState, parent: Node | null) {
        var depth
        if (!parent) {
            depth = 1
        } else {
            depth = parent.depth + 1
        }
        return new Node(puzzleState, parent, depth);
    }

    public processNode() {
        if (this.holder.isEmpty()) {
            throw new Error("No nodes to process");
        }
        const next = this.holder.pop();
        if (next.puzzleState.solved()) {
            next.setSolution();
            this.solution = next;
            this.solved = true;
        } else {
            const actions = next.puzzleState.actions();
            actions.forEach((action: string) => {
                const newPuzzleState = next.puzzleState.move(action);
                const newNode = this.createNode(newPuzzleState, next);
                this.addElementToHolder(newNode);
            });
        }
        this.processed.push(next);
    }

    public process() {
        try {
            var i = 0;
            while (!this.solved) {
                i++;
                this.processNode();
                if (i > 100) {
                    break;
                }
            }
        } catch (e) {
            console.log(e);
        }
        if (this.solution) {
            console.log("Solution found", this.processNode.length);
        }
    }

    // check if solved 

}
