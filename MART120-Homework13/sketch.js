var x = 64;               //  Noticed Bugs:
var y = 64;               // -Enemy pushing player into edge of canvas can cause player & enemy to overlap, getting the player somewhat stuck (not inescapable).
var diameter = 32;        // -Enemy push player into/through objects. | -Sprinting into side of a group of objects while wiggling back&forth/up&down can temporarily get player inside of objects.
var radius = diameter/2;  // -Spawning object ontop the player won't push player out (likely becuase it's multiple objects now, and it gets stuck being teleported back & forth between them).
var healthMax = 3;        // -Placing & removing objects can erase the cell state of a cell (thus removing collision with the cell).
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
var enemyX = 512;             //X Integrate updated systems from sketch2.js (object placement, collision, background grid)
var enemyY = 512;             //X Enemy collision with mouse objects.
var enemy2X = 576;            //  Allow enemies to comprehend the concept of going around an obstacle.
var enemy2Y = 256;
var enemyDiameter = 32;
var enemySpeed = 2.6;
var enemy2XSpeed = 0;
var enemy2YSpeed = 0;
var enemy2SpeedLimit = 4;
var enemy2Diameter = 32;
var enemyNum = 2;

var cEnemy;
var cEnemyR;

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
    console.log(cellStates.length);
    console.log(cellStates);
  } else if (key == 'j') {
    if (winState == 0) {
      winState = 1;
    } else {  // toggles enemy movement & enemy-player collision
      winState = 0;
    }
  } else if (key == 'g') {
    if (gm == false) {
      gm = true;
    } else {  // toggles enemy-player collision
      gm = false;
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
        } else if (cellStates[pos]==1 || cellStates[pos-34]==1 || cellStates[pos-33]==1 || cellStates[pos-32]==1 || cellStates[pos-1]==1 || cellStates[pos+1]==1 || cellStates[pos+32]==1 || cellStates[pos+33]==1 || cellStates[pos+34]==1) {
          cellStates[pos] = 0;
          cellStates[pos-34] = 0;
          cellStates[pos-33] = 0;
          cellStates[pos-32] = 0;
          cellStates[pos-1] = 0;
          cellStates[pos+1] = 0;
          cellStates[pos+32] = 0;
          cellStates[pos+33] = 0;
          cellStates[pos+34] = 0;
        }
      /*} else if (cellStates[pos]==1) {
        cellStates[pos] = 0
      } else if (cellStates[pos-33]==1) {
        cellStates[pos-33] = 0
      }  else if (cellStates[pos+33]==1) {
        cellStates[pos+33] = 0
      } else if (cellStates[pos-1]==1) {
        cellStates[pos-1] = 0
      } else if (cellStates[pos+1]==1) {
        cellStates[pos+1] = 0
      } else if (cellStates[pos-34]==1) {
        cellStates[pos-34] = 0
      } else if (cellStates[pos-32]==1) {
        cellStates[pos-32] = 0
      } else if (cellStates[pos+32]==1) {
        cellStates[pos+32] = 0
      } else if (cellStates[pos+34]==1) {
        cellStates[pos+34] = 0
      }*/
        console.log("CellState: " + cellStates[pos]);
      }
    }
  }
}


//--------------------------------------------------------------------------------------------------------------------------------|Setup Function
function setup() {
  createCanvas(1024, 512);

  tsCoords = createVector(672, 320);

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

  debugGrid();
  //debugPlayerOccupiedCell();

  createFruit();
  createMouseObject();
  createRandObjects();
  createExit();
  createPlayer();

  createEnemy1();
  createEnemy2();

  createStaminaBar();
  createWinProgressBar();
  createControlsText();
  createWinText();

  staminaSystem();
  healthSystem();
  playerMovement();

  enemy1Movement();
  enemy2Movement();

  mapWrapPlayer();
  mapWrapEnemy1();
  mapWrapEnemy2();

  collisionFruit();
  collisionExit();
  collisionPlayerObjects();
  collisionEnemyObjects();
  if (gm == false) {
    collisionEnemyPlayer();
  }

} // Draw Function Closing


//--------------------------------------------------------------------------------------------------------------------------------|Debug - Grid
function debugGrid() {
  fill(34, 34, 34, 255);
  stroke(16, 16, 16, 255);
  strokeWeight(1);
  for (var i = 0; i <= 1024; i += 32) {
    for (var z = 0; z <= 512; z += 32) {
      square(i-16, z-16, 32);
    }
  }
  strokeWeight(0);  // Creates a representation of the grid which determines spawn positions of the fruit and exit.
}

//--------------------------------------------------------------------------------------------------------------------------------|Debug - Player Occupied Cell
function debugPlayerOccupiedCell() {
  fill(188, 188, 188, 128);
  for (var z = 0; z <= 512; z += 32) {
    for (var i = 0; i <= 1024; i += 32) {
      if (x >= i-16 && x <= i+16 && y >= z-16 && y <= z+16) {
        square(i-16, z-16, 32);
      }
    }
  } // This doesn't really serve any purpose as at no point do I check what cell the player is in.
}


//--------------------------------------------------------------------------------------------------------------------------------|Create - Mouse Object
function createMouseObject() {
  for (var yi = 0; yi <= 16; yi++) {
    for (var xi = 0; xi <= 32; xi++) {
      let cellIndex = cellCoords.indexOf(xi + ',' + yi);
      var xPos = xi*32;
      var yPos = yi*32;
      if (cellStates[cellIndex] == 1) {
        fill(98);
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
  fill(208, 36, 36, 40);
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


//--------------------------------------------------------------------------------------------------------------------------------|Create - Enemy1
function createEnemy1() {
  fill(126, 48, 32, 255); //enemy1
  circle(enemyX, enemyY, enemyDiameter);
  circle(enemyX-1024, enemyY, enemyDiameter);
  circle(enemyX+1024, enemyY, enemyDiameter);
  circle(enemyX, enemyY-512, enemyDiameter);
  circle(enemyX, enemyY+512, enemyDiameter);
}

//--------------------------------------------------------------------------------------------------------------------------------|Create - Enemy2
function createEnemy2() {
  fill(120, 88, 28, 255); //enemy2
  circle(enemy2X, enemy2Y, enemyDiameter);
  circle(enemy2X-1024, enemy2Y, enemyDiameter);
  circle(enemy2X+1024, enemy2Y, enemyDiameter);
  circle(enemy2X, enemy2Y-512, enemyDiameter);
  circle(enemy2X, enemy2Y+512, enemyDiameter);
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


//--------------------------------------------------------------------------------------------------------------------------------|Movement - Enemy1
function enemy1Movement() {
  if (winState != 1) { // this freezes the enemies once the player has won
    if (x-1024 - enemyX > enemyX - x) {
      enemyX -= enemySpeed;
    } else if ((x+1024) - enemyX < enemyX - x) {
      enemyX += enemySpeed
    } else if (enemyX < x) {
      enemyX += enemySpeed;
    } else if (enemyX > x) {
      enemyX -= enemySpeed;
    } //  The extra else if statements allow enemy1 to travel across the edge of the screen if its a shorter distance to the player.
    if (y-512 - enemyY > enemyY - y) {
      enemyY -= enemySpeed;
    } else if ((y+512) - enemyY < enemyY - y) {
      enemyY += enemySpeed
    } else if (enemyY < y) {
      enemyY += enemySpeed;
    } else if (enemyY > y) {
      enemyY -= enemySpeed;
    }
  } // if (winState != 1) closing tag
}

//--------------------------------------------------------------------------------------------------------------------------------|Movement - Enemy2
function enemy2Movement() {
  if (winState != 1) { // this freezes the enemies once the player has won
    if ((Math.floor(Math.random() * 256) + 1) == (Math.floor(Math.random() * 256) + 1)) {
      enemy2XSpeed += 1;
    }
    if ((Math.floor(Math.random() * 256) + 1) == (Math.floor(Math.random() * 256) + 1)) {
      enemy2XSpeed -= 1;
    }
    if ((Math.floor(Math.random() * 256) + 1) == (Math.floor(Math.random() * 256) + 1)) {
      enemy2YSpeed += 1;
    }
    if ((Math.floor(Math.random() * 256) + 1) == (Math.floor(Math.random() * 256) + 1)) {
      enemy2YSpeed -= 1;
    } // If you want too see how many tries this system took I left some of my failed attempts in my sketchTesting.js file.

    if (enemy2XSpeed > enemy2SpeedLimit || enemy2XSpeed < -enemy2SpeedLimit) {
      enemy2XSpeed = 0;
      enemy2YSpeed *= -1;
    }
    if (enemy2YSpeed > enemy2SpeedLimit || enemy2YSpeed < -enemy2SpeedLimit) {
      enemy2YSpeed = 0;
      enemy2XSpeed *= -1;
    } // This limits enemy2's speed and tries to stop it from getting stuck in constantly just moving in the same direction.

    enemy2X += enemy2XSpeed;
    enemy2Y += enemy2YSpeed;
  } // if (winState != 1) closing tag
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

//--------------------------------------------------------------------------------------------------------------------------------|Map Wrap - Enemy1
function mapWrapEnemy1() {
  if (enemyY > 512) {
    enemyY = 1;
  } else if (enemyY < 0) {
    enemyY = 511;
  }
  if (enemyX > 1024) {
    enemyX = 1;
  } else if (enemyX < 0) {
   enemyX = 1023;
  }
}

//--------------------------------------------------------------------------------------------------------------------------------|Map Wrap - Enemy2
function mapWrapEnemy2() {
  if (enemy2Y > 512) {
    enemy2Y = 0;
  } else if (enemy2Y < 0) {
    enemy2Y = 512;
  }
  if (enemy2X > 1024) {
    enemy2X = 0;
  } else if (enemy2X < 0) {
   enemy2X = 1024;
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

//--------------------------------------------------------------------------------------------------------------------------------|Collision - Player-Objects
function collisionPlayerObjects() {
  for (var z = 0; z <= 16; z++) {
    for (var i = 0; i <= 32; i++) {
      let cellIndex = cellCoords.indexOf(i + ',' + z);

      cCoords = createVector(i*32, z*32);
      cxLDistance = (x+radius)-(cCoords.x-tsRadius);  // This took my a very long time to work out, and even though it feels very messy and needlessly complex, it's the best I can come up.
      cxRDistance = (cCoords.x+tsRadius)-(x-radius);  // This also has difficulty with the player moving into an object diagonally (as in moving into the corner of a square).
      cyTDistance = (y+radius)-(cCoords.y-tsRadius);  // This is because it can only move the player in a straight line along the x or y axis.
      cyBDistance = (cCoords.y+tsRadius)-(y-radius);

      if (x+radius >= (cCoords.x-tsRadius) && x-radius <= (cCoords.x+tsRadius) && y+radius >= (cCoords.y-tsRadius) && y-radius <= (cCoords.y+tsRadius) && cellStates[cellIndex] != 0) {
        //console.log('Collision with cell [' + cellStates[cellIndex] + "]: " + i*32 + ',' + z*32);

        if (x < cCoords.x && y > cCoords.y-tsRadius && y < cCoords.y+tsRadius) {
          x -= cxLDistance;
        } else if (x > cCoords.x && y > cCoords.y-tsRadius && y < cCoords.y+tsRadius) {
          x += cxRDistance;
        }
        if (y < cCoords.y && x > cCoords.x-tsRadius && x < cCoords.x+tsRadius) {
          y -= cyTDistance;
        } else if (y > cCoords.y && x > cCoords.x-tsRadius && x < cCoords.x+tsRadius) {
          y += cyBDistance;
        }
      }
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------------|Collision - Enemy-Player
function collisionEnemyPlayer() {
  for (var i = 1; i <= enemyNum; i++) {
    if (i == 1) {
      cEnemy = createVector(enemyX, enemyY);
      cEnemyR = enemyDiameter/2;
    } else if (i == 2) {
      cEnemy = createVector(enemy2X, enemy2Y);
      cEnemyR = enemy2Diameter/2;
    }
    if (x+radius>=cEnemy.x-cEnemyR && x-radius<=cEnemy.x+cEnemyR && y+radius>=cEnemy.y-cEnemyR && y-radius<=cEnemy.y+cEnemyR && winState!=1) {
      console.log('Enemy Collision with Enemy' + i);
      if (x<cEnemy.x && y>cEnemy.y-cEnemyR && y<cEnemy.y+cEnemyR) {
        x -= diameter;
      } else if (x>cEnemy.x && y>cEnemy.y-cEnemyR && y<cEnemy.y+cEnemyR) {
        x += diameter;
      }
      if (y<cEnemy.y && x>cEnemy.x-cEnemyR && x<cEnemy.x+cEnemyR) {
        y -= diameter;
      } else if (y>cEnemy.y && x>cEnemy.x-cEnemyR && x<cEnemy.x+cEnemyR) {
        y += diameter;
      }

      if (health > 0) {
        health -= 1;
      }
      console.log("Player Health: " + health);
    }
  }
}

//--------------------------------------------------------------------------------------------------------------------------------|Collision - Enemy-Objects
function collisionEnemyObjects() {
  for (var z = 0; z <= 16; z++) {
    for (var i = 0; i <= 32; i++) {
      cEnemy = createVector(enemyX, enemyY);
      cEnemyR = enemyDiameter/2;

      let cellIndex = cellCoords.indexOf(i + ',' + z);
      var cCoordsE = createVector(i*32, z*32);
      var cxLDistanceE = (cEnemy.x+cEnemyR)-(cCoordsE.x-tsRadius);
      var cxRDistanceE = (cCoordsE.x+tsRadius)-(cEnemy.x-cEnemyR);
      var cyTDistanceE = (cEnemy.y+cEnemyR)-(cCoordsE.y-tsRadius);
      var cyBDistanceE = (cCoordsE.y+tsRadius)-(cEnemy.y-cEnemyR);

      if (cEnemy.x+cEnemyR >= cCoordsE.x-tsRadius && cEnemy.x-cEnemyR <= cCoordsE.x+tsRadius && cEnemy.y+cEnemyR >= cCoordsE.y-tsRadius && cEnemy.y-cEnemyR <= cCoordsE.y+tsRadius && cellStates[cellIndex] != 0) {
        //console.log('Enemy collision with cell [' + cellStates[cellIndex] + "]: " + i*32 + ',' + z*32);

        if (cEnemy.x<cCoordsE.x && cEnemy.y>cCoordsE.y-tsRadius && cEnemy.y<cCoordsE.y+tsRadius) {
          cEnemy.x -= cxLDistanceE;
        } else if (cEnemy.x>cCoordsE.x && cEnemy.y>cCoordsE.y-tsRadius && cEnemy.y<cCoordsE.y+tsRadius) {
          cEnemy.x += cxRDistanceE;
        }
        if (cEnemy.y<cCoordsE.y && cEnemy.x>cCoordsE.x-tsRadius && cEnemy.x<cCoordsE.x+tsRadius) {
          cEnemy.y -= cyTDistanceE;
        } else if (cEnemy.y>cCoordsE.y && cEnemy.x>cCoordsE.x-tsRadius && cEnemy.x<cCoordsE.x+tsRadius) {
          cEnemy.y += cyBDistanceE;
        }

        enemyX = cEnemy.x;
        enemyY = cEnemy.y;

      }
    }
  }

}

//--------------------------------------------------------------------------------------------------------------------------------|Limit Mouse Objects
function limitMouseObjects() {
  //for (var i = 0; i < cellStates.length; i++) {
    //if (cellStates[i] == 1) {
      //let newLength = mouseObjNum.push(cellStates[i]);
    //}

    //if (mouseObjNum.length > 8)
  //}
}
