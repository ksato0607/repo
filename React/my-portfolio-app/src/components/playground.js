
import React, { Component } from "react";
import Sketch from "react-p5";

class Playground extends Component {
  eyeSizeX = 150;
  eyeSizeY = 100;
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef); // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };

  draw = p5 => {
    const eyeMoveX = p5.map(
      Math.min(p5.mouseX, p5.width),
      0,
      p5.width,
      -this.eyeSizeX / 4,
      this.eyeSizeX / 4
    );
    const eyeMoveY = p5.map(
      Math.min(p5.mouseY, p5.height),
      0,
      p5.height,
      -this.eyeSizeY / 4,
      this.eyeSizeY / 4
    );
    p5.background(255, 255, 0);
    p5.strokeWeight(5);
    // Eyes outside
    p5.fill(255);
    p5.ellipse(p5.width / 2 - 100, p5.height / 2 - 100, this.eyeSizeX, this.eyeSizeY);
    p5.ellipse(p5.width / 2 + 100, p5.height / 2 - 100, this.eyeSizeX, this.eyeSizeY);
    // Eyes inside
    p5.fill(0);
    p5.ellipse(p5.width / 2 - 100 + eyeMoveX, p5.height / 2 - 100 + eyeMoveY, 15, 15);
    p5.ellipse(p5.width / 2 + 100 + eyeMoveX, p5.height / 2 - 100 + eyeMoveY, 15, 15);
  };
  render() {
    return <Sketch setup={this.setup} draw={this.draw} />;
  }
}

export default Playground;