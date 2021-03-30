var x = 64;         // Quick breakdown on the different .js files: this sketch.js is the closest to being an actual game with enemies and the ability to win (though not lose just yet).
var y = 64;         // sketch2.js was created in case I broke everything while testing "physical" collision, and in achieving such I also made a (mostly) functional cell coordinate system.
var diameter = 32;  // sketch3.js was created when I thought to use my cell coordinate system to make grid based movement, and I ended up also trying to make harvestables.

                              //  To Do / Additional Ideas:
var initialPlayerSpeed = 3;   //
var playerSpeed = 3;          //  Enemy Colision and winState 2 (make it possible to lose)
var playerRunSpeed = 6;       //~ Mouse Object Collision (finished in sketch2.js, but have yet to update this file with the system)
var staminaMax = 1024;        //  Deleting oldest mouse object once trying to place more than 3 or 4
var stamina = 1024;           //  More enemies (which act differently)
var staminaConsumption = 6;   //  Timer? (Limited time or just recording how long it took to finish?)
var staminaRecovery = 2;      //X Victory Progression Bar
var playerWalkSpeed = 1;      //  More Fruit? Different Fruit?
                              //  Have enemies grow larger if they collide with the fruit.
var enemyX = 512;             //  Integrate updated systems from sketch2.js (object placement, collision, background grid)
var enemyY = 512;
var enemy2X = 576;
var enemy2Y = 256;
var enemyDiameter = 32;
var enemySpeed = 2.6;
var enemy2XSpeed = 0;
var enemy2YSpeed = 0;
var enemy2SpeedLimit = 4;

var fruitx = 256;
var fruity = 256;
var fruitDiameter = 20;
var fruitCollected = 0;

var mousex;
var mousey;
var mouseObjectX = -32;
var mouseObjectY = -32;
let mouseObjectXLocations = [];
let mouseObjectYLocations = [];

let cellStates = []; // Neither of these currently serve a purpose,
var cellNumber; // as I couldn't get the system to function properly.

var controlsOpacity = 255;
var winOpacity = 0;

//var exitXR;
//var exitYR;
var exitX = (Math.floor(Math.random() * 32) + 1) * 32;
var exitY = (Math.floor(Math.random() * 16) + 1) * 32;
var exitWin = 0;
var exitWinMax = 256;
var exitWinSpeed = 1;
var winState = 0;

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
    //console.log(cellStates.length);
    //console.log(cellStates);
    console.log(mouseObjectXLocations);
    console.log(mouseObjectYLocations);
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
        mouseObjectX = i-16;
        mouseObjectY = z-16;
        console.log('Mouse Object X: ' + mouseObjectX + '; Mouse Object Y: ' + mouseObjectY);
        //let newLength = cellStates.push(1);

        let newLength = mouseObjectXLocations.push(i-16);
        let newLength2 = mouseObjectYLocations.push(z-16);


        // This is the system that was attempting to take an input of coordinates and determine what array index should be referenced.
        cellNumber = (i/32) + z; // However, I've already started working on this problem, and you can see what I've got so far in my sketch2.js file.
        /*for (var w = 0; w <= 16; w++) {
          if (((i/32) + z) == 32 * w) {
            cellNumber = (i/32) + z + 1;
          } else {
            cellNumber = (i/32) + z
          }
        }
        if (((i/32) + z) == Math.floor((i/32) + z)) {
          cellNumber = (i/32) + z + 1;
        } else {
          cellNumber = (i/32) + z
        }*/
        console.log('Cell #: ' + cellNumber);
      }
    }
  }
}



//----------------------------------------------------------------Setup Function
function setup() {
  createCanvas(1024, 512);

  for(var i = 0; i <= 1024; i += 32) {
    for(var z = 0; z <= 512; z += 32) {
      let newLength = cellStates.push(0);
    } // This creates an array item for every cell shown (I think), and was also part of the system I couldn't get working.
  }

  //exitXR = Math.floor(Math.random() * 1024) + 1;
  //exitYR = Math.floor(Math.random() * 512) + 1;
}


function draw() {
  background(32);
//----------------------------------------------------------------Objects Section
//--------------------------------Debug Grid
  /*fill(34, 34, 34, 255);
  stroke(16, 16, 16, 255);
  strokeWeight(1);
  for(var i = 0; i <= 1024; i += 32) {
    for(var z = 0; z <= 512; z += 32) {
      square(i-16, z-16, 32);
    }
  }
  strokeWeight(0);*/  // You can uncomment this block if you want to see a representation of the grid which determines spawn positions of the fruit and exit.

//--------------------------------Debug Player Occupied Cell
  /*fill(188, 188, 188, 128);
  for(var z = 0; z <= 512; z += 32) {
    for(var i = 0; i <= 1024; i += 32) {
      if (x >= i-16 && x <= i+16 && y >= z-16 && y <= z+16) {
        square(i-16, z-16, 32);
      }
    }
  }*/ // This doesn't really serve any purpose as at no point do I check what cell the player is in.

//--------------------------------Mouse Object Creation
  fill(134, 134, 134, 255);
  //square(mouseObjectX, mouseObjectY, 32);
  if (mouseObjectXLocations.length >= 1 && mouseObjectYLocations.length >= 1) {
    for (var i = 0; i <= mouseObjectXLocations.length; i++) {
      //square(mouseObjectXLocations[i], mouseObjectYLocations[i], 32);
      if (exitX >= mouseObjectXLocations[i]-96 && exitX <= mouseObjectXLocations[i]+128 && exitY >= mouseObjectYLocations[i]-96 && exitY <= mouseObjectYLocations[i]+128) {
        // Do nothing - this insures mouse objects cannot be placed within 2 cells of the exit
      } else { // Now that I think about it, this implementation could cause issues in detecting collision as the array items are still created, even if the visual square isn't
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

    // First implementation of creating the above square, before I realized how needlessly complicated I was making it.
    /*for(var z = 0; z <= 512; z += 32) {
      for(var i = 0; i <= 1024; i += 32) {
        if (exitXR >= i-16 && exitXR <= i+16 && exitYR >= z-16 && exitYR <= z+16) {
          square(i-16, z-16, 32);
          exitX = i;
          exitY = i;
        }
      }
    }*/

//--------------------------------Fruit
  fill(186, 38, 12, 255);
  circle(fruitx, fruity, fruitDiameter);

//--------------------------------Player
  fill(24, 200, 32, 255);
  circle(x, y, diameter);
  circle(x-1024, y, diameter); // these additional circles simply visualize the teleporting that will happen when reaching the edge
  circle(x+1024, y, diameter);
  circle(x, y-512, diameter);
  circle(x, y+512, diameter);

//--------------------------------Enemies
  fill(126, 48, 32, 255); //enemy1
  circle(enemyX, enemyY, enemyDiameter);
  circle(enemyX-1024, enemyY, enemyDiameter);
  circle(enemyX+1024, enemyY, enemyDiameter);
  circle(enemyX, enemyY-512, enemyDiameter);
  circle(enemyX, enemyY+512, enemyDiameter);
  fill(120, 88, 28, 255); //enemy2
  circle(enemy2X, enemy2Y, enemyDiameter);
  circle(enemy2X-1024, enemy2Y, enemyDiameter);
  circle(enemy2X+1024, enemy2Y, enemyDiameter);
  circle(enemy2X, enemy2Y-512, enemyDiameter);
  circle(enemy2X, enemy2Y+512, enemyDiameter);

//--------------------------------Stamina Bar
  stroke(14, 22, 18, 120);
  strokeWeight(2);
  fill(24, 48, 32, 128);
  rect(7,7, 102,16);
  strokeWeight(0);
  fill(20, 200, 32, 128);
  rect(8,8, (stamina / staminaMax) * 100,14);

//--------------------------------Controls Text
  fill(202, 202, 202, controlsOpacity -= .5);
  stroke(180, 180, 180, controlsOpacity -= .5);
  strokeWeight(1);
  textSize(16);
  text("W, A, S, & D to move", 8,40);
  text('Hold Shift to "Sprint", which will drain your stamina.', 8,64);
  text('Stamina regenerates faster when not moving.', 8,88);
  text('Picking up the "fruit" will also replenish some stamina.', 8,112);

//--------------------------------Win Progress Bar
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

//--------------------------------Win Text
  fill(198, 180, 184, winOpacity);
  stroke(160, 172, 184, winOpacity);
  textSize(64);
  text("You Escaped!", 318, 78);
  strokeWeight(0);


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

//----------------Enemy1 wraparound
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

//----------------Enemy2 wraparound
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


//----------------------------------------------------------------Enemy1 Movement
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
    } // It should also be noted that I'm not actually certain why this math works, I just figured it out by trial and error.

//----------------------------------------------------------------Enemy2 Movement
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


//----------------------------------------------------------------Fruit Collision
  if (x+(diameter/2) >= (fruitx-(fruitDiameter/2)) && x-(diameter/2) <= (fruitx+(fruitDiameter/2)) && y+(diameter/2) >= (fruity-(fruitDiameter/2)) && y-(diameter/2) <= (fruity+(fruitDiameter/2))) {
    fruitx = (Math.floor(Math.random() * 31) + 1) * 32; // gives a value between 32 and 1024 in increments of 32 (I think)
    fruity = (Math.floor(Math.random() * 15) + 1) * 32; // gives a value between 32 and 512 in increments of 32 (I think)
    fruitCollected++;
    stamina += 256;
    if (stamina > 1024) {
      stamina = 1024;
    } // ensures fruit cannot give more than the maximum stamina value
    console.log('Fruit Collision #' + fruitCollected);
    console.log('Fruit X: ' + fruitx + '; ' + ' Fruit Y: ' + fruity);
  }


//----------------------------------------------------------------Exit Collision
  if (x+(diameter/2) >= exitX-16 && x-(diameter/2) <= exitX+16 && y+(diameter/2) >= exitY-16 && y-(diameter/2) <= exitY+16) {
    console.log('Exit Collision');
    if (exitWin < exitWinMax) {
      exitWin += exitWinSpeed;
    } else {
      winOpacity = 255;
      winState = 1;
    }
  }

} // Draw Function Closing
