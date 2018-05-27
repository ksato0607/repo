final static String OBJECT_PATH = "https://firebasestorage.googleapis.com/v0/b/random-3e503.appspot.com/o/apple-16.jpg?alt=media&token=be7fb3b6-0cc4-4922-9801-1829454f32cf";
final static String BRUSH_PATH = "https://firebasestorage.googleapis.com/v0/b/random-3e503.appspot.com/o/brush1600.png?alt=media&token=f11e7973-cb22-41b8-bf07-a750cc1efcbc";
final static String CAMERA_PATH = "https://firebasestorage.googleapis.com/v0/b/random-3e503.appspot.com/o/camera-icon-images--pictures--becuo-3.png?alt=media&token=f3986d70-435f-42d9-b808-47914f1bf9c7";

PImage img;
PImage copyImg;
PImage brushImg;
PImage cameraImg;
float time = 0;
float INTERVAL = 5;
int ICON_SIZE = 50;
boolean draw = false;
boolean camera = true;
boolean pressed = false;
float x_position = 0;
float y_position = 0;
int image_width = 0;
int image_height = 0;

void setup() {
  size(1200, 600);
  img = loadImage(OBJECT_PATH);
  copyImg = loadImage(OBJECT_PATH);
  brushImg = loadImage(BRUSH_PATH);
  cameraImg = loadImage(CAMERA_PATH);
  image_width = width/2;
  image_height = height/2;
  img.resize(image_width, image_height);
  copyImg.resize(image_width, image_height);
  brushImg.resize(ICON_SIZE, ICON_SIZE);
  cameraImg.resize(ICON_SIZE, ICON_SIZE);
}

void draw() {
  if(!draw){
    background(255);
    image(img,0,0);
    fill(255,255,255,60);
    if(camera){
      stroke(100);
      image(cameraImg, mouseX-ICON_SIZE/2, mouseY-ICON_SIZE/2);
    } else {
      stroke(255,0,0,60);
      image(brushImg, mouseX-ICON_SIZE/2, mouseY-ICON_SIZE/2);
    }
    strokeWeight(2);
    ellipse(mouseX,mouseY,100,100); 
  }
  stroke(100);
  line(width/2,0,width/2,height);
  
  if(time%INTERVAL==0 && mouseX > width/2 && draw && pressed){
    image(copyImg, mouseX-x_position, mouseY-y_position);
  }
  time++;
}

void mousePressed(){
  if(camera){
    smooth();
    noStroke();
    fill(-1);
    background(0);
  
    ellipse(mouseX, mouseY, 100, 100);  
    copyImg.mask( get(0,0,width/2,height/2) ); // alternative to g.
    x_position = mouseX;
    y_position = mouseY;
    camera = false;
  } else{
    draw = true;
    pressed = true;
  }
}

void mouseReleased(){
  //draw = false;
  pressed = false;
}