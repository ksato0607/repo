/**
 * TODO
 * - Learn how to cache
 */

import React, { Component } from 'react';
import WeatherCanvas from './weatherCanvas';
import apiConfig from './config';
const axios = require('axios');

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      weather: {}
    };
  }

  async componentDidMount() {
    this.search('Tokyo');

    await this.delay();
    this.search('Singapore');

    await this.delay();
    this.search('Chicago');
  }

  delay = () => {
    return new Promise(resolve => setTimeout(resolve, 5000));
  };

  async search(query) {
    const response = await axios.get(
      `${apiConfig.base}weather?q=${query}&units=metric&APPID=${apiConfig.key}`
    );
    this.setState({ weather: response.data, query: '' });

    // const weatherStatus = 'Rain';
    // this.setState({
    //   weather: {
    //     weather: [{ main: weatherStatus }],
    //     main: { temp: 15 },
    //     name: 'Hokkaido',
    //     sys: { country: 'JP' }
    //   },
    //   query: ''
    // });
  }

  render() {
    return this.state.weather.main ? (
      <div>
        <WeatherCanvas weather={this.state.weather} />
      </div>
    ) : (
      <div></div>
    );
  }
}

export default Weather;
