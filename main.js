const feedSnake = function(game) {
  const food = game.food;
  eraseFood(food);
  game.feed();
  drawFood(game.food);
};

const feedGhostSnake = function(game) {
  const food = game.food;
  eraseFood(food);
  game.feedGhost();
  drawFood(game.food);
};

const handleKeyPress = game => {
  const arrowKeys = {
    ArrowRight: 3,
    ArrowUp: 0,
    ArrowLeft: 1,
    ArrowDown: 2
  };
  const currentDirection = game.snake.direction.heading;
  const pressedDirection = arrowKeys[event.key];
  const directionRange = Math.abs(pressedDirection - currentDirection);
  if (directionRange == 0) game.turnSnakeLeft();
  if (directionRange == 2) game.turnSnakeRight();
};

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
};

const animateSnakes = (snake, ghostSnake) => {
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const randomlyTurnSnake = snake => {
  const x = Math.random() * 100;
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
  feedGhostSnake(game);
  randomlyTurnSnake(game.ghostSnake);
  printScore(game.score);
  if (game.isOver()) {
    clearInterval(interVal);
    document.getElementById('status').innerText = 'Game Over...!';
  }
};

const main = function() {
  const game = initGame();
  setup(game);
  drawFood(game.food);

  const gameInterval = setInterval(() => {
    gameCycle(game, gameInterval);
  }, 150);
};

window.onload = main;
