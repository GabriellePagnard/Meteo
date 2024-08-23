import React, { useState } from "react";
import Weather from "./weather";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchWeather = async () => {
    if (city === "") return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
      );
      const data = await response.json();
      if (data.cod === "404") {
        alert("Ville non trouvée !");
        return;
      }
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
    <div className="bg-mobile sm:bg-desktop bg-cover bg-center h-screen w-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="overlay-container bg-black bg-opacity-60 max-w-lg w-full p-6 rounded-lg shadow-lg backdrop-blur-lg">
          {/* Supprimer l'animation du h1 */}
          <h1 className="text-5xl font-extrabold text-white text-center mb-8">
            🌤️ Météo 🌤️
          </h1>
          <form onSubmit={handleSubmit} className="mb-8 w-full">
            <div className="flex">
              {/* Appliquer un contour bleu clair lors du focus */}
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Entrez une ville..."
                className="flex-grow p-4 rounded-l-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-dark-blue text-white font-bold uppercase p-4 rounded-r-lg hover:bg-light-blue hover:text-dark-blue transition transform hover:scale-105"
              >
                Rechercher
              </button>
            </div>
          </form>

          {weatherData && <Weather data={weatherData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
