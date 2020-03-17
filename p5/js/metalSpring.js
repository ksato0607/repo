var x;
var y;
var canvasSize;
function setup() {
  canvasSizeX = 900;
  canvasSizeY = 600;
  createCanvas(canvasSizeX, canvasSizeY);
  strokeWeight(4);
  x = canvasSizeX/2;
  y = canvasSizeY/2;
  background(0);
}

function draw() {
	ellipse(x,y,30,30);
	if(isKeyPressed){
		if(keyCode==UP_ARROW) {
			y -= 5;	
		} else if(keyCode==DOWN_ARROW) {
			y += 5;	
		} else if(keyCode==LEFT_ARROW) {
			x -= 5;	
		} else if(keyCode==RIGHT_ARROW) {
			x += 5;	
		}
		
	}
}