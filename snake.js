class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  turnLeft() {
    this.direction.turnLeft();
  }
  turnRight() {
    this.direction.turnRight();
  }
  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();
    const [deltaX, deltaY] = this.direction.delta;
    this.positions.push([headX + deltaX, headY + deltaY]);
  }
  grow() {
    this.positions.unshift(this.previousTail);
  }

  isHeadTouchesBody() {
    const body = this.location;
    const head = body.pop();
    return body.some(cell => cell[0] == head[0] && cell[1] == head[1]);
  }
  isBeyondBoundary() {
    const head = this.location.pop();
    return !(head[0] < 99 && head[0] > 0 && head[1] < 59 && head[1] > 0);
  }
}
