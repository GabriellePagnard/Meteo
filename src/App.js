import React, { useState } from "react";
import Weather from "./Weather";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "TON_API_KEY"; // Remplace par ta clé API OpenWeatherMap

  const fetchWeather = async () => {
    if (city === "") return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Erreur de récupération des données météo", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Application Météo 🌤️</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entrez une ville..."
          className="p-4 rounded-l-lg focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-700 text-white p-4 rounded-r-lg hover:bg-blue-800 transition"
        >
          Rechercher
        </button>
      </form>

      {weatherData && <Weather data={weatherData} />}
    </div>
  );
}

export default App;
