// src/hooks/useWeatherData.js
import { useState, useEffect } from "react";

export const useWeatherData = (city, apiKey) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
        );
        const data = await response.json();
        if (data.cod === "404") {
          setError("Ville non trouvée !");
        } else {
          setWeatherData(data);
          setError(null);
        }
      } catch (error) {
        setError("Erreur de récupération des données météo.");
      }
      setLoading(false);
    };

    fetchWeather();
  }, [city, apiKey]);

  return { weatherData, error, loading };
};
