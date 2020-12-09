/*
Random Walker (https://editor.p5js.org/ariyachlt/sketches/Y_7LC4GvK)

Modified from Joerg Blumtritt, https://github.com/jbenno/nyuad_decoding_nature/wiki

*/

// defining the constants
const s = 7;
const m = 2**22;
const a = 333666999;
const c = 9977553311;

// setting the seed to produce the same sequence of pseudo-random numbers every time program is run
let seed = s;

// setting up the program by setting initial walker locations and color
function setup() {
  createCanvas(400, 400);
  background(0);
  x1 = int(random(40,width-40));
  y1 = int(random(40,height-40));
  x2 = int(random(40,width-40));
  y2 = int(random(40,height-40));
  changeCol();
}

// function to change the color of the walkers (both will have the same color)
function changeCol() {
  r = int(random(81,201));
  g = int(random(21,101));
  b = int(random(51,181));
}

// pseudo-random number generator that maps the seed from the 0 to m-1 range to the range we give
function rnd(low,hgh) {
  seed = (a*seed + c) % m;
  out = map(seed, 0 , m-1, low, hgh, true);
  console.log(out);
  return out;
}

// function to draw the walker
function draw() {
  stroke(r,g,b);
  strokeWeight(2);
  point(x1,y1);
  x1 = x1 + rnd(-5,5);
  y1 = y1 + rnd(-5,5);
  point(x2,y2);
  x2 = x2 + rnd(-5,5);
  y2 = y2 + rnd(-5,5);
  
// conditions to change the color of the walkers when one reaches an edge and randomly set a new location
  if(x1 > width || x1 < 0 || y1 > width || y1 < 0){
    x1 = int(random(40,width-40));
    y1 = int(random(40,height-40));
    changeCol();
  }
  if(x2 > width || x2 < 0 || y2 > width || y2 < 0){
    x2 = int(random(40,width-40));
    y2 = int(random(40,height-40));
    changeCol();
  }
}

// function to reset the location and color of both walkers when mouse is clicked
function mouseClicked() {
  x1 = int(random(40,width-40));
  y1 = int(random(40,height-40));
  x2 = int(random(40,width-40));
  y2 = int(random(40,height-40));
  changeCol();
}