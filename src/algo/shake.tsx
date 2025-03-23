/*
source: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

The Fisher–Yates shuffle, also known as the Knuth shuffle, 
is an algorithm for shuffling a finite sequence. 
The algorithm takes a list of all the elements of the sequence, 
and continually determines the next element in the shuffled 
sequence by randomly drawing an element from the list until 
no elements remain. 

The algorithm produces an unbiased permutation: 
every permutation is equally likely. The modern version of 
the algorithm takes time proportional to the number of items 
being shuffled and shuffles them in place.
*/

export function fisherYates(array: number[][]): number[][] {
    var rowLength = array[0].length;
    var height = array.length;
    if (height !== rowLength) {
        throw new Error("Not square");
    }
    for (var i = 0; i < height; i++) {
        if (array[i].length !== rowLength) {
            throw new Error("Row lengths are not equal");
        }
    }

    var flatArray = array.flat();

    var newFlatArray = []
    while (flatArray.length) {
        var randomIndex = Math.floor(Math.random() * flatArray.length);
        newFlatArray.push(flatArray[randomIndex]);
        flatArray.splice(randomIndex, 1);
    }

    var newMatrix = [];

    for (var i = 0; i < newFlatArray.length; i += rowLength) {
        newMatrix.push(newFlatArray.slice(i, i + rowLength));
    }
    return newMatrix;
}
