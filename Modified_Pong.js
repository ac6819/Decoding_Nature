/*
Modified Pong (https://editor.p5js.org/ariyachlt/sketches/WPY3F4JqG)
*/

const d1=50; // diameter of the ball 1
const d2=25; // diameter of the ball 2
const w=100; // width and height of the paddle
const h=20;

const step=10; // how far the paddle moves with one key stroke

let score = 0;

function setup() {
  createCanvas(600, 600);
  
  // Ball 1
  Bx1=random(0, width);
  By1=d1 // start randomly from the top
  vx1=random(2,8); // random velocity
  vy1=random(4,8);
  col1 = color(80,50,230)
  
  // Ball 2
  Bx2=random(0, width);
  By2=d2 // start randomly from the top
  vx2=random(4,8); // random velocity
  vy2=random(4,8);
  col2 = color(230,50,80)

  // Paddle
  Px=width/2;
  Py=height-30;
}

function draw() {
  background(0);
  Bx1+=vx1; // update ball 1's position by adding the velocity
  By1+=vy1;
  Bx2+=vx2; // update ball 2's position by adding the velocity
  By2+=vy2;
  display(); // display ball's and paddle
  reflectAtEdges(); // reflect at the edges of the canvas and of the paddle
  
}

function reflectAtEdges() {
  // reflect the at edges
    if (Bx1 > width - d1/2) {
      Bx1 = width - d1/2;
      vx1 *= -1;
    } else if (Bx1 < d1/2) {
      Bx1 = d1/2;
      vx1 *= -1;
    }
    if (By1 > height - d1/2) {
      By1 = height - d1/2;
      vy1 *= -1;
      score--; // missing a blue ball makes you lose a point
    } else if (By1 < d1/2) {
      By1 = d1/2;
      vy1 *= -1;
    }
    if (Bx2 > width - d2/2) {
      Bx2 = width - d2/2;
      vx2 *= -1;
    } else if (Bx2 < d2/2) {
      Bx2 = d2/2;
      vx2 *= -1;
    }
    if (By2 > height - d2/2) {
      By2 = height - d2/2;
      vy2 *= -1;
    } else if (By2 < d2/2) {
      By2 = d2/2;
      vy2 *= -1;
    }
  
  // reflect at the paddle (blue increases score, red decreases)
    if (( Bx1 > Px &&
          Bx1 < Px + w) &&
          (By1 + (d1/2) >= Py)) {
    vx1*=-1;
    vy1*=-1;
    score+=2;
    }
  
    if (( Bx2 > Px &&
          Bx2 < Px + w) &&
          (By2 + (d2/2) >= Py)) {
    vx2*=-1;
    vy2*=-1;
    score--;
    }
  
    if (Px + w > width) {
    Px = width - w;
    }
    if (Px < 0) {
    Px = 0;
    }
}

function display() {
  // display paddle
  fill(color(255));
  noStroke();
  rect(Px, Py, w, h);
  
  // paddle movements (for as long as key is pressed down)
  if (keyIsDown(LEFT_ARROW)){
    Px -= step;
  }
  if (keyIsDown(RIGHT_ARROW)){
    Px += step;
  }
  
  // display ball 1
  fill(col1);
  noStroke();
  circle(Bx1, By1, d1);
  
  // display ball
  fill(col2);
  noStroke();
  circle(Bx2, By2, d2);

  // write score
  fill(color(255));
  textSize(40);
  text(score, width/2, 50);
}