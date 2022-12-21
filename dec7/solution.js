import assert from 'assert';
import { isEqual, uniqueId } from 'lodash';

//run w/ npx nodemon -r esm solution.js

// Parse Data

const { readFileSync } = require('fs');

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/).map((string) => string);

  // console.log(arr);

  return arr;
};

const terminalLines = syncReadFile('./input.txt');

let fileSystem = {};
let currentFileSum = 0;
let path = [];

const check = (input) => {
  if (input[2] === 'c') return input.split(' ')[2];
  if (input[0].match(/[0-9]/gm)) return parseFloat(input.split(' ')[0]);
};

assert(undefined === check('dir a'));
assert(undefined === check('dir xyz'));
assert(undefined === check('$ ls'));
assert('b' === check('$ cd b'));
assert('xyz' === check('$ cd xyz'));
assert('..' === check('$ cd ..'));
assert(344324 === check('344324 c.txt'));
assert(2 === check('2 d.txt'));

const getPathString = (path) => path.join(',');

const handleAddFileSums = () => {
  const pathString = getPathString(path);
  if (!fileSystem[pathString]) fileSystem[pathString] = { sum: 0 };

  for (let i = path.length; i > 0; i--) {
    let dir = path.slice(0, i).toString();
    fileSystem[dir].sum += currentFileSum;
  }

  currentFileSum = 0;
};

const handlecd = (input) => {
  if (input === '..') {
    path.pop();
  } else if (input === '/') {
    path = ['/'];
  } else {
    path.push(input);
  }
};

terminalLines.forEach((line) => {
  //handles EOF
  if (line === '') return handleAddFileSums();

  const checkedLine = check(line);

  if (checkedLine === undefined) return;
  else if (typeof checkedLine === 'number') currentFileSum += checkedLine;
  else {
    handleAddFileSums();
    handlecd(checkedLine);
  }
});

const solution = Object.values(fileSystem)
  .map((sum) => {
    return sum.sum;
  })
  .filter((fileSize) => fileSize <= 100000)
  .reduce((acc, curr) => {
    return acc + curr;
  });

console.log('solution:', solution);
//1315285
