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

const printScore = function(score) {
  const scoreTag = document.getElementById('score');
  scoreTag.innerText = `score : ${score}`;
};

const gameCycle = function(game, interVal) {
  animateSnakes(game.snake, game.ghostSnake);
  feedSnake(game);
  randomlyTurnSnake(game.ghostSnake);
  printScore(game.score);
  if (game.isOver()) {
    clearInterval(interVal);
    // document.write("<h1 style='text-align: center'> Game Over! </h1>");
    document.getElementById('status').innerText = 'Game Over!';
  }
};

const main = function() {
  const game = new Game();
  setup(game);
  drawFood(game.food);

  const gameInterval = setInterval(() => {
    gameCycle(game, gameInterval);
  }, 200);
};
