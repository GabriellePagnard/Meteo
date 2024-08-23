import React from "react";

function Weather({ data }) {
  if (!data || !data.weather || data.weather.length === 0) {
    return <p>Impossible de récupérer les données météorologiques.</p>;
  }

  return (
    <div className="bg-black bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg p-6 sm:p-8 text-center text-white max-w-lg w-full animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">{data.name}</h2>
      <p className="text-xl sm:text-2xl capitalize mb-4">{data.weather[0].description}</p>
      <p className="text-5xl sm:text-6xl font-bold mb-6">{data.main.temp}°C</p>
      <div className="mt-4 flex flex-col sm:flex-row justify-around text-lg">
        <p>💧 Humidité: {data.main.humidity}%</p>
        <p>💨 Vent: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default Weather;
