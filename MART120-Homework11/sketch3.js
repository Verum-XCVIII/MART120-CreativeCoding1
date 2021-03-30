var x = 64;
var y = 64;               //  This file is for testing grid based movement using the cursor to select which grid should be moved to, along with the ability to break Objects.
var diameter = 28;        //  Also, this code is particularly messy and has lots of left over bits and peices from failed or unused systems.
var radius = diameter/2;  //  Lastly, if you were wondering what I had in mind for this, I've recently started playing Old School RuneScape for the first time, so that's the inspiration.

var initialPlayerSpeed = 2;
var playerSpeed = 2;
var playerRunSpeed = 4;
var staminaMax = 1024;
var stamina = 1024;
var staminaConsumption = 4;
var staminaRecovery = 2;
var playerWalkSpeed = 1;
var sprintToggle = false;

var fruitx = 256;
var fruity = 256;
var fruitDiameter = 18;

var treeX;
var treeY;

var mousex;
var mousey;
var mouseCellX;
var mouseCellY;
let mouseObjectXLocations = [];
let mouseObjectYLocations = [];
var selectedCell;
var destinationCell;
var totalDistance = 0;
var x2Reached = false;
var y2Reached = false;

let cellStates = [];
let cellCoords = [];
var cellNumber;
let cellCoords2 = [];

var controlsOpacity = 255;

var exitX = (Math.floor(Math.random() * 32) + 1) * 32;
var exitY = (Math.floor(Math.random() * 16) + 1) * 32;
var exitWin = 0;
var exitWinMax = 256;
var exitWinSpeed = 1;
var winState = 0;

var tsCoords;
var tsRadius = 16;
var cxLDistance;
var cxRDistance;
var cyTDistance;
var cyBDistance;

var breaking = 0;

//----------------------------------------------------------------Debugging
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
  } else if (key == 'u') {
    console.log(cellStates.length);
    console.log(cellStates);
    //console.log(mouseObjectXLocations);
    //console.log(mouseObjectYLocations);
  } else if (key == 'y') {
    console.log(cellCoords2.length);
    console.log(cellCoords2);
    console.log(cellCoords2[236]);
  } else if (key == 'r') {
    if (sprintToggle == false) {
      sprintToggle = true;
    } else {
      sprintToggle = false;
    }
  }
}

//----------------------------------------------------------------Mouse Detect Selected Cell
function mousePressed() {
  console.log('Mouse x: ' + mouseX + '; Mouse y: ' + mouseY);
  mousex = mouseX;
  mousey = mouseY;
  x2Reached = false;
  y2Reached = false;
  for(var my = 0; my <= 512; my += 32) {
    for(var mx = 0; mx <= 1024; mx += 32) {
      if (mousex >= mx-16 && mousex < mx+16 && mousey >= my-16 && mousey < my+16) {
        mouseCellX = mx;
        mouseCellY = my;
        //console.log('Mouse Cell X: ' + mouseCellX/32 + '; Mouse Cell Y: ' + mouseCellY/32);
        console.log('mouseCellX Coordinate: ' + mouseCellX + '; mouseCellY Coordinate: ' + mouseCellY);

        let pos = cellCoords.indexOf(mouseCellX/32 + ',' + mouseCellY/32);
        console.log("cellCoords index: " + pos);

        selectedCell = createVector(mx, my);
        destinationCell = createVector(mx, my);

        /*if (cellStates[pos] == 0) {
          cellStates[pos] = 1;
        } else if (cellStates[pos] == 1) {
          cellStates[pos] = 2;
        } else {
          cellStates[pos] = 0;
        }*/
        console.log("cellStates[cellCoords[i]]: " + cellStates[pos]);
        console.log("selectedCell: " + selectedCell);
      }
    }
  }
  breaking = 0;
}//mousePressed Function Closing


//----------------------------------------------------------------Setup Function
function setup() {
  createCanvas(1024, 512);
  selectedCell = createVector(x, y);
  destinationCell = createVector(x, y);

  for(var iy = 0; iy <= 16; iy++) {  //  Create cellStates array
    for(var ix = 0; ix <= 32; ix++) {
      let newLength = cellStates.push(0);
    }
  }

  for(var yCoord = 0; yCoord <= 16; yCoord++) { //  Create cellCoords array
    for(var xCoord = 0; xCoord <= 32; xCoord++) {
      let newLength = cellCoords.push(xCoord + ',' + yCoord);
    }
  }

  for(var yCoord = 0; yCoord <= 16; yCoord++) { //  This would likely be much better than the above cellCoords array given I could easily request the x and y coordinates.
    for(var xCoord = 0; xCoord <= 32; xCoord++) { //  But, that would require rewriting a fair bit of code, and I'm much too lazy to bother doing that.
      let newLength = cellCoords2.push(createVector(xCoord*32, yCoord*32));
    }
  }

  for(var treeNum = 0; treeNum <= 5; treeNum++) {
    treeX = (Math.floor(Math.random() * 32));
    treeY = (Math.floor(Math.random() * 16));
    console.log("treeX: " + treeX + "; treeY: " + treeY);
    if (cellStates[cellCoords.indexOf(treeX + ',' + treeY)] == 0) {
      cellStates[cellCoords.indexOf(treeX + ',' + treeY)] = "tree";
      //console.log("Cell " + treeX + ", " + treeY + " = " + cellStates[cellCoords.indexOf(treeX + ',' + treeY)]);
    }
  }
} // Setup Function Closing


function draw() {
  background(32);
//----------------------------------------------------------------Objects Section
//--------------------------------Debug Grid
  fill(34, 34, 34, 255);
  stroke(16, 16, 16, 255);
  strokeWeight(1);
  /*for(var i = 0; i <= 1024; i += 32) {
    for(var z = 0; z <= 512; z += 32) {
      square(i-16, z-16, 31);
    }
  }*/
  // found online at https://editor.p5js.org/rustyrobison/sketches/TFzek4T1v with some edits
  for (var i = 0; i < width+1; i += 32) {
    line(i-16, 0, i-16, height);
    line(width, i-16, 0, i-16);
  } //  I'm guessing width and height are universal constants set by create canvas? Good to know.
  strokeWeight(0);


//----------------------------------------------------------------Exit Creation
  fill(55, 111, 221, 255);
  square(exitX-16, exitY-16, 32);
  cellStates[cellCoords.indexOf(exitX/32 + ',' + exitY/32)] = "exit";


//--------------------------------Debug Player Occupied Cell
  fill(160, 160, 160, 64);
  stroke(180, 180, 180, 0);
  strokeWeight(2);
  for(var py = 0; py <= 512; py += 32) {
    for(var px = 0; px <= 1024; px += 32) {
      if (x >= px-16 && x <= px+16 && y >= py-16 && y <= py+16) {
        square(px-16, py-16, 30);
      }
      if (selectedCell.x == px && selectedCell.y == py) {
        square(selectedCell.x-16, selectedCell.y-16, 30);
      }
    }
  }
strokeWeight(0);


//--------------------------------Fruit
  fill(186, 38, 12, 255);
  circle(fruitx, fruity, fruitDiameter);

//--------------------------------Player
  fill(24, 200, 32, 255);
  circle(x, y, diameter);
  //circle(x-1024, y, diameter);
  //circle(x+1024, y, diameter);
  //circle(x, y-512, diameter);
  //circle(x, y+512, diameter);

//--------------------------------Stamina Bar
  stroke(14, 22, 18, 144);
  strokeWeight(2);
  fill(24, 48, 32, 128);
  rect(7,7, 102,16);
  strokeWeight(0);
  fill(20, 200, 32, 128);
  rect(8,8, (stamina / staminaMax) * 100,14);


//----------------------------------------------------------------Updates Cells/ Coordinates
  for(var iy = 0; iy <= 16; iy++) {
    for(var ix = 0; ix <= 32; ix++) {
      let cellIndex = cellCoords.indexOf(ix + ',' + iy);
      /*if (cellStates[cellIndex] == 1) {
        fill(98);
        square((ix*32)-16, (iy*32)-16, 32);
      } else if (cellStates[cellIndex] == 2) {
        fill(108, 104, 82);
        square((ix*32)-16, (iy*32)-16, 32);
      }*/
      if (cellStates[cellIndex] == "tree") {
        stroke(42, 38, 34);
        strokeWeight(2);
        fill(84, 74, 48);
        square((ix*32)-16, (iy*32)-16, 32);
        stroke(92, 124, 68, 84);
        strokeWeight(64);
        fill(88, 80, 66, 102);
        square((ix*32)-16, (iy*32)-16, 32);
      }

//----------------------------------------------------------------Collision System

      //if (x+radius >= (ix*32)-16 && x-radius <= (ix*32)+16 && y+radius >= (iy*32)-16 && y-radius <= (iy*32)+16 && cellStates[cellIndex] != 0) {
        //console.log('Collision with cell [' + cellStates[cellIndex] + "]: " + ix*32 + ',' + iy*32);
      //}

      tsCoords = createVector(ix*32, iy*32);
      cxLDistance = (x+radius)-(tsCoords.x-tsRadius);
      cxRDistance = (tsCoords.x+tsRadius)-(x-radius);
      cyTDistance = (y+radius)-(tsCoords.y-tsRadius);
      cyBDistance = (tsCoords.y+tsRadius)-(y-radius);

      if (x+radius >= (tsCoords.x-tsRadius) && x-radius <= (tsCoords.x+tsRadius) && y+radius >= (tsCoords.y-tsRadius) && y-radius <= (tsCoords.y+tsRadius) && cellStates[cellIndex] != 0) {
        console.log('Collision with cell [' + cellStates[cellIndex] + "]: " + ix*32 + ',' + iy*32);

        if (x < tsCoords.x && y > tsCoords.y-tsRadius && y < tsCoords.y+tsRadius) {
          //x -= cxLDistance;
          //x -= 32;
          x -= playerSpeed;
        } else if (x > tsCoords.x && y > tsCoords.y-tsRadius && y < tsCoords.y+tsRadius) {
          //x += cxRDistance;
          //x += 32;
          x += playerSpeed;
        }
        if (y < tsCoords.y && x > tsCoords.x-tsRadius && x < tsCoords.x+tsRadius) {
          //y -= cyTDistance;
          //y -= 32;
          y -= playerSpeed;
        } else if (y > tsCoords.y && x > tsCoords.x-tsRadius && x < tsCoords.x+tsRadius) {
          //y += cyBDistance;
          //y += 32;
          y += playerSpeed;
        }

        if (ix*32 == selectedCell.x && iy*32 == selectedCell.y && cellStates[cellIndex] == "tree") {
          /*for (var breaking = 0; breaking <= 10000; breaking++) {
            console.log("Breaking: " + (breaking/10000)*100 + "%");
            if (breaking >= 100) {
              cellStates[cellIndex] = 0;
            }
          }*/

          var breakTimer = setInterval(function breakProgress() {
            if (breaking < 100 && stamina > staminaMax/4) {
              breaking++;
              console.log("Breaking: " + breaking + "%");
            } else if (breaking >= 100) {
              cellStates[cellIndex] = 0;
            }       //  This is giving me a lot of issues, and I'm guessing the problem is this being inside of the draw function meaning it's constantly being "activated".
          }, 1000); //  I might be able to make this a funtion that checks for cellStates[selectedCell] == tree and collision, and would be called by the mousePressed Function?
                    // But, it's kind of functional, which is good enough for now.

          /*if (breaking >= 100 && stamina > staminaMax/4) {
            stamina -= staminaMax/4;
          } else if (breaking >= 100) {
            stamina = 0;
          }*/

        }
      }
    } //  for var ix Closing
  } //  for var iy Closing


//----------------------------------------------------------------Mouse Player Movement
  if (x > destinationCell.x-.25 && x < destinationCell.x+.25) {
    x2Reached = true;
  }
  if (y > destinationCell.y-.25 && y < destinationCell.y+.25) {
    y2Reached = true;
  } //  The player will still sometimes "vibrate" once reaching it's destination, but only occasionally.

  if (x < destinationCell.x && x2Reached == false) {
    x += playerSpeed;
  } else if (x > destinationCell.x && x2Reached == false) {
    x -= playerSpeed;
  } else {
    x = destinationCell.x;
  }

  if (y < destinationCell.y && y2Reached == false) {
    y += playerSpeed;
  } else if (y > destinationCell.y && y2Reached == false) {
    y -= playerSpeed;
  } else {
    y = destinationCell.y;
  }

//----------------------------------------------------------------Stamina System
  if (x2Reached == false || y2Reached == false || sprintToggle) {
    staminaRecovery = 2;
  } else if (x2Reached == false || y2Reached == false || stamina < (staminaMax * .4)){
    staminaRecovery = 4;
  } else {
    staminaRecovery = 6;
  }

  if (sprintToggle && (x2Reached == false || y2Reached == false)) {
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
  if (x+(diameter/2) >= (fruitx-(fruitDiameter/2)) && x-(diameter/2) <= (fruitx+(fruitDiameter/2)) && y+(diameter/2) >= (fruity-(fruitDiameter/2)) && y-(diameter/2) <= (fruity+(fruitDiameter/2))) {
    console.log('Fruit Collision');
    fruitx = (Math.floor(Math.random() * 31) + 1) * 32;
    fruity = (Math.floor(Math.random() * 15) + 1) * 32;
    if (cellCoords.indexOf(fruitx/32 + ',' + fruity/32) != 0) {
      fruitx = (Math.floor(Math.random() * 31) + 1) * 32;
      fruity = (Math.floor(Math.random() * 15) + 1) * 32;
    }
    console.log('Fruit X: ' + fruitx + '; ' + ' Fruit Y: ' + fruity);
    stamina += 256;
    if (stamina > 1024) {
      stamina = 1024;
    }
  }


//----------------------------------------------------------------Exit Collision
  if (x+(diameter/2) >= exitX-16 && x-(diameter/2) <= exitX+16 && y+(diameter/2) >= exitY-16 && y-(diameter/2) <= exitY+16) {
    console.log('Exit Collision');
    if (exitWin < exitWinMax) {
      exitWin += exitWinSpeed;
    } else {
      winState = 1;
    }
  }

} // Draw Function Closing
