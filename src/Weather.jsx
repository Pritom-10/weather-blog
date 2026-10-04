// Weather.jsx
import React, { useState } from "react";
import './assets/css/Weather.css';
import search_icon from './assets/image/search.png';
import clear_icon from './assets/image/clear.png';
import drizzle_icon from './assets/image/drizzle.png';
import cloud_icon from './assets/image/cloud.png';
import rain_icon from './assets/image/rain.png';
import snow_icon from './assets/image/snow.png';
import wind_icon from './assets/image/wind.png';
import humidity_icon from './assets/image/humidity.png';

const Weather = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "106729036daa9764eab792bea94c3def";

  const weatherIcons = {
    cloud: cloud_icon,
    rain: rain_icon,
    snow: snow_icon,
    drizzle: drizzle_icon,
    clear: clear_icon,
  };

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`
      );
      const result = await res.json();

      if (result.error) {
        setError(result.error.info);
        setData(null);
      } else {
        setData(result);
        setError("");
      }
    } catch {
      setError("Unable to fetch weather data");
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  const getLocalTime = () => {
    if (!data) return "";
    const date = new Date();
    const offsetMinutes = data.location.utc_offset * 60; 
    const localTime = new Date(date.getTime() + offsetMinutes * 60 * 1000);
    return localTime.toLocaleString(); 
  };

  const getWeatherIcon = () => {
    if (!data) return clear_icon;
    const desc = data.current.weather_descriptions[0].toLowerCase();
    return Object.keys(weatherIcons).find((key) => desc.includes(key)) 
           ? weatherIcons[Object.keys(weatherIcons).find((key) => desc.includes(key))] 
           : clear_icon;
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <img src={search_icon} alt="search" onClick={handleSearch} />
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {data && !loading && (
        <>
          <div className="weather-show">
            <img
              src={getWeatherIcon()}
              alt="weather"
              className="weather-icon"
            />
            <p className="temperature">{data.current.temperature}°C</p>
            <p className="location">{data.location.name}, {data.location.country}</p>
            <p className="datetime">{getLocalTime()}</p>
          </div>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{data.current.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{data.current.wind_speed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
