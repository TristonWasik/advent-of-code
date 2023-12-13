import { readFile } from "../utils.js";

export const day2 = () => {
  processFile();
};

const redCubeMax = 12;
const greenCubeMax = 13;
const blueCubeMax = 14;

const processFile = () => {
  const games = readFile("day2_input.txt");
  let hands: {
    game: number;
    key: string;
    count: number;
    isPossible: boolean;
  }[] = [];

  const processedGames = games.map((game: string, i: number) => {
    hands = game.match(/\d+\s\w+/g)!.map((set: string) => {
      const [count, key] = set.split(/\s/);

      const isPossible =
        (key === "red" && +count <= redCubeMax) ||
        (key === "green" && +count <= greenCubeMax) ||
        (key === "blue" && +count <= blueCubeMax)
          ? true
          : false;

      console.log(`${i + 1}: [${key}] ${count} - ${isPossible}`);

      return { game: i + 1, key, count: +count, isPossible };
    });

    return {
      game: i + 1,
      hands,
      isPossible: hands.every((s) => s.isPossible === true),
    };
  });

  // get list of possible games
  const possibleGames = processedGames
    .filter((f) => f.isPossible)
    .map((i) => i.game);

  // table output to console (sanity check)
  console.table(processedGames);

  // output final result
  console.log(`Total: ${possibleGames.reduce((a, b) => a + b, 0)}`);

  // sanity check total possible
  // console.log([...Array(100)].map((_, i) => ++i).reduce((a, b) => a + b, 0));
};
