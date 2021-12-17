// Add hex input here with the binding inputString.

const hexToBinString = `0 = 0000
1 = 0001
2 = 0010
3 = 0011
4 = 0100
5 = 0101
6 = 0110
7 = 0111
8 = 1000
9 = 1001
A = 1010
B = 1011
C = 1100
D = 1101
E = 1110
F = 1111`;

// Create a reference object for hex-to-binary conversion. 

const hexToBin = {};

hexToBinString.split('\n').map(a => a.split(' = ')).forEach(b => hexToBin[b[0]] = b[1]);

// Create a flat array of the input converted to binary.

const inputBinary = inputString.split('').map(a => hexToBin[a].split('')).flat();

/* @packetFinder finds the three types of packets (literal, operational 
(# characters specified), operational (# sub-packets specified)). */

const packetFinder = (arr) => {
    let packetArray = [];
    
//The first section identified literals.
    
    if (arr.slice(3, 6).join('') == '100') {
        packetArray = packetArray.concat(arr.slice(0, 6));
        let flag = false;
        while (flag == false) {
            let chunk = arr.slice(packetArray.length, packetArray.length + 5);
            packetArray = packetArray.concat(chunk);
            flag = chunk[0] == '0' ? true : false;
        }
    } else {
        packetArray = packetArray.concat(arr.slice(0, 7));
        
//This section identifies operationals specifying character count.
        
        if (packetArray[6] == '0') {
            let bitLength = parseInt(arr.slice(7, 22).join(''), 2);
            packetArray = packetArray.concat(arr.slice(7, 22));
            let newArr = arr.slice(22, 22 + bitLength);
            while (newArr.length > 0) {
                let subIter = packetFinder(newArr);
                let subPacket = subIter['packet'];
                packetArray.push(subPacket);
                newArr = subIter['newArray'];
            }

//This section identifies operationals specifying number of sub-packets.

        } else {
            let subNum = parseInt(arr.slice(7, 18).join(''), 2);
            packetArray = packetArray.concat(arr.slice(7, 18));
            let yonArray = arr.slice(packetArray.flat(100).length);
            for (let i = 0; i < subNum; i++) {
                let iteration = packetFinder(yonArray);
                packetArray.push(iteration['packet']);
                yonArray = iteration['newArray'];
            }
            
        }
    }
    return {'packet': packetArray, 'newArray': arr.slice(packetArray.flat(100).length)};
}

/* @packetFindIter calls @packetFinder until the whole binary input flat array 
has been turned into a system of nested arrays reflecting the packet hierarchy.
The system of nested arrays is returned and stored in the inputArray binding below.
With my input, the zero-padding part created a superfluous second-level array
at the end with two zeros and two undefined elements. It didn't affect the output
for my input or any of the sample inputs, but ideally it would be fixed. */

const packetFindIter = (arr) => {
    let totalPacketArray = [];
    while (arr.length > 0) {
        let iteration = packetFinder(arr);
        arr = iteration['newArray'];
        let newPacketArray = iteration['packet'];
        while (newPacketArray.flat().length % 4 != 0) {
            newPacketArray.push(arr.shift());
        }
        totalPacketArray.push(newPacketArray);
    }
    return totalPacketArray;
}

const inputArray = packetFindIter(inputBinary);

// @versionCounter goes through inputArray and tallies the version numbers.

const versionCounter = (arr) => {
    let result = 0;
    for (item of arr) {
        if (typeof(item) == 'object' && item.length > 0) {
            let a = item.slice(0, 3);
            let count = parseInt(a.join(''), 2);
            let sub = versionCounter(item);
            result += (count + sub);

        }
    }
    return result;
}

// Part 1 solution.

console.log(`The part 1 solution is ${versionCounter(inputArray)}.`);

/* @findValue goes through inputArray and performs the operations
specified by the part 2 instructions using plenty of recursion. */

const findValue = (arr) => {
    let result = 0;
    if (arr.slice(3, 6).join('') == '100') {
        let resultArray = [];
        for (let i = 6; true; i += 5) {
            resultArray.push(arr.slice(i + 1, i +5).join(''));
            if (arr[i] == '0') {
                break;
            }
        }
        result = parseInt(resultArray.join(''), 2);
    } else if (arr.slice(3, 6).join('') == '000') {
        arr.forEach(a => {
            if (typeof(a) == 'object') {
                result += findValue(a);
            }
        })
    } else if (arr.slice(3, 6).join('') == '001') {
        result = 1;
        arr.forEach(a => {
            if (typeof(a) == 'object') {
                result *= findValue(a);
            }
        })
    } else if (arr.slice(3, 6).join('') == '010') {
        let compareArray = [];
        arr.forEach(a => {
            if (typeof(a) == 'object') {
                compareArray.push(findValue(a));
            }
        })
        result = compareArray.sort((a, b) => a - b)[0];
    } else if (arr.slice(3, 6).join('') == '011') {
        let compareArray = [];
        arr.forEach(a => {
            if (typeof(a) == 'object') {
                compareArray.push(findValue(a));
            }
        })
        result = compareArray.sort((a, b) => b - a)[0];
    } else if (arr.slice(3, 6).join('') == '101') {
        let compareArray = [];
        arr.forEach(a => {
            if (typeof(a) == 'object') {
                compareArray.push(findValue(a));
            }
        })
        result = compareArray[0] > compareArray[1] ? 1 : 0;
    } else if (arr.slice(3, 6).join('') == '110') {
        let compareArray = [];
        arr.forEach(a => {
            if (typeof(a) == 'object') {
                compareArray.push(findValue(a));
            }
        })
        result = compareArray[0] < compareArray[1] ? 1 : 0;
    } else if (arr.slice(3, 6).join('') == '111') {
        let compareArray = [];
        arr.forEach(a => {
            if (typeof(a) == 'object') {
                compareArray.push(findValue(a));
            }
        })
        result = compareArray[0] == compareArray[1] ? 1 : 0;
    }
    return result;
}

console.log(`The part 2 solution is ${findValue(inputArray[0])}.`);