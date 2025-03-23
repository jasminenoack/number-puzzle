import { PuzzleState } from "../../puzzle/puzzle";
import { SimpleGreedy } from "./greedy";
import { Node } from "../../frontiers/frontier";

describe("SimpleGreedy", () => {
    describe("push", () => {
        it("should add an item to the greedy", () => {
            const greedy = new SimpleGreedy();
            greedy.push(new Node(new PuzzleState(null, 4), null, 1));
            expect(greedy.size()).toEqual(1);
        });

        it("should allow adding multiple items to the greedy", () => {
            const greedy = new SimpleGreedy();
            greedy.push(new Node(new PuzzleState(null, 4), null, 1));
            greedy.push(new Node(new PuzzleState(null, 4), null, 1));
            expect(greedy.size()).toEqual(2);
        }
        );
    });
    describe("pop", () => {
        it("should remove an item from the greedy", () => {
            const greedy = new SimpleGreedy();
            greedy.push(new Node(new PuzzleState(null, 4), null, 1));
            greedy.pop();
            expect(greedy.size()).toEqual(0);
        });

        it('should return the items by lowest score order', () => {
            const greedy = new SimpleGreedy();
            const item1 = new Node(new PuzzleState([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 0]
            ], 3), null, 1);
            const item2 = new Node(new PuzzleState([
                [1, 2, 3],
                [0, 4, 5],
                [7, 8, 6]
            ], 3), null, 1);
            const item3 = new Node(new PuzzleState([
                [1, 2, 3],
                [4, 5, 6],
                [7, 0, 8]
            ], 3), null, 1);
            greedy.push(item1);
            greedy.push(item2);
            greedy.push(item3);
            expect(greedy.pop()).toEqual(item1);
            expect(greedy.pop()).toEqual(item3);
            expect(greedy.pop()).toEqual(item2);
        });
    });
    describe("peek", () => {
        it("should return the top item from the greedy", () => {
            const greedy = new SimpleGreedy();
            const item1 = new Node(new PuzzleState(null, 4), null, 1);
            greedy.push(item1);
            expect(greedy.peek()).toEqual(item1);
        });

        it("should peek the top item without removing it", () => {
            const greedy = new SimpleGreedy();
            const item1 = new Node(new PuzzleState([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 0]
            ], 3), null, 1);
            const item2 = new Node(new PuzzleState([
                [1, 2, 3],
                [0, 4, 5],
                [7, 8, 6]
            ], 3), null, 1);
            const item3 = new Node(new PuzzleState([
                [1, 2, 3],
                [4, 5, 6],
                [7, 0, 8]
            ], 3), null, 1);
            greedy.push(item1);
            greedy.push(item2);
            greedy.push(item3);
            expect(greedy.peek()).toEqual(item1);
            expect(greedy.size()).toEqual(3);
        })
    });
    describe("isEmpty", () => {
        it("should return true if the greedy is empty", () => {
            const greedy = new SimpleGreedy();
            expect(greedy.isEmpty()).toEqual(true);
        });

        it('should be empty after popping all items', () => {
            const greedy = new SimpleGreedy();
            const item1 = new Node(new PuzzleState(null, 4), null, 1);
            const item2 = new Node(new PuzzleState(null, 4), null, 1);
            const item3 = new Node(new PuzzleState(null, 4), null, 1);
            greedy.push(item1);
            greedy.push(item2);
            greedy.push(item3);
            greedy.pop();
            greedy.pop();
            greedy.pop();
            expect(greedy.isEmpty()).toEqual(true);

        })
    });
    describe("size", () => {
        it("should return the size of the greedy", () => {
            const greedy = new SimpleGreedy();
            const item1 = new Node(new PuzzleState(null, 4), null, 1);
            greedy.push(item1);
            expect(greedy.size()).toEqual(1);

        });
    });
}
);
