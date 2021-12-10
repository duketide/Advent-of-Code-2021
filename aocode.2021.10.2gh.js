const inputArray = inputString.split('\n').map(a => a.split(''));
const openChars = ['(', '[', '<', '{'];
const closeChars = [')', ']', '>', '}'];
let rawScoreArray = [];
for (let line of inputArray) {
    let incomplete = true;
    let closeOrder = [];
    for (let char of line) {
        if (openChars.includes(char)) {
            closeOrder.unshift(closeChars[openChars.indexOf(char)]);
        } else if (char == closeOrder[0]) {
            closeOrder.shift()
        } else {
            incomplete = false;
        }
    }
    if (incomplete) {
        rawScoreArray.push(closeOrder);
    }
}
const scoreArray = rawScoreArray.map(a => a.map(b => b == ')' ? 1 : b == ']' ? 2 : b == '}' ? 3 : b == '>' ? 4 : 0).reduce((c, d) => (c *5) + d), 0).sort((e, f) => e - f);
console.log(scoreArray[Math.floor(scoreArray.length/2)]);