const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => `${colId}_${rowId}`;

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

const createBar = function() {
  const grid = document.getElementById('period');
  for (let i = 0; i < 200; i++) {
    const cell = document.createElement('div');
    cell.className = 'emptybar';
    cell.classList.add('bar');
    cell.id = `${i}`;
    grid.appendChild(cell);
  }
};

const drawSnake = function(snake) {
  const location = snake.location;
  location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.type);
  });
};

const drawFood = function(food) {
  const [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.add(food.type);
};

const eraseTail = function(snake) {
  const [colId, rowId] = snake.tail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.type);
};

const eraseFood = function(food) {
  const [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.remove(food.type);
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const printScore = function(score) {
  const scoreTag = document.getElementById('score');
  scoreTag.innerText = `score : ${score}`;
};

const setup = game => {
  attachEventListeners(game);
  const state = game.state();
  createGrids();
  createBar();
  drawSnake(state.snake);
  drawSnake(state.ghost);
};
