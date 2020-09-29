/* Oscillation: The rose figure (https://editor.p5js.org/ariyachlt/sketches/ydLbS29xt)

Modified from Joerg Blumtritt, https://github.com/jbenno/nyuad_decoding_nature/wiki

In this modification, there are a total of three rose figures (of diffeernt colours) with only one modification from the first rose. The arrow up and down arrow keys can be used to change the amplitude of the rose figures, increasing and decreasing it, respectively.
*/

function setup() {
  createCanvas(600, 600);
  theta=0;
  a=80;
  n=3;
  d=5;
  k=n/d;
  dtheta=0.02;
  
  // changing n (from 3 to 4) for the second rose figure
  n2=4;
  k2=n2/d;
  
  // changing d (from 5 to 6) for the third rose figure
  d3=6;
  k3=n/d3;
}

function draw() {
  background(255,3);
  translate(width/2,height/2);
  
  // calculating r for each rose figure
  r=a*sin(k*theta);
  r2=a*sin(k2*theta);
  r3=a*sin(k3*theta);
  
  // creating a vector for each rose figure
  S=createVector( r*cos(theta), r*sin(theta) );
  S2=createVector( r2*cos(theta), r2*sin(theta) );
  S3=createVector( r3*cos(theta), r3*sin(theta) );
  
  noStroke()
  fill('#eae48f');      // green shade
  circle(S.x,S.y,5);
  
  fill('#ffdc7c');      // yellow shade
  circle(S2.x,S2.y,5);
  
  fill('#ff9b71');      // orange shade
  circle(S3.x,S3.y,5);
  
  theta=theta+dtheta;
  
  // changes amplitude off all three rose figures
  if (keyIsDown(UP_ARROW) & a < 280){
    a += 0.5;
  }
  if (keyIsDown(DOWN_ARROW) & a > 80){
    a -= 0.5;
  }
}