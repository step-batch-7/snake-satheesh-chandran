class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = 0;
  }
  turnSnakeLeft() {
    this.snake.turnLeft();
  }
  turnSnakeRight() {
    this.snake.turnRight();
  }
  isEaten(snake) {
    const head = snake.positions[snake.positions.length - 1];
    return this.food.colId == head[0] && this.food.rowId == head[1];
  }
  isFoodAboveSnake(snake) {
    return snake.positions.some(
      cell => this.food.colId == cell[0] && this.food.rowId == cell[1]
    );
  }
  newFood() {
    if (this.score % 4 == 0 && Math.floor(this.score / 4) > 0)
      this.food = new Food(getRandom(1, 100), getRandom(1, 60), 'specialFood');
    else this.food = new Food(getRandom(1, 100), getRandom(1, 60), 'food');
  }
  grow() {
    if (this.food.type == 'food') this.snake.grow();
  }
  feed() {
    if (this.isEaten(this.snake) || this.isFoodAboveSnake(this.snake)) {
      this.grow();
      this.updateScore();
      this.newFood();
    }
  }
  feedGhost() {
    if (
      this.isEaten(this.ghostSnake) ||
      this.isFoodAboveSnake(this.ghostSnake)
    ) {
      this.newFood();
    }
  }
  isTouchesGhost() {
    const head = this.snake.positions[this.snake.positions.length - 1];
    const ghostBody = this.ghostSnake.positions;
    return ghostBody.some(cell => cell[0] == head[0] && cell[1] == head[1]);
  }
  isOver() {
    return (
      this.ghostSnake.isBeyondBoundary() ||
      this.snake.isHeadTouchesBody() ||
      this.snake.isBeyondBoundary() ||
      this.isTouchesGhost()
    );
  }
  updateScore() {
    if (this.food.type == 'specialFood') {
      this.score += 5;
      return;
    }
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

const initGame = () => {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = new Food(getRandom(1, 100), getRandom(1, 60), 'food');
  return new Game(snake, ghostSnake, food);
};
