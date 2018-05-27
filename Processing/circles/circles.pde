float setup_width = 0;
float setup_height = 0;
int CENTER_DOT_SIZE = 10;
int GRAY_COLOR = 100;
boolean hover = false;
Circle c;
ArrayList<Circle> circles;
int NO_OF_CIRCLES = 20;
int NO_OF_DIFFERENT_TYPES = 4;
float[] different_radius = {25,50,75,100};
int start_position = 0;

void setup(){
  size(800,600);
  setup_width = 800;
  setup_height = 600;
  circles = new ArrayList();
  for(int i=0; i<NO_OF_CIRCLES; i++){
    c = new Circle((int)generateRandom(different_radius,false));
    circles.add(c);
  } 
}

float generateRandom(float[] arr, boolean between){
  if(between){
    float value = random(arr[0],arr[1]);
    return value;
  } else{
    int index= (int) random(0,arr.length);
    return arr[index];
  }
}

boolean boundary_check(float small_value, float min, float large_value,float max){
  return small_value > min && large_value < max;
}

void draw(){
  background(255);

  for(int i=0; i<circles.size(); i++){
    update(circles.get(i));
    (circles.get(i)).display();
  }
  
  for(int i=0; i<circles.size(); i++){
    float x1 = circles.get(i).x_position;
    float y1 = circles.get(i).y_position;
    for(int j=i+1; j<circles.size(); j++){
      float x2 = circles.get(j).x_position;
      float y2 = circles.get(j).y_position;
      if(overCircle(circles.get(i), circles.get(j),false)){
        stroke(GRAY_COLOR);
        line(x1,y1,x2,y2);
      }
    }
  }
}

void update(Circle c){    
  if (boundary_check(c.x_position + c.x_increment - c.radius, 0, c.x_position + c.x_increment + c.radius, setup_width)){
    c.x_position += c.x_increment;
  }
  else{
    c.x_increment*= -1;
    c.x_position += c.x_increment;
  }
  
  if (boundary_check(c.y_position + c.y_increment - c.radius, 0, c.y_position  + c.y_increment + c.radius, setup_height)){
    c.y_position += c.y_increment;
  }
  else {
    c.y_increment*= -1;
    c.y_position += c.y_increment;
  }
  
  c.transparency = (int)(70-calculateDistance(c.x_position, c.y_position, setup_width/2, setup_height/2)/6);
  hover = overCircle(c,null,true);
}

boolean overCircle(Circle c1, Circle c2, boolean isMouse) {
  float distance = 0;
  int radius = 0;
  
  if(isMouse){
    radius = c1.radius;
    distance = calculateDistance(c1.x_position, c1.y_position, mouseX, mouseY);
  } else{
    radius = Math.max(c1.radius,c2.radius);
    distance = calculateDistance(c1.x_position, c1.y_position, c2.x_position, c2.y_position);
  }
  
  if (distance < radius) {
    return true;
  } else {
    return false;
  }
}

float calculateDistance(float x1, float y1, float x2, float y2){
  float disX = x1 - x2;
  float disY = y1 - y2;
  return sqrt(sq(disX) + sq(disY));
}

class Circle {
  PShape s;
  int BLUE = 0;
  int GREEN = 1;
  int transparency = 0;
  int radius = 0;
  float x_position = 0;
  float y_position = 0;
  float x_increment= 0;
  float y_increment= 0;  
  int color_selection = 0;
  float[] increment = {-1.2,-1,-0.8,-0.6,-0.4,0.4,0.6,0.8,1,1.2};
  float[] start_position_x = {110,690};
  float[] start_position_y = {110,490};
  float[] fill_color = {BLUE,GREEN};

  Circle(int radius) {
    x_position = (int)generateRandom(start_position_x,true);
    y_position = (int)generateRandom(start_position_y,true);
    x_increment = generateRandom(increment,false);
    y_increment = generateRandom(increment,false);
    color_selection = (int)generateRandom(fill_color,false);
    transparency = 50;
    this.radius = radius;
  }
  
  void display() {
    noStroke();
    if(hover){
      fill(255,0,0,transparency);
    } else if(color_selection==BLUE){
      fill(0,0,255,transparency);
    } else if(color_selection==GREEN){
      fill(0,255,0,transparency);
    }
    s = createShape(ELLIPSE, x_position, y_position, radius*2, radius*2);
    ellipseMode(CENTER);  // Set ellipseMode to CENTER
    fill(GRAY_COLOR,GRAY_COLOR,GRAY_COLOR);  // Set fill to gray
    rect(x_position-CENTER_DOT_SIZE/2, y_position-CENTER_DOT_SIZE/2, CENTER_DOT_SIZE, CENTER_DOT_SIZE);  // Draw gray ellipse using CENTER mode
  
    shape(s);
  }
}