import assert from 'assert';
import { castArray, chunk, intersection } from 'lodash';

// Parse Data

const { readFileSync, Dirent } = require('fs');

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/).map((string) => {
    return string;
  });

  // console.log(arr);

  return arr;
};

const sectionAssignments = syncReadFile('./input.txt');

const sampleData = [
  '    [D]',
  '[N] [C]',
  '[Z] [M] [P]',
  ' 1   2   3',
  '',
  'move 1 from 2 to 1',
  'move 3 from 1 to 3',
  'move 2 from 2 to 1',
  'move 1 from 1 to 2',
  '',
];

const getCrates = (input) => {
  return input.slice(0, input.indexOf(''));
};

assert.deepEqual(
  ['    [D]', '[N] [C]', '[Z] [M] [P]', ' 1   2   3'],
  getCrates(sampleData)
);

const getInstructions = (input) => {
  return input.slice(input.indexOf('') + 1, -1);
};

assert.deepEqual(
  [
    'move 1 from 2 to 1',
    'move 3 from 1 to 3',
    'move 2 from 2 to 1',
    'move 1 from 1 to 2',
  ],
  getInstructions(sampleData)
);

const parseCrates = (crates) => {
  const cratesRows = crates.map((crate) => {
    const row = [];
    for (let i = 0; i <= crate.length; i = i + 4) {
      row.push(crate.slice(i, i + 3));
    }
    return row;
  });

  const stacks = new Object();

  cratesRows[cratesRows.length - 1].map((row) => {
    stacks[parseFloat(row.trim())] = new Array();
  });

  cratesRows.pop();

  cratesRows.map((row) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i] !== '   ') {
        stacks[i + 1] = [row[i], ...stacks[i + 1]];
      }
    }
  });
  return stacks;
};

assert.deepEqual(
  { 1: ['[Z]', '[N]'], 2: ['[M]', '[C]', '[D]'], 3: ['[P]'] },
  parseCrates(['    [D]', '[N] [C]', '[Z] [M] [P]', ' 1   2   3'])
);

const parseInstruction = (instruction) => {
  return instruction.match(/\d+/gm).map(parseFloat);
};

assert.deepEqual([1, 2, 1], parseInstruction('move 1 from 2 to 1'));
assert.deepEqual([2, 2, 1], parseInstruction('move 2 from 2 to 1'));
assert.deepEqual([11, 5, 6], parseInstruction('move 11 from 5 to 6'));

//move crates

const moveCrates = (crates, [qty, from, to]) => {
  const cratesToMove = crates[from].splice(crates[from].length - qty, qty);
  //remove the reverse and comment out moveCrates tests to get P2 answer
  crates[to] = crates[to].concat(cratesToMove.reverse());
  return crates;
};

const sampleCrate1 = {
  1: ['[Z]', '[N]'],
  2: ['[M]', '[C]', '[D]'],
  3: ['[P]'],
};
const sampleInstruction1 = [1, 2, 1];
const expectedAnswer1 = {
  1: ['[Z]', '[N]', '[D]'],
  2: ['[M]', '[C]'],
  3: ['[P]'],
};

const sampleCrate2 = {
  1: ['[Z]', '[N]'],
  2: ['[M]', '[C]', '[D]'],
  3: ['[P]'],
};
const sampleInstruction2 = [2, 1, 3];
const expectedAnswer2 = {
  1: [],
  2: ['[M]', '[C]', '[D]'],
  3: ['[P]', '[N]', '[Z]'],
};

assert.deepEqual(expectedAnswer1, moveCrates(sampleCrate1, sampleInstruction1));
assert.deepEqual(expectedAnswer2, moveCrates(sampleCrate2, sampleInstruction2));

const topOfEachStack = (crates) => {
  let topCrates = '';

  Object.values(crates)
    .filter((crate) => crate.length > 0)
    .map((crate) => {
      topCrates += crate[crate.length - 1].match(/[A-Z]/gm);
    });

  return topCrates;
};

assert.deepEqual('DCP', topOfEachStack(expectedAnswer1));
assert.deepEqual('DZ', topOfEachStack(expectedAnswer2));

//Answer P1 (see modification in moveCrates to get P1)
const crates = parseCrates(getCrates(sectionAssignments));
const instructions = getInstructions(sectionAssignments);

instructions.forEach((instruction) => {
  const instructionArray = parseInstruction(instruction);
  moveCrates(crates, instructionArray);
});

const answer = topOfEachStack(crates);

console.log(answer);
