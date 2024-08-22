import React from "react";

function Weather({ data }) {
  return (
    <div className="weather-card text-center">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <p className="text-lg">{data.weather[0].description}</p>
      <p className="text-4xl font-bold">{data.main.temp}°C</p>
      <p className="text-sm">Humidité: {data.main.humidity}%</p>
      <p className="text-sm">Vent: {data.wind.speed} m/s</p>
    </div>
  );
}

export default Weather;
