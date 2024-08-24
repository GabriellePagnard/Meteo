import React from "react";
import "weather-icons/css/weather-icons.css";
import { useWeatherIcon } from "./hooks/useWeatherIcon";

/**
 * Composant d'affichage des données météo pour une ville donnée.
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.data - Les données météo à afficher.
 * @returns {JSX.Element} Le composant d'affichage de la météo.
 */
function Weather({ data }) {
  if (!data || !data.weather || data.weather.length === 0) {
    return <p>Impossible de récupérer les données météorologiques.</p>;
  }

  const iconClass = useWeatherIcon(data.weather[0].description);
  const roundedTemp = Math.round(data.main.temp);

  return (
    <div className="bg-black bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg p-8 text-center text-white max-w-lg animate-fade-in">
      <h2 className="text-4xl font-bold mb-4">{data.name}</h2>
      <i className={`wi ${iconClass} text-6xl mb-4`}></i>
      <p className="text-2xl capitalize mb-4">{data.weather[0].description}</p>
      <p className="text-6xl font-bold mb-6">{roundedTemp}°C</p>
      <div className="mt-4 flex justify-around text-lg">
        <p>💧 Humidité: {data.main.humidity}%</p>
        <p>💨 Vent: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default Weather;
