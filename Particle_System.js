/* Particle System Modified 

I modified the https://p5js.org/examples/simulate-particles.html example so that the particles bounce off each other when they collide. Although visually the program looks quite similar, the code has been modified a lot in order to make the collision work. The particles also change colors slightly but randomly upon collision.

*/

// this class describes the properties of a single particle.
class Particle {
  constructor(){
    this.x = random(0,width);          // x-coordinate
    this.y = random(0,height);         // y-coordinate
    this.r = random(8,28);             // radius
    this.c = c;                        // color
    this.xSpeed = random(-2,2);        // speed in the x-direction
    this.ySpeed = random(-1,1.5);      // speed in the y-direction
  }

  displayParticle() {
    noStroke();
    fill(this.c);
    circle(this.x,this.y,this.r);
  }
  
  // function to move the particles and reflect at edges
  moveParticle() {
    if(this.x < 0 || this.x > width) {
      this.xSpeed*=-1;
    }
    if(this.y < 0 || this.y > height) {
      this.ySpeed*=-1;
    }
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }
}

// this class describes the properties of the particle system.
class PS {
  constructor() {
    this.particles = [];
  }
  
  // function to add particles
  addParticle(){
    this.particles.push(new Particle());
  }
  
  // function to run the particles and check for collision with other particles
  run() {
    for(let i in this.particles) {
      let p1 = this.particles[i];
      for (let j in this.particles) {
        if (j!==i) {
          let p2=this.particles[j];
          let col_dis = dist(p1.x,p1.y,p2.x,p2.y);
          if (col_dis < (p1.r + p2.r)/2-4) {
            p1.xSpeed*=-1;
            p1.ySpeed*=-1;
            p1.c = color(random(125,255), random(50,80), random(125,255), 125)
          }
        }
      }
      p1.x+=p1.xSpeed;
      p1.y+=p1.ySpeed;
      p1.moveParticle();
      p1.displayParticle();
    }
  }

  // function to join the particles in close proximity with a line
  joinParticles() {
    for(let i in this.particles) {
      let p1 = this.particles[i];
      for (let j in this.particles) {
        if (j!==i) {
          let p2=this.particles[j];
          let dis = dist(p1.x,p1.y,p2.x,p2.y);
          if (dis <= 100) {
            stroke('rgba(255,255,255,0.1)');
            line(p1.x,p1.y,p2.x,p2.y);
          }
        }
      }
    }
  }
}


let B;

function setup() {
  createCanvas(700, 500);
  B = new PS();
  for(let i = 0;i<25;i++){
    c = color(random(125,255), random(50,80), random(125,255), 125)
    B.addParticle()
  }
}

function draw() {
  background(0);
  B.run();
  B.joinParticles()
}