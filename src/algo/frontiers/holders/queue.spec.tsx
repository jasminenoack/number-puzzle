import { PuzzleState } from "../../puzzle/puzzle";
import { Queue } from "./queue";

describe("queue", () => {
    describe("push", () => {
        it("should add an item to the queue", () => {
            const queue = new Queue();
            queue.push(new PuzzleState(null, 4));
            expect(queue.size()).toEqual(1);
        });

        it("should allow adding multiple items to the queue", () => {
            const queue = new Queue();
            queue.push(new PuzzleState(null, 4));
            queue.push(new PuzzleState(null, 4));
            expect(queue.size()).toEqual(2);
        }
        );
    });
    describe("pop", () => {
        it("should remove an item from the queue", () => {
            const queue = new Queue();
            queue.push(new PuzzleState(null, 4));
            queue.pop();
            expect(queue.size()).toEqual(0);
        });

        it('should return items in FIFO order', () => {
            const queue = new Queue();
            const item1 = new PuzzleState(null, 4);
            const item2 = new PuzzleState(null, 4);
            const item3 = new PuzzleState(null, 4);
            queue.push(item1);
            queue.push(item2);
            queue.push(item3);
            expect(queue.pop()).toEqual(item1);
            expect(queue.pop()).toEqual(item2);
            expect(queue.pop()).toEqual(item3);
        });
    });
    describe("peek", () => {
        it("should return the top item from the queue", () => {
            const queue = new Queue();
            const item1 = new PuzzleState(null, 4);
            queue.push(item1);
            expect(queue.peek()).toEqual(item1);
        });

        it("should peek the top item without removing it", () => {
            const queue = new Queue();
            const item1 = new PuzzleState(null, 4);
            const item2 = new PuzzleState(null, 4);
            const item3 = new PuzzleState(null, 4);
            queue.push(item1);
            queue.push(item2);
            queue.push(item3);
            expect(queue.peek()).toEqual(item1);
            expect(queue.size()).toEqual(3);
        })
    });
    describe("isEmpty", () => {
        it("should return true if the queue is empty", () => {
            const queue = new Queue();
            expect(queue.isEmpty()).toEqual(true);
        });

        it('should be empty after popping all items', () => {
            const queue = new Queue();
            const item1 = new PuzzleState(null, 4);
            const item2 = new PuzzleState(null, 4);
            const item3 = new PuzzleState(null, 4);
            queue.push(item1);
            queue.push(item2);
            queue.push(item3);
            queue.pop();
            queue.pop();
            queue.pop();
            expect(queue.isEmpty()).toEqual(true);

        })
    });
    describe("size", () => {
        it("should return the size of the queue", () => {
            const queue = new Queue();
            const item1 = new PuzzleState(null, 4);
            queue.push(item1);
            expect(queue.size()).toEqual(1);

        });
    });
}
);
