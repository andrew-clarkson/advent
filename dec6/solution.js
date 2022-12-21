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

  return contents;
};

const signal = syncReadFile('./input.txt');

const findStartOfMarker = (input, markerLocation) => {
  for (let i = markerLocation; i < input.length; i++) {
    if (new Set(input.slice(i - markerLocation, i)).size === markerLocation)
      return i;
  }
};

const answer1 = findStartOfMarker(signal, 4);
const answer2 = findStartOfMarker(signal, 14);

console.log(answer1, answer2);

assert(7 === findStartOfMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 4));
assert(5 === findStartOfMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 4));
assert(6 === findStartOfMarker('nppdvjthqldpwncqszvftbrmjlhg', 4));
assert(10 === findStartOfMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4));
assert(11 === findStartOfMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4));

assert(19 === findStartOfMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14));
assert(23 === findStartOfMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14));
assert(23 === findStartOfMarker('nppdvjthqldpwncqszvftbrmjlhg', 14));
assert(29 === findStartOfMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14));
assert(26 === findStartOfMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14));
