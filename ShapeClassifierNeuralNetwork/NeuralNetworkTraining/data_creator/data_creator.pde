void setup(){
  size(128,128);
}

void draw(){
  
  for(int i = 0; i<6; i++){ 
    pushMatrix();
    background(255);
  
    strokeWeight(4);
    float r = random (20, 60);
    float x = random (r, width - r );
    float y = random (r, height - r);
    translate(x,y);
    if (i==0) {
      line(randomSign() * random (10, 30),randomSign() * random (10, 30),randomSign() * random (10, 30), randomSign() * random (10, 30));
      saveFrame("../data/line###.png");
    } else if (i==1) {
      circle(0,0,r*2);
      saveFrame("../data/circle###.png");
    } else if(i==2){
      rectMode(CENTER);
      rotate(random(-0.1,0.1));
      square(0,0,r);
      saveFrame("../data/square###.png");
    } else if (i==3) {
      rotate(random(-0.1, 0.1));
      triangle(0, -r, r, r, -r, r);
      saveFrame("../data/triangle###.png");
    } else if (i==4){
      rotate(random(0, PI));
      polygon(0,0,random(15,30),5);
      saveFrame("../data/pentagon###.png");
    } else if (i==5){
      rotate(random(0, PI));
      polygon(0,0,random(15,30),6);
      saveFrame("../data/hexagon###.png");
    }
    popMatrix();
  }
  if(frameCount == 100 ) {
    exit();
  }
}

void polygon(float x, float y, float radius, int npoints) {
  float angle = TWO_PI / npoints;
  beginShape();
  for (float a = 0; a < TWO_PI; a += angle) {
    float sx = x + cos(a) * radius;
    float sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

int randomSign() {
 if(int(random(0, 10)%2) == 0){
   return 1;
 }   
 return -1;
}
