const gameContainer = document.getElementById('game-container');
const gridSize = 20; // Size of each grid cell
const snakeSpeed = 150; // Speed of snake movement in milliseconds

const snake = [{ x: 5, y: 5 }];
let food = generateFood();

let dx = 1; // Horizontal movement direction
let dy = 0; // Vertical movement direction

function generateFood() {
  const maxX = gameContainer.offsetWidth / gridSize;
  const maxY = gameContainer.offsetHeight / gridSize;

  const foodX = Math.floor(Math.random() * maxX);
  const foodY = Math.floor(Math.random() * maxY);

  return { x: foodX, y: foodY };
}

function updateSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
  } else {
    snake.pop();
  }
}

function drawSnake() {
  gameContainer.innerHTML = '';

  snake.forEach(segment => {
    const segmentElement = document.createElement('div');
    segmentElement.className = 'segment';
    segmentElement.style.left = `${segment.x * gridSize}px`;
    segmentElement.style.top = `${segment.y * gridSize}px`;
    gameContainer.appendChild(segmentElement);
  });

  const foodElement = document.createElement('div');
  foodElement.className = 'food';
  foodElement.style.left = `${food.x * gridSize}px`;
  foodElement.style.top = `${food.y * gridSize}px`;
  gameContainer.appendChild(foodElement);
}

function checkCollision() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x >= gameContainer.offsetWidth / gridSize ||
    head.y < 0 ||
    head.y >= gameContainer.offsetHeight / gridSize
  ) {
    clearInterval(gameInterval);
    alert('Game Over');
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(gameInterval);
      alert('Game Over');
    }
  }
}

function gameLoop() {
  updateSnake();
  drawSnake();
  checkCollision();
}

document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      dx = 0;
      dy = -1;
      break;
    case 'ArrowDown':
      dx = 0;
      dy = 1;
      break;
    case 'ArrowLeft':
      dx = -1;
      dy = 0;
      break;
    case 'ArrowRight':
      dx = 1;
      dy = 0;
      break;
  }
});

const gameInterval = setInterval(gameLoop, snakeSpeed);
