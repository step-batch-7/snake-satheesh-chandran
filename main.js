const feedSnake = function(game) {
  const gameState = game.state();
  eraseFood(gameState.food);
  game.feed();
  drawFood(game.state().food);
};

const feedGhostSnake = function(game) {
  const gameState = game.state();
  eraseFood(gameState.food);
  game.feedGhost();
  drawFood(game.state().food);
};

const handleKeyPress = game => {
  const arrowKeys = {
    ArrowRight: 3,
    ArrowUp: 0,
    ArrowLeft: 1,
    ArrowDown: 2
  };
  const currentDirection = game.state().snake.direction.heading;
  const pressedDirection = arrowKeys[event.key];
  const directionRange = Math.abs(pressedDirection - currentDirection);
  if (directionRange === 0) game.turnSnakeLeft();
  if (directionRange === 2) game.turnSnakeRight();
};

const moveAndDrawSnake = function(game, snake, ghost) {
  game.moveSnake();
  eraseTail(snake);
  drawSnake(snake);
  eraseTail(ghost);
  drawSnake(ghost);
};

const animateSnakes = game => {
  const state = game.state();
  moveAndDrawSnake(game, state.snake, state.ghost);
};

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

const gameCycle = function(game, interVal) {
  animateSnakes(game);
  feedSnake(game);
  feedGhostSnake(game);
  printScore(game.state().score);
  if (game.isOver()) {
    clearInterval(interVal);
    document.getElementById('status').innerText = 'Game Over...!';
  }
};

const main = function() {
  const game = initGame();
  const gameState = game.state();
  setup(game);
  drawFood(gameState.food);

  const gameInterval = setInterval(() => {
    gameCycle(game, gameInterval);
  }, 200);
};

window.onload = main;
