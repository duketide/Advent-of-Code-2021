const inputArray = inputString.split('\n').map(a => a.split(''));
const openChars = ['(', '[', '<', '{'];
const closeChars = [')', ']', '>', '}'];
let scoreArray = [];
for (let line of inputArray) {
    let closeOrder = [];
    for (let char of line) {
        if (openChars.includes(char)) {
            closeOrder.unshift(closeChars[openChars.indexOf(char)]);
        } else if (char == closeOrder[0]) {
            closeOrder.shift()
        } else {
            scoreArray.push(char);
            break;
        }
    }
}
console.log(scoreArray.map(a => a == ')' ? 3 : a == ']' ? 57 : a == '}' ? 1197 : a== '>' ? 25137 : 0).reduce((a, b) => a + b))
