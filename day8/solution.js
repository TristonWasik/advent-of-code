const fs = require("fs");

/**
 * Pattern is infinitely repeating: LLR -> LLRLLRLLRLLR
 * L = left tuple value
 * R = right tuple value
 *
 * No apparent pattern to nodes
 * - load into object?
 * - K, V -> string: { L: string, R: string }
 * - parse strings
 */
class NodeTraverser {
  static _keys = [];
  static _nodes = new Object();
  _startTime = 0;

  constructor() {
    this._keys = [];
    this._nodes = {};
  }

  /**
   * Parse key file
   */
  readKey = async () => {
    const file = fs.readFileSync(__dirname + "/key.txt", "utf-8");
    this._keys = file.split("");
    console.log(`Key parsed; Found ${this._keys.length} instructions;`);
  };

  /**
   * Read file, add nodes to master object
   */
  readNodes = async () => {
    const contents = fs.readFileSync(__dirname + "/nodes.txt", "utf-8");

    for (const line of contents.split(/\r?\n/)) {
      const [key, left, right] = line.match(/[A-Z]{3}/g);
      this._nodes[key] = { L: left, R: right };
    }

    console.log(
      `Nodes parsed; Found ${Object.keys(this._nodes).length} nodes;`
    );
  };

  /**
   * Use master nodes object and traverse using key
   * @param {string} startingNode Defaults to 'AAA'
   * @param {regex} targetNode Defaults to /[Z]{3}/g
   */
  traverseNodes = async (startingNode = "AAA", targetNode = /[Z]{3}/g) => {
    let stepCount = 0;
    let iterations = 0;
    let isComplete = false;
    let currentNode = startingNode;

    // set the start time
    this._startTime = new Date().getTime();
    await this.readKey();
    await this.readNodes();

    console.log(`Starting Node: ${currentNode}`);

    // start a key iteration
    while (!isComplete) {
      // increment key iteration
      iterations++;

      // loop parsed key
      for (const v of this._keys) {
        // increment count
        stepCount++;

        if (v === "L") {
          let nextNode = this._nodes[currentNode].L;
          console.log(
            `Iterations: ${iterations}; Steps: ${stepCount}; Going left: ${currentNode} -> ${nextNode}`
          );
          currentNode = nextNode;
        } else {
          let nextNode = this._nodes[currentNode].R;
          console.log(
            `Iterations: ${iterations}; Steps: ${stepCount}; Going right: ${currentNode} -> ${nextNode}`
          );
          currentNode = nextNode;
        }

        if (currentNode.match(targetNode)) {
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
  };
}

module.exports = { NodeTraverser };
