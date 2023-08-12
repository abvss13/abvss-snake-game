document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const scoreDisplay = document.getElementById('score');
    const gameOverScreen = document.getElementById('game-over');
    const finalScoreDisplay = document.getElementById('final-score');
    const replayButton = document.getElementById('replay-button');
  
    const gridSize = 20;
    const snakeSpeed = 150;
  
    const snake = [{ x: 5, y: 5 }];
    let food = generateFood();
  
    let dx = 1;
    let dy = 0;
  
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
        updateScore();
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
      const collisionDetected = (
        head.x < 0 ||
        head.x >= gameContainer.offsetWidth / gridSize ||
        head.y < 0 ||
        head.y >= gameContainer.offsetHeight / gridSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
      );
  
      if (collisionDetected) {
        clearInterval(gameInterval);
        showGameOverScreen();
      }
    }
  
    function updateScore() {
      scoreDisplay.textContent = `Score: ${snake.length - 1}`;
    }
  
    function showGameOverScreen() {
      finalScoreDisplay.textContent = snake.length - 1;
      gameContainer.style.display = 'none';
      gameOverScreen.style.display = 'block';
    }
  
    replayButton.addEventListener('click', () => {
      snake.length = 1;
      snake[0] = { x: 5, y: 5 };
      dx = 1;
      dy = 0;
      food = generateFood();
  
      gameContainer.style.display = 'block';
      gameOverScreen.style.display = 'none';
  
      gameInterval = setInterval(gameLoop, snakeSpeed);
    });
  
    let gameInterval;
  
    function gameLoop() {
      updateSnake();
      drawSnake();
      checkCollision();
    }
  
    document.addEventListener('keydown', event => {
      switch (event.key) {
        case 'ArrowUp':
          if (dy !== 1) { // Prevent moving into opposite direction
            dx = 0;
            dy = -1;
          }
          break;
        case 'ArrowDown':
          if (dy !== -1) {
            dx = 0;
            dy = 1;
          }
          break;
        case 'ArrowLeft':
          if (dx !== 1) {
            dx = -1;
            dy = 0;
          }
          break;
        case 'ArrowRight':
          if (dx !== -1) {
            dx = 1;
            dy = 0;
          }
          break;
      }
    });
  
    gameInterval = setInterval(gameLoop, snakeSpeed);
  });
  