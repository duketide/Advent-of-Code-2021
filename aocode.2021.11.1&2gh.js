/* Convert input into 2D array of integers. */

const inputArray = inputString
    .split('\n')
    .map(a => a.split('').map(b => parseInt(b)));

/* Increase each tile by 1. Don't worry about flashes yet. */

const baseTurnIncrease = (twoDArray) => {
    return twoDArray.map(a => a.map(b => b + 1));
}

/* @flash iterates over the array tallying flashes, setting flashed
vertices to zero, and increasing each adjacent vertex by one (unless it equals zero).
The while loop terminates after the first pass with no flashes. The function returns the 
final array and the score. @solver below can take the array returned by @flash and pass it
back to @baseTurnIncrease and @flash for successive steps.*/

const flash = (postBaseTurnArray) => {
    let arr = postBaseTurnArray.map(a => a.filter(b => true));
    let score = 0;
    let flashed = true;
    while (flashed === true) {
        flashed = false;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] > 9) {
                    arr[i][j] = 0;
                    score += 1;
                    flashed = true;
                    let up = i - 1 >= 0;
                    let down = i + 1 < arr.length;
                    let right = j + 1 < arr[i].length;
                    let left = j - 1 >= 0;
                    if (up && arr[i-1][j] != 0) {
                        arr[i-1][j] += 1 
                    }
                    if (down && arr[i+1][j] != 0) {
                        arr[i+1][j] += 1 
                    }
                    if (left && arr[i][j-1] != 0) {
                    arr[i][j-1] += 1 
                    }
                    if (right && arr[i][j+1] != 0) {
                        arr[i][j+1] += 1 
                    }
                    if (up && left && arr[i-1][j-1] != 0) {
                        arr[i-1][j-1] += 1;
                    }
                    if (up && right && arr[i-1][j+1] != 0) {
                        arr[i-1][j+1] += 1;
                    }if (down && left && arr[i+1][j-1] != 0) {
                        arr[i+1][j-1] += 1;
                    }if (down && right && arr[i+1][j+1] != 0) {
                        arr[i+1][j+1] += 1;
                    }
                }
            }
        }
    }
    return [score, arr];
}

/* @solver returns a string stating the number of flashes that occur for the
given number of steps if partTwo is false. If partTwo is true, it returns a string
giving the number of the first step for which all vertices flash. */

const solver = (array, numSteps, partTwo=false) => {
    let score = 0;
    let interimArray = array.map(a => a.filter(b => true));
    for (let i = 0; partTwo ? true : i < numSteps; i++) {
        let turnData = flash(baseTurnIncrease(interimArray));
        if (partTwo && turnData[0] == array.reduce((a,b) => a + b.length, 0)) {
            return `The first simultaneous flash occurs on step ${i + 1}.`;
        }
        score += turnData[0];
        interimArray = turnData[1];
    }
    return `The total flashes for ${numSteps} steps are ${score}.`;
}

console.log(solver(inputArray, 100));
console.log(solver(inputArray, Infinity, true));