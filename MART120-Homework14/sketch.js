var x = 64;               //  Noticed Bugs:
var y = 64;               // -Enemy pushing player into edge of canvas can cause player & enemy to overlap, getting the player somewhat stuck (not inescapable).
var playerCoords;         // -Enemy push player into/through objects.
var diameter = 32;        // -Spawning object ontop the player won't push player out (likely becuase it gets stuck being teleported back & forth between them - ?).
var radius = diameter/2;
var healthMax = 3;
var health = 3;

                              //  To Do / Additional Ideas:
var initialPlayerSpeed = 3;   //
var playerSpeed = 3;          //X Enemy Colision and winState 2 (make it possible to lose)
var playerRunSpeed = 6;       //X Mouse Object Collision
var staminaMax = 1024;        //  Deleting oldest mouse object once trying to place more than some amount
var stamina = 1024;           //  More enemies (which act differently)
var staminaConsumption = 6;   //  Timer? (Limited time or just recording how long it took to finish?)
var staminaRecovery = 2;      //X Victory Progression Bar
var playerWalkSpeed = 1;      //  More Fruit? Different Fruit?
                              //  Have enemies grow larger if they collide with the fruit.
var enemyDiameter = 32;       //X Integrate updated systems from sketch2.js (object placement, collision, background grid)
var cEnemy;                   //X Enemy collision with mouse objects.
var cEnemyR;                  //  Allow enemies to comprehend the concept of going around an obstacle.

var fruitx = (Math.floor(Math.random() * 31) + 1) * 32;
var fruity = (Math.floor(Math.random() * 15) + 1) * 32;
var fruitDiameter = 20;
var fruitCollected = 0;
var fruitStamina = 256;

var mousex;
var mousey;
let mouseObjNum = [];

var controlsOpacity = 255;
var winOpacity = 0;

var exitX = (Math.floor(Math.random() * 32) + 1) * 32;
var exitY = (Math.floor(Math.random() * 16) + 1) * 32;
var exitWin = 0;
var exitWinMax = 256;
var exitWinSpeed = 1;
var winState = 0;
var gm = false;
var pause = false;
let keyLog = [];
let keyCombo = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];

let cellStates = [];
let cellCoords = [];
var cellNumber;

var tsRadius = 16;
var cCoords;
var cdistance;
var cxRDistance;
var cxLDistance;
var cyTDistance;
var cyBDistance;

var randObjNum = 16;
let randObjCoords = [];
let randObjColor = [];


class enemy {
  constructor(xCoord, yCoord, xSpeed, ySpeed, baseSpeed, speedMax, radius, color) {
    this.x = xCoord;
    this.y = yCoord;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.baseSpeed = baseSpeed;
    this.speedMax = speedMax;
    this.radius = radius;
    this.color = color;
  }

  movement1() {
    if (winState == 0 && pause == false) {
      if (x-1024 - this.x > this.x - x) {
        this.x -= this.xSpeed;
      } else if ((x+1024) - this.x < this.x - x) {
        this.x += this.xSpeed
      } else if (this.x < x) {
        this.x += this.xSpeed;
      } else if (this.x > x) {
        this.x -= this.xSpeed;
      }
      if (y-512 - this.y > this.y - y) {
        this.y -= this.ySpeed;
      } else if ((y+512) - this.y < this.y - y) {
        this.y += this.ySpeed
      } else if (this.y < y) {
        this.y += this.ySpeed;
      } else if (this.y > y) {
        this.y -= this.ySpeed;
      }
    }
  }

  movement2() {
    if (winState == 0 && pause == false) {
      if (Math.floor(Math.random()*256) == Math.floor(Math.random()*256)) {
        this.xSpeed += 1;
      }
      if (Math.floor(Math.random()*256) == Math.floor(Math.random()*256)) {
        this.xSpeed -= 1;
      }
      if (Math.floor(Math.random()*256) == Math.floor(Math.random()*256)) {
        this.ySpeed += 1;
      }
      if (Math.floor(Math.random()*256) == Math.floor(Math.random()*256)) {
        this.ySpeed -= 1;
      }

      if (this.xSpeed > this.speedMax || this.xSpeed < -this.speedMax) {
        this.xSpeed = 0;
        this.ySpeed *= -1;
      }
      if (this.ySpeed > this.speedMax || this.ySpeed < -this.speedMax) {
        this.ySpeed = 0;
        this.xSpeed *= -1;
      }

      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }
  }

  rubberband() {
    if (this.x < x) {
      this.speed = this.baseSpeed + ((x - this.x)/512);
    } else if (this.x > x) {
      this.speed = this.baseSpeed + ((this.x - x)/512);
    }
    if (this.y < y) {
      this.speed = this.baseSpeed + ((y - this.y)/256);
    } else if (this.y > y) {
      this.speed = this.baseSpeed + ((this.y - y)/256);
    }

    if (this.xspeed > this.speedMax+.2) {
      this.xSpeed = this.speedMax;
    } else if (this.xSpeed < -this.speedMax-.2) {
      this.xSpeed = -this.speedMax;
    } // Neither of these if statements should ever do anything, but I put them here as a failsafe.
    if (this.ySpeed > this.speedMax+.2) {
      this.ySpeed = this.speedMax;
    } else if (this.ySpeed < -this.speedMax-.2) {
      this.ySpeed = -this.speedMax;
    }
  }

  display() {
    fill(this.color.x, this.color.y, this.color.z);
    circle(this.x, this.y, this.radius*2);
    circle(this.x-1024, this.y, this.radius*2);
    circle(this.x+1024, this.y, this.radius*2);
    circle(this.x, this.y-512, this.radius*2);
    circle(this.x, this.y+512, this.radius*2);
  }

  mapWrap() {
    if (this.y > 512) {
      this.y = 1;
    } else if (this.y < 0) {
      this.y = 511;
    }
    if (this.x > 1024) {
      this.x = 1;
    } else if (this.x < 0) {
     this.x = 1023;
    }
  }

} // end of enemy class

var newEnemy1;
var newEnemy2;
var newEnemy3;


//--------------------------------------------------------------------------------------------------------------------------------|Debugging
function keyPressed() {
  if (key == 'p') {
    console.log('Player x range: ' + (x-(diameter/2)) + ' - ' + (x+(diameter/2)) + '; Player y range: ' + (y-(diameter/2)) + ' - ' + (y+(diameter/2)));
    //console.log('Player y range: ' + (y-(diameter/2)) + ' - ' + (y+(diameter/2)));
  } else if (key == 'o') {
    console.log('Fruit x range: ' + (fruitx-(fruitDiameter/2)) + ' - ' + (fruitx+(fruitDiameter/2)) + '; Fruit y range: ' + (fruity-(fruitDiameter/2)) + ' - ' + (fruity+(fruitDiameter/2)));
    //console.log('Fruit y range: ' + (fruity-(fruitDiameter/2)) + ' - ' + (fruity+(fruitDiameter/2)));
  } else if (key == 'l') {
    console.log('Player x location: ' + x + '; Player y location: ' + y);
  } else if (key == 'k') {
    console.log('Fruit x location: ' + fruitx + '; Fruit y location: ' + fruity);
  } else if (key == 'i') {
    //console.log((Math.floor(Math.random() * 10) + 1) * 32);
    console.log(Math.floor(Math.random() * 16) + 1);
    console.log((Math.floor(Math.random() * 6) + 1) * 16);
  } else if (key == 'u') {
    //console.log(cellStates.length);
    //console.log(cellStates);
    console.log(occupiedCell(x, y).x/32 + ',' + occupiedCell(x, y).y/32);
  } else if (key == 'j') {
    if (pause == false) {
      pause = 1;
    } else {  // toggles enemy movement - updated to not mess with winState & no longer pause enemy-player collision
      pause = 0;
    }
  } else if (key == 'g') {
    if (gm == false) {
      gm = true;
    } else {  // toggles enemy-player collision
      gm = false;
    }
  }

// functionally this doesn't really serve a purpose, I just wanted to see if I could detect a series of specific inputs
  if ((keyCode == 38 || keyLog[0] == 38) && keyLog.length < 11) {
    let newLength = keyLog.push(keyCode);
    console.log(keyLog);
  } else if (keyLog.length == 11) {
    var count = 0; // I originally just had if (keyLog == keyCombo, but that didn't seem to work.)
    for (var i = 0; i < 11; i++) {
      if (keyLog[i] == keyCombo[i]) {
        count++;
      }
    }
    if (count == 11) {
      gm = true;
      //console.log("gm enabled");
    } else {
      //console.log(keyLog);
      keyLog = [];
      count == 0;
    }
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Mouse Detect Selected Cell
function mouseClicked() {
  mousex = mouseX;
  mousey = mouseY;
  //console.log('Mouse x: ' + mouseX + '; Mouse y: ' + mouseY);
  for (var z = 0; z <= 512; z += 32) {
    for (var i = 0; i <= 1024; i += 32) {
      if (mousex>=i-16 && mousex<i+16 && mousey>=z-16 && mousey<z+16) {
        mouseCellX = i;
        mouseCellY = z;
        console.log('Mouse Cell X: ' + mouseCellX + '; Mouse Cell Y: ' + mouseCellY);
        let pos = cellCoords.indexOf(mouseCellX/32 + ',' + mouseCellY/32);
        console.log("CellCoords Index: " + pos);

        if (keyIsDown(17) && cellStates[pos]==0) {
          cellStates[pos] = 1;
        } else if (keyIsDown(17) && cellStates[pos]==1) {
          cellStates[pos] = 0;
        } else if (cellStates[pos]==0 && cellStates[pos-34]==0 && cellStates[pos-33]==0 && cellStates[pos-32]==0 && cellStates[pos-1]==0 && cellStates[pos+1]==0 && cellStates[pos+32]==0 && cellStates[pos+33]==0 && cellStates[pos+34]==0) {
          cellStates[pos] = 1;
          cellStates[pos-34] = 1;
          cellStates[pos-33] = 1;
          cellStates[pos-32] = 1;
          cellStates[pos-1] = 1;
          cellStates[pos+1] = 1;
          cellStates[pos+32] = 1;
          cellStates[pos+33] = 1;
          cellStates[pos+34] = 1;
        } else {
          if (cellStates[pos]==1) {cellStates[pos] = 0;}
          if (cellStates[pos-34]==1) {cellStates[pos-34] = 0;}
          if (cellStates[pos-33]==1) {cellStates[pos-33] = 0;}
          if (cellStates[pos-32]==1) {cellStates[pos-32] = 0;}
          if (cellStates[pos-1]==1) {cellStates[pos-1] = 0;}
          if (cellStates[pos+1]==1) {cellStates[pos+1] = 0;}
          if (cellStates[pos+32]==1) {cellStates[pos+32] = 0;}
          if (cellStates[pos+33]==1) {cellStates[pos+33] = 0;}
          if (cellStates[pos+34]==1) {cellStates[pos+34] = 0;}
        }
        console.log("CellState: " + cellStates[pos]);
      }
    }
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Setup Function
function setup() {
  createCanvas(1024, 512);

  newEnemy1 = new enemy(512, 512, 2.5, 2.5, 2.5, 4, 16, createVector(66, 24, 18));
  newEnemy2 = new enemy(576, 256, 1, 1, 1, 5, 16, createVector(166, 106, 66));
  newEnemy3 = new enemy(512, 256, 1, 1, 1, 5, 16, createVector(144, 60, 62));

  for (var yCoord = 0; yCoord <= 16; yCoord++) {
    for (var xCoord = 0; xCoord <= 32; xCoord++) {
      let newLength = cellStates.push(0);
    } // Both cellStates and the cellCoords have a length of 561.
  }

  for (var yCoord = 0; yCoord <= 16; yCoord++) {
    for (var xCoord = 0; xCoord <= 32; xCoord++) {
      let newLength = cellCoords.push(xCoord + ',' + yCoord);
    } // Fills the cellCoords array with the x & y coordinate for each array item, which can then be referenced to return the index number.
  }   // The index number can then be put into cellStates to find and/or edit the item associated with the appropriate cell.

  RandObjLocations();
}

//--------------------------------------------------------------------------------------------------------------------------------|Draw Function
function draw() {
  background(32);
  playerCoords = createVector(x, y);

  debugGrid();
  debugShowOccupiedCell(x, y);

  createFruit();
  createMouseObject();
  createRandObjects();
  createExit();
  createPlayer();

  //createEnemy1();
  //createEnemy2();

  createStaminaBar();
  createWinProgressBar();
  createControlsText();
  createWinText();

  staminaSystem();
  healthSystem();
  playerMovement();
  mapWrapPlayer();

  collisionFruit();
  collisionExit();
  collisionEnemyObjects();
  collisionEnemy2Objects();
  if (gm == false) {
    collisionEnemyPlayer(newEnemy1);
    collisionEnemyPlayer(newEnemy2);
    collisionEnemyPlayer(newEnemy3);
  }

  if (pause == false) {
    newEnemy1.movement1();
    newEnemy2.movement2();
    newEnemy3.movement2();
  }

  newEnemy1.rubberband();
  newEnemy1.mapWrap();
  newEnemy1.display();
  newEnemy2.rubberband();
  newEnemy2.mapWrap();
  newEnemy2.display();
  newEnemy3.rubberband();
  newEnemy3.mapWrap();
  newEnemy3.display();

  newPlayerObjectCollision();

  //debugCellNumbering();
  debugShowNearCollidableObjects()

} // Draw Function Closing


//--------------------------------------------------------------------------------------------------------------------------------|Collision Detection
function collisionDetection(t1Coords, t1Radius, t2Coords, t2Radius) {
  var t1XpR = t1Coords.x + t1Radius; // target1 x coordinate plus radius
  var t1XmR = t1Coords.x - t1Radius; // target1 x coordinate minus radius
  var t1YpR = t1Coords.y + t1Radius; // target1 y coordinate plus radius
  var t1YmR = t1Coords.y - t1Radius; // target1 y coordinate minus radius

  var t2XpR = t2Coords.x + t2Radius; // target2 x coordinate plus radius
  var t2XmR = t2Coords.x - t2Radius; // target2 x coordinate minus radius
  var t2YpR = t2Coords.y + t2Radius; // target2 y coordinate plus radius
  var t2YmR = t2Coords.y - t2Radius; // target2 y coordinate minus radius

  var xnDist = (t1XpR) - (t2XmR); // X coordinate negative distance
  var xpDist = (t2XpR) - (t1XmR); // X coordinate Positive distance
  var ynDist = (t1YpR) - (t2YmR); // Y coordinate negative distance
  var ypDist = (t2YpR) - (t1YmR); // Y coordinate Positive distance
  var returnDist = createVector(0, 0);

  if (t1XpR >= t2XmR && t1XmR <= t2XpR && t1YpR >= t2YmR && t1YmR <= t2YpR) {
    if (t1Coords.x < t2Coords.x && t1Coords.y+2 > t2YmR && t1Coords.y-2 < t2YpR) {
      //x -= xnDist;
      returnDist.x = -xnDist;
    } else if (t1Coords.x > t2Coords.x && t1Coords.y+2 > t2YmR && t1Coords.y-2 < t2YpR) {
      //x += xpDist;
      returnDist.x = xpDist;
    }
    if (t1Coords.y < t2Coords.y && t1Coords.x+2 > t2XmR && t1Coords.x-2 < t2XpR) {
      //y -= ynDist;
      returnDist.y = -ynDist;
    } else if (t1Coords.y > t2Coords.y && t1Coords.x+2 > t2XmR && t1Coords.x-2 < t2XpR) {
      //y += ypDist;
      returnDist.y = ypDist;
    }
  } else {
    returnDist.x = 0;
    returnDist.y = 0;
  }
  return returnDist;
}

//--------------------------------------------------------------------------------------------------------------------------------|New Object Collision
function newObjectCollision(oxCoord, oyCoord, oRadius) {
  for (var xi = -1; xi <= 1; xi++) {
    for (var yi = -1; yi <= 1; yi++) {
      let cellIndex = cellCoords.indexOf((occupiedCell(oxCoord, oyCoord).x/32)+xi + ',' + (occupiedCell(oxCoord, oyCoord).y/32)+yi);
      if (cellStates[cellIndex] != 0) {
        //var occX = occupiedCell(oxCoord, oyCoord).x + xi;
        //var occY = occupiedCell(oxCoord, oyCoord).y + yi;
        var xReturn = collisionDetection(createVector(oxCoord, oyCoord), oRadius, createVector(occX, occY), tsRadius).x;
        var yReturn = collisionDetection(createVector(oxCoord, oyCoord), oRadius, createVector(occX, occY), tsRadius).y;
        return createVector(xReturn, yReturn);
        //return collisionDetection(createVector(oxCoord, oyCoord), oRadius, createVector(occX, occY), tsRadius);
      } else {
        return 0;
      }
    }
  }
}

function newPlayerObjectCollision() {
  for (var xi = -1; xi <= 1; xi++) {
    for (var yi = -1; yi <= 1; yi++) {
      let cellIndex = cellCoords.indexOf((occupiedCell(x, y).x/32+xi) + ',' + (occupiedCell(x, y).y/32+yi));
      if (cellStates[cellIndex] != 0) {
        var occX = occupiedCell(x, y).x + (xi*32);
        var occY = occupiedCell(x, y).y + (yi*32);
        //var xReturn = collisionDetection(createVector(oxCoord, oyCoord), oRadius, createVector(occX, occY), tsRadius).x;
        //var yReturn = collisionDetection(createVector(oxCoord, oyCoord), oRadius, createVector(occX, occY), tsRadius).y;
        //return createVector(xReturn, yReturn);
        x += collisionDetection(createVector(x, y), radius, createVector(occX, occY), tsRadius).x;
        y += collisionDetection(createVector(x, y), radius, createVector(occX, occY), tsRadius).y;
      }
    }
  }
}

/*(this was just me trying to figure out the for statements needed to test surrounding cells)
[00][10][20][30][40]
[01][11][21][31][41]  [--][=-][+-]
[02][12][22][32][42]  [-=][==][+=]
[03][13][23][33][43]  [-+][=+][++]
[04][14][24][34][44]
-1,-1; -1,0; -1,1; 0,-1; 0,0; 0,1; 1,-1; 1,0; 1,1
*/

//--------------------------------------------------------------------------------------------------------------------------------|Debug - Grid
function debugGrid() {
  for (var xi = 0; xi <= 1024; xi += 32) {
    for (var yi = 0; yi <= 512; yi += 32) {
      fill(34, 34, 34, 255);
      stroke(16, 16, 16, 255);
      strokeWeight(1);
      square(xi-16, yi-16, 32);
    }
  }
  strokeWeight(0);
}

//--------------------------------------------------------------------------------------------------------------------------------|Debug - Cell Numbering
function debugCellNumbering() {
  for (var xi = 0; xi <= 1024; xi += 32) {
    for (var yi = 0; yi <= 512; yi += 32) {
      fill(4, 4, 4, 128);
      textSize(12);
      text(xi/32 + ',' + yi/32, xi-16,yi+14);
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------------|Debug - Show Occupied Cell
function debugShowOccupiedCell(xc, yc) {
  var occupiedCellX;
  var occupiedCellY;
  if (xc % 32 <= 16) {
    occupiedCellX = xc - (xc % 32);
  } else if (xc % 32 > 16) {
    occupiedCellX = xc + (32 - (xc % 32));
  }
  if (yc % 32 <= 16) {
    occupiedCellY = yc - (yc % 32);
  } else if (yc % 32 > 16) {
    occupiedCellY = yc + (32 - (yc % 32));
  }
  fill(66, 188, 244, 44)
  square(occupiedCellX-16, occupiedCellY-16, 32);
}

//--------------------------------------------------------------------------------------------------------------------------------|Debug - Show Near Collidable Objects
function debugShowNearCollidableObjects() {
  for (var xi = -1; xi <= 1; xi++) {
    for (var yi = -1; yi <= 1; yi++) {
      let cellIndex = cellCoords.indexOf((occupiedCell(x, y).x/32+xi) + ',' + (occupiedCell(x, y).y/32+yi));
      if (cellStates[cellIndex] != 0) {
        fill(0,0,0,0);
        stroke(255, 255, 255, 128);
        strokeWeight(4);
        square((occupiedCell(x, y).x+(xi*32))-14, (occupiedCell(x, y).y+(yi*32))-14, 28);
      }
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------------|Player Occupied Cell
function occupiedCell(xc, yc) { // After a fair bit of testing I finally came up with this method of getting exact cell coordinates without needing to test every possible cell.
  var occupiedCellX;    // This is done using the modulus operator, and I imagine should be much better for performance (though likely unnoticable with as simple a program as this).
  var occupiedCellY;
  if (xc % 32 <= 16) {
    occupiedCellX = xc - (xc % 32);
  } else if (xc % 32 > 16) {
    occupiedCellX = xc + (32 - (xc % 32));
  }
  if (yc % 32 <= 16) {
    occupiedCellY = yc - (yc % 32);
  } else if (yc % 32 > 16) {
    occupiedCellY = yc + (32 - (yc % 32));
  }
  return createVector(occupiedCellX, occupiedCellY);
}


//--------------------------------------------------------------------------------------------------------------------------------|Create - Mouse Object
function createMouseObject() {
  for (var yi = 0; yi <= 16; yi++) {
    for (var xi = 0; xi <= 32; xi++) {
      let cellIndex = cellCoords.indexOf(xi + ',' + yi);
      var xPos = xi*32;
      var yPos = yi*32;
      if (cellStates[cellIndex] == 1) {
        fill(98, 98, 98);
        square(xPos-tsRadius, yPos-tsRadius, tsRadius*2);
        //let newLength = mouseObjNum.push(createVector(xi, yi));
      } else if (cellStates[cellIndex] == 2) {
        //fill(108, 104, 82);
        //square(xPos-16, yPos-16, tsRadius*2);
      }

      if (cellStates[cellIndex]!=0 && fruitx>=xPos-tsRadius && fruitx<=xPos+tsRadius && fruity>=yPos-tsRadius && fruity<=yPos+tsRadius) {
        fruitx = (Math.floor(Math.random() * 31) + 1) * 32;
        fruity = (Math.floor(Math.random() * 15) + 1) * 32;
      } // Insures fruit will not overlap with mouse objects - Updated to be compatible w/ new mouse object system.

    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------------|Random Object Locations
function RandObjLocations() {
  while (randObjCoords.length < randObjNum) {
    var randX = (Math.floor(Math.random() * 32) + 1) * 32;
    var randY = (Math.floor(Math.random() * 16) + 1) * 32;
    var randR = Math.floor(Math.random() * 256);
    var randG = Math.floor(Math.random() * 256);
    var randB = Math.floor(Math.random() * 256);
    var randSize = (Math.floor(Math.random() * 6) + 1) * 16;

    if (randObjCoords.indexOf(createVector(randX, randY)) == -1 && (randX != exitX && randY != exitY)) {
      let newLength = randObjCoords.push(createVector(randX, randY, randSize));
      let newLength2 = randObjColor.push(createVector(randR, randG, randB));

      let cellIndex = cellCoords.indexOf(randX/32 + ',' + randY/32);
      cellStates[cellIndex] = 2;
    }

  }
  console.log(randObjCoords);
  console.log(randObjCoords.length);
}

//--------------------------------------------------------------------------------------------------------------------------------|Create - Random Objects
function createRandObjects() {
  for (var i = 0; i < randObjCoords.length; i++) {
    fill (randObjColor[i].x, randObjColor[i].y, randObjColor[i].z);
    square(randObjCoords[i].x-16, randObjCoords[i].y-16, 32);
    // I added randomized sizes to these objects, but then I realized my colission system currently only supports the one size of collision box.
    //square(randObjCoords[i].x-(randObjCoords[i].z/2), randObjCoords[i].y-(randObjCoords[i].z/2), randObjCoords[i].z);
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Create - Exit
function createExit() {
  fill(92, 128, 212, 40);
  square(exitX-24, exitY-24, 48);
  fill(34, 82, 228);
  square(exitX-16, exitY-16, 32);
  fill(58, 102, 216);
  square(exitX-12, exitY-12, 24);
  fill(112, 190, 224);
  square(exitX-4, exitY-4, 8);
}

//--------------------------------------------------------------------------------------------------------------------------------|Create - Fruit
function createFruit() {
  fill(208, 36, 36, 22);
  square(fruitx-16, fruity-16, 32);
  fill(242, 28, 28);
  circle(fruitx, fruity, fruitDiameter);
  fill(186, 38, 12);
  circle(fruitx, fruity, fruitDiameter-4);
  fill(70, 117, 86);
  rect(fruitx-2, fruity-14, 4, 9);
}

//--------------------------------------------------------------------------------------------------------------------------------|Create - Player
function createPlayer() {
  fill(24, 222, 42);
  circle(x, y, diameter);
  circle(x-1024, y, diameter); // these additional circles simply visualize the teleporting that will happen when reaching the edge
  circle(x+1024, y, diameter);
  circle(x, y-512, diameter);
  circle(x, y+512, diameter);
}


//--------------------------------------------------------------------------------------------------------------------------------|Create - Stamina Bar
function createStaminaBar() {
  stroke(14, 22, 18, 120);
  strokeWeight(2);
  fill(24, 48, 32, 128);
  rect(7,7, 102,16);
  strokeWeight(0);
  fill(20, 200, 32, 128);
  rect(8,8, (stamina / staminaMax) * 100,14);
}

//--------------------------------------------------------------------------------------------------------------------------------|Create - Win Progress Bar
function createWinProgressBar() {
  stroke(18, 16, 24, 120);
  strokeWeight(2);
  fill(32, 28, 46, 128);
  rect(11,468, 202,24);
  strokeWeight(0);
  fill(92, 142, 186, 144);
  rect(12,469, (exitWin / exitWinMax) * 200,22);

  stroke(120, 142, 144, 144);
  strokeWeight(1);
  textSize(20);
  fill(134, 166, 172, 120);
  text((Math.floor(exitWin/exitWinMax*100)) + "%", 16,487);
}

//--------------------------------------------------------------------------------------------------------------------------------|Create - Controls Text
function createControlsText() {
  fill(202, 202, 202, controlsOpacity -= .2);
  stroke(180, 180, 180, controlsOpacity -= .2);
  strokeWeight(1);
  textSize(16);
  text("W, A, S, & D to move", 8,40);
  text('Hold Shift to "Sprint", which will drain your stamina.', 8,64);
  text('Stamina regenerates faster when not moving.', 8,88);
  text('Picking up the "fruit" will also replenish some stamina.', 8,112);
}

//--------------------------------------------------------------------------------------------------------------------------------|Create - Win Text
function createWinText() {
  fill(198, 180, 184, winOpacity);
  stroke(160, 172, 184, winOpacity);
  textSize(64);
  text("You Escaped!", 318, 78);
  strokeWeight(0);
}


//--------------------------------------------------------------------------------------------------------------------------------|Stamina System
function staminaSystem() {
  if (keyIsDown(83) || keyIsDown(87) || keyIsDown(68) || keyIsDown(65)) {
    staminaRecovery = 2;
  } else if (keyIsDown(37) || keyIsDown(38) || keyIsDown(39) || keyIsDown(40) || stamina < (staminaMax * .4)){
    staminaRecovery = 4;
  } else {
    staminaRecovery = 6;
  }

  if (keyIsDown(16) && (keyIsDown(83) || keyIsDown(87) || keyIsDown(68) || keyIsDown(65))) {
    if (stamina > 0) {
      playerSpeed = playerRunSpeed;
      stamina -= staminaConsumption;
    } else {
      playerSpeed = initialPlayerSpeed;
    }
  } else {
    playerSpeed = initialPlayerSpeed;
    if (stamina < staminaMax) {
      stamina += staminaRecovery;
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------------|Health Icon
function healthIcon(xPos, yPos) {
  fill(189, 34, 34, 128);
  stroke(20, 16, 12, 128);
  strokeWeight(4);
  rect(xPos,yPos, 20,20);
}

//--------------------------------------------------------------------------------------------------------------------------------|Health System
function healthSystem() {
  if (health == 0) {
    winState = 2;
    fill(198, 180, 184, 220);
    stroke(160, 172, 184, 200);
    strokeWeight(1);
    textSize(64);
    text("defeat", 318, 78);
  } else if (health == 1) {
    healthIcon(998,4);
  } else if (health == 2) {
    fill(189, 34, 34, 128);
    healthIcon(998,4);
    healthIcon(970,4);
  } else if (health == 3) {
    fill(189, 34, 34, 128);
    healthIcon(998,4);
    healthIcon(970,4);
    healthIcon(942,4);
  }
  strokeWeight(0);
}

//--------------------------------------------------------------------------------------------------------------------------------|Movement - Player
function playerMovement() {
  if (keyIsDown(83) || keyIsDown(87) || keyIsDown(68) || keyIsDown(65)) {
    if (keyIsDown(83) && keyIsDown(68)) {
      y += playerSpeed;
      x += playerSpeed;
    } else if (keyIsDown(83) && keyIsDown(65)) {
      y += playerSpeed;
      x -= playerSpeed;
    } else if (keyIsDown(87) && keyIsDown(65)) {
      y -= playerSpeed;
      x -= playerSpeed;
    } else if (keyIsDown(87) && keyIsDown(68)) {
      y -= playerSpeed;
      x += playerSpeed;
    } else if (keyIsDown(83)) {
      y += playerSpeed;
    } else if (keyIsDown(87)) {
      y -= playerSpeed;
    } else if (keyIsDown(68)) {
      x += playerSpeed;
    } else if (keyIsDown(65)) {
      x -= playerSpeed;
    }
  } else { // this just allows for slower movement with arrow keys, mostly for testing purposes
    if (keyIsDown(40) && keyIsDown(39)) {
      y += playerWalkSpeed;
      x += playerWalkSpeed;
    } else if (keyIsDown(40) && keyIsDown(37)) {
      y += playerWalkSpeed;
      x -= playerWalkSpeed;
    } else if (keyIsDown(38) && keyIsDown(37)) {
      y -= playerWalkSpeed;
      x -= playerWalkSpeed;
    } else if (keyIsDown(38) && keyIsDown(39)) {
      y -= playerWalkSpeed;
      x += playerWalkSpeed;
    } else if (keyIsDown(40)) {
      y += playerWalkSpeed;
    } else if (keyIsDown(38)) {
      y -= playerWalkSpeed;
    } else if (keyIsDown(39)) {
      x += playerWalkSpeed;
    } else if (keyIsDown(37)) {
      x -= playerWalkSpeed;
    }
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Map Wrap - Player
function mapWrapPlayer() {
  if (y > 512) {
    y = 0;
  } else if (y < 0) {
    y = 512;
  }
  if (x > 1024) {
    x = 0;
  } else if (x < 0) {
   x = 1024;
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Collision Player-Fruit
function collisionFruit() {
  if (x+(diameter/2) >= (fruitx-(fruitDiameter/2)) && x-(diameter/2) <= (fruitx+(fruitDiameter/2)) && y+(diameter/2) >= (fruity-(fruitDiameter/2)) && y-(diameter/2) <= (fruity+(fruitDiameter/2))) {
    fruitx = (Math.floor(Math.random() * 31) + 1) * 32; // gives a value between 32 and 1024 in increments of 32 (I think)
    fruity = (Math.floor(Math.random() * 15) + 1) * 32; // gives a value between 32 and 512 in increments of 32 (I think)
    fruitCollected++;
    if (stamina < staminaMax-fruitStamina) {
      stamina += fruitStamina;
    } else {
      stamina = staminaMax
    } // ensures fruit cannot give more than the maximum stamina value - Updated to be compatible with changing variable values
    console.log('Fruit Collision #' + fruitCollected);
    console.log('Fruit X: ' + fruitx + '; ' + ' Fruit Y: ' + fruity);
  }
}

//--------------------------------------------------------------------------------------------------------------------------------|Collision Player-Exit
function collisionExit() {
  if (x+radius >= exitX-16 && x-radius <= exitX+16 && y+radius >= exitY-16 && y-radius <= exitY+16) {
    if (exitWin < exitWinMax && winState != 1) {  // Updated to also check winState as to not spam console with messages
      exitWin += exitWinSpeed;
      console.log('Exit Collision');
    } else {
      winOpacity = 255;
      winState = 1;
    }
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Collision - Enemy-Player
function collisionEnemyPlayer(cEnemy) {
  if (x+radius>=cEnemy.x-cEnemy.radius && x-radius<=cEnemy.x+cEnemy.radius && y+radius>=cEnemy.y-cEnemy.radius && y-radius<=cEnemy.y+cEnemy.radius && winState!=1) {
    console.log('Collision with Enemy');
    if (x<cEnemy.x && y>cEnemy.y-cEnemy.radius && y<cEnemy.y+cEnemy.radius) {
      x -= diameter;
    } else if (x>cEnemy.x && y>cEnemy.y-cEnemy.radius && y<cEnemy.y+cEnemy.radius) {
      x += diameter;
    }
    if (y<cEnemy.y && x>cEnemy.x-cEnemy.radius && x<cEnemy.x+cEnemy.radius) {
      y -= diameter;
    } else if (y>cEnemy.y && x>cEnemy.x-cEnemy.radius && x<cEnemy.x+cEnemy.radius) {
      y += diameter;
    }

    if (health > 0) {
      health -= 1;
    }
    console.log("Player Health: " + health);
  }
}

//--------------------------------------------------------------------------------------------------------------------------------|Collision - Enemy-Objects
function collisionEnemyObjects() {
  for (var z = 0; z <= 16; z++) {
    for (var i = 0; i <= 32; i++) {
      cEnemyR = enemyDiameter/2;

      let cellIndex = cellCoords.indexOf(i + ',' + z);
      var cCoordsE = createVector(i*32, z*32);
      var cxLDistanceE = (newEnemy1.x+cEnemyR)-(cCoordsE.x-tsRadius);
      var cxRDistanceE = (cCoordsE.x+tsRadius)-(newEnemy1.x-cEnemyR);
      var cyTDistanceE = (newEnemy1.y+cEnemyR)-(cCoordsE.y-tsRadius);
      var cyBDistanceE = (cCoordsE.y+tsRadius)-(newEnemy1.y-cEnemyR);

      if (newEnemy1.x+cEnemyR >= cCoordsE.x-tsRadius && newEnemy1.x-cEnemyR <= cCoordsE.x+tsRadius && newEnemy1.y+cEnemyR >= cCoordsE.y-tsRadius && newEnemy1.y-cEnemyR <= cCoordsE.y+tsRadius && cellStates[cellIndex] != 0) {
        //console.log('Enemy collision with cell [' + cellStates[cellIndex] + "]: " + i*32 + ',' + z*32);

        if (newEnemy1.x<cCoordsE.x && newEnemy1.y>cCoordsE.y-tsRadius && newEnemy1.y<cCoordsE.y+tsRadius) {
          newEnemy1.x -= cxLDistanceE;
        } else if (newEnemy1.x>cCoordsE.x && newEnemy1.y>cCoordsE.y-tsRadius && newEnemy1.y<cCoordsE.y+tsRadius) {
          newEnemy1.x += cxRDistanceE;
        }
        if (newEnemy1.y<cCoordsE.y && newEnemy1.x>cCoordsE.x-tsRadius && newEnemy1.x<cCoordsE.x+tsRadius) {
          newEnemy1.y -= cyTDistanceE;
        } else if (newEnemy1.y>cCoordsE.y && newEnemy1.x>cCoordsE.x-tsRadius && newEnemy1.x<cCoordsE.x+tsRadius) {
          newEnemy1.y += cyBDistanceE;
        }
      }
    }
  }
}

function collisionEnemy2Objects() {
  for (var z = 0; z <= 16; z++) {
    for (var i = 0; i <= 32; i++) {
      cEnemyR = enemyDiameter/2;

      let cellIndex = cellCoords.indexOf(i + ',' + z);
      var cCoordsE = createVector(i*32, z*32);
      var cxLDistanceE = (newEnemy2.x+cEnemyR)-(cCoordsE.x-tsRadius);
      var cxRDistanceE = (cCoordsE.x+tsRadius)-(newEnemy2.x-cEnemyR);
      var cyTDistanceE = (newEnemy2.y+cEnemyR)-(cCoordsE.y-tsRadius);
      var cyBDistanceE = (cCoordsE.y+tsRadius)-(newEnemy2.y-cEnemyR);

      if (newEnemy2.x+cEnemyR >= cCoordsE.x-tsRadius && newEnemy2.x-cEnemyR <= cCoordsE.x+tsRadius && newEnemy2.y+cEnemyR >= cCoordsE.y-tsRadius && newEnemy2.y-cEnemyR <= cCoordsE.y+tsRadius && cellStates[cellIndex] != 0) {
        //console.log('Enemy collision with cell [' + cellStates[cellIndex] + "]: " + i*32 + ',' + z*32);

        if (newEnemy2.x<cCoordsE.x && newEnemy2.y>cCoordsE.y-tsRadius && newEnemy2.y<cCoordsE.y+tsRadius) {
          newEnemy2.x -= cxLDistanceE;
        } else if (newEnemy2.x>cCoordsE.x && newEnemy2.y>cCoordsE.y-tsRadius && newEnemy2.y<cCoordsE.y+tsRadius) {
          newEnemy2.x += cxRDistanceE;
        }
        if (newEnemy2.y<cCoordsE.y && newEnemy2.x>cCoordsE.x-tsRadius && newEnemy2.x<cCoordsE.x+tsRadius) {
          newEnemy2.y -= cyTDistanceE;
        } else if (newEnemy2.y>cCoordsE.y && newEnemy2.x>cCoordsE.x-tsRadius && newEnemy2.x<cCoordsE.x+tsRadius) {
          newEnemy2.y += cyBDistanceE;
        }
      }
    }
  }
}
