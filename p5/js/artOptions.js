var option = 0;
const OPTIONS = 3;
function setup() {
  width = 600;
  height = 600;
  createCanvas(width, height);
  noFill();
}

function draw() {
  background(255);
  var density = map(mouseX, 0, width, 20, 50);
  switch(option){
   case 0:
    for(var x=50; x <= width-50; x+=density){
      for(var y=50; y <= height-50; y+=density){
        line(x-5, y-5, x+5, y+5);
        line(x+5, y-5, x-5, y+5);
      }
    }
    break;
  case 1:
    for(var x=50; x <= width-50; x+=density){
      for(var y=50; y <= height-50; y+=density){
        for(var i=0; i<16; i+=4){
          line(x+i, y, x+i, y+12);
        }
        line(x, y, x+12, y+12);
      }
    }
    break;
  case 2:
    stroke(70);
    strokeWeight(5);
    for(var x=50; x <= width-50; x+=density){
      for(var y=50; y <= height-50; y+=density){
        smooth();
        ellipse(x, y, 40, 40);
      }
    }
    break;
  default:
  }
}

function mousePressed(){
  option = (option+1)%OPTIONS;

  // Set to default stroke
  stroke(0);
  strokeWeight(1);
}
