// script.js
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
let score = 0;
let snake = [{ x: 9, y: 9 }]; // Starting position of the snake
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
let gameInterval;

function startGame() {
    gameInterval = setInterval(moveSnake, 100);
    document.addEventListener('keydown', changeDirection);
    generateFood();
}

function generateFood() {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y + 1;
    foodElement.style.gridColumnStart = food.x + 1;
    foodElement.style.backgroundColor = 'green';
    foodElement.style.position = 'absolute';
    foodElement.style.top = `${food.y * 20}px`;
    foodElement.style.left = `${food.x * 20}px`;
    foodElement.style.width = '20px';
    foodElement.style.height = '20px';
    gameArea.appendChild(foodElement);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snakeCollision(head)) {
        alert('Game Over! Your final score is ' + score);
        clearInterval(gameInterval);
        window.location.reload();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = 'Score: ' + score;
        gameArea.innerHTML = '';
        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
        generateFood();
    } else {
        snake.pop();
    }

    renderSnake();
}

function renderSnake() {
    gameArea.innerHTML = '';
    snake.forEach(segment => {
        const segmentElement = document.createElement('div');
        segmentElement.style.position = 'absolute';
        segmentElement.style.top = `${segment.y * 20}px`;
        segmentElement.style.left = `${segment.x * 20}px`;
        gameArea.appendChild(segmentElement);
    });
    generateFood();
}

function snakeCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction.y !== 1) {
        direction = { x: 0, y: -1 };
    } else if (key === 'ArrowDown' && direction.y !== -1) {
        direction = { x: 0, y: 1 };
    } else if (key === 'ArrowLeft' && direction.x !== 1) {
        direction = { x: -1, y: 0 };
    } else if (key === 'ArrowRight' && direction.x !== -1) {
        direction = { x: 1, y: 0 };
    }
}

window.onload = startGame;
