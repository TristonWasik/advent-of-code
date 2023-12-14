import { readFile } from "../utils";

/**
 * Gets all adjacent special characters (not '.') in a 2d array
 * @param {string[][]} arr 2d array of strings
 * @param {number} x x pos of target item
 * @param {number} y y pos of target item
 * @returns {{ value: string, x: number, y: number}[]} array of adjacent items
 */
const getAdjacent = (arr: string[][], x: number, y: number) => {
  let n = arr.length;
  let m = arr[0].length;

  let v = [];

  for (var dx = x > 0 ? -1 : 0; dx <= (x < n ? 1 : 0); ++dx) {
    for (var dy = y > 0 ? -1 : 0; dy <= (y < m ? 1 : 0); ++dy) {
      const currentValue = arr?.[x + dx]?.[y + dy];
      if (
        (dx !== 0 || dy !== 0) &&
        currentValue?.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/)
      )
        v.push({ value: currentValue, x: +(x + dx), y: +(y + dy) });
    }
  }

  return v;
};

/**
 * Given a blob of text:
 * - find all numbers that are adjacent to a symbol
 * - add up all numbers
 */
export const day3 = () => {
  const table = readFile("day3_input.txt");
  let values: number[] = [];

  // build the table contents
  let builtTable = table.map((row) => row.split(""));

  builtTable.map((_, rowIndex) => {
    // get all numbers
    const numbersInRow = table[rowIndex].match(/\d+/g);

    // if there are numbers
    if (numbersInRow) {
      let currentColumnIndex = 0;
      numbersInRow.map((number) => {
        // split the number up
        const deconstructedNumber = number.split("");

        for (const num of deconstructedNumber) {
          // get current coords of digit
          const columnIndex = table[rowIndex].indexOf(num, currentColumnIndex);
          currentColumnIndex = columnIndex > -1 ? columnIndex + 1 : 0;

          // check for adjacent symbols
          const adjacent = getAdjacent(builtTable, rowIndex, columnIndex);
          if (adjacent.length > 0) {
            values.push(+number);
            break;
          }
        }
      });
    }
  });

  console.log(
    "result",
    values.reduce((a, b) => a + b, 0)
  );
};

// // get symbols first, then nearby numbers
// const symbols = table[i].match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/);

// if (symbols) {
//   for (const symbol of symbols) {
//     // get the index
//     const symbolIndex = row.indexOf(symbol);

//     if (symbolIndex > -1) {
//       // get adjacent values
//       const adjacent = getAdjacent(builtTable, i, symbolIndex);
//       console.log(symbol, adjacent.length, JSON.stringify(adjacent));

//       // build out number
//       // if (adjacent)
//     }
//   }
// }
