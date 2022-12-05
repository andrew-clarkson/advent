import assert from 'assert';
import { chunk, intersection } from 'lodash';

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

// let commonElements = sackArray.map((sack) => {
//   //split sacks into even halves
//   const halfSack = sack.length / 2;
//   let halfOne = sack.slice(0, halfSack).split('');
//   let halfTwo = sack.slice(halfSack).split('');

//   //find common element (case sensitive)
//   const commonElement = halfOne.find((letter) => {
//     return halfTwo.includes(letter);
//   });

//   //find priority
//   return alphabet.indexOf(commonElement) + 1;
// });

// //sum priorities
// const sumPriorities = commonElements.reduce((acc, curr) => acc + curr, 0);

// console.log(sumPriorities);

// //Problem 2

// let groupPriority = 0;

// for (let i = 0; i < sackArray.length; i += 3) {
//   //set up arrays of 3 elves
//   let groupOfThree = sackArray.slice(i, i + 3);

//   if (groupOfThree.length != 3) {
//     break;
//   }

//   //find common element
//   const commonElement = groupOfThree[0]
//     .split('')
//     .filter((letter1) => {
//       return groupOfThree[1].split('').includes(letter1);
//     })
//     .find((letter2) => {
//       return groupOfThree[2].split('').includes(letter2);
//     });

//   //find priority
//   //add to priorities
//   groupPriority += alphabet.indexOf(commonElement) + 1;
// }

// console.log(groupPriority);

const charRange = function (first, last) {
  const ret = [];
  //String.charCodeAt(index)
  let code = first.charCodeAt(0);
  while (code <= last.charCodeAt(0)) {
    //always String.fromCharCode(number) it's a static method of String
    ret.push(String.fromCharCode(code));
    code++;
  }
  return ret.join('');
};

assert('abcdef' == charRange('a', 'f'));
assert('ghijklmnopq' == charRange('g', 'q'));
assert('ABCDEFGHIJ' == charRange('A', 'J'));

// construct your alpha map
const alpha2 = charRange('a', 'z').concat(charRange('A', 'Z'));
// console.log(alpha2);

// can also hard code string
const alpha3 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const commonElementInSack = (sack) => {
  const halfSack = sack.length / 2;
  let halfOne = sack.slice(0, halfSack).split('');
  let halfTwo = sack.slice(halfSack).split('');
  return halfOne.find((letter) => {
    return halfTwo.includes(letter);
  });
};

assert('p', commonElementInSack('vJrwpWtwJgWrhcsFMMfFFhFp'));
assert('L', commonElementInSack('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL'));
assert('P', commonElementInSack('PmmdzqPrVvPwwTWBwg'));

// console.log(commonElement('vJrwpWtwJgWrhcsFMMfFFhFp'));

// assert.equal(
//   [
//     ['v', 'J', 'r', 'w', 'p', 'W', 't', 'w', 'J', 'g', 'W', 'r'],
//     ['h', 'c', 's', 'F', 'M', 'M', 'f', 'F', 'F', 'h', 'F', 'p'],
//   ],
//   splitSacks('vJrwpWtwJgWrhcsFMMfFFhFp')
// );

// const commonElement = (halfOne, halfTwo) => {
//   halfOne.find((letter) => {
//     return halfTwo.includes(letter);
//   });
// };

// assert('p' == commonElement(splitSacks('vJrwpWtwJgWrhcsFMMfFFhFp')));

const priority = (commonElement) => {
  return alpha2.indexOf(commonElement) + 1;
};

assert(16, priority('p'));
assert(38, priority('L'));
assert(42, priority('P'));
assert(22, priority('v'));

//sum priorities
// const sumPriorities = commonElements.reduce((acc, curr) => acc + curr, 0);

// console.log(sumPriorities);

const answer = sackArray
  .map((sack) => {
    let el = commonElementInSack(sack);
    return priority(el);
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(answer);

//Problem 2

const groupElvesIntoThree = (sacks) => {
  return chunk(sacks, 3);
};

// is this really just testing lodash, which we should assume works?
assert(
  [
    [
      'vJrwpWtwJgWrhcsFMMfFFhFp',
      'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
      'PmmdzqPrVvPwwTWBwg',
    ],
    [
      'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
      'ttgJtRGJQctTZtZT',
      'CrZsJsPPZsGzwwsLwLmpwMDw',
    ],
  ],
  groupElvesIntoThree([
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
  ])
);

const elementsCommonToThreeElves = (groupOfThree) => {
  const splitItems = groupOfThree.map((elf) => {
    return elf.split('');
  });
  return intersection(...splitItems);
};

assert(
  'r',
  elementsCommonToThreeElves([
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
  ])
);

assert(
  'Z',
  elementsCommonToThreeElves([
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
  ])
);

const groups = groupElvesIntoThree(sackArray);
const allCommonElements = groups
  .map((group) => {
    return priority(elementsCommonToThreeElves(group));
  })
  .reduce((acc, curr) => acc + curr, 0);

console.log(allCommonElements);
