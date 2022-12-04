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

let sackArray = syncReadFile('./input.txt');

//label w priorities
//Lowercase item types a through z have priorities 1 through 26.
//Uppercase item types A through Z have priorities 27 through 52.

//create alphabet indexes
const alpha = Array.from(Array(26))
  .map((e, i) => i + 97)
  .concat(Array.from(Array(26)).map((e, i) => i + 65));
const alphabet = alpha.map((x) => String.fromCharCode(x));

//Problem 1

let commonElements = sackArray.map((sack) => {
  //split sacks into even halves
  const halfSack = sack.length / 2;
  let halfOne = sack.slice(0, halfSack).split('');
  let halfTwo = sack.slice(halfSack).split('');

  //find common element (case sensitive)
  const commonElement = halfOne.find((letter) => {
    return halfTwo.includes(letter);
  });

  //find priority
  return alphabet.indexOf(commonElement) + 1;
});

//sum priorities
const sumPriorities = commonElements.reduce((acc, curr) => acc + curr, 0);

console.log(sumPriorities);

//Problem 2

let groupPriority = 0;

for (let i = 0; i < sackArray.length; i += 3) {
  //set up arrays of 3 elves
  let groupOfThree = sackArray.slice(i, i + 3);

  if (groupOfThree.length != 3) {
    break;
  }

  //find common element
  const commonElement = groupOfThree[0]
    .split('')
    .filter((letter1) => {
      return groupOfThree[1].split('').includes(letter1);
    })
    .find((letter2) => {
      return groupOfThree[2].split('').includes(letter2);
    });

  //find priority
  //add to priorities
  groupPriority += alphabet.indexOf(commonElement) + 1;
}

console.log(groupPriority);
