//Create 2D array of coordinate pairs.

const inputVertices = inputString
    .split('\n\n')[0]
    .split('\n')
    .map(a => a.split(','))
    .map(a => a.map(b => parseInt(b)));

//Create 2D array of fold lines. Each sub-array has 'x' or 'y' for first element and applicable coordinate for the second.

const inputFolds = inputString
    .split('\n\n')[1]
    .split('\n')
    .map(a => a.split(' along '))
    .map(a => a[1]).map(a => a.split('='))
    .map(a => [a[0], parseInt(a[1])]);

//@xFold folds a point over a vertical line.

const xFold = (point, foldLine) => {
    let newX = point[0] + (2 * (foldLine - point[0]));
    return point[0] > foldLine ? [newX, point[1]] : point;
}

//@yFold folds a point over a horizontal line.

const yFold = (point, foldLine) => {
    let newY = point[1] + (2 * (foldLine - point[1]));
    return point[1] > foldLine ? [point[0], newY] : point;
}

//@paperFolder folds all points in an array over one fold line.

const paperFolder = (vertices, foldLine) => {
    return vertices.map(a => foldLine[0] == 'x' ? xFold(a, foldLine[1]) : yFold(a, foldLine[1]));
}

//@duplicateRemover removes duplicate coordinate pairs from an array of coordinate pair arrays.

const duplicateRemover = (array) => {
    let newArray = [];
    for (let item of array) {
        if (!newArray.some(a => a[0] == item[0] && a[1] == item[1])) {
            newArray.push(item);
        }
    }
    return newArray;
}

//Part 1 solution.

console.log(duplicateRemover(paperFolder(inputVertices, inputFolds[0])).length);

//@multiFolder folds all points in an array over multiple fold lines.

const multiFolder = (initVertices, folds) => {
    let interimVertices = initVertices.map(a => a.filter(b => true));
    for (let item of folds) {
        interimVertices = paperFolder(interimVertices, item);
    }
    return interimVertices;
}

//@codeArray plots points in a 2D array. I hard-coded 6 and 40 because they were the final y and x folds, respectively, in my input.
//I switched the x and y coordinate ordering in the messageArray to make the printout look right.

const codeArray = (vertexArray) => {
    let messageArray = new Array(6).fill(' ').map(a => Array(40).fill(' '));
    vertexArray.forEach(a => messageArray[a[1]][a[0]] = '#');
    return messageArray;
}

//Part 2 solution. Generate vertices with @multifolder and plot them with @codeArray. Print each line.
//I didn't bother removing duplicate vertices for the part 2 solution.

codeArray(multiFolder(inputVertices, inputFolds)).forEach(a => console.log(a.join('')));