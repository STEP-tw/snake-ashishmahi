const _directions=["north","east","south","west","north"];

const randomDirection=function() {
  let index=generateRandomNumberBetween(0,_directions.length);
  return _directions[index];
}

const Position=function(x,y,direction) {
  this.x=x;
  this.y=y;
  this.direction=direction;
}

const actions={};

actions.east=(x,y)=>[x+1,y];
actions.west=(x,y)=>[x-1,y];
actions.north=(x,y)=>[x,y-1];
actions.south=(x,y)=>[x,y+1];

Position.prototype.next=function() {
  let nextCoord=actions[this.direction](this.x,this.y);
  return new Position(nextCoord[0],nextCoord[1],this.direction);
}

Position.prototype.turnLeft=function() {
  let currentIndex=_directions.lastIndexOf(this.direction);
  let newDirection=_directions[currentIndex-1];
  return new Position(this.x,this.y,newDirection);
}

Position.prototype.turnRight=function() {
  let currentIndex=_directions.indexOf(this.direction);
  let newDirection=_directions[currentIndex+1];
  return new Position(this.x,this.y,newDirection);
}

Position.prototype.isSameCoordAs=function(other) {
  return this.x==other.x && this.y==other.y;
}

Position.prototype.eatsBody = function () {
  let refPosition = this;
  return body.some(function(pos){
    return refPosition.x==pos.x&&refPosition.y==pos.y;
  });
};

Position.prototype.xCoordHitWall = function () {
  return this.x>=120||this.x<0;
};

Position.prototype.yCoordHitWall = function () {
  return this.y>=60||this.y<0;
};

Position.prototype.hitsWall = function () {
  return this.xCoordHitWall()||this.yCoordHitWall();
};

Position.prototype.getCoord=function() {
  return [this.x,this.y];
}

const generateRandomPosition=function(maxX,maxY) {
  let x=generateRandomNumberBetween(0,maxX);
  let y=generateRandomNumberBetween(0,maxY);
  let direction=randomDirection();
  return new Position(x,y,direction);
}
