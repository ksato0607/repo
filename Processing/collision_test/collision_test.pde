float setup_width = 0;
float setup_height = 0;
float x_position = 0;
float y_position = 0;
float x_position_before = 0;
float x_position_now = 0;
float x_velocity = 0;
float diameter = 0;
boolean collision_happened = false;

void setup(){
   size(800,600);
   setup_width = 800;
   setup_height = 600;
   diameter = 100;
   x_position = setup_width/2;
   y_position = setup_height - diameter/2;
   
}

void draw(){
  if(collision_happened){
    x_position += x_velocity;
  }
  background(255);
  fill(0);
  noStroke();
  x_position_before = x_position_now;
  x_position_now = mouseX;
  ellipse(x_position_now,mouseY,diameter,diameter);
  ellipse(x_position,y_position,diameter,diameter);
  if(is_collide(x_position_now, diameter/2, x_position, diameter/2)){
    collision_happened = true; 
    x_velocity = x_position_now - x_position_before;
  }
  if(is_hit_wall(x_position, diameter/2, setup_width)){
    x_velocity *= -1;
  }
}

boolean is_collide(float x1, float r1, float x2, float r2){
  return Math.abs(x1 - x2) <= r1 + r2;
}

boolean is_hit_wall(float x1, float r1, float wall_position){
  return wall_position <= x1 + r1;
}