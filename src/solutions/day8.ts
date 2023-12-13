const fs = require("fs");

/**
 * Part 1:
 * Pattern is infinitely repeating: LLR -> LLRLLRLLRLLR
 * L = left tuple value
 * R = right tuple value
 *
 * No apparent pattern to nodes
 * - load into object?
 * - K, V -> string: { L: string, R: string }
 * - parse strings
 *
 * Part 2:
 * - Need to select all nodes that end with A
 * - Each path follows the key
 * - Track each of those paths until they all reach a node that ends in Z at the same time
 * - The step from above is the answer
 */
export class Day8 {
  static _keys: string[];
  static _nodes: { [key: string]: { L: string; R: string } };
  _startTime = 0;

  constructor() {
    Day8._keys = [];
    Day8._nodes = {};
  }

  /**
   * Parse key file
   */
  readKey = async () => {
    const file = fs.readFileSync(__dirname + "/day8_key.txt", "utf-8");
    Day8._keys = file.split("");
    console.log(`Key parsed; Found ${Day8._keys.length} instructions;`);
  };

  /**
   * Read file, add nodes to master object
   */
  readNodes = async () => {
    const contents = fs.readFileSync(__dirname + "/day8_nodes.txt", "utf-8");

    for (const line of contents.split(/\r?\n/)) {
      const [key, left, right] = line.match(/[A-Z]{3}/g);
      Day8._nodes[key] = { L: left, R: right };
    }

    console.log(
      `Nodes parsed; Found ${Object.keys(Day8._nodes).length} nodes;`
    );
  };

  /**
   * Use master nodes object and traverse using key
   * @param {string} startingNode Defaults to 'AAA'
   * @param {regex} targetNode Defaults to /[Z]{3}/g
   */
  traverseNodes = async (
    startingNode = "AAA",
    targetNode = /[Z]{3}/g,
    stopAtFirst = true,
    debug = false
  ) => {
    let stepCount = 0;
    let iterations = 0;
    let isComplete = false;
    let currentNode = startingNode;

    // set the start time
    this._startTime = new Date().getTime();

    console.log(`Starting Node: ${currentNode}`);

    // start a key iteration
    while (!isComplete) {
      // increment key iteration
      iterations++;

      // loop parsed key
      for (const v of Day8._keys) {
        // increment count
        stepCount++;

        if (v === "L") {
          let nextNode = Day8._nodes[currentNode].L;
          if (debug)
            console.log(
              `Iterations: ${iterations}; Steps: ${stepCount}; Going left: ${currentNode} -> ${nextNode}`
            );
          currentNode = nextNode;
        } else {
          let nextNode = Day8._nodes[currentNode].R;
          if (debug)
            console.log(
              `Iterations: ${iterations}; Steps: ${stepCount}; Going right: ${currentNode} -> ${nextNode}`
            );
          currentNode = nextNode;
        }

        if (currentNode.match(targetNode)) {
          if (stopAtFirst) {
            isComplete = true;
            const finishTime = new Date().getTime();
            console.log(
              `Finished; Iterations: ${iterations}; Steps: ${stepCount}; Completed in ${
                (finishTime - this._startTime) / 1000
              }s`
            );
            break;
          }
        }
      }
    }

    return stepCount;
  };

  traverseMultipleNodes = async () => {
    let startingNodes = Object.keys(Day8._nodes).filter((f) => f.endsWith("A"));

    const steps = Promise.all(
      startingNodes.map(
        async (node) => await this.traverseNodes(node, /[A-Z]{2}Z/)
      )
    );

    console.log(await this.lcm(await steps));
  };

  gcd = (a: number, b: number): any => {
    if (b === 0) return a;
    return this.gcd(b, a % b);
  };

  lcm = (arr: any[]) => {
    let res = arr[0];

    console.log(`lcm input ${arr}`);

    for (const num of arr) {
      res = (num * res) / this.gcd(num, res);
    }

    return res;
  };
}
