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
    return this.snake.positions.some(
      cell => this.food.colId == cell[0] && this.food.rowId == cell[1]
    );
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
    return this.snake.isHeadTouchesBody() || this.snake.isBeyondBoundary();
  }
  updateScore() {
    this.score++;
  }
}

const initSnake = () => {
  const snakePosition = [
    [40, 25],
    [41, 25],
    [42, 25]
  ];
  return new Snake(snakePosition, new Direction(EAST), 'snake');
};

const initGhostSnake = () => {
  const ghostSnakePosition = [
    [40, 30],
    [41, 30],
    [42, 30]
  ];
  return new Snake(ghostSnakePosition, new Direction(SOUTH), 'ghost');
};
