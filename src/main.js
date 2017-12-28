"use strict";
let numberOfRows=60;
let numberOfCols=120;
let game = new Game(numberOfRows,numberOfCols);
let animator=undefined;

const askForRestartGame = function(){
  updateDisplay("Game Over! Click here to restart game");
};

const endGame = function(){
  clearInterval(animator);
  removeKeyListener();
  askForRestartGame();
};

const updateSnakeOnDisplay = function(oldHead,oldTail,head){
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
};

const animateSnake=function() {
  let oldHead=game.snake.getHead();
  let oldTail=game.snake.move();
  let head=game.snake.getHead();
  if(game.hasSnakeCollided()) {
    endGame();
    return;
  }
  updateSnakeOnDisplay(oldHead,oldTail,head);
  if(game.snake.eatsItself()){
    endGame();
  }
  if(head.isSameCoordAs(game.food)) {
    game.snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(game.food);
  }
};

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      game.snake.turnLeft();
      break;
    case "KeyD":
      game.snake.turnRight();
      break;
    case "KeyC":
      game.snake.grow();
      break;
    default:
  }
};

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
};

const removeKeyListener = function(){
  let grid = document.getElementById("grid");
  grid.onkeyup = null;
};

const createSnake=function() {
  let tail=new Position(12,10,"east");
  body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();
  snake=new Snake(head,body);
  game.addSnake(snake);
};

const createFood=function(numberOfRows,numberOfCols) {
  game.food=generateRandomPosition(numberOfCols,numberOfRows);
};

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(game.food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
};

window.onload=startGame;
