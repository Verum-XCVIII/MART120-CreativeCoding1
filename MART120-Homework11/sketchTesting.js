var x = 50;
var y = 50;
var diameter = 25;

function setup() {
  createCanvas(800,600);
}

function keyPressed() {
  console.log(key, ' ', keyCode);
  return false; //prevent default
}

function draw() {
  background(0);
  fill(24, 200, 29);
  circle(x,y, diameter);
}

/*
if (x >= 300) {
  x = 50;
}

if (keyIsDown(83)) {
  y += 10;
} else if (keyisDown(87)) {
  y -= 10
}

if (y >= 300) {
  y = 50;
}

if (diameter < 200) {
  diameter += 2;
} else if (diameter >= 200) {
  diameter = 25;
}


function keyPressed() {
  if (key == 'd') {
    x += 10;
  } else if (key == 'a') {
    x -= 10;
  }
}
*/

//(x+(diameter/2) >= exitX && x-(diameter/2) <= exitX+16 && y+(diameter/2) >= (exitY) && y-(diameter/2) <= (exitY+16))
//((x >= (fruitx-(fruitDiameter/2)-(diameter/2)) && x <= (fruitx+(fruitDiameter/2)+(diameter/2))) && (y >= (fruity-(fruitDiameter/2)-(diameter/2)) && y <= (fruity+(fruitDiameter/2)+(diameter/2))))


/*square(mouseObjectXLocations[i]-32, mouseObjectYLocations[i], 32);
square(mouseObjectXLocations[i]-32, mouseObjectYLocations[i]-32, 32);
square(mouseObjectXLocations[i], mouseObjectYLocations[i]-32, 32);
square(mouseObjectXLocations[i]+32, mouseObjectYLocations[i]-32, 32);
square(mouseObjectXLocations[i]+32, mouseObjectYLocations[i], 32);
square(mouseObjectXLocations[i]+32, mouseObjectYLocations[i]+32, 32);
square(mouseObjectXLocations[i], mouseObjectYLocations[i]+32, 32);
square(mouseObjectXLocations[i]-32, mouseObjectYLocations[i]+32, 32);*/


//----------------------------------------------------------------Redundant Enemy Movement Code

/* First iteration of enemy1 movement that doesn't check if it should go across the edge of the canvas.
if (enemyX < x) {
  enemyX += enemySpeed;
} else if (enemyX > x) {
  enemyX -= enemySpeed;
}
if (enemyY < y) {
  enemyY += enemySpeed;
} else if (enemyY > y) {
  enemyY -= enemySpeed;
}*/

//enemy2XRandom = Math.floor(Math.random() * 150) + 1
//enemy2YRandom = Math.floor(Math.random() * 150) + 1
/*
if (enemy2XRandom <= 50) {
  enemy2X += enemy2XSpeed;
} else if (enemy2XRandom > 50 && enemy2XRandom <= 100) {
  enemy2X -= enemy2XSpeed;
} else if (enemy2XRandom > 100 && enemy2XRandom <= 150) {
  enemy2X += 0;
}

if (enemy2YRandom <= 50) {
  enemy2Y += enemy2YSpeed;
} else if (enemy2YRandom > 50 && enemy2YRandom <= 100) {
  enemy2Y -= enemy2YSpeed;
} else if (enemy2YRandom > 100 && enemy2YRandom <= 150) {
  enemyY += 0;
}
*/

/*
for (var i = 0; i <= 50; i++) {
  if (i == enemy2XRandom2) {
    enemy2X += enemy2XSpeed;
  } else if (i >= enemy2XRandom2) {
    enemy2X -= enemy2XSpeed;
  } else if (i <= enemy2XRandom2) {
    enemy2X += 0;
  }

  if (i == enemy2YRandom2) {
    enemy2Y += enemy2YSpeed;
  } else if (i >= enemy2YRandom2) {
    enemy2Y -= enemy2YSpeed;
  } else if (i <= enemy2YRandom2) {
    enemy2Y += 0;
  }
}
*/

/*if (Math.floor(Math.random() * 200) + 1 < 4) {
  enemy2XSpeed += ;
}
if (Math.floor(Math.random() * 200) + 1 < 4) {
  enemy2YSpeed *= -1;
}
if (Math.floor(Math.random() * 100) + 1 < 6) {
  enemy2X += 0;
} else {
  enemy2X += enemy2XSpeed;
}
if (Math.floor(Math.random() * 100) + 1 < 6) {
  enemy2Y += 0;
} else {
  enemy2Y += enemy2XSpeed;
}*/

//enemy2X += enemy2XSpeed;
//enemy2Y += enemy2YSpeed;
