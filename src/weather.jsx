import React from "react";

function Weather({ data }) {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 text-center text-white max-w-md">
      <h2 className="text-3xl font-bold">{data.name}</h2>
      <p className="text-xl capitalize">{data.weather[0].description}</p>
      <p className="text-5xl font-bold">{data.main.temp}°C</p>
      <div className="mt-4 flex justify-around text-sm">
        <p>💧 Humidité: {data.main.humidity}%</p>
        <p>💨 Vent: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default Weather;
