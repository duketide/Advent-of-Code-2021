/* Convert input string into a two-dimensional array of integers. */

const inputArray = inputString.split('\n').map(a => a.split('').map(a => parseInt(a)));

/* @localMin looks at a value in inputArray (which gets passed as the topArray)
and determines whether it is a local minimum. Returns a boolean. Used in @scoreMins.*/

const localMin = (topArray, topIndex, rowIndex) => {
    let value = topArray[topIndex][rowIndex];
    let rowArray = topArray[topIndex];
    return (topIndex == 0 || value < topArray[topIndex - 1][rowIndex]) &&
            (topIndex == topArray.length - 1 || value < topArray[topIndex + 1][rowIndex]) && 
            (rowIndex == 0 || rowArray[rowIndex] < rowArray[rowIndex - 1]) && 
            (rowIndex == rowArray.length - 1 || rowArray[rowIndex] < rowArray[rowIndex + 1]);
}

/* @scoreMins puts the number for each local minimum into an array.
I reduce the array as part of the final console.log(), although that could
have been done here. */

const scoreMins = (twoDimensionalArray) => {
    let minsList = []
    for (let i = 0; i < twoDimensionalArray.length; i++) {
        for (let j = 0; j < twoDimensionalArray[i].length; j++) {
            if (localMin(twoDimensionalArray, i, j)) {
                minsList.push(twoDimensionalArray[i][j]);
            }
        }
    }
    return minsList;
}

console.log(scoreMins(inputArray).reduce((a, b) => a + b + 1, 0));