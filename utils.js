import fs from "fs";

/**
 * Reads a file and returns an array of strings. Split character defaults to '\n'
 * @param {*} filename
 * @param {*} splitCharacter
 */
export const readFile = (filename, splitCharacter = /\r?\n/) => {
  const file = fs.readFileSync(
    "G:/dev/advent of code/solutions/" + filename,
    "utf-8"
  );
  return file.split(splitCharacter);
};
