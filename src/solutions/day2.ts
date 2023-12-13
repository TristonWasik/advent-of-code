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
    results: {
      red: number;
      green: number;
      blue: number;
    };
  }[] = [];

  const processedGames = games.map((game: string, i: number) => {
    const blues = getNumberArrayFromStringByRegex(game, /\d+\sblue/g);
    const reds = getNumberArrayFromStringByRegex(game, /\d+\sred/g);
    const greens = getNumberArrayFromStringByRegex(game, /\d+\sgreen/g);

    hands = game.match(/\d+\s\w+/g)!.map((set: string) => {
      const [count, key] = set.split(/\s/);

      const isPossible =
        (key === "red" && +count <= redCubeMax) ||
        (key === "green" && +count <= greenCubeMax) ||
        (key === "blue" && +count <= blueCubeMax)
          ? true
          : false;

      // console.log(`${i + 1}: [${key}] ${count} - ${isPossible}`);

      return {
        game: i + 1,
        key,
        count: +count,
        isPossible,
        results: {
          red: reds[0],
          green: greens[0],
          blue: blues[0],
        },
      };
    });

    return {
      game: i + 1,
      hands: hands.map(
        (hand) => `${hand.key}: ${hand.count} | ${hand.isPossible}`
      ),
      isPossible: hands.every((s) => s.isPossible === true),
      highest: {
        red: reds[0],
        green: greens[0],
        blue: blues[0],
      },
      result: reds[0] * greens[0] * blues[0],
    };
  });

  // get list of possible games
  const possibleGames = processedGames
    .filter((f) => f.isPossible)
    .map((i) => i.game);

  // table output to console (sanity check)
  console.table(processedGames);

  // output final result
  console.log(
    `Total: ${possibleGames.reduce(
      (a, b) => a + b,
      0
    )}; Sum of set powers: ${processedGames
      .map((g) => g.result)
      .reduce((a, b) => a + b, 0)}`
  );

  // sanity check total possible
  // console.log([...Array(100)].map((_, i) => ++i).reduce((a, b) => a + b, 0));
};

const getNumberArrayFromStringByRegex = (input: string, regex: RegExp) => {
  return input
    .match(regex)!
    .map((b) => {
      const [count, key] = b.split(/\s/);

      return +count;
    })
    .sort((a, b) => (a > b ? -1 : 1));
};
