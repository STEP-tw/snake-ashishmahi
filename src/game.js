"use strict";
const Game = function(numberOfRows,numberOfCols){
  this.rows = numberOfRows;
  this.cols = numberOfCols;
  this.snake = {};
  this.food = {};
};

Game.prototype.addSnake = function (snake) {
  this.snake = snake;
};

Game.prototype.hasSnakeCollided = function () {
  let head = this.snake.getHead();
  let topRight = [0,0];
  let bottomLeft = [this.rows,this.cols];
  return head.isInRangeOf(topRight,bottomLeft);
};

Game.prototype.getDirectionKey = function () {
  let food = this.food;
  let head = this.snake.getHead();
  if(head.isXCoordSameAs(food)){
    let deltaY = head.y-food.y;
    if(deltaY>0){
      return "KeyA";
    }
    return "KeyD";
  }
  else if (head.isYCoordSameAs(food)) {
    let deltaX = head.x-food.x;
    if(deltaX>0) return "KeyA";
    return "KeyD";
  }
};
