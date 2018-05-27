void setup() {
  size(800,800);
  colorMode(HSB, 360, 100, 100);
}

void draw() {
  fill(random(360), 70, 90);
  float size = random(200);
  if(size < 35) {
    fill(0, 0, random(100));
  }
  ellipse(random(800),random(800),size,size);
}