//----------------------------------------------------------------Variables
var bg_r = 46;
var bg_g = 44;
var bg_b = 48;
//var bg_r = 41;
//var bg_g = 35;
//var bg_b = 47;
var bgChange = .02;
var colorUpperLimit = bg_b + 4;
var colorLowerLimit = bg_b - 4;

var initialTitleSize = 20;
var titleSize = initialTitleSize;
var titleChange = 1;

var sign1_x = 464;
var sign1Change = 1;
var sign2_x = 478;
var sign2Change = -1;

var bob_x = 1;
var bob_y = 1;
var bobChange = .1;
var bobCounter = 1;

var glassLine_y1 = 347.4;
var glassLine_y2 = 363.4;
var glassQuad_y1 = 392;
var glassQuad_y2 = 398;
var glassQuad_y3 = 368;
var glassQuad_y4 = 362;

var bang1_x1 = 314;
var bang1_y1 = 334;
var bang1_x2 = 336;
var bang1_y2 = 328;
var bang1Change_x1 = .14;
var bang1Change_x2 = .1;
var bang1Change_y1 = .08;
var bang1Change_y2 = .06;

var leftShoulder = 490;
var leftArm = 596;
var rightShoulder = 412;
var rightArm1 = 462;
var rightArm2 = 560;
var shoulderBobCounter = 0;
var shoulderBob;

//----------------------------------------------------------------SetUp Function
function setup() {
  createCanvas(600, 600);

  bobChange = Math.floor(Math.random() * 2) + .1;
  sign1Change = Math.floor(Math.random() * 2) + .1;
  sign2Change = Math.floor(Math.random() * 2.4) + .16;
  shoulderBob = Math.floor(Math.random() * 4) + .2;
}


function draw() {
//----------------------------------------------------------------Animation Code
//background color changing
  background(bg_r += bgChange, bg_g += bgChange, bg_b += bgChange);
  background(bg_r -= (bgChange / 4), bg_g += (bgChange / 2), bg_b += bgChange);
  if (bg_b >= colorUpperLimit || bg_b <= colorLowerLimit) {
    bgChange *= -1;
  }

//testing changing between two specific colors (didn't work)
  //var bgChange2r = .06;
  //var bgChange2g = .13;
  //var bgChange2b = .09;
  //background(bg_r += bgChange2r, bg_g += bgChange2g, bg_b += bgChange2b);
  //if (bg_g >= 60 || bg_g <= 34) {
  //  bgChange2r *= -1;
  //  bgChange2g *= -1;
  //  bgChange2b *= -1;
  //}
  //
  //color1
  //   | color2
  //   |    |     *1    *4
  //r: 40 - 52 | +12 | +3.0
  //g: 34 - 60 | +26 | +6.5
  //b: 46 - 64 | +18 | +4.5


//title size changing
  if (initialTitleSize >= titleSize * 5 || initialTitleSize <= titleSize / 5) {
    titleChange *= -1;
  }

//signature motion
  if (sign1_x > 516 || sign1_x < 464) {
    sign1Change *= -1;
  }
  if (sign2_x > 478 || sign2_x < 402) {
    sign2Change *= -1;
  }


//bobbing animation
  if (bobCounter >= 8 || bobCounter <= -8) {
    bobChange *= -1;
  }
  bobCounter += bobChange;

//shoulder bobbing animation
  if (shoulderBobCounter >= 10 || shoulderBobCounter <= -20) {
    shoulderBob *= -1;
  }
  shoulderBobCounter += shoulderBob;

//bang1_x1:314 to 328; bang1_y1:334 to 342 | bang1_x2:336 to 346; bang1_y2:328 to 334
  if (bang1_x1 > 324 || bang1_x1 < 310) {
    bang1Change_x1 *= -1;
  }
  if (bang1_x2 > 342 || bang1_x2 < 332) {
    bang1Change_x2 *= -1;
  }
  if (bang1_y1 > 338 || bang1_y1 < 330) {
    bang1Change_y1 *= -1;
  }
  if (bang1_y2 > 33 || bang1_y2 < 324) {
    bang1Change_y2 *= -1;
  }


//----------------------------------------------------------------Base Shapes
//base shoulder shapes
  strokeWeight(1);
  fill(22, 22, 30);
  rect(0,412, 350,190);
  ellipse(30,rightArm2 += (shoulderBob/4), 96,184);
  ellipse(38,rightArm1 += (shoulderBob/2), 110,126);
  ellipse(90,rightShoulder += shoulderBob, 198,92);

//base neck shapes
  strokeWeight(0);
  fill(150, 122, 124);
  triangle(116,404, 218,480, 170,494);
  triangle(116,404, 130,366, 194,470);

//base head shapes
  fill(160, 120, 120);
  ellipse(242, 344, 220, 282);

//base shoulder shapes 2
  strokeWeight(1);
  fill(22, 22, 30);
  ellipse(334,leftShoulder += shoulderBob, 92,178);
  ellipse(346,leftArm += (shoulderBob/2), 98,66);

//base hair shapes
  strokeWeight(0);
  fill(46, 36, 42);
  ellipse(246,272, 202,138);
  triangle(126,364, 242,204, 140,258);

//----------------------------------------------------------------Detailing Shapes
//face detailing
  strokeWeight(0);
  fill(164, 134, 136);
  triangle(194,470, 268,482, 198,382);
  triangle(146,418, 194,470, 198, 360);
  fill(172, 140, 142);
  triangle(268,482, 354,286, 198,382);
//  nose
  triangle(288,434, 314,430, 318,370);
//  glasses
  strokeWeight(4.8);
  fill(48);
  line(216,glassLine_y1 += bobChange, 294,glassLine_y2 += bobChange);
  fill(184);
  strokeWeight(3);
  quad(276,glassQuad_y1 += bobChange, 306,glassQuad_y2 += bobChange, 324,glassQuad_y3 += bobChange, 294,glassQuad_y4 += bobChange);

//hair detailing
  strokeWeight(0);
//  back of head
  fill(46, 38, 42);
  triangle(152,378, 156,346, 120,362);
  fill(52, 42, 46);
  triangle(134,314, 166,342, 174,222);
  triangle(122,362, 166,342, 134,312);
//  shine
  fill(56, 50, 54);
  triangle(286,338, 282,208, 350,282);
  triangle(192,364, 286,338, 236,202);
  triangle(166,342, 192,364, 174,222);
  triangle(192,364, 198,382, 216,358);

  //triangle(286,338, 290,228, 350,282);
  //triangle(192,364, 286,338, 236,222);
  //triangle(166,342, 192,364, 174,242);

  //triangle(286,338, 298,258, 350,282);
  //triangle(192,364, 286,338, 236,262);
  //triangle(166,342, 192,364, 174,282);

  //triangle(286,338, 306,288, 350,282);
  //triangle(192,364, 286,338, 236,322);
  //triangle(166,342, 192,364, 174,322);

//  shadow
  fill(54, 44, 48);
  triangle(282,208, 350,282, 328,232);
  triangle(236,202, 286,338, 282,208);
  triangle(174,222, 192,364, 236,202);

  triangle(282,208, 350,262, 328,232);
  //triangle(236,202, 282,318, 282,208);
  //triangle(174,222, 194,344, 236,202);

  //triangle(282,208, 348,250, 328,232);
  //triangle(236,202, 276,278, 282,208);
  //triangle(174,222, 196,304, 236,202);

  //triangle(236,202, 268,238, 282,208);
  //triangle(174,222, 198,264, 236,202);

  triangle(236,202, 262,202, 282,208);
  triangle(174,222, 206,206, 236,202);

//  bangs
  fill(46, 44, 40); //bang1_x1:314 to 328; bang1_y1:334 to 342 | bang1_x2:336 to 346; bang1_y2:328 to 334
  triangle(bang1_x1 += bang1Change_x1,bang1_y1 += bang1Change_y1, bang1_x2 += bang1Change_x2,bang1_y2 += bang1Change_y1, 346,292);
  fill(58, 54, 54);
  triangle(318,312, 352,298, 350,282);
  triangle(352,318, 364,300, 350,282);
  triangle(344,332, 354,322, 350,282);
//  triangle(314,334, 336,328, 346,292);


//ear
  strokeWeight(0);
  fill(186, 150, 152)
  ellipse(190,374, 26,24);
  ellipse(188,356, 34,42);


//stubble
  strokeWeight(2);
  point(268,478);
  point(260,477);
  point(264,470);
  point(252,468);
  point(258,466);
  point(266,444);
  point(254,458);
  point(257,453);
  point(267,446);
  point(246,438);
  point(264,453);
  point(234,460);
  point(274,460);
  point(261,440);
  point(224,440);
  point(222,450);
  point(253,457);
  point(214,442);
  point(223,470);
  point(225,466);
  point(223,456);
  point(274,455);
  point(234,430);
  point(244,440);
  point(238,452);
  point(234,468);
  point(244,452);
  point(245,473);
  point(244,464);


//----------------------------------------------------------------Text Code
//title
  fill(32);
  textSize(titleSize += titleChange);
  text("Abstract Gaze", 4,72);
//signature
  textSize(22);
  text("Kalen", sign1_x += sign1Change,576); // 464 to 516
  text("Weinheimer", sign2_x += sign2Change,594); //478 to 402  sign2_x += sign2Change
}
