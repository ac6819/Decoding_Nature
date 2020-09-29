/*
Gravity: Planets orbiting a sun (https://editor.p5js.org/ariyachlt/sketches/pEgJBR5Dx)

Modified from Joerg Blumtritt, https://github.com/jbenno/nyuad_decoding_nature/wiki

*/

let planet;
let sun;

function setup() {
  createCanvas(650, 650);
  // setting up the planets
  planet1 = new Planet(100, 0,0,-1,0.7,color("#F85156"));
  planet2 = new Planet(120, 0,0,-1,0.8,color("#985F48"));
  planet3 = new Planet(150, 0,0,-1,1,color("#35BC7A"));
  planet4 = new Planet(180, 0,0,-1,0.9,color("#4B94B9"));
  planet5 = new Planet(210, 0,0,-1,1.1,color("#6D4BB9"));
  planet6 = new Planet(240, 0,0,-1,1.2,color("#C67B43"));
  planet7 = new Planet(270, 0,0,-1,0.9,color("#985F48"));
  planet8 = new Planet(300, 0,0,-1,0.8,color("#2A7FBB"));
  sun = new Sun(0,0,300);
}

function draw() {
  background(0);
  translate(width/2,height/2);
  
  // applying gravitational force to the planets
  let grav1 = sun.attract(planet1);
  planet1.applyForce(grav1);
  planet1.update();
  
  let grav2 = sun.attract(planet2);
  planet2.applyForce(grav2);
  planet2.update();
  
  let grav3 = sun.attract(planet3);
  planet3.applyForce(grav3);
  planet3.update();

  let grav4 = sun.attract(planet4);
  planet4.applyForce(grav4);
  planet4.update();
  
  let grav5 = sun.attract(planet5);
  planet5.applyForce(grav5);
  planet5.update();
    
  let grav6 = sun.attract(planet6);
  planet6.applyForce(grav6);
  planet6.update();

  let grav7 = sun.attract(planet7);
  planet7.applyForce(grav7);
  planet7.update();
  
  let grav8 = sun.attract(planet8);
  planet8.applyForce(grav8);
  planet8.update();

  // displaying the planets
  sun.display();
  planet1.display();
  planet2.display();
  planet3.display();
  planet4.display();
  planet5.display();
  planet6.display();
  planet7.display();
  planet8.display();
}