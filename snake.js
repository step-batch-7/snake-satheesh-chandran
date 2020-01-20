class Snake {
  #positions;
  #direction;
  #type;
  #previousTail;
  #location;
  constructor(positions, direction, type) {
    this.#positions = positions.slice();
    this.#direction = direction;
    this.#type = type;
    this.#previousTail = [0, 0];
  }

  get location() {
    return this.#positions.slice();
  }

  get species() {
    return this.#type;
  }
  state() {
    return {
      location: this.#positions.slice(),
      direction: this.#direction.state(),
      type: this.#type,
      tail: this.#previousTail
    };
  }
  turnLeft() {
    this.#direction.turnLeft();
  }
  turnRight() {
    this.#direction.turnRight();
  }
  move() {
    const [headX, headY] = this.#positions[this.#positions.length - 1];
    this.#previousTail = this.#positions.shift();
    const [deltaX, deltaY] = this.#direction.delta;
    this.#positions.push([headX + deltaX, headY + deltaY]);
  }
  grow() {
    this.#positions.unshift(this.#previousTail);
  }

  isHeadTouchesBody() {
    const body = this.location;
    const head = body.pop();
    return body.some(cell => cell[0] == head[0] && cell[1] == head[1]);
  }
  isBeyondBoundary() {
    const location = this.location;
    const [headX, headY] = location[location.length - 1];
    return headX < 0 || headX > 99 || headY < 0 || headY > 59;
  }
}
