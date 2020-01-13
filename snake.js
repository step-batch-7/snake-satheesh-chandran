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
    }
  }
  isOver() {
    return this.snake.isHeadOnBody() || this.snake.isBeyondBoundary();
  }
}

/////////////////////////////////////////////////

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const eraseTail = function(snake) {
  const [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const eraseFood = function(food) {
  const cell = getCell(food.colId, food.rowId);
  cell.classList.remove('food');
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const drawFood = function(food) {
  const cell = getCell(food.colId, food.rowId);
  cell.classList.add('food');
};

const feedSnake = function(game) {
  const food = game.food;
  eraseFood(food);
  game.feed();
  drawFood(game.food);
};

const handleKeyPress = game => {
  game.turn(event.key);
};

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

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

const setup = game => {
  attachEventListeners(game);
  createGrids();
  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
};

const animateSnakes = (snake, ghostSnake) => {
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const randomlyTurnSnake = snake => {
  let x = Math.random() * 100;
  if (x > 50) {
    snake.turnLeft();
  }
};

const getRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const gameCycle = function(game, interVal) {
  animateSnakes(game.snake, game.ghostSnake);
  feedSnake(game);
  randomlyTurnSnake(game.ghostSnake);
  if (game.isOver()) {
    clearInterval(interVal);
    document.write("<h1 style='text-align: center'> Game Over! </h1>");
  }
};

const main = function() {
  const game = new Game();
  setup(game);
  drawFood(game.food);

  const gameInterval = setInterval(() => {
    gameCycle(game, gameInterval);
  }, 100);
};
