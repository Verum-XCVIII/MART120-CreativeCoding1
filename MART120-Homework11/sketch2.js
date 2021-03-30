var x = 64;
var y = 64;
var diameter = 32;            // This file is for testing collision past simply detecting it along with an improved cell coordinate system.
var radius = diameter/2;

var initialPlayerSpeed = 3;   //  Notes/ Planning:
var playerSpeed = 2;          //  Coordinate System: take the X & Y value gotten and get the index number of the item which shares that X,Y combination.
var playerRunSpeed = 6;       //  Then use that index number to reference a seperate array which will contain the state of that cell, as in what is on/ in said cell.
var staminaMax = 1024;        //  e.x.: Tell if there is an obsticle, the player, an enemy, or nothing.
var stamina = 1024;
var staminaConsumption = 4;
var staminaRecovery = 2;
var playerWalkSpeed = 1;

var fruitx = 256;
var fruity = 256;
var fruitDiameter = 20;

var mousex;
var mousey;
var mouseCellX = -32;
var mouseCellY = -32;
let mouseObjectXLocations = [];
let mouseObjectYLocations = [];

let cellStates = [];
let cellCoords = [];
var cellNumber;

var controlsOpacity = 255;

var exitX = (Math.floor(Math.random() * 32) + 1) * 32;
var exitY = (Math.floor(Math.random() * 16) + 1) * 32;
var exitWin = 0;
var exitWinMax = 256;
var exitWinSpeed = 1;
var winState = 0;

var tsRadius = 16;
var tsCoords;
var tcdistance;
var tcxRDistance;
var tcxLDistance;
var tcyTDistance;
var tcyBDistance;
var cCoords;
var cdistance;
var cxRDistance;
var cxLDistance;
var cyTDistance;
var cyBDistance;


//----------------------------------------------------------------Debugging
function keyPressed() {
  if (key == 'p') {
    console.log('Player x range: ' + (x-radius) + ' - ' + (x+radius) + '; Player y range: ' + (y-radius) + ' - ' + (y+radius));
    //console.log('Player y range: ' + (y-radius) + ' - ' + (y+radius));
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
  } else if (key == 'u') {
    console.log("cellStates.length: " + cellStates.length);
    console.log("cellStates: " + cellStates);
    console.log("cellCoords.length: " + cellCoords.length);
    console.log("cellCoords: " + cellCoords);
    //console.log(mouseObjectXLocations);
    //console.log(mouseObjectYLocations);
  } else if (key == 'y') {
    console.log(cDistance);
  }
}

//----------------------------------------------------------------Mouse Detect Selected Cell
function mousePressed() {
  console.log('Mouse x: ' + mouseX + '; Mouse y: ' + mouseY);
  mousex = mouseX;
  mousey = mouseY;
  for(var z = 0; z <= 512; z += 32) {
    for(var i = 0; i <= 1024; i += 32) {
      if (mousex >= i-16 && mousex < i+16 && mousey >= z-16 && mousey < z+16) {
        mouseCellX = i;
        mouseCellY = z;
        console.log('Mouse Cell X: ' + mouseCellX + '; Mouse Cell Y: ' + mouseCellY);

        let pos = cellCoords.indexOf(mouseCellX/32 + ',' + mouseCellY/32);
        console.log(pos);
        if (cellStates[pos] == 0) {
          cellStates[pos] = 1;
        //} else if (cellStates[pos] == 1) {
          //cellStates[pos] = 2;
        } else {
          cellStates[pos] = 0;
        }
        console.log(cellStates[pos]);
      }
    }
  }
}


//----------------------------------------------------------------Setup Function
function setup() {
  createCanvas(1024, 512);

  tsCoords = createVector(672, 320);

  for(var z = 0; z <= 16; z++) {
    for(var i = 0; i <= 32; i++) {
      let newLength = cellStates.push(0);
    }
  }

  for(var yCoord = 0; yCoord <= 16; yCoord++) {
    for(var xCoord = 0; xCoord <= 32; xCoord++) {
      let newLength = cellCoords.push(xCoord + ',' + yCoord);
    } // Fills the cellCoords array with the x & y coordinate for each array item, which can then be referenced to return the index number.
  }   //  The index number can then be put into cellStates to find and/or edit the item associated with the appropriate cell.
} // Setup Function Closing


function draw() {
  background(32);
//----------------------------------------------------------------Objects Section
//--------------------------------Debug Grid
  fill(34, 34, 34, 255);
  stroke(16, 16, 16, 255);
  strokeWeight(1);
  for(var i = 0; i <= 1024; i += 32) {
    for(var z = 0; z <= 512; z += 32) {
      square(i-16, z-16, 32);
    }
  }
  strokeWeight(0);

//--------------------------------Test Square Collision
  fill(228);
  square(tsCoords.x-16, tsCoords.y-16, tsRadius*2);
  tcDistance = Math.sqrt(pow(x-tsCoords.x, 2) + pow(y-tsCoords.y, 2));
  tcxLDistance = (x+radius)-(tsCoords.x-tsRadius);
  tcxRDistance = (tsCoords.x+tsRadius)-(x-radius);
  tcyTDistance = (y+radius)-(tsCoords.y-tsRadius);
  tcyBDistance = (tsCoords.y+tsRadius)-(y-radius);

  if (x+radius >= (tsCoords.x-tsRadius) && x-radius <= (tsCoords.x+tsRadius) && y+radius >= (tsCoords.y-tsRadius) && y-radius <= (tsCoords.y+tsRadius)) {
    console.log ("test square collision");

    if (x < tsCoords.x && y > tsCoords.y-tsRadius && y < tsCoords.y+tsRadius) {
      x -= tcxLDistance;
    } else if (x > tsCoords.x && y > tsCoords.y-tsRadius && y < tsCoords.y+tsRadius) {
      x += tcxRDistance;
    }
    if (y < tsCoords.y && x > tsCoords.x-tsRadius && x < tsCoords.x+tsRadius) {
      y -= tcyTDistance;
    } else if (y > tsCoords.y && x > tsCoords.x-tsRadius && x < tsCoords.x+tsRadius) {
      y += tcyBDistance;
    }
  }


//--------------------------------Updates Cells/ Coordinates
  for(var z = 0; z <= 16; z++) {
    for(var i = 0; i <= 32; i++) {
      let cellIndex = cellCoords.indexOf(i + ',' + z);
      if (cellStates[cellIndex] == 1) {
        fill(98);
        square((i*32)-16, (z*32)-16, 32);
      } else if (cellStates[cellIndex] == 2) {
        fill(108, 104, 82);
        square((i*32)-16, (z*32)-16, 32);
      }


//----------------------------------------------------------------Collision System

      //if (x+radius >= (i*32)-16 && x-radius <= (i*32)+16 && y+radius >= (z*32)-16 && y-radius <= (z*32)+16 && cellStates[cellIndex] == 1) {
        //console.log('collision with cell: ' + i*32 + ',' + z*32);
      //}

      cCoords = createVector(i*32, z*32);
      cxLDistance = (x+radius)-(cCoords.x-tsRadius);  // This took my a very long time to work out, and even though it feels very messy and needlessly complex, it's the best I can come up.
      cxRDistance = (cCoords.x+tsRadius)-(x-radius);  // This also has difficulty with the player moving into an object diagonally (as in moving into the corner of a square).
      cyTDistance = (y+radius)-(cCoords.y-tsRadius);  // This is because it can only move the player in a straight line along the x or y axis.
      cyBDistance = (cCoords.y+tsRadius)-(y-radius);

      if (x+radius >= (cCoords.x-tsRadius) && x-radius <= (cCoords.x+tsRadius) && y+radius >= (cCoords.y-tsRadius) && y-radius <= (cCoords.y+tsRadius) && cellStates[cellIndex] != 0) {
        console.log('Collision with cell [' + cellStates[cellIndex] + "]: " + i*32 + ',' + z*32);

        if (x < cCoords.x && y > cCoords.y-tsRadius && y < cCoords.y+tsRadius) {
          x -= cxLDistance;
          //x -= 32;
          //x -= playerSpeed;
        } else if (x > cCoords.x && y > cCoords.y-tsRadius && y < cCoords.y+tsRadius) {
          x += cxRDistance;
          //x += 32;
          //x += playerSpeed;
        }
        if (y < cCoords.y && x > cCoords.x-tsRadius && x < cCoords.x+tsRadius) {
          y -= cyTDistance;
          //y -= 32;
          //y -= playerSpeed;
        } else if (y > cCoords.y && x > cCoords.x-tsRadius && x < cCoords.x+tsRadius) {
          y += cyBDistance;
          //y += 32;
          //y += playerSpeed;
        }
      }
    }
  }

  /*for(var i = 0; i <= 561; i++) {
    if (cellStates[i] == 1) {
      let coords = cellCoords[i];
      square(coords + ", 32");
    }
  }*/


//--------------------------------Debug Player Occupied Cell
  fill(188, 188, 188, 128);
  for(var z = 0; z <= 512; z += 32) {
    for(var i = 0; i <= 1024; i += 32) {
      if (x >= i-16 && x <= i+16 && y >= z-16 && y <= z+16) {
        square(i-16, z-16, 32);
      }
    }
  }


//--------------------------------Mouse Object Creation
  if (mouseObjectXLocations.length >= 1 && mouseObjectYLocations.length >= 1) {
    for (var i = 0; i <= mouseObjectXLocations.length; i++) {

      if (exitX >= mouseObjectXLocations[i]-96 && exitX <= mouseObjectXLocations[i]+128 && exitY >= mouseObjectYLocations[i]-96 && exitY <= mouseObjectYLocations[i]+128) {
        // Do nothing - this insures mouse objects cannot be placed within 2 cells of the exit
      } else {
        square(mouseObjectXLocations[i]-32, mouseObjectYLocations[i]-32, 96);

        if (fruitx >= mouseObjectXLocations[i]-32 && fruitx <= mouseObjectXLocations[i]+64 && fruity >= mouseObjectYLocations[i]-32 && fruity <= mouseObjectYLocations[i]+64) {
          fruitx = (Math.floor(Math.random() * 31) + 1) * 32;
          fruity = (Math.floor(Math.random() * 15) + 1) * 32;
        } //Insures fruit will not overlap with mouse objects
      }
    }
  }


//----------------------------------------------------------------Exit Creation
  fill(55, 111, 221, 255);
  square(exitX-16, exitY-16, 32);

//--------------------------------Fruit
  fill(186, 38, 12, 255);
  circle(fruitx, fruity, fruitDiameter);

//--------------------------------Player
  fill(24, 200, 32, 255);
  circle(x, y, diameter);
  circle(x-1024, y, diameter);
  circle(x+1024, y, diameter);
  circle(x, y-512, diameter);
  circle(x, y+512, diameter);

//--------------------------------Stamina Bar
  stroke(14, 22, 18, 144);
  strokeWeight(2);
  fill(24, 48, 32, 128);
  rect(7,7, 102,16);
  strokeWeight(0);
  fill(20, 200, 32, 128);
  rect(8,8, (stamina / staminaMax) * 100,14);


//----------------------------------------------------------------Stamina System
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


//----------------------------------------------------------------Player Movement
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


//----------------------------------------------------------------Map Wraparound
//----------------Player wraparound
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


//----------------------------------------------------------------Fruit Collision
  if (x+radius >= (fruitx-(fruitDiameter/2)) && x-radius <= (fruitx+(fruitDiameter/2)) && y+radius >= (fruity-(fruitDiameter/2)) && y-radius <= (fruity+(fruitDiameter/2))) {
    console.log('Fruit Collision');
    fruitx = (Math.floor(Math.random() * 31) + 1) * 32;
    fruity = (Math.floor(Math.random() * 15) + 1) * 32;
    console.log('Fruit X: ' + fruitx + '; ' + ' Fruit Y: ' + fruity);
    stamina += 256;
    if (stamina > 1024) {
      stamina = 1024;
    }
  }


//----------------------------------------------------------------Exit Collision
  if (x+radius >= exitX-16 && x-radius <= exitX+16 && y+radius >= exitY-16 && y-radius <= exitY+16) {
    console.log('Exit Collision');
    if (exitWin < exitWinMax) {
      exitWin += exitWinSpeed;
    } else {
      winState = 1;
    }
  }

} // Draw Function Closing
