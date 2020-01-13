const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnLeft() {
    this.heading = (this.heading + 1) % 4;
  }

  turnRight() {
    this.heading = (this.heading + 3) % 4;
  }
}

class Food {
  constructor(colId, rowId) {
    this.colId = colId;
    this.rowId = rowId;
  }

  get position() {
    return [this.colId, this.rowId];
  }
}

class Game {
  constructor() {
    this.snake = initSnake();
    this.ghostSnake = initGhostSnake();
    this.food = new Food(getRandom(0, 100), getRandom(0, 60));
    this.score = 0;
  }
  turn(key) {
    const arrowKeys = { ArrowRight: 3, ArrowUp: 0, ArrowLeft: 1, ArrowDown: 2 };
    const currentDirection = this.snake.direction.heading;
    const pressedDirection = arrowKeys[key];
    if (pressedDirection == currentDirection) {
      this.snake.turnLeft();
    }
    if (Math.abs(pressedDirection - currentDirection) == 2)
      this.snake.turnRight();
  }
  isEaten() {
    const head = this.snake.positions[this.snake.positions.length - 1];
    return this.food.colId == head[0] && this.food.rowId == head[1];
  }
  isFoodAboveSnake() {
    return this.snake.positions.some(cell => {
      return this.food.colId == cell[0] && this.food.rowId == cell[1];
    });
  }
  newFood() {
    this.food = new Food(getRandom(0, 100), getRandom(0, 60));
  }
  grow() {
    this.snake.grow();
  }
  feed() {
    if (this.isEaten() || this.isFoodAboveSnake()) {
      this.newFood();
      this.grow();
      this.updateScore();
    }
  }
  isOver() {
    return this.snake.isHeadOnBody() || this.snake.isBeyondBoundary();
  }
  updateScore() {
    this.score++;
  }
}

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
    const [headX, headY] = this.positions[0];
    const [deltaX, deltaY] = this.direction.delta;
    this.positions.unshift([headX + deltaX, headY + deltaY]);
  }

  isHeadOnBody() {
    const body = this.location;
    const head = body.pop();
    return body.some(cell => cell[0] == head[0] && cell[1] == head[1]);
  }
  isBeyondBoundary() {
    const head = this.location.pop();
    return !(head[0] < 99 && head[0] > 0 && head[1] < 59 && head[1] > 0);
  }
}
