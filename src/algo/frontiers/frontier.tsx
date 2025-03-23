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
    nodesNotProcessed: number;
    pathLength: number;
    maxDepth: number;
    nodesThrownAway: number;
    bestScore: number;
    averageScore: number;
    bestPathLength: number;
}

export class Frontier {
    holder: HolderInterface;
    processed: Node[] = [];
    seen: Set<string>;
    solution: Node | null = null;
    stats: Stats | null = null;
    solved: boolean = false;
    matchingNodeCount: number = 0;

    constructor(start: PuzzleState, holder: HolderInterface) {
        this.holder = holder;
        this.seen = new Set();
        this.addElementToHolder(this.createNode(start, null));
    }

    addElementToHolder(element: Node) {
        const hashKey = element.createHashKey();
        if (this.seen.has(hashKey)) {
            this.matchingNodeCount++;
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
                if (i > 500) {
                    break;
                }
            }
        } catch (e) {
            console.log(e);
        }
        if (this.solution) {
            console.log("Solution found", this.processed.length);
        } else {
            console.log("No solution found", this.processed.length);
        }

        var maxPathLength = 0;
        var bestScore = Infinity;
        var totalScore = 0;
        var bestPathLength = Infinity;
        this.processed.forEach((node) => {
            if (node.depth > maxPathLength) {
                maxPathLength = node.depth;
            }
            const score = node.puzzleState.simplePuzzleScore();
            if (score < bestScore) {
                bestScore = score;
                bestPathLength = node.depth;
            }
            totalScore += score;
        })

        this.stats = {
            nodesSeen: this.seen.size,
            nodesProcessed: this.processed.length,
            nodesNotProcessed: this.holder.size(),
            pathLength: this.solution ? this.solution.depth : 0,
            maxDepth: maxPathLength,
            nodesThrownAway: this.matchingNodeCount,
            bestScore: bestScore,
            averageScore: totalScore / this.processed.length,
            bestPathLength: bestPathLength
        }
    }
}
