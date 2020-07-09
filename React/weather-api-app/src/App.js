/**
 * Follow this tutorial https://www.youtube.com/watch?v=GuA0_Z1llYU
 */
import React, { useState } from "react";
import apiConfig from "./config";
const axios = require("axios");
const moment = require("moment");

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      axios
        .get(
          `${apiConfig.base}weather?q=${query}&units=metric&APPID=${apiConfig.key}`
        )
        .then(result => {
          setWeather(result.data);
          setQuery("");
        });
    }
  };

  const isWarm = () => {
    return weather.main && Math.round(weather.main.temp) > 15;
  };
  return (
    <div className={isWarm() ? "app warm" : "app"}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {weather.main ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{moment().format("MMM Do YYYY")}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div></div>
      </main>
    </div>
  );
}

export default App;
