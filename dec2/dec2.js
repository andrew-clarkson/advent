// Parse Data

const { readFileSync } = require('fs');

const syncReadFile = (filename) => {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/).map((string) => {
    return string;
  });

  return arr;
};

let gamesArray = syncReadFile('./dec2input.txt');

// Problem 1
let score = 0;

gamesArray.forEach((game) => {
  game = game.split(' ');
  if (game == '') return;

  if (game[1] == 'X') score += 1;
  else if (game[1] == 'Y') score += 2;
  else score += 3;

  if (
    // lose
    (game[0] == 'A' && game[1] == 'Z') ||
    (game[0] == 'B' && game[1] == 'X') ||
    (game[0] == 'C' && game[1] == 'Y')
  ) {
    score += 0;
  } else if (
    //draw
    (game[0] == 'A' && game[1] == 'X') ||
    (game[0] == 'B' && game[1] == 'Y') ||
    (game[0] == 'C' && game[1] == 'Z')
  ) {
    score += 3;
  } else {
    // win
    score += 6;
  }
});

console.log(score);
// 12855
// 30 mins

// Problem 2

let score2 = 0;

gamesArray.forEach((game) => {
  if (game == '') return;

  game = game.split(' ');

  if (game[1] == 'X') score2 += 0;
  else if (game[1] == 'Y') score2 += 3;
  else score2 += 6;

  if (
    (game[0] == 'A' && game[1] == 'Z') ||
    (game[0] == 'B' && game[1] == 'Y') ||
    (game[0] == 'C' && game[1] == 'X')
  ) {
    score2 += 2;
  } else if (
    (game[0] == 'A' && game[1] == 'X') ||
    (game[0] == 'B' && game[1] == 'Z') ||
    (game[0] == 'C' && game[1] == 'Y')
  ) {
    score2 += 3;
  } else {
    score2 += 1;
  }
});

console.log(score2);
// 13726
//13 mins

// Alt approach to Problem 2

const outcomes = {
  'A Z': 8,
  'B Y': 5,
  'C X': 2,
  'A X': 3,
  'B Z': 9,
  'C Y': 6,
  'A Y': 4,
  'B X': 1,
  'C Z': 7,
};

let score3 = 0;

gamesArray.forEach((game) => {
  if (game == '') return;
  score3 += outcomes[game];
});

console.log(score3);
// 13726
