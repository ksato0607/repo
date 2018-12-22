ArrayList<Circle> circles = new ArrayList();
int radius;
boolean mousePressed = false;
int DEFAULT_RADIUS = 25;

void mousePressed() {
  mousePressed = true;
}

void mouseReleased() {
  mousePressed = false;
  circles.add(new Circle(mouseX, mouseY, radius));
  radius = DEFAULT_RADIUS; // Reset the diamter to default one.
}

void setup() {
  size(800, 600);
}

void draw() {
  background(255);
  if (mousePressed) {
    radius++;
    fill(200);
    noStroke();
    ellipse(mouseX, mouseY, radius*2, radius*2);
  }

  for (int i=0; i < circles.size(); i++) {
    circles.get(i).update();
    circles.get(i).display();
    circles.get(i).checkBoundaryCollision();
  }

  for (int i=0; i < circles.size(); i++) {
    for (int j=i+1; j < circles.size(); j++) {
      circles.get(i).checkCollision(circles.get(j));
    }
  }
}


class Circle {
  PVector position;
  PVector velocity;
  PVector gravity;
  float radius, m;
  int[] colors;
  float GRAVITY = 0.3; // It needs to be big enough for circles to drop
  float FRICTION = 0.75; 
  float OFFSET = 0.5; 

  Circle(float x, float y, float r_) {
    position = new PVector(x, y);
    velocity = new PVector(0, 0);
    velocity = PVector.random2D().mult(15);
    gravity = new PVector(0, 0);
    radius = r_;
    m = radius*.1;
    colors = new int []{(int)random(255), (int)random(255), (int)random(255)};
  }

  void update() {
    position.add(velocity);
    velocity.add(gravity);
  }

  void checkBoundaryCollision() {
    if (position.x > width-radius) {
      position.x = width-radius;
      velocity.x *= -FRICTION;
    } else if (position.x < radius) {
      position.x = radius;
      velocity.x *= -FRICTION;
    } else if (position.y > height-radius) {
      position.y = height-radius;
      //velocity.y *= -FRICTION;
      velocity.y = - velocity.y * (FRICTION* (1- exp(- OFFSET * abs(velocity.y))));
      velocity.x = velocity.x * (FRICTION* (1- exp(- OFFSET * abs(velocity.x)))); // slow down velocity.x as well
    } else if (position.y < radius) {
      position.y = radius;
      velocity.y = - velocity.y * (FRICTION* (1- exp(- OFFSET * abs(velocity.y))));
      velocity.x *= -FRICTION;
    }
  }

  void checkCollision(Circle other) {

    // Get distances between the circles components
    PVector distanceVect = PVector.sub(other.position, position);

    // Calculate magnitude of the vector separating the circles
    float distanceVectMag = distanceVect.mag();

    // Minimum distance before they are touching
    float minDistance = radius + other.radius;

    if (distanceVectMag < minDistance) {
      float distanceCorrection = (minDistance-distanceVectMag)/2.0;
      PVector d = distanceVect.copy();
      PVector correctionVector = d.normalize().mult(distanceCorrection);
      other.position.add(correctionVector);
      position.sub(correctionVector);

      // get angle of distanceVect
      float theta  = distanceVect.heading();
      // precalculate trig values
      float sine = sin(theta);
      float cosine = cos(theta);

      /* cTemp will hold rotated circle positions. You 
       just need to worry about cTemp[1] position*/
      PVector[] cTemp = {
        new PVector(), new PVector()
      };

      /* this circle's position is relative to the other
       so you can use the vector between them (cVect) as the 
       reference point in the rotation expressions.
       cTemp[0].position.x and cTemp[0].position.y will initialize
       automatically to 0.0, which is what you want
       since b[1] will rotate around b[0] */
      cTemp[1].x  = cosine * distanceVect.x + sine * distanceVect.y;
      cTemp[1].y  = cosine * distanceVect.y - sine * distanceVect.x;

      // rotate Temporary velocities
      PVector[] vTemp = {
        new PVector(), new PVector()
      };

      vTemp[0].x  = cosine * velocity.x + sine * velocity.y;
      vTemp[0].y  = cosine * velocity.y - sine * velocity.x;
      vTemp[1].x  = cosine * other.velocity.x + sine * other.velocity.y;
      vTemp[1].y  = cosine * other.velocity.y - sine * other.velocity.x;

      /* Now that velocities are rotated, you can use 1D
       conservation of momentum equations to calculate 
       the final velocity along the x-axis. */
      PVector[] vFinal = {  
        new PVector(), new PVector()
      };

      // final rotated velocity for b[0]
      vFinal[0].x = ((m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (m + other.m);
      vFinal[0].y = vTemp[0].y;

      // final rotated velocity for b[0]
      vFinal[1].x = ((other.m - m) * vTemp[1].x + 2 * m * vTemp[0].x) / (m + other.m);
      vFinal[1].y = vTemp[1].y;

      // hack to avoid clumping
      cTemp[0].x += vFinal[0].x;
      cTemp[1].x += vFinal[1].x;

      /* Rotate circle positions and velocities back
       Reverse signs in trig expressions to rotate 
       in the opposite direction */
      // rotate circles
      PVector[] cFinal = { 
        new PVector(), new PVector()
      };

      cFinal[0].x = cosine * cTemp[0].x - sine * cTemp[0].y;
      cFinal[0].y = cosine * cTemp[0].y + sine * cTemp[0].x;
      cFinal[1].x = cosine * cTemp[1].x - sine * cTemp[1].y;
      cFinal[1].y = cosine * cTemp[1].y + sine * cTemp[1].x;

      // update circles to screen position
      other.position.x = position.x + cFinal[1].x;
      other.position.y = position.y + cFinal[1].y;

      position.add(cFinal[0]);

      // update velocities
      velocity.x = cosine * vFinal[0].x - sine * vFinal[0].y;
      velocity.y = cosine * vFinal[0].y + sine * vFinal[0].x;
      other.velocity.x = cosine * vFinal[1].x - sine * vFinal[1].y;
      other.velocity.y = cosine * vFinal[1].y + sine * vFinal[1].x;
    }
  }

  void display() {
    noStroke();
    fill(colors[0], colors[1], colors[2]);
    ellipse(position.x, position.y, radius*2, radius*2);
  }
}

// TODO:
// - The motion is a bit weird.
// - Vertically circles should stop.