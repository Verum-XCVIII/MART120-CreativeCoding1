function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(128);
  strokeWeight(1);


//base shoulder shapes
  fill(22, 22, 30);
  rect(0,412, 350,190);
  ellipse(40,560, 96,184);
  ellipse(38,462, 110,126);
  ellipse(90,412, 198,92);
//base neck shapes
  strokeWeight(0);
  fill(150, 122, 124);
  triangle(116,404, 218,480, 170,494);
  triangle(116,404, 130,366, 194,470);
//base head shapes
  fill(160, 120, 120);
  ellipse(242, 344, 226, 282);
//base shoulder shapes 2
  strokeWeight(1);
  fill(22, 22, 30);
  ellipse(334,490, 92,178);
  ellipse(346,598, 98,66);
//base hair shapes
  strokeWeight(0);
  fill(46, 36, 42);
  ellipse(246,272, 202,138);
  triangle(126,364, 242,204, 140,258);

//face detailing
  strokeWeight(0);
  fill(164, 134, 136);
  triangle(194,470, 268,482, 198,382);
  triangle(146,418, 194,470, 198, 360);
  fill(172, 140, 142);
  triangle(268,482, 354,286, 198,382);
  //nose
  triangle(288,434, 314,430, 318,370);
  //glasses
  strokeWeight(2);
  fill(48);
  line(216,350, 294,364);
  line(216,354, 294,370);
  line(216,353, 294,369);
  line(216,352, 294,368);
  line(216,351, 294,367);
  line(216,350, 294,366);
  fill(184);
  strokeWeight(3);
  quad(276,394, 306,400, 324,370, 294,364);

//hair detailing
  strokeWeight(0);
  //back of head
  fill(46, 38, 42);
  triangle(152,378, 156,346, 120,362);
  fill(52, 42, 46);
  triangle(134,314, 166,342, 174,222);
  triangle(122,362, 166,342, 134,312);
  //shine
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

  //shadow
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

  //bangs
  fill(58, 54, 54);
  triangle(318,312, 352,298, 350,282);
  triangle(352,318, 364,300, 350,282);
  triangle(344,332, 354,322, 350,282);
  triangle(314,334, 336,328, 346,292);

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




//text
  fill(32);
  textSize(22);
  text("Abstract Gaze", 20,40);
  text("Kalen", 464,575);
  text("Weinheimer", 478,595);

}
