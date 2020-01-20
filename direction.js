const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

class Direction {
  #heading;
  #deltas;
  constructor(initialHeading) {
    this.#heading = initialHeading;
    this.#deltas = {};
    this.#deltas[EAST] = [1, 0];
    this.#deltas[WEST] = [-1, 0];
    this.#deltas[NORTH] = [0, -1];
    this.#deltas[SOUTH] = [0, 1];
  }

  state() {
    return {
      heading: this.#heading,
      deltas: this.#deltas
    };
  }
  get delta() {
    return this.#deltas[this.#heading];
  }

  turnLeft() {
    this.#heading = (this.#heading + 1) % 4;
  }

  turnRight() {
    this.#heading = (this.#heading + 3) % 4;
  }
}
