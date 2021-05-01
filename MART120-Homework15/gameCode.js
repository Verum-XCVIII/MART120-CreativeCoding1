let playerProj = [];
let playerProjLog = [];

var playerSpeed = 6;
var playerDir = 'R';

var clock = 0;
var clockMax = 64;
var points = 0;

var noiseScale=0.02;
var randGen;
var randGen2;

//--------------------------------------------------------------------------------------------------------------------------------|Classes Section
class object {
  constructor(objX, objY, radius) {
    this.x = objX;
    this.y = objY;
    this.r = radius;
  }
  display() {
    this.x = playerMovement(this.x, this.y).x;
    this.y = playerMovement(this.x, this.y).y;
    strokeWeight(2);
    stroke(12);
    fill(88);
    square(this.x-this.r, this.y-this.r, this.r);
  }
}

class barrel {
  constructor(objX, objY, radius) {
    this.x = objX;
    this.y = objY;
    this.r = radius;
  }
  display() {
    this.x = playerMovement(this.x, this.y).x;
    this.y = playerMovement(this.x, this.y).y;
    strokeWeight(0);
    fill(158, 66, 48);
    circle(this.x, this.y, this.r);
    fill(64, 66, 58);
    circle(this.x, this.y, this.r/1.24);
    fill(76, 88, 70);
    circle(this.x+this.r/6, this.y+this.r/10, this.r/6);

  }
}

class barrier {
  constructor(objX, objY, width, height) {
    this.x = objX;
    this.y = objY;
    this.w = width;
    this.h = height;
  }
  display() {
    this.x = playerMovement(this.x, this.y).x;
    this.y = playerMovement(this.x, this.y).y;
    strokeWeight(2);
    stroke(22);
    fill(88);
    rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h);
    fill(104);
    rect(this.x-this.w/3.4, this.y-this.h/2.4, this.w/1.8, this.h/1.2);
  }
}

class enemy {
  constructor(xPos, yPos, xSpeed, ySpeed, baseSpeed, maxSpeed, radius, color) {
    this.x = xPos;
    this.y = yPos;
    this.sx = xSpeed;
    this.sy = ySpeed;
    this.sb = baseSpeed;
    this.sm = maxSpeed;
    this.r = radius;
    this.c = color;
  }

  movement1() {
    if (this.x < 4) {
      this.x += this.sx;
    } else if (this.x > 4) {
      this.x -= this.sx;
    }
    if (this.y < 4) {
      this.y += this.sy;
    } else if (this.y > 4) {
      this.y -= this.sy;
    }
  }

  movement2() {
    if (Math.floor(Math.random()*256) == Math.floor(Math.random()*256)) {
      this.sx += 1;
    }
    if (Math.floor(Math.random()*256) == Math.floor(Math.random()*256)) {
      this.sx -= 1;
    }
    if (Math.floor(Math.random()*256) == Math.floor(Math.random()*256)) {
      this.sx += 1;
    }
    if (Math.floor(Math.random()*256) == Math.floor(Math.random()*256)) {
      this.sx -= 1;
    }
    if (this.sx > this.sm || this.sx < -this.sm) {
      this.sx = 0;
      this.sy *= -1;
    }
    if (this.sy > this.sm || this.sy < -this.sm) {
      this.sy = 0;
      this.sx *= -1;
    }
    this.x += this.sx;
    this.y += this.sy;
  }

  rubberband() {
    if (this.x < 0) {
      this.s = this.sb + (-this.x/512);
    } else if (this.x > 0) {
      this.s = this.sb + (this.x/512);
    }
    if (this.y < 0) {
      this.s = this.sb + (-this.y/512);
    } else if (this.y > 0) {
      this.s = this.sb + (this.y/512);
    }
    if (this.sx > this.sm+.2) {
      this.sx = this.sm;
    } else if (this.sx < -this.sm-.2) {
      this.sx = -this.sm;
    }
    if (this.sy > this.sm+.2) {
      this.sy = this.sm;
    } else if (this.sy < -this.sm-.2) {
      this.sy = -this.sm;
    }
  }

  display() {
    this.x = playerMovement(this.x, this.y).x;
    this.y = playerMovement(this.x, this.y).y;
    strokeWeight(0);
    fill(this.c.x, this.c.y, this.c.z);
    circle(this.x, this.y, this.r*2);
  }
} // end of enemy class


//--------------------------------------------------------------------------------------------------------------------------------|Setup Function
function setup() {
  createCanvas(1024, 512);
  randGen = Math.random();
  randGen2 = Math.random();

  obj1 = new object(Math.random()*-1024, Math.random()*1024, 32); // In case you're wondering why I created so many objects, it's simply because it's disorientating to move without any frame of reference.
  obj2 = new object(Math.random()*1024, Math.random()*-1024, 52);
  obj3 = new object(Math.random()*1024, Math.random()*-1024, 44);
  obj4 = new object(Math.random()*-256, Math.random()*256, 40);
  obj5 = new object(Math.random()*-2048, Math.random()*256, 40);
  obj6 = new object(Math.random()*512, Math.random()*1024, 40);
  barrel1 = new barrel(Math.random()*512, Math.random()*1024, 28);
  barrel2 = new barrel(Math.random()*-1024, Math.random()*1024, 28);
  barrel3 = new barrel(Math.random()*-2048, Math.random()*1024, 28);
  barrel4 = new barrel(Math.random()*-2048, Math.random()*-2048, 28);
  barrel5 = new barrel(Math.random()*-512, Math.random()*256, 28);
  barrel6 = new barrel(Math.random()*1024, Math.random()*2048, 28);
  barrel7 = new barrel(Math.random()*2048, Math.random()*256, 28);
  barrel8 = new barrel(Math.random()*-2048, Math.random()*-2048, 28);
  barrier1 = new barrier(Math.random()*-1024, Math.random()*-1024, 58, 166);
  barrier2 = new barrier(Math.random()*1024, Math.random()*-1024, 58, 166);
  barrier3 = new barrier(Math.random()*-2048, Math.random()*512, 58, 166);
  barrier4 = new barrier(Math.random()*512, Math.random()*-512, 58, 166);

  enemy1 = new enemy(Math.random()*1024,Math.random()*-1024, 4,4,4,8, 16, createVector(66, 24, 18));
  enemy2 = new enemy(Math.random()*1024,Math.random()*1024, 3,3,3,6, 16, createVector(166, 106, 66));
  enemy3 = new enemy(Math.random()*-1024,Math.random()*-1024, 2,2,2,5, 16, createVector(144, 60, 62));

}


//--------------------------------------------------------------------------------------------------------------------------------|Draw Function
function draw() {
  background(36);
  translate(width/2, height/2);
  if (clock < clockMax) {
    clock += 1;
  }

  displayPlayer();
  displayPoints();
  displayReload();

  obj1.display();
  obj2.display();
  obj3.display();
  obj4.display();
  obj5.display();
  obj6.display();
  barrel1.display();
  barrel2.display();
  barrel3.display();
  barrel4.display();
  barrel5.display();
  barrel6.display();
  barrel7.display();
  barrel8.display();
  barrier1.display();
  barrier2.display();
  barrier3.display();
  barrier4.display();

  playerProjSystem();
  playerProjControls();

  enemy1.rubberband();
  enemy1.display();
  enemy1.movement1();
  enemy2.rubberband();
  enemy2.display();
  enemy2.movement1();
  enemy3.rubberband();
  enemy3.display();
  enemy3.movement1();


  /*for (var i = 0; i < width; i++) {
    let noiseVal = noise((randGen+i)*noiseScale, randGen2*noiseScale);
    strokeWeight(2);
    stroke(noiseVal*255);
    line(i, randGen+noiseVal*80, i, height);
  } I was just messing arround with noise a bit, you can ignore this*/
}


//--------------------------------------------------------------------------------------------------------------------------------|Display Player
function displayPlayer() {
  stroke(12);
  strokeWeight(2);
  fill(22);
  square(-16,-16, 32);
  fill(64);
  if (keyIsDown(39)) {
    playerDir = 'R';
  } else if (keyIsDown(37)) {
    playerDir = 'L';
  } else if (keyIsDown(40)) {
    playerDir = 'D';
  } else if (keyIsDown(38)) {
    playerDir = 'U';
  }
  if (playerDir=='R') {
    square(8,-12, 8);
    square(8,4, 8);
  } else if (playerDir=='L') {
    square(-16,-12, 8);
    square(-16,4, 8);
  } else if (playerDir=='D') {
    square(4,8, 8);
    square(-12,8, 8);
  } else if (playerDir=='U') {
    square(4,-16, 8);
    square(-12,-16, 8);
  }

  /*beginShape();
  vertex(-16, -16);
  vertex(16, -16);
  vertex(16, 16);
  vertex(-16, 16);
  endShape();
  fill(44);
  beginShape();
  vertex(8, -12);
  vertex(16, -12);
  vertex(16, -4);
  vertex(8, -4);
  endShape();
  fill(44);
  beginShape();
  vertex(8, 4);
  vertex(16, 4);
  vertex(16, 12);
  vertex(8, 12);
  endShape();*/
}


//--------------------------------------------------------------------------------------------------------------------------------|Display Points
function displayPoints() {
  strokeWeight(0);
  fill(222);
  textSize(28);
  text(points, -502, -224);
}

//--------------------------------------------------------------------------------------------------------------------------------|Display Reload
function displayReload() {
  strokeWeight(0);
  fill(190, 202, 132);
  if (clock >= clockMax-4) {
    fill(108, 154, 104);
  }

  rect(-26,15-(clock/clockMax)*30, 4,(clock/clockMax)*30);
}


//--------------------------------------------------------------------------------------------------------------------------------|Player Movement Function
function playerMovement(objX, objY) {
  if (keyIsDown(83) || keyIsDown(87) || keyIsDown(68) || keyIsDown(65)) {
    if (keyIsDown(83) && keyIsDown(68)) {
      objY -= playerSpeed;
      objX -= playerSpeed;
    } else if (keyIsDown(83) && keyIsDown(65)) {
      objY -= playerSpeed;
      objX += playerSpeed;
    } else if (keyIsDown(87) && keyIsDown(65)) {
      objY += playerSpeed;
      objX += playerSpeed;
    } else if (keyIsDown(87) && keyIsDown(68)) {
      objY += playerSpeed;
      objX -= playerSpeed;
    } else if (keyIsDown(83)) {
      objY -= playerSpeed;
    } else if (keyIsDown(87)) {
      objY += playerSpeed;
    } else if (keyIsDown(68)) {
      objX -= playerSpeed;
    } else if (keyIsDown(65)) {
      objX += playerSpeed;
    }
  }
  return createVector(objX, objY);
}


//--------------------------------------------------------------------------------------------------------------------------------|Player Projectile System
function playerProjControls() {

  if (keyIsDown(39) && clock >= clockMax) { // right
    clock = -2;
    //let newLength = playerProj.push(createVector(512,0));
    //let newLength = playerProj.push(projR = new proj(0,0, 512,0, 4,.1, 222));
    let newLength = playerProj.push('R');
  } else if (keyIsDown(37) && clock >= clockMax) { // left
    clock = -2;
    //let newLength = playerProj.push(createVector(-512,0));
    //let newLength = playerProj.push(projL = new proj(0,0, -512,0, 4,.1, 222));
    let newLength = playerProj.push('L');
  } else if (keyIsDown(40) && clock >= clockMax) { // down
    clock = -2;
    //let newLength = playerProj.push(createVector(0,512));
    //let newLength = playerProj.push(projD = new proj(0,0, 0,512, 4,.1, 222));
    let newLength = playerProj.push('D');
  } else if (keyIsDown(38) && clock >= clockMax) { // up
    clock = -2;
    //let newLength = playerProj.push(createVector(0,-512));
    //let newLength = playerProj.push(projU = new proj(0,0, 0,-512, 4,.1, 222));
    let newLength = playerProj.push('U');
  }
}

//--------------------------------------------------------------------------------------------------------------------------------|Player Projectile System
function playerProjSystem() { // I'm pretty sure this doesn't at all function as intended.
  for (var i = 0; i < playerProj.length; i++) {
    if (playerProj[i] == 'R') {
      let newLength = playerProjLog.push(proji = new proj(0,0, 1024,0, 6, 6,0, createVector(74,120,168)));
      //playerProjLog[i] = (proji = new proj(0,0, 512,0, 6, 4,0, createVector(74, 120, 168)));
    } else if (playerProj[i] == 'L') {
      let newLength = playerProjLog.push(proji = new proj(0,0, -1024,0, 6, -6,0, createVector(74,120,168)));
      //playerProjLog[i] = (proji = new proj(0,0, -512,0, 6, -4,0, createVector(74, 120, 168)));
    } else if (playerProj[i] == 'D') {
      let newLength = playerProjLog.push(proji = new proj(0,0, 0,1024, 6, 0,6, createVector(74,120,168)));
      //playerProjLog[i] = (proji = new proj(0,0, 0,512, 6, 0,4, createVector(74, 120, 168)));
    } else if (playerProj[i] == 'U') {
      let newLength = playerProjLog.push(proji = new proj(0,0, 0,-1024, 6, 0,-6, createVector(74,120,168)));
      //playerProjLog[i] = (proji = new proj(0,0, 0,-512, 6, 0,-4, createVector(74, 120, 168)));
    }
    let removedItem = playerProj.splice(i, 1);
    //console.log(playerProjLog);
  }

  for (var i = 0; i < playerProjLog.length; i++) {
    if (Math.abs(proji.x) <= Math.abs(proji.x2) && Math.abs(proji.y) <= Math.abs(proji.y2)) {
      proji.display();
      proji.enemyCollision();
    } else {
      let removedItem = playerProjLog.splice(i, 1);
    }
  }
}

class proj {
  constructor(x, y, x2, y2, radius, xSpeed, ySpeed, color) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
    this.r = radius;
    this.sx = xSpeed;
    this.sy = ySpeed;
    this.c = color;
  }

  display() {
    this.x2 = playerMovement(this.x2, this.y2).x;
    this.y2 = playerMovement(this.x2, this.y2).y;
    if (Math.abs(this.x) <= Math.abs(this.x2) && Math.abs(this.y) <= Math.abs(this.y2)) {
      //console.log("proj test");
      this.x = playerMovement(this.x, this.y).x + this.sx;
      this.y = playerMovement(this.x, this.y).y + this.sy;
      strokeWeight(0);
      fill(this.c.x, this.c.y, this.c.z);
      circle(this.x, this.y, this.r*2);
    } else {
      this.x = 0;
      this.y = 0;
      this.x2 = 0;
      this.y2 = 0;
    }
  }

  enemyCollision() {
    if (this.x+this.r >= enemy1.x-enemy1.r && this.x-this.r <= enemy1.x+enemy1.r && this.y+this.r >= enemy1.y-enemy1.r && this.y-this.r <= enemy1.y+enemy1.r) {
      console.log("proj enemy1 collision");
      points += 1;
      if (Math.random() < .5) {
        enemy1.x = Math.floor(Math.random()*1024);
        enemy1.y = Math.floor(Math.random()*1024);
      } else {
        enemy1.x = Math.floor(Math.random()*-1024);
        enemy1.y = Math.floor(Math.random()*-1024);
      }
      enemy1.c = createVector(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255));
    }
    if (this.x+this.r >= enemy2.x-enemy2.r && this.x-this.r <= enemy2.x+enemy2.r && this.y+this.r >= enemy2.y-enemy2.r && this.y-this.r <= enemy2.y+enemy2.r) {
      console.log("proj enemy2 collision");
      points += 1;
      if (Math.random() < .5) {
        enemy2.x = Math.floor(Math.random()*1024);
        enemy2.y = Math.floor(Math.random()*1024);
      } else {
        enemy2.x = Math.floor(Math.random()*-1024);
        enemy2.y = Math.floor(Math.random()*-1024);
      }
      enemy2.c = createVector(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255));
    }
    if (this.x+this.r >= enemy3.x-enemy3.r && this.x-this.r <= enemy3.x+enemy3.r && this.y+this.r >= enemy3.y-enemy3.r && this.y-this.r <= enemy3.y+enemy3.r) {
      console.log("proj enemy3 collision");
      points += 1;
      if (Math.random() < .5) {
        enemy3.x = Math.floor(Math.random()*1024);
        enemy3.y = Math.floor(Math.random()*1024);
      } else {
        enemy3.x = Math.floor(Math.random()*-1024);
        enemy3.y = Math.floor(Math.random()*-1024);
      }
      enemy3.c = createVector(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255));
    }
  }
}
