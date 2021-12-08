/* Convert data in the form of multi-line string into a multi-dimensional array. First level holds all the left-right pairs.
Second level holds left and right. Third level holds groups of letters. Fourth level holds individual letters. 
Fourth-level arrays are sorted alphabetically.*/

const inputArray = inputString.split("\n").map(a => a.split(" | ").map(b => b.split(" ").map(a => a.split('').sort())));

/* Create key-value pairs from the left side. The values are strings.*/

const leftIdentify = (testArray) => {
    let leftArray = testArray.sort((a, b) => a.length - b.length);
    let leftObject = {};
    leftObject[leftArray[0].join('')] = "1";
    leftObject[leftArray[1].join('')] = "7";
    leftObject[leftArray[2].join('')] = "4";
    leftObject[leftArray[9].join('')] = "8";
    for (let i = 3; i < 9; i++) {
        let current = leftArray[i];
        if (current.length == 6) {
            if (leftArray[2].every(a => current.includes(a))) {
                leftObject[current.join('')] = "9";
            } else if (leftArray[1].every(a => current.includes(a))) {
                leftObject[current.join('')] = "0";
            } else {
                leftObject[current.join('')] = "6";
            }
        } else {
            if (leftArray[1].every(a => current.includes(a))) {
                leftObject[current.join('')] = "3";
            } else if (leftArray[2].filter(a => current.includes(a)).length == 3) {
                leftObject[current.join('')] = "5";
            } else {
                leftObject[current.join('')] = "2";
            }
        }
    }
    return leftObject;
}

/* Decipher a multi-dimensional array of groups of letters based on a letter-to-number cipher object (i.e., the kind of object returned by leftIdentify). */

const rightIdentify = (cipher, rightArray) => {
    return rightArray.map(a => cipher[a.join('')]).join('');
}

/* Solution applies left-identify and right-identify to an array of left and right arrays and sums the right-side numbers.*/

const solution = (data) => {
   return data.map(a => parseInt(rightIdentify(leftIdentify(a[0]), a[1]))).reduce((a, b) => a + b);
}
console.log(solution(inputArray));