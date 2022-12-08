import assert from 'assert';

// Parse Data

const { readFileSync } = require('fs');

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/).map((string) => {
    return string;
  });

  // console.log(arr);

  return arr;
};

let sectionAssignments = syncReadFile('./input.txt');

const splitIntoNumbersArray = (input) => {
  return input.match(/\d+/gm).map(parseFloat);
};

assert.deepEqual([2, 4, 6, 8], splitIntoNumbersArray('2-4,6-8'));
assert.deepEqual([6, 6, 4, 6], splitIntoNumbersArray('6-6,4-6'));
assert.deepEqual([9, 199, 7, 59], splitIntoNumbersArray('9-199,7-59'));

const isFullyContained = ([a1, a2, b1, b2]) => {
  // const [a1, a2, b1, b2] = [...splitSections]; //moved into args - destructured
  // if ((a1 >= b1 && a2 <= b2) || (b1 >= a1 && b2 <= a2)) return true;
  // else return false;
  //refactored below to remove redundancy
  return (a1 >= b1 && a2 <= b2) || (b1 >= a1 && b2 <= a2);
  //refactored further - this didnt work (see extra test cases) but keeping for my notes:
  // return a1 >= b1 == a2 <= b2; //CHECK THIS SOMETHING IS CHANGING TO A DIFF ANSWER
};

assert(false === isFullyContained([2, 4, 6, 8]));
assert(false === isFullyContained([10, 15, 67, 99]));
assert(false === isFullyContained([10, 15, 12, 19]));
assert(true === isFullyContained([3, 4, 2, 8]));
assert(true === isFullyContained([45, 59, 1, 87]));
assert(true === isFullyContained([23, 59, 27, 43]));
//additional test cases for situations where outside # is same in both a and b group
assert(true === isFullyContained([2, 5, 3, 5]));
assert(true === isFullyContained([17, 29, 17, 20]));

const solution1 = sectionAssignments
  .filter((section) => section !== '')
  .map((section) => {
    // if (section == '') return 0; //moved to filter
    if (isFullyContained(splitIntoNumbersArray(section))) {
      return 1;
    } else return 0;
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(solution1);

//Problem2

const isAnyOverlap = ([a1, a2, b1, b2]) => {
  // const [a1, a2, b1, b2] = [...splitSections]; moved into args

  //no overlap
  if (
    (a1 > b2 && a2 > b2) ||
    (a1 < b1 && a2 < b1) ||
    (b1 < a1 && b2 < a1) ||
    (b1 > a2 && b2 > a2)
  ) {
    return 0;
  }
  return 1;

  //full overlap
  // return (a1 >= b1 && a2 <= b2) || (b1 >= a1 && b2 <= a2);

  // //partial overlap
  // if ((a2 > b1 && b1 > a1) || (b2 > a1 && a1 > b1)) {
  //   return 1;
  // }
};

assert(0 === isAnyOverlap([2, 4, 5, 8]));
assert(0 === isAnyOverlap([5, 8, 2, 4]));
assert(1 === isAnyOverlap([2, 4, 1, 8]));
assert(1 === isAnyOverlap([1, 8, 2, 4]));
assert(1 === isAnyOverlap([2, 6, 5, 8]));
assert(1 === isAnyOverlap([5, 8, 2, 6]));
assert(1 === isAnyOverlap([2, 5, 3, 5]));
assert(1 === isAnyOverlap([3, 5, 2, 5]));
assert(1 === isAnyOverlap([2, 5, 2, 7]));
assert(1 === isAnyOverlap([2, 7, 2, 5]));
assert(1 === isAnyOverlap([2, 5, 2, 5]));

const solution2 = sectionAssignments
  .filter((section) => section !== '')
  .map((section) => {
    return isAnyOverlap(splitIntoNumbersArray(section));
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(solution2);
