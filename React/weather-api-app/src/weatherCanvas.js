/**
 * TODO
 * - Add more background
 */
import React, { Component } from 'react';
import Sketch from 'react-p5';
const moment = require('moment');
const weatherStatusOptions = {
  sunny: 'Sunny',
  cloudy: 'Cloudy',
  rainy: 'Rainy'
};

class WeatherCanvas extends Component {
  constructor(props) {
    super(props);
    // this.temperature = Math.round(props.weather.main.temp);
    // this.location = `${props.weather.name}, ${props.weather.sys.country}`;
    // this.weatherStatus = this.setWeatherStatus(props.weather.weather[0].main);
    // console.log(this.location);
  }

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  draw = p5 => {
    this.drawWeather(p5);
    this.drawWeatherInfo(p5);
  };

  drawWeather = p5 => {
    if (this.weatherStatus === weatherStatusOptions.sunny) {
      this.drawSunny(p5);
    } else if (this.weatherStatus === weatherStatusOptions.cloudy) {
      this.drawCloudy(p5);
    } else if (this.weatherStatus === weatherStatusOptions.rainy) {
      this.drawRainy(p5);
    } else {
      // Unknown weather status
      this.drawSunny(p5);
    }
  };

  drawSunny = p5 => {
    p5.background('#ffecb3');
    p5.noStroke();

    this.drawCircle(p5, '#ff9933', 500);
    this.drawCircle(p5, '#ff794d', 400);
    this.drawCircle(p5, '#ff4000', 300);
  };

  drawCloudy = p5 => {
    p5.background('#fff');
    p5.noStroke();

    p5.fill('#4040bf');
    p5.rect(0, 200, 650, 150, 0, 150, 150, 0);
    p5.fill('#b3b3cc');
    p5.rect(0, 200, 300, 150, 0, 150, 150, 0);

    p5.fill('#e0e0eb');
    p5.rect(0, 350, p5.windowWidth, 150);
    p5.fill('#5c5cd6');
    p5.rect(p5.windowWidth - 600, 350, 600, 150, 150, 0, 0, 150);
    p5.fill('#e0e0eb');
    p5.rect(p5.windowWidth - 250, 350, 250, 150, 150, 0, 0, 150);

    p5.fill('#b3b3cc');
    p5.rect(0, 500, p5.windowWidth, 150);
    p5.fill('#4040bf');
    p5.rect(0, 500, 650, 150, 0, 150, 150, 0);
    p5.fill('#b3b3cc');
    p5.rect(0, 500, 300, 150, 0, 150, 150, 0);

    p5.fill('#5c5cd6');
    p5.rect(p5.windowWidth - 600, 650, 600, 150, 150, 0, 0, 150);
    p5.fill('#e0e0eb');
    p5.rect(p5.windowWidth - 250, 650, 250, 150, 150, 0, 0, 150);
  };

  drawRainy = p5 => {
    p5.background('#7A8780');
    p5.noStroke();

    p5.fill('#1D2897');
    p5.rect(100, 700, 30, 120);
    p5.rect(105, 550, 20, 120);
    p5.rect(107, 400, 15, 120);
    p5.rect(110, 250, 10, 120);
    p5.rect(112, 100, 5, 120);

    p5.fill('#1D2897');
    p5.rect(200, 700, 30, 120);
    p5.rect(205, 550, 20, 120);
    p5.rect(207, 400, 15, 120);
    p5.rect(210, 250, 10, 120);
    p5.rect(212, 100, 5, 120);

    p5.fill('#1D2897');
    p5.rect(300, 700, 30, 120);
    p5.rect(305, 550, 20, 120);
    p5.rect(307, 400, 15, 120);
    p5.rect(310, 250, 10, 120);
    p5.rect(312, 100, 5, 120);

    p5.fill('#1D2897');
    p5.rect(400, 700, 30, 120);
    p5.rect(405, 550, 20, 120);
    p5.rect(407, 400, 15, 120);
    p5.rect(410, 250, 10, 120);
    p5.rect(412, 100, 5, 120);

    p5.fill('#1D2897');
    p5.rect(500, 700, 30, 120);
    p5.rect(505, 550, 20, 120);
    p5.rect(507, 400, 15, 120);
    p5.rect(510, 250, 10, 120);
    p5.rect(512, 100, 5, 120);

    p5.fill('#1D2897');
    p5.rect(600, 700, 30, 120);
    p5.rect(605, 550, 20, 120);
    p5.rect(607, 400, 15, 120);
    p5.rect(610, 250, 10, 120);
    p5.rect(612, 100, 5, 120);
  };

  drawCircle = (p5, color, diameter) => {
    p5.fill(color);
    p5.ellipse(p5.width / 2, p5.height / 2, diameter, diameter);
  };

  drawWeatherInfo = p5 => {
    p5.fill(0, 0, 0);
    p5.textStyle(p5.BOLD);
    p5.textSize(64);
    p5.textLeading(60);
    p5.text(`Today is\n${this.weatherStatus}`, 50, p5.windowHeight - 80);

    p5.fill(0, 0, 0);
    p5.textStyle(p5.BOLD);
    p5.textSize(36);
    p5.text(
      `${this.temperature}°C`,
      p5.windowWidth - 100,
      p5.windowHeight - 10
    );

    p5.fill(0, 0, 0);
    p5.textStyle(p5.BOLD);
    p5.textSize(36);
    p5.text(moment().format('MMM Do YYYY'), 50, 50);

    p5.fill(0, 0, 0);
    p5.textStyle(p5.BOLD);
    p5.textSize(36);
    p5.text(this.location, p5.windowWidth - 250, 50);
  };

  setWeatherStatus = weatherStatus => {
    switch (weatherStatus) {
      case 'Clear':
        return weatherStatusOptions.sunny;
      case 'Clouds':
        return weatherStatusOptions.cloudy;
      case 'Rain':
      case 'Thunderstorm':
        return weatherStatusOptions.rainy;
      default:
        console.log(`Unknown weather status: ${weatherStatus}`);
        return weatherStatus;
    }
  };

  render() {
    this.temperature = Math.round(this.props.weather.main.temp);
    this.location = `${this.props.weather.name}, ${this.props.weather.sys.country}`;
    this.weatherStatus = this.setWeatherStatus(
      this.props.weather.weather[0].main
    );
    return <Sketch setup={this.setup} draw={this.draw} />;
  }
}

export default WeatherCanvas;
