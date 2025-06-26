const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const GRID_COUNT = CANVAS_SIZE / GRID_SIZE;

let canvas, ctx;
let snake = [];
let food = {};
let direction = 'right';
let gameRunning = true;
function init() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    snake = [
        {x: 10, y: 10},
        {x: 9, y: 10},
        {x: 8, y: 10}
    ];
    
    generateFood();
    gameLoop();
}

function generateFood() {
    let validPosition = false;
    while (!validPosition) {
        food = {
            x: Math.floor(Math.random() * GRID_COUNT),
            y: Math.floor(Math.random() * GRID_COUNT)
        };
        
        validPosition = !snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

function moveSnake() {
    const head = {x: snake[0].x, y: snake[0].y};
    switch(direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    if (head.x < 0) head.x = GRID_COUNT - 1;
    if (head.x >= GRID_COUNT) head.x = 0;
    if (head.y < 0) head.y = GRID_COUNT - 1;
    if (head.y >= GRID_COUNT) head.y = 0;
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        restartGame();
        return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop(); 
    }
}

// Draw everything
function draw() {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = '#4CAF50';
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#2E7D32';
        } else {
            ctx.fillStyle = '#4CAF50';
        }
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
    });
    
    ctx.fillStyle = '#F44336';
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
}


function restartGame() {  
    snake = [
        {x: 10, y: 10},
        {x: 9, y: 10},
        {x: 8, y: 10}
    ];
    direction = 'right';
    generateFood();
}

// Main game loop
function gameLoop() {
    if (gameRunning) {
        moveSnake();
        draw();
        setTimeout(gameLoop, 150); 
    }
}

// Start the game when page loads
window.addEventListener('load', init); 