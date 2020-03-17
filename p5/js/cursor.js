let width;
let height;
let angle = 0;
let index = 0;
const INDEX_MAX = 2;
let backgroundColor = 255;
let lineColor = 0;

function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
}

function draw() {
  background(backgroundColor);
  strokeWeight(3);
  stroke(lineColor);
  translate(mouseX, mouseY);
  rotate(radians(angle));
  line(-50, 0, 50, 0);
  line(0, -50, 0, 50);
  angle++;
}

function mouseClicked() {
  index = (index+1)%INDEX_MAX;
  switch (index) {
    case 0:
      backgroundColor = 255;
      lineColor = 0;
      break;
    case 1:
      backgroundColor = 0;
      lineColor = 255;
      break;
    default:
  }
}
