import fs from "fs";

let values: number[] = [];
let debugArr: string[] = [];

/**
 * Read file, add calibration to array
 */
const readCalibration = async (debug = false) => {
  const contents = fs.readFileSync(__dirname + "/day1_input.txt", "utf-8");

  values = contents.split(/\r?\n/).map((line, i) => {
    const numArr = line.match(
      /\d|(?:one|two|three|four|five|six|seven|eight|nine|zero)/g
    );

    if (debug && numArr) {
      console.log(
        numArr,
        convertToNumberString(numArr[0]) + convertToNumberString(numArr.at(-1))
      );
      debugArr.push(
        `${i}: ${line} [${numArr.toString().replace(",", ".")}] ${
          convertToNumberString(numArr[0]) +
          convertToNumberString(numArr.at(-1))
        }`
      );
    }

    return numArr
      ? parseInt(
          convertToNumberString(numArr[0]) +
            convertToNumberString(numArr.at(-1))
        )
      : 0;
  });

  fs.writeFileSync(
    __dirname + "/day1_debug.txt",
    debugArr.toString().replace(",", "\n")
  );

  console.log(`Parsed file, added ${values.length} calibrations.`);
};

const convertToNumberString = (value: any) => {
  switch (value) {
    case "one":
      return "1";
    case "two":
      return "2";
    case "three":
      return "3";
    case "four":
      return "4";
    case "five":
      return "5";
    case "six":
      return "6";
    case "seven":
      return "7";
    case "eight":
      return "8";
    case "nine":
      return "9";
    case "zero":
      return "0";
    default:
      return value;
  }
};

const calculateTotal = (values: any[]) => values.reduce((a, b) => a + b);

export const day1 = () => {
  readCalibration(true);
  console.log(calculateTotal(values));
};
