//import processing.sound.*;
//AudioDevice myAudioServer;
float setup_width = 0;
float setup_height = 0;
boolean mousePressed = false;
int DIAMETER = 25;
float SLOWER_FACTOR = 100;
float TIME_PRODUCE = 50;
float GRAVITY = 9.8/SLOWER_FACTOR;
float OFFSET_COLLISION = 10;
float END_SIZE = 15;
float initial_x = 40;
float initial_y = 40;
float line_x1, line_y1 = 0;
ArrayList<Circle> circles;
ArrayList<Line> lines;
float time = 0;

void setup() {
  size(800, 600);
  setup_width = 800;
  setup_height = 600;
  //myAudioServer = new AudioDevice(this, 44100, 128);
  circles = new ArrayList();
  lines = new ArrayList();
}

void draw() {
  time++;
  background(0);
  fill(0);
  strokeWeight(2);
  stroke(255);
  ellipse(initial_x, initial_y,DIAMETER/2+3,DIAMETER/2+3);

  if (time%TIME_PRODUCE==0) {
    circles.add(new Circle(initial_x, initial_y, DIAMETER/2));
  }
  for (int i=0; i<circles.size(); i++) {
    circles.get(i).display();
  }
  if (mousePressed) {
    strokeWeight(5);
    stroke(255,0,0,100);
    ellipse(line_x1, line_y1,END_SIZE,END_SIZE);
    line(line_x1, line_y1, mouseX, mouseY);
  }
  for (int i=0; i<lines.size(); i++) {
    lines.get(i).display();
  }

  update();
}

void update() {
  for (int i=0; i<circles.size(); i++) {
    circles.get(i).time++;
    float time = circles.get(i).time;
    float y_0 = circles.get(i).y_0;
    float vy_0 = circles.get(i).vy_0;
    float x_0 = circles.get(i).x_0; 
    float vx_0 = circles.get(i).vx_0;
    float y_position = y_0 + vy_0*time + 0.5*GRAVITY*sq(time);
    float x_position = x_0 + vx_0*time;

    circles.get(i).y_position = y_position;
    circles.get(i).x_position = x_position;
    circles.get(i).vx = vx_0;
    circles.get(i).vy = vy_0 + GRAVITY*time;

    for (int j=0; j<lines.size(); j++) {
      if (circleLineIntersect(lines.get(j).x1,lines.get(j).y1,lines.get(j).x2,lines.get(j).y2, x_position, y_position, circles.get(i).radius)) {
        circles.get(i).time = 0; 
        circles.get(i).y_0 = y_position;
        circles.get(i).x_0 = x_position;
        float angle_cos = Math.abs(lines.get(j).radian*2) + Math.abs(atan(circles.get(i).vy/circles.get(i).vx)) - PI/2;
        float angle_sin = Math.abs(lines.get(j).radian*2) + Math.abs(atan(circles.get(i).vy/circles.get(i).vx)) - PI/2;
        float sign_y = -1;
        float sign_x = 1;
        if(Math.abs(PI/2 - Math.abs(lines.get(j).radian) + Math.abs(atan(circles.get(i).vy/circles.get(i).vx)))>PI/2){
          sign_y = circles.get(i).vy/Math.abs(circles.get(i).vy)*-1;
        }
        if(Math.abs(PI/2 - Math.abs(lines.get(j).radian) + Math.abs(atan(circles.get(i).vy/circles.get(i).vx)))<PI/2){
          sign_x = circles.get(i).vx/Math.abs(circles.get(i).vx)*-1;
        }
        circles.get(i).vy_0 = sqrt(sq(circles.get(i).vy)+sq(circles.get(i).vx))*cos(Math.abs(angle_cos))*sign_y;
        circles.get(i).vx_0 = sqrt(sq(circles.get(i).vy)+sq(circles.get(i).vx))*sin(Math.abs(angle_sin))*sign_x;

        //circles.get(i).vy_0 = sqrt(sq(circles.get(i).vy)+sq(circles.get(i).vx))*cos(lines.get(j).radian*2 + atan(circles.get(i).vy/circles.get(i).vx))*-1;
        //circles.get(i).vx_0 = sqrt(sq(circles.get(i).vy)+sq(circles.get(i).vx))*sin(lines.get(j).radian*2 + atan(circles.get(i).vy/circles.get(i).vx));
      }
    }
  }
}

boolean circleLineIntersect(float x1, float y1, float x2, float y2, float cx, float cy, float cr ) {
  if(cx>Math.max(x1,x2)+OFFSET_COLLISION||cx<Math.min(x1,x2)-OFFSET_COLLISION||cy<Math.min(y1,y2)-OFFSET_COLLISION||cy>Math.max(y1,y2)+OFFSET_COLLISION){
    return false;
  }
  float dx = x2 - x1;
  float dy = y2 - y1;
  float a = dx * dx + dy * dy;
  float b = 2 * (dx * (x1 - cx) + dy * (y1 - cy));
  float c = cx * cx + cy * cy;
  c += x1 * x1 + y1 * y1;
  c -= 2 * (cx * x1 + cy * y1);
  c -= cr * cr;
  float bb4ac = b * b - 4 * a * c;
  return (bb4ac>=0);
}

void mousePressed() {
  mousePressed = true;
  line_x1 = mouseX;
  line_y1 = mouseY;
}

void mouseReleased() {
  mousePressed = false;
  lines.add(new Line(line_x1, line_y1, mouseX, mouseY));
}

class Circle {
  PShape s;
  float y_0, vy_0, vy, y_heighest;
  float x_0, vx_0, vx;
  float x_position, y_position;
  float radius;
  float time;

  Circle(float x_position, float y_position, int radius) {
    this.x_position = x_position;
    this.y_position = y_position;
    this.x_0 = x_position;
    this.y_0 = y_position;
    this.y_heighest = y_position;
    this.radius = radius;
    time = 0;
    vy_0 = 0;
    vx_0 = 0;
    vy = 0;
    vx = 0;
  }

  void display() {
    fill(255);
    noStroke();
    ellipse(x_position, y_position, radius, radius);
  }
}

class Line {
  float x1, y1, x2, y2, radian;
  Line(float x1, float y1, float x2, float y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    radian = atan((y1-y2)/(x1-x2));
  }

  void display() {
    strokeWeight(5);
    stroke(255,0,0,100);
    ellipse(x1, y1,END_SIZE,END_SIZE);
    ellipse(x2, y2,END_SIZE,END_SIZE);
    line(x1, y1, x2, y2);
  }
}