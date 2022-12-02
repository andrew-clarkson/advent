// parse data
const { readFileSync } = require('fs');

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/).map((string) => {
    return parseInt(string);
  });

  return arr;
};

let numbersArray = syncReadFile('./dec1input.txt');

// Problem 1

let largest = 0;
let accumulator = 0;

numbersArray.forEach((number) => {
  if (isNaN(number)) {
    if (accumulator > largest) {
      largest = accumulator;
    }
    accumulator = 0;
  } else {
    accumulator += number;
  }
});

console.log(largest);
// 72602

// Problem 2

let first = 0;
let second = 0;
let third = 0;

let accumulator2 = 0;

numbersArray.forEach((inputline) => {
  if (Number.isInteger(inputline)) {
    accumulator2 += inputline;
  } else {
    if (accumulator2 > first) {
      [third, second, first] = [second, first, accumulator2];
    } else if (accumulator2 > second) {
      third = second = accumulator2;
    } else if (accumulator2 > third) {
      third = accumulator2;
    }
    accumulator2 = 0;
  }
});

console.log(first, second, third);
let topThree = first + second + third;
console.log(topThree);
// 207410
