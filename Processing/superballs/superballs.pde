float setup_width = 0;
float setup_height = 0;
boolean mousePressed = false;
int DEFAULT_DIAMETER = 100;
float SLOWER_FACTOR = 50;
float DUMP_FACTOR = 1.5;
int diameter;
float GRAVITY = 9.8/SLOWER_FACTOR;
ArrayList<Circle> circles;

void setup(){
   size(800,600);
   setup_width = 800;
   setup_height = 600;
   diameter = DEFAULT_DIAMETER;
   circles = new ArrayList();
}

void draw(){
  background(255);
  if(mousePressed){
    diameter++;
    fill(100);
    noStroke();
    ellipse(mouseX,mouseY,diameter/2,diameter/2);    
  }
  
  for(int i=0; i<circles.size(); i++){
    circles.get(i).display();
  }
  
  update();
}

void update(){
  for(int i=0; i<circles.size(); i++){
    circles.get(i).time++;
    float time = circles.get(i).time;
    float radius = circles.get(i).radius;
    float y_0 = circles.get(i).y_0;
    float v_0 = circles.get(i).v_0;
    float y_position = y_0 + v_0*time + 0.5*GRAVITY*sq(time);
    
    if(y_position > setup_height-radius/2){
      y_position = setup_height - radius/2;
      circles.get(i).y_0 = setup_height-radius/2;
      circles.get(i).v_0 = -GRAVITY*time/DUMP_FACTOR;
      circles.get(i).time = 0;
    } else if(v_0 < 0 && v_0 + GRAVITY*time > 0){
      circles.get(i).y_0 = y_position;
      circles.get(i).v_0 = 0;
      circles.get(i).time = 0;
    }
    
    circles.get(i).y_position = y_position;
  }
}

void mousePressed() {
  mousePressed = true;
}

void mouseReleased(){
  mousePressed = false;
  circles.add(new Circle(mouseX,mouseY,diameter/2));
  diameter = DEFAULT_DIAMETER;
}

class Circle{
  PShape s;
  float y_0, v_0, y_heighest;
  float x_position, y_position;
  float radius;
  float time;
  float velocity;
  
  Circle(float x_position, float y_position, int radius){
    this.x_position = x_position;
    this.y_position = y_position;
    this.y_0 = y_position;
    this.y_heighest = y_position;
    this.radius = radius;
    time = 0;
    velocity = 0;
  }
  
  void display(){
    fill(100);
    noStroke();
    ellipse(x_position,y_position,radius,radius);    
  }
  
}