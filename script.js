var snake = {
  body: [
    [160, 180],
    [140, 180],
    [120, 180],
    [100, 180]
  ],
  dir: { x: 20, y: 0 }
};
var food = { x: 340, y: 180 };

var gameBox = { cell: 20, width: 500, height: 400 };
var gameCanvas;
var gameCtx;

var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var PAUSE = 27;

var key = RIGHT;
var tickInterval = 120;

var score = 0;
var maxScore = 0;

gameCanvas = document.getElementById("gameCanvas");
gameCtx = gameCanvas.getContext("2d");
gameCtx.strokeStyle = "black";

init();

function init() {
  snake = {
    body: [
      [160, 180],
      [140, 180],
      [120, 180],
      [100, 180]
    ],
    dir: { x: 20, y: 0 }
  };
  food = { x: 340, y: 180 };
  key = RIGHT;
  score = 0;
  time = setInterval(repeat, tickInterval);
}

function repeat() {
  drawSnake();
  drawFood();
  moveSnake();
  growSnake();
  printScore();
  GameOver();
}

function drawSnake() {
  gameCtx.fillStyle = "#29577e";
  gameCtx.clearRect(0, 0, gameBox.width, gameBox.height);
  for (var i = 0; i < snake.body.length; i++) {
    gameCtx.fillRect(
      snake.body[i][0],
      snake.body[i][1],
      gameBox.cell,
      gameBox.cell
    );
    gameCtx.strokeRect(
      snake.body[i][0],
      snake.body[i][1],
      gameBox.cell,
      gameBox.cell
    );
  }
}

function drawFood() {
  gameCtx.fillStyle = "#058c42";
  gameCtx.fillRect(food.x, food.y, gameBox.cell, gameBox.cell);
  gameCtx.strokeRect(food.x, food.y, gameBox.cell, gameBox.cell);
}

function moveSnake() {
  if (key == UP && snake.dir.y != 20) {
    snake.dir.x = 0;
    snake.dir.y = -20;
  } else if (key == DOWN && snake.dir.y != -20) {
    snake.dir.x = 0;
    snake.dir.y = 20;
  } else if (key == LEFT && snake.dir.x != 20) {
    snake.dir.x = -20;
    snake.dir.y = 0;
  } else if (key == RIGHT && snake.dir.x != -20) {
    snake.dir.x = 20;
    snake.dir.y = 0;
  } else if (key == PAUSE) {
    alert("Game Paused.");
    key = 0;
  }
}

function growSnake() {
  snake.body.unshift([
    snake.body[0][0] + snake.dir.x,
    snake.body[0][1] + snake.dir.y
  ]);
  if (snake.body[0][0] == food.x && snake.body[0][1] == food.y) {
    if (tickInterval == 75) {
      score += 2;
    } else {
      score += 1;
    }
    if (score > maxScore) {
      maxScore = score;
    }
    foodOnSnake = false;
    while (foodOnSnake == false) {
      food.x = Math.floor(Math.random() * 25) * 20;
      food.y = Math.floor(Math.random() * 20) * 20;
      for (var i = 0; i < snake.body.length; i++) {
        if (snake.body[i][0] == food.x && snake.body[i][1] == food.y) {
          foodOnSnake = false;
          break;
        } else {
          foodOnSnake = true;
        }
      }
    }
  } else {
    snake.body.pop();
  }
}

function printScore() {
  document.getElementById("Score").value = score;
  document.getElementById("Best").value = maxScore;
}
function GameOver() {
  lose = false;
  for (var i = 0; i < snake.body.length; i++) {
    if (
      snake.body[0][0] == snake.body[i][0] &&
      snake.body[0][1] == snake.body[i][1] &&
      i > 0
    ) {
      lose = true;
    }
  }
  if (
    snake.body[0][0] < 0 ||
    snake.body[0][0] > gameBox.width - gameBox.cell ||
    snake.body[0][1] < 0 ||
    snake.body[0][1] > gameBox.height - gameBox.cell
  ) {
    lose = true;
  }
  if (lose == true) {
    alert("Game Over.");
    clearInterval(time);
    init();
  }
  if (score >= 9999998) {
    alert("Congrats. You got the max score possible.");
    clearInterval(time);
    init();
  }
}

function modeChange() {
  var txt1 = document.getElementById("button");
  var txt2 = document.getElementById("heading");
  if (txt1.value == "Too Easy? Click here for Hard Mode.") {
    txt1.value = "Click here to go back to Normal Mode.";
    txt2.value = "Hard Mode";
    tickInterval = 75;
  } else {
    txt1.value = "Too Easy? Click here for Hard Mode.";
    txt2.value = "Normal Mode";
    tickInterval = 120;
  }
  clearInterval(time);
  init();
}

window.addEventListener(
  "keydown",
  function(e) {
    key = e.keyCode;
  },
  true
);
