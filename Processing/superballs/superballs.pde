float setup_width = 0;
float setup_height = 0;
boolean mousePressed = false;
int DEFAULT_RADIUS = 25;
float SLOWER_FACTOR = 50;
float DUMP_FACTOR = 1.5;
int radius;
float GRAVITY = 9.8/SLOWER_FACTOR;
ArrayList<Circle> circles;

void setup(){
   size(800,600);
   setup_width = 800;
   setup_height = 600;
   radius = DEFAULT_RADIUS;
   circles = new ArrayList();
}

void draw(){
  background(255);
  if(mousePressed){
    radius++;
    fill(100);
    noStroke();
    ellipse(mouseX,mouseY,radius*2,radius*2);
  }
  
  update();
}

void update(){
  // 1. Update time & position
  // 2. Check if object 1 collides with any objects
  // 3. Updated the position & velocity for object 1
  // 4. Continue for object 2, object 3, etc...
  for(int i=0; i<circles.size(); i++){
    circles.get(i).time++;
    float time = circles.get(i).time;
    float radius = circles.get(i).radius;
    float y_0 = circles.get(i).y_0;
    float y_velocity = circles.get(i).y_velocity;
    float y_position = y_0 + y_velocity*time + 0.5*GRAVITY*sq(time);
    circles.get(i).y_position = y_position;
    
    // Check if collision happens
    if(is_collision(i)) {
      // update the position & velocity
    } 
    
    if(y_position > setup_height-radius){ // when hit the ground
      y_position = setup_height - radius;
      circles.get(i).y_0 = setup_height-radius;
      circles.get(i).y_velocity = -GRAVITY*time/DUMP_FACTOR;
      circles.get(i).time = 0;
    } else if(y_velocity < 0 && y_velocity + GRAVITY*time > 0){ // when at the top
      circles.get(i).y_0 = y_position;
      circles.get(i).y_velocity = 0;
      circles.get(i).time = 0;
    } else {
      // any other conditions (moving up or down)
    }
    
    circles.get(i).display();
  }
}

boolean is_collision(int i) {
  for(int j=i+1 ; j<circles.size(); j++){
    Circle c1 = circles.get(i);
    Circle c2 = circles.get(j);
    if(sqrt(sq(c1.x_position - c2.x_position) + sq(c1.y_position - c2.y_position)) < c1.radius + c2.radius){
      println("collision happened between " + i + " & " + j + "!");
      return true;
    }
  }
  return false;
}

void mousePressed() {
  mousePressed = true;
}

void mouseReleased() {
  mousePressed = false;
  circles.add(new Circle(mouseX,mouseY,radius));
  radius = DEFAULT_RADIUS; // Reset the diamter to default one.
}


class Circle{
  float y_0, y_velocity, x_velocity;
  float x_position, y_position;
  float radius;
  float time;
  
  Circle(float x_position, float y_position, int radius){
    this.x_position = x_position;
    this.y_position = y_position;
    this.y_0 = y_position;
    this.radius = radius;
    y_velocity = 0;
    x_velocity = 0;
    time = 0;
  }
  
  void display(){
    fill(100);
    noStroke();
    ellipse(x_position,y_position,radius*2,radius*2);    
  }
  
}