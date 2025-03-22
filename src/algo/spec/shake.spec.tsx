import { fisherYates } from "../shake";

describe("shake", () => {
    it("should return a shuffled version of the matrix", () => {
        // this is technically flaky there is a 
        // there is a 1 in 16! chance that the output is the same as the input
        // but it is unlikely, just save and run again in that case for now
        const input = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 0]
        ];
        const output = fisherYates(input);
        expect(output).not.toEqual(input);
        expect(output.length).toEqual(input.length);
        expect(output[0].length).toEqual(input[0].length);
    }
    );
});
