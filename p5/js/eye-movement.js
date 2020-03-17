eyeSizeX = 150;
eyeSizeY = 100;
function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);

}

function draw() {
  eyeMoveX = map(Math.min(mouseX, width), 0, width, -eyeSizeX/4, eyeSizeX/4);
  eyeMoveY = map(Math.min(mouseY, height), 0, height, -eyeSizeY/4, eyeSizeY/4);
  background(255,255,0);
  strokeWeight(5);
  // Eyes outside
  fill(255);
  ellipse(width/2-100, height/2-100, eyeSizeX, eyeSizeY);
  ellipse(width/2+100, height/2-100, eyeSizeX, eyeSizeY);
  // Eyes inside
  fill(0);
  ellipse(width/2-100+eyeMoveX, height/2-100+eyeMoveY, 15, 15);
  ellipse(width/2+100+eyeMoveX, height/2-100+eyeMoveY, 15, 15);
}
