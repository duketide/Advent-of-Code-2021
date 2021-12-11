const inputArray = inputString
    .split('\n')
    .map(a => a.split('').map(b => parseInt(b)));

const baseTurnIncrease = (twoDArray) => {
    return twoDArray.map(a => a.map(b => b + 1));
}

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