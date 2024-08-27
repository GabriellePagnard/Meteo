import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour récupérer les données météo d'une ville spécifique.
 * @param {string} city - Le nom de la ville.
 * @param {string} apiKey - La clé API OpenWeatherMap.
 * @returns {{weatherData: Object, error: string, loading: boolean}} Un objet contenant les données météo, l'erreur et l'indicateur de chargement.
 */
export const useWeatherData = (city) => {
  const apiKey = import.meta.env.VITE_API_KEY; // Utilisation de la clé depuis .env
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
