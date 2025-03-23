import { PuzzleState, PUZZLE_SOLVED } from "./puzzle";
describe("PuzzleState", () => {
    describe("create", () => {
        it("should set up a new shuffled puzzle", () => {
            const puzzle = new PuzzleState(null, 4);
            expect(puzzle.state).not.toEqual(PUZZLE_SOLVED);
        });

        it("should allow you to set up a new puzzle", () => {
            const puzzle = new PuzzleState(PUZZLE_SOLVED);
            expect(puzzle.state).toEqual(PUZZLE_SOLVED);
        });

        it('should create an appropriate size puzzle', () => {
            const puzzle = new PuzzleState(null, 3);
            expect(puzzle.size).toEqual(3);
            const state = puzzle.state;
            expect(state.flat().sort()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
            expect(state.length).toEqual(3);
            expect(state[0].length).toEqual(3);
        });

        it("errors smaller than 2", () => {
            expect(() => new PuzzleState(null, 2)).toThrowError("Size must be greater than 2");
        });
    });

    describe("generatePuzzleBySize", () => {
        it("should generate a 4x4 puzzle", () => {
            const puzzle = new PuzzleState(null, 4);
            const generated = puzzle.generatePuzzleBySize(4);
            expect(generated).toEqual(PUZZLE_SOLVED);
        });

        it("should generate a 3x3 puzzle", () => {
            const puzzle = new PuzzleState(null, 3);
            const generated = puzzle.generatePuzzleBySize(3);
            expect(generated).toEqual([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 0]
            ]);
        });
    }
    );

    describe("solved", () => {
        it("should not be solved after creation", () => {
            const puzzle = new PuzzleState(null, 4);
            expect(puzzle.solved()).toBe(false);
        });

        it("should be solved if using solved state", () => {
            const puzzle = new PuzzleState(PUZZLE_SOLVED);
            expect(puzzle.solved()).toBe(true);
        });

        it("should be able to tell if another size is solved", () => {
            const puzzle = new PuzzleState(
                [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 0]
                ]
                , 3);
            expect(puzzle.solved()).toBe(true);
        }
        );
    });

    describe("actions", () => {
        it("0 in 0,0 should allow slide up & left", () => {
            const puzzle = new PuzzleState([
                [0, 1, 2, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["left", "up"]);
        });

        it("0 in 0,1 should allow slide up & right & left", () => {
            const puzzle = new PuzzleState([
                [1, 0, 2, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["left", "right", "up"]);
        });

        it("0 in 0,2 should allow slide up & right & left", () => {
            const puzzle = new PuzzleState([
                [1, 2, 0, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["left", "right", "up"]);
        });

        it("0 in 0,3 should allow slide up & right", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 0],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["right", "up"]);
        });

        it("0 in 1,0 should allow slide up & left & down", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [0, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "left", "up"]);
        }
        );

        it("0 in 1,1 should allow slide up & left & down & right", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 0, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "left", "right", "up"]);
        });

        it("0 in 1,2 should allow slide up & left & down & right", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 0, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "left", "right", "up"]);
        });

        it("0 in 1,3 should allow slide up & right & down", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 0],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "right", "up"]);
        });

        it("0 in 2,0 should allow slide up & left & down", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [0, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "left", "up"]);
        });

        it("0 in 2,1 should allow slide up & left & down & right", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 0, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "left", "right", "up"]);
        });

        it("0 in 2,2 should allow slide up & left & down & right", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 0, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "left", "right", "up"]);
        });

        it("0 in 2,3 should allow slide up & right & down", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 0],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "right", "up"]);
        });

        it("0 in 3,0 should allow slide left & down", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [0, 13, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "left"]);
        });

        it("0 in 3,1 should allow slide left & right & down", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 0, 14, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "left", "right"]);
        });

        it("0 in 3,2 should allow slide left & right & down", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 0, 15]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "left", "right"]);
        });

        it("0 in 3,3 should allow slide right & down", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 0]
            ]);
            expect(puzzle.actions().sort()).toEqual(["down", "right"]);
        });

        it("knows actions for 3X3 in 0,0", () => {
            const puzzle = new PuzzleState([
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ], 3);
            expect(puzzle.actions().sort()).toEqual(["left", "up"]);
        }
        );

        it("knows actions for 3X3 in 0, 2", () => {
            const puzzle = new PuzzleState([
                [1, 2, 0],
                [3, 4, 5],
                [6, 7, 8]
            ], 3);
            expect(puzzle.actions().sort()).toEqual(["right", "up"]);
        }
        );

        it("knows actions for 3X3 in 2, 0", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3],
                [4, 5, 6],
                [0, 7, 8]
            ], 3);
            expect(puzzle.actions().sort()).toEqual(["down", "left"]);
        }
        );

        it("knows actions for 3X3 in 2, 2", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 0]
            ], 3);
            expect(puzzle.actions().sort()).toEqual(["down", "right"]);
        }
        );


    })

    describe("findZero", () => {
        it("finds in 0,0", () => {
            const puzzle = new PuzzleState([
                [0, 1, 2, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([0, 0]);
        }
        );

        it("finds in 0,1", () => {
            const puzzle = new PuzzleState([
                [1, 0, 2, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([0, 1]);
        });

        it("finds in 0,2", () => {
            const puzzle = new PuzzleState([
                [1, 2, 0, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([0, 2]);
        });

        it("finds in 0,3", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 0],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([0, 3]);
        });

        it("finds in 1,0", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [0, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([1, 0]);
        });

        it("finds in 1,1", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 0, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([1, 1]);
        });

        it("finds in 1,2", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 0, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([1, 2]);
        });

        it("finds in 1,3", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 0],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([1, 3]);
        });

        it("finds in 2,0", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [0, 9, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([2, 0]);
        });

        it("finds in 2,1", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 0, 10, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([2, 1]);
        });

        it("finds in 2,2", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 0, 11],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([2, 2]);
        });

        it("finds in 2,3", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 0],
                [12, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([2, 3]);
        });

        it("finds in 3,0", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [0, 13, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([3, 0]);
        });

        it("finds in 3,1", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 0, 14, 15]
            ]);
            expect(puzzle.findZero()).toEqual([3, 1]);
        });

        it("finds in 3,2", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 0, 15]
            ]);
            expect(puzzle.findZero()).toEqual([3, 2]);
        });

        it("finds in 3,3", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 0]
            ]);
            expect(puzzle.findZero()).toEqual([3, 3]);
        });

    }
    );

    describe("move", () => {
        it("errors if you attempt an invalid down move", () => {
            const puzzle = new PuzzleState([
                [1, 0, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 2]
            ]);
            expect(() => puzzle.move("down")).toThrowError("Invalid move");
        });

        it("errors if you attempt an invalid up move", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 0]
            ]);
            expect(() => puzzle.move("up")).toThrowError("Invalid move");
        });

        it("errors if you attempt an invalid left move", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 0]
            ]);
            expect(() => puzzle.move("left")).toThrowError("Invalid move");
        }
        );

        it("errors if you attempt an invalid right move", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [0, 10, 11, 12],
                [13, 14, 15, 9]
            ]);
            expect(() => puzzle.move("right")).toThrowError("Invalid move");
        });

        it("returns new state after valid down move", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 0, 15]
            ]);
            const newPuzzle = puzzle.move("down");
            expect(newPuzzle).not.toEqual(puzzle);
            expect(newPuzzle.state).toEqual([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 0, 12],
                [13, 14, 11, 15]
            ]);
        }
        );

        it("returns new state after valid up move", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 0, 12],
                [13, 14, 11, 15]
            ]);
            const newPuzzle = puzzle.move("up");
            expect(newPuzzle).not.toEqual(puzzle);
            expect(newPuzzle.state).toEqual([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 0, 15]
            ]);
        });

        it("returns new state after valid left move", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 0, 14, 15]
            ]);
            const newPuzzle = puzzle.move("left");
            expect(newPuzzle).not.toEqual(puzzle);
            expect(newPuzzle.state).toEqual([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 0, 15]
            ]);
        });

        it("returns new state after valid right move", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 0, 15]
            ]);
            const newPuzzle = puzzle.move("right");
            expect(newPuzzle).not.toEqual(puzzle);
            expect(newPuzzle.state).toEqual([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 0, 14, 15]
            ]);
        });

        it('sets lastMoveTo', () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 0, 15]
            ]);
            const newPuzzle = puzzle.move("right");
            expect(newPuzzle.lastMoveTo).toEqual([3, 2]);
        }
        );
    });

    describe("Find Location", () => {
        it("should find 6 in 1,1", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 0]
            ]);
            expect(puzzle.findLocation(6)).toEqual([1, 1]);
        });

        it('should find 0 in 3,3', () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 0]
            ]);
            expect(puzzle.findLocation(0)).toEqual([3, 3]);
        });

        it('should find 1 in 0,0', () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 0]
            ]);
            expect(puzzle.findLocation(1)).toEqual([0, 0]);
        });
    });

    describe("simple puzzle score", () => {
        it("should return 0 for solved puzzle", () => {
            const puzzle = new PuzzleState(PUZZLE_SOLVED);
            expect(puzzle.simplePuzzleScore()).toEqual(0);
        });

        it("should return 2 for one move away", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 0],
                [13, 14, 15, 12]
            ]);
            expect(puzzle.simplePuzzleScore()).toEqual(2);
        });

        it("should return 6 for one column wrong", () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 0],
                [5, 6, 7, 4],
                [9, 10, 11, 8],
                [13, 14, 15, 12]
            ]);
            expect(puzzle.simplePuzzleScore()).toEqual(6);
        });

        it('should return 6 for one row wrong', () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [0, 13, 14, 15]
            ]);
            expect(puzzle.simplePuzzleScore()).toEqual(6);
        }
        );

        it('should handle columns and rows wrong', () => {
            const puzzle = new PuzzleState([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [0, 10, 11, 12],
                [13, 14, 15, 9]
            ]);
            expect(puzzle.simplePuzzleScore()).toEqual(8);
        }
        );

        //     it("should return 1 for 1 move", () => {
        //         const puzzle = new PuzzleState([
        //             [1, 2, 3, 4],
        //             [5, 6, 7, 8],
        //             [9, 10, 11, 12],
        //             [13, 14, 0, 15]
        //         ]);
        //         expect(puzzle.simplePuzzleScore()).toEqual(1);
        //     });

        //     it("should return 2 for 2 moves", () => {
        //         const puzzle = new PuzzleState([
        //             [1, 2, 3, 4],
        //             [5, 6, 7, 8],
        //             [9, 10, 0, 12],
        //             [13, 14, 11, 15]
        //         ]);
        //         expect(puzzle.simplePuzzleScore()).toEqual(2);
        //     });

        //     it("should return 3 for 3 moves", () => {
        //         const puzzle = new PuzzleState([
        //             [1, 2, 3, 4],
        //             [5, 6, 7, 8],
        //             [9, 0, 11, 12],
        //             [13, 14, 10, 15]
        //         ]);
        //         expect(puzzle.simplePuzzleScore()).toEqual(3);
        //     });

        //     it("should return 4 for 4 moves", () => {
        //         const puzzle = new PuzzleState([
        //             [1, 2, 3, 4],
        //             [5, 6, 7, 8],
        //             [0, 9, 11, 12],
        //             [13, 14, 10, 15]
        //         ]);
        //         expect(puzzle.simplePuzzleScore()).toEqual(4);
        //     });

        //     it("should return 5 for 5 moves", () => {
        //         const puzzle = new PuzzleState([
        //             [1, 2, 3, 4],
        //             [5, 6, 7, 8],
        //             [9, 11, 0, 12],
        //             [13, 14, 10, 15]
        //         ]);
        //         expect(puzzle.simplePuzzleScore()).toEqual(
        //             5
        //         );
    });
});
