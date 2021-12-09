/* Convert input string into a two-dimensional array of integers. */

const inputArray = inputString.split('\n').map(a => a.split('').map(a => parseInt(a)));

/* @localMin looks at a value in inputArray (which gets passed as the topArray)
and determines whether it is a local minimum. Returns a boolean. Used in @localMinAndNineMap.*/

const localMin = (topArray, topIndex, rowIndex) => {
    let value = topArray[topIndex][rowIndex];
    let rowArray = topArray[topIndex];
    return (topIndex == 0 || value < topArray[topIndex - 1][rowIndex]) &&
            (topIndex == topArray.length - 1 || value < topArray[topIndex + 1][rowIndex]) && 
            (rowIndex == 0 || rowArray[rowIndex] < rowArray[rowIndex - 1]) && 
            (rowIndex == rowArray.length - 1 || rowArray[rowIndex] < rowArray[rowIndex + 1]);
}

/* @localMinAndNineMap returns an array that does two things: (1) number all of the 
local minima (starting at 10 to avoid issues since we'll keep the 9s),
and (2) replace each number that is not a local minimum or a 9 with a zero. */

const localMinAndNineMap = (topArray) => {
    let mapArray = [...topArray.map(a => a.filter(b => b == b))];
    let incrementer = 10;
    for (let i = 0; i < topArray.length; i++) {
        for (let j = 0; j < topArray[i].length; j++) {
            if (localMin(topArray, i, j)){
                mapArray[i][j] = incrementer;
                incrementer++
            } else if (topArray[i][j] != 9) {
                mapArray[i][j] = 0;
            }
        }
    }
    return mapArray;
}

/* @basinFill is the workhorse for part 2. It iterates over an array and spreads all
numbers greater than 10 until they run into 9s. In other words, it fills out the basins from
their respective local minima when you pass the array you get from localMinAndNineMap. */

const basinFill = (mapToFill) => {
    let filledMap = [...mapToFill.map(a => a.filter(b => b == b))];
    let indicator = true;
    while (indicator == true) {
        indicator = false;
        for (let i = 0; i < filledMap.length; i++) {
            for (let j = 0; j < filledMap[i].length; j++) {
                if (filledMap[i][j] > 9) {
                    let current = filledMap[i][j];
                    if (i - 1 >= 0 && filledMap[i-1][j] == 0) {
                        filledMap[i - 1][j] = current;
                        indicator = true;
                    }
                    if (i + 1 < filledMap.length && filledMap[i + 1][j] == 0) {
                        filledMap[i + 1][j] = current;
                        indicator = true;
                    }
                    if (j + 1 < filledMap[i].length && filledMap[i][j + 1] == 0) {
                        filledMap[i][j + 1] = current;
                        indicator = true;
                    }
                    if (j - 1 >= 0 && filledMap[i][j - 1] == 0) {
                        filledMap[i][j - 1] = current;
                        indicator = true;
                    }
                }
            }
        }
    }
    return filledMap;
}

/* @createBasinCellArray takes an array you get from @basinFill and converts it into 
a two-dimensional array that includes separate arrays for all of the basins. I was a 
little lazy here and just assumed there would be no more than 1,000 local minima. I think
there were actually less than 300 in my input. It might have been easier to do key-value pairs,
but I wanted to stick with arrays. */

const createBasinCellArray = (startArray) => {
    let topResult = [];
    for (let i = 10; i < 1000; i++) {
        let interimArray = [];
        for (let array of startArray) {
            for (let item of array) {
                if (item == i) {
                    interimArray.push(item);
                }
            }
        }
        topResult.push(interimArray);
    }
    return topResult.sort((a, b) => b.length - a.length)
}

/* The next two functions should have been combined into one. In essence,
the first takes the array returned by @createBasinCellArray and converts the second-level arrays
into their lengths, which are the basin sizes. The second function then multiplies the three largest
basin sizes to produce the answer. */

const solutionArray = (array) => {
    return createBasinCellArray(basinFill(localMinAndNineMap(array))).map(a => a.length);
}

const solution = (array) => {
    let arr = solutionArray(array);
    return arr[0] * arr[1] * arr[2];
}

console.log(solution(inputArray));



