import React, { useState } from "react";
import Weather from "./weather";


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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <h1 className="text-5xl font-bold text-white mb-8">🌤️ Météo Moderne</h1>
      <form onSubmit={handleSubmit} className="mb-8 w-full max-w-md">
        <div className="flex">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Entrez une ville..."
            className="flex-grow p-4 rounded-l-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white p-4 rounded-r-lg hover:bg-purple-700 transition"
          >
            Rechercher
          </button>
        </div>
      </form>

      {weatherData && <Weather data={weatherData} />}
    </div>
  );
}

export default App;
