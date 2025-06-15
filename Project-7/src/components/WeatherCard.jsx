import React, { useState, useEffect } from "react";
import "./WeatherCard.css";

const WeatherCard = () => {
  const [city, setCity] = useState("Patna");
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState("clear.png");

  const apiKey = "cc98fa8f016a5331d4e198712da231e1";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

  const fetchWeather = async (cityName) => {
    try {
      const res = await fetch(`${apiUrl}${cityName}&appid=${apiKey}`);
      const data = await res.json();

      if (data.cod === "404") {
        setWeatherData(null);
        alert("City not found!");
        return;
      }

      setWeatherData(data);

      const iconMap = {
        Clouds: "cloud.png",
        Clear: "clear.png",
        Rain: "rain.png",
        Drizzle: "drizzle.png",
        Mist: "mist.png",
      };

      setIcon(iconMap[data.weather[0].main] || "clear.png");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (city.trim()) fetchWeather(city);
  };

  return (
    <div className="weather-app">
      <div className="weather-card">
        <div className="weather-search">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleSearch}>
            <img src="search.png" alt="Search" />
          </button>
        </div>

        {weatherData && (
          <div className="weather-info">
            <img src={icon} className="weather-main-icon" alt="weather" />
            <h1>{Math.round(weatherData.main.temp)}°C</h1>
            <h2>{weatherData.name}</h2>

            <div className="weather-extra">
              <div className="weather-detail">
                <img src="humidity.png" alt="Humidity" />
                <div>
                  <p>{weatherData.main.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="weather-detail">
                <img src="wind.png" alt="Wind" />
                <div>
                  <p>{weatherData.wind.speed} km/h</p>
                  <span>Wind</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
