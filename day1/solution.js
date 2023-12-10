const fs = require("fs");

let values = [];

/**
 * Read file, add calibration to array
 */
readCalibration = async () => {
  const contents = fs.readFileSync(__dirname + "/calibration.txt", "utf-8");

  values = contents.split(/\r?\n/).map((line) => {
    const numArr = line.match(/\d/g);
    return parseInt(numArr[0] + numArr.at(-1));
  });

  console.log(`Parsed file, added ${values.length} calibrations.`);
};

calculateTotal = (values) => values.reduce((a, b) => a + b);

main = () => {
  readCalibration();
  console.log(calculateTotal(values));
};

module.exports = { main };
