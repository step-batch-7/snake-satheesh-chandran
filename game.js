class Game {
  #snake;
  #ghostSnake;
  #food;
  #score;
  constructor(snake, ghostSnake, food) {
    this.#snake = snake;
    this.#ghostSnake = ghostSnake;
    this.#food = food;
    this.#score = 0;
  }
  state() {
    return {
      snake: this.#snake.state(),
      ghost: this.#ghostSnake.state(),
      food: this.#food.state(),
      score: this.#score
    };
  }
  moveSnake() {
    this.#snake.move();
    const x = Math.random() * 100;
    this.#ghostSnake.move();
    if (x > 50) {
      this.#ghostSnake.turnLeft();
    }
  }
  turnSnakeLeft() {
    this.#snake.turnLeft();
  }
  turnSnakeRight() {
    this.#snake.turnRight();
  }
  isEaten(snake) {
    const snakePosition = snake.location;
    const head = snakePosition[snakePosition.length - 1];
    const foodPosition = this.#food.state().position;
    return foodPosition[0] == head[0] && foodPosition[1] == head[1];
  }
  isFoodAboveSnake(snake) {
    const snakePositions = snake.location;
    const foodPosition = this.#food.position;
    return snakePositions.some(
      cell => foodPosition[0] == cell[0] && foodPosition[1] == cell[1]
    );
  }
  newFood() {
    if (this.#score % 4 == 0 && Math.floor(this.#score / 4) > 0)
      this.#food = new Food(getRandom(1, 99), getRandom(1, 59), 'specialFood');
    else this.#food = new Food(getRandom(1, 99), getRandom(1, 59), 'food');
  }
  grow() {
    if (this.#food.type == 'food') this.#snake.grow();
  }
  feed() {
    if (this.isEaten(this.#snake) || this.isFoodAboveSnake(this.#snake)) {
      this.grow();
      this.updateScore();
      this.newFood();
    }
  }
  feedGhost() {
    if (
      this.isEaten(this.#ghostSnake) ||
      this.isFoodAboveSnake(this.#ghostSnake)
    ) {
      this.newFood();
    }
  }
  isTouchesGhost() {
    const snakeLocation = this.#snake.location;
    const head = snakeLocation[snakeLocation.length - 1];
    const ghostBody = this.#ghostSnake.location;
    return ghostBody.some(cell => cell[0] == head[0] && cell[1] == head[1]);
  }
  isOver() {
    return (
      this.#ghostSnake.isBeyondBoundary() ||
      this.#snake.isHeadTouchesBody() ||
      this.#snake.isBeyondBoundary() ||
      this.isTouchesGhost()
    );
  }
  updateScore() {
    if (this.#food.type == 'specialFood') {
      this.#score += 5;
      return;
    }
    this.#score++;
  }
  wrap() {
    if (this.#snake.isBeyondBoundary()) this.#snake.wrap();
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

const initGame = () => {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(getRandom(1, 99), getRandom(1, 59), 'food');
  return new Game(snake, ghostSnake, food);
};
