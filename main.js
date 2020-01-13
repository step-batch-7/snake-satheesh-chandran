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
  printScore(game.score);
  if (game.isOver()) {
    clearInterval(interVal);
    document.getElementById('status').innerText = 'Game Over...!';
  }
};

const main = function() {
  const game = new Game();
  setup(game);
  drawFood(game.food);

  const gameInterval = setInterval(() => {
    gameCycle(game, gameInterval);
  }, 150);
};

window.onload = main;
