import { PUZZLE_SOLVED, PuzzleState } from "../puzzle/puzzle";
import { Node, Frontier } from "./frontier";
import { Stack } from "./holders/stack";


const TEST_PUZZLE = [
    [13, 14, 15, 0],
    [9, 10, 11, 12],
    [5, 6, 7, 8],
    [1, 2, 3, 4]
]

describe("Node", () => {
    describe("createHashKey", () => {
        it("should return the hash key of the puzzle state", () => {
            const puzzleState = new PuzzleState([[1, 2, 3], [4, 5, 6], [7, 8, 0]], 3);
            const node = new Node(puzzleState, null, 1);
            expect(node.createHashKey()).toEqual("1,2,3,4,5,6,7,8,0");
        })
    })

    describe("setSolution", () => {
        it("should set the solution", () => {
            const puzzleState = new PuzzleState([[1, 2, 3], [4, 5, 6], [7, 8, 0]], 3);
            const node = new Node(puzzleState, null, 1);
            node.setSolution();
            expect(node.solution).toEqual(true);
        })
        it("should set solution path on parent", () => {
            const puzzleState = new PuzzleState([[1, 2, 3], [4, 5, 6], [7, 8, 0]], 3);
            const parent = new Node(puzzleState, null, 1);
            const node = new Node(puzzleState, parent, 2);
            node.setSolution();
            expect(parent.solutionPath).toEqual(true);
        })
    }
    )

    describe("setSolutionPath", () => {
        it("should set the solution path", () => {
            const puzzleState = new PuzzleState([[1, 2, 3], [4, 5, 6], [7, 8, 0]], 3);
            const node = new Node(puzzleState, null, 1);
            node.setSolutionPath();
            expect(node.solutionPath).toEqual(true);
        })
        it("should set solution path on parent", () => {
            const puzzleState = new PuzzleState([[1, 2, 3], [4, 5, 6], [7, 8, 0]], 3);
            const parent = new Node(puzzleState, null, 1);
            const node = new Node(puzzleState, parent, 2);
            node.setSolutionPath();
            expect(parent.solutionPath).toEqual(true);
        }
        )
    })
})

describe("Frontier", () => {
    describe("create", () => {
        it("should create a frontier", () => {
            const stack = new Stack();
            var puzzleState = new PuzzleState(
                [
                    [1, 2, 3, 4],
                    [5, 6, 7, 8],
                    [9, 10, 11, 12],
                    [13, 14, 15, 0]
                ]
            );
            var frontier = new Frontier(puzzleState, stack);
            expect(frontier.holder).toBe(stack);
            expect(frontier.seen).toEqual(new Set(["1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0",]));
            expect(frontier.holder.size()).toEqual(1);
        })
    })

    describe("addElementToHolder", () => {
        it("should add an element to the holder", () => {
            var node = new Node(new PuzzleState(null, 4), null, 1);
            var frontier = new Frontier(new PuzzleState(null, 4), new Stack());
            frontier.addElementToHolder(node);
            expect(frontier.holder.size()).toEqual(2);
        })

        it("should not add an element it's already seen", () => {
            var node = new Node(new PuzzleState(null, 4), null, 1);
            var frontier = new Frontier(new PuzzleState(null, 4), new Stack());
            frontier.addElementToHolder(node);
            expect(frontier.holder.size()).toEqual(2);
            frontier.addElementToHolder(node);
            expect(frontier.holder.size()).toEqual(2);
            expect(frontier.matchingNodeCount).toEqual(1);
        });
    })

    describe("createNode", () => {
        it("should create a node", () => {
            var puzzleState = new PuzzleState(null, 4);
            var frontier = new Frontier(new PuzzleState(null, 4), new Stack());
            var node = frontier.createNode(puzzleState, null);
            expect(node.puzzleState).toEqual(puzzleState);
            expect(node.parent).toEqual(null);
            expect(node.depth).toEqual(1);
        })

        it("should create a node with a parent", () => {
            var puzzleState = new PuzzleState(null, 4);
            var parent = new Node(puzzleState, null, 1);
            var frontier = new Frontier(new PuzzleState(null, 4), new Stack());
            var node = frontier.createNode(puzzleState, parent);
            expect(node.puzzleState).toEqual(puzzleState);
            expect(node.parent).toEqual(parent);
            expect(node.depth).toEqual(2);
        })
    })

    describe("processNode", () => {
        it("should error if the holder is empty", () => {
            var frontier = new Frontier(new PuzzleState(TEST_PUZZLE), new Stack());
            frontier.holder.pop()
            expect(() => {
                frontier.processNode();
            }).toThrowError("No nodes to process");
        })
        it("should remove the existing node from the holder", () => {
            var frontier = new Frontier(new PuzzleState(TEST_PUZZLE), new Stack());
            var node = frontier.holder.peek();
            frontier.processNode();
            expect(frontier.holder.items).not.toContain(node);
        });
        it("should add the node to processed", () => {
            var frontier = new Frontier(new PuzzleState(TEST_PUZZLE), new Stack());
            var node = frontier.holder.peek();
            frontier.processNode();
            expect(frontier.processed).toContain(node);
        })
        it("should add the new nodes to the seen set", () => {
            var frontier = new Frontier(new PuzzleState(TEST_PUZZLE), new Stack());
            frontier.processNode();
            expect(frontier.seen).toContain("13,14,0,15,9,10,11,12,5,6,7,8,1,2,3,4");
            expect(frontier.seen).toContain("13,14,15,12,9,10,11,0,5,6,7,8,1,2,3,4");
        })
        it("should add the new nodes to the holder", () => {
            var frontier = new Frontier(new PuzzleState(TEST_PUZZLE), new Stack());
            frontier.processNode();
            expect(frontier.holder.size()).toEqual(2);
        })
        it("should set solved if it finds the solution", () => {
            const puzzle = new PuzzleState(null, 3);
            var frontier = new Frontier(puzzle, new Stack());
            // push in complete node
            frontier.holder.push(new Node(new PuzzleState(
                [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 0]
                ], 3), null, 1));
            frontier.processNode();
            expect(frontier.solved).toEqual(true);
        }
        )
    })

    describe("processPuzzle", () => {
        it("should stop if solved", () => {
            var frontier = new Frontier(new PuzzleState(PUZZLE_SOLVED), new Stack());
            frontier.process();
            expect(frontier.solution).toBeTruthy();
            var solution_data = frontier.solution?.puzzleState.state;
            expect(solution_data).toEqual(PUZZLE_SOLVED);
        });

        it("should find the solution", () => {
            var frontier = new Frontier(new PuzzleState([
                [0, 1, 2],
                [4, 5, 3],
                [7, 8, 6]
            ]), new Stack());
            frontier.process();
            expect(frontier.solution).toBeTruthy();
            var solution_data = frontier.solution?.puzzleState.state;
            expect(solution_data).toEqual([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 0]
            ]);
        });

        it("should build stats", () => {
            var frontier = new Frontier(new PuzzleState([
                [0, 1, 2],
                [4, 5, 3],
                [7, 8, 6]
            ]), new Stack());
            frontier.process();
            expect(frontier.stats).toEqual({
                nodesSeen: 272,
                nodesProcessed: 157,
                nodesNotProcessed: 115,
                pathLength: 157,
                maxDepth: 157,
                nodesThrownAway: 159
            });
        });

    }
    );
})
