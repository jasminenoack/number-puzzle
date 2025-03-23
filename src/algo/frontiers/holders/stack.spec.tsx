import { PuzzleState } from "../../puzzle/puzzle";
import { Stack } from "./stack";
describe("stack", () => {
    describe("push", () => {
        it("should add an item to the stack", () => {
            const stack = new Stack();
            stack.push(new PuzzleState(null, 4));
            expect(stack.size()).toEqual(1);
        });

        it("should allow adding multiple items to the stack", () => {
            const stack = new Stack();
            stack.push(new PuzzleState(null, 4));
            stack.push(new PuzzleState(null, 4));
            expect(stack.size()).toEqual(2);
        }
        );
    });
    describe("pop", () => {
        it("should remove an item from the stack", () => {
            const stack = new Stack();
            stack.push(new PuzzleState(null, 4));
            stack.pop();
            expect(stack.size()).toEqual(0);
        });

        it('should return items in LIIFO order', () => {
            const stack = new Stack();
            const item1 = new PuzzleState(null, 4);
            const item2 = new PuzzleState(null, 4);
            const item3 = new PuzzleState(null, 4);
            stack.push(item1);
            stack.push(item2);
            stack.push(item3);
            expect(stack.pop()).toEqual(item3);
            expect(stack.pop()).toEqual(item2);
            expect(stack.pop()).toEqual(item1);
        });
    });
    describe("peek", () => {
        it("should return the top item from the stack", () => {
            const stack = new Stack();
            const item1 = new PuzzleState(null, 4);
            stack.push(item1);
            expect(stack.peek()).toEqual(item1);
        });

        it("should peek the top item without removing it", () => {
            const stack = new Stack();
            const item1 = new PuzzleState(null, 4);
            const item2 = new PuzzleState(null, 4);
            const item3 = new PuzzleState(null, 4);
            stack.push(item1);
            stack.push(item2);
            stack.push(item3);
            expect(stack.peek()).toEqual(item3);
            expect(stack.size()).toEqual(3);
        })
    });
    describe("isEmpty", () => {
        it("should return true if the stack is empty", () => {
            const stack = new Stack();
            expect(stack.isEmpty()).toEqual(true);
        });

        it('should be empty after popping all items', () => {
            const stack = new Stack();
            const item1 = new PuzzleState(null, 4);
            const item2 = new PuzzleState(null, 4);
            stack.push(item1);
            stack.push(item2);
            stack.pop();
            stack.pop();
            expect(stack.isEmpty()).toEqual(true);
        })
    });
    describe("size", () => {
        it("should return the size of the stack", () => {
            const stack = new Stack();
            const item1 = new PuzzleState(null, 4);
            const item2 = new PuzzleState(null, 4);
            stack.push(item1);
            stack.push(item2);
            expect(stack.size()).toEqual(2);
        });
    });
}
);
