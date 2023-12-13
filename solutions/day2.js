import { readFile } from "../utils.js";

export const day2 = () => {
  processFile();
};

const redCubeMax = 12;
const greenCubeMax = 13;
const blueCubeMax = 14;
const indexes = [];

const processFile = () => {
  const games = readFile("day2_input.txt");

  games.map((game, i) => {
    game.match(/\d+\s\w+/g).map((set) => {
      const [count, key] = set.split(/\s/);

      const isPossible =
        (key === "red" && +count > redCubeMax) ||
        (key === "green" && +count > greenCubeMax) ||
        (key === "blue" && +count > blueCubeMax)
          ? true
          : false;

      if (isPossible) {
        console.log(`${++i}: ${count} [${key}]`);
        indexes.push(i);
      }
    });
  });

  console.log([...new Set(indexes)]);
  console.log([...new Set(indexes)].reduce((a, b) => a + b, 0));
  console.log([...Array(100)].map((_, i) => ++i).reduce((a, b) => a + b, 0));
};
