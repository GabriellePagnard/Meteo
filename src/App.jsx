import React, { useState, useEffect } from "react";
import Weather from "./weather";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  // Vérifie et réinitialise le compteur à minuit chaque jour
  useEffect(() => {
    const now = new Date();
    const lastRequestDate = localStorage.getItem("lastRequestDate");

    if (lastRequestDate) {
      const lastDate = new Date(lastRequestDate);
      if (
        lastDate.getDate() !== now.getDate() ||
        lastDate.getMonth() !== now.getMonth() ||
        lastDate.getFullYear() !== now.getFullYear()
      ) {
        // Réinitialise le compteur de requêtes si c'est un nouveau jour
        localStorage.setItem("requestCount", 0);
        localStorage.setItem("lastRequestDate", now);
      }
    } else {
      // Initialise le stockage si ce n'est pas encore fait
      localStorage.setItem("requestCount", 0);
      localStorage.setItem("lastRequestDate", now);
    }
  }, []);

  const fetchWeather = async () => {
    // Vérifie le nombre de requêtes effectuées aujourd'hui
    const requestCount = parseInt(localStorage.getItem("requestCount"), 10);

    if (requestCount >= 999) {
      alert("Vous avez atteint la limite quotidienne de 999 requêtes à l'API.");
      return;
    }

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

      // Incrémente le compteur de requêtes
      localStorage.setItem("requestCount", requestCount + 1);
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
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-0">
        <div className="overlay-container bg-black bg-opacity-60 max-w-lg w-full p-4 sm:p-6 rounded-lg shadow-lg backdrop-blur-lg">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-300 text-center mb-6 sm:mb-8">
            🌤️ Météo 🌤️
          </h1>
          <form onSubmit={handleSubmit} className="mb-6 sm:mb-8 w-full">
            <div className="flex flex-col sm:flex-row">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Entrez une ville..."
                className="p-3 sm:p-4 flex-grow rounded-t-lg sm:rounded-l-lg sm:rounded-t-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-dark-blue text-white font-bold uppercase p-3 sm:p-4 rounded-b-lg sm:rounded-r-lg sm:rounded-b-none hover:bg-light-blue hover:text-dark-blue transition transform hover:scale-105"
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
