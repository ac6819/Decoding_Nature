/*
Within Five Walls

Modified from Daniel Shiffman's "Stay Within Walls."

Each arrow has a steering behaviour to keep it within walls that matches its color. Click the screen to play with the color.
*/

// creating a class for the object that takes 4 arguments
class Boid {
  constructor(x, y, c, edge) {
    this.c = c                                          // color of boid
    this.edge = edge                                    // square edge distance
    this.a = createVector(0, 0);                        // acceleration
    this.v = createVector(random(-1,2), random(-1,2));  // velocity
    this.pos = createVector(x, y);                      // position
    this.r = random(2,4);                               // "radi" of boid
    this.maxspeed = random(1,2);                        // maximum speed
    this.maxforce = 0.12;                               // maximum force
  }

  // method to move the boid
  update() {
    this.v.add(this.a);                // update velocity
    this.v.limit(this.maxspeed);       // limit speed
    this.pos.add(this.v);              // update position
    this.a.mult(0);                    // reset acceleration to 0
  }

  // method to apply force
  applyForce(force) {
    this.a.add(force);
  }
  
  flock() {
    let ali = this.align();  // alignment
    ali.mult(0.1);           // weighing alignment force
    this.applyForce(ali);
  }
  
  // Method for alignment (checks nearby boids)
  align() {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.pos, boids[i].pos);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].v);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      let steer = p5.Vector.sub(sum, this.v);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
  
  // method to reflect from edges
  reflect() {
    let desired = null;
    
    if (this.pos.x < this.edge) {                            // left edge
      desired = createVector(this.maxspeed, this.v.y);
    } else if (this.pos.y < this.edge) {                     // top edge
      desired = createVector(this.v.x, this.maxspeed);
    } else if (this.pos.x > width - this.edge) {             // right edge
      desired = createVector(this.maxspeed * -1, this.v.y);
    } else if (this.pos.y > height - this.edge) {            // bottom edge
      desired = createVector(this.v.x, this.maxspeed * -1);
    }
    
    // to steer the boid
    if (desired !== null) {
      let steer = p5.Vector.sub(desired, this.v);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  // method to display the boid
  display() { 
    this.theta = this.v.heading() + PI / 2;  // angle arrow in v direction
    fill(this.c);
    stroke(this.c);
    push();                                  // saves drawing settings
    translate(this.pos.x, this.pos.y);
    rotate(this.theta);                      // rotate triangle in v direction
    beginShape();
    vertex(0, -this.r * 2);                  // Arrow pointing up
    vertex(-this.r, this.r * 2);             // Lower left corner
    vertex(this.r, this.r * 2);              // Lower right corner
    endShape(CLOSE);
    pop();                                   // restores drawing settings
  }
}

let colors;    // to store array of colors
let boids;     // to store array of boids

function setup() {
  createCanvas(450, 450);
  colors = [color(82,142,225), color(65,216,159), color(236,96,96),
             color(185,120,231), color(174,55,133)];
  
  boids = []
  addBoids()
}

function draw() {
  background(255);
  drawBox();       // calling the function to draw the 5 boxes
  
  // calling boid behaviours for each boid
  for(let i = 0; i < boids.length; i++){
    boids[i].flock();
    boids[i].update();
    boids[i].reflect();
    boids[i].display();
  }
}

// function to change color of each box by incrementing the array index
function mouseClicked() {
  for(let i = 0; i < boids.length; i++){
    col = boids[i].c
    ind = colors.indexOf(col)
    if(ind < 4){
      console.log(ind++)
      boids[i].c = colors[ind++]
    } else {
      boids[i].c = colors[0]
    }
    boids[i].r = random(2,4)
  }
}

//function to add boids
let xs;

function addBoids() {
  xs = [random(-15,-5),random(width+15,width+5)] // initial x locations
  
  boids.push(new Boid(random(xs),random(-15,height+15),colors[0],0));
  boids.push(new Boid(random(xs),random(25,height-25),colors[1],40));
  boids.push(new Boid(random(xs),random(65,height-65),colors[2],80));
  boids.push(new Boid(random(xs),random(105,height-105),colors[3],120));
  boids.push(new Boid(random(xs),random(145,height-145),colors[4],160));

  for(let i = 0; i < 40; i++){
    boids.push(new Boid(random(xs),random(-15,height+15),colors[0],0));
  }
  
  for(let i = 0; i < 35; i++){
    boids.push(new Boid(random(xs),random(25,height-25),colors[1],40));
  }
    
  for(let i = 0; i < 30; i++){
    boids.push(new Boid(random(xs),random(65,height-65),colors[2],80));
  }
  
  for(let i = 0; i < 25; i++){
    boids.push(new Boid(random(xs),random(65,height-65),colors[2],80));
  }
  
  for(let i = 0; i < 20; i++){
    boids.push(new Boid(random(xs),random(145,height-145),colors[4],160));
  }
}

// function to draw the 5 boxes
function drawBox() {
  rectMode(CORNERS);
  strokeWeight(2)
  
  fill(boids[0].c)
  stroke(boids[0].c);
  rect(0, 0, width, height);
  fill(boids[1].c)
  stroke(boids[1].c);
  rect(40, 40, width-40, height-40);
  fill(boids[2].c)
  stroke(boids[2].c);
  rect(80, 80, width-80, height-80);
  fill(boids[3].c)
  stroke(boids[3].c);
  rect(120, 120, width-120, height-120);
  fill(boids[4].c)
  stroke(boids[4].c);
  rect(160, 160, width-160, height-160);
}
