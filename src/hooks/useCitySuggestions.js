import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour obtenir des suggestions de villes à partir de l'API OpenWeatherMap.
 * @param {string} city - Le nom de la ville à rechercher.
 * @param {string} apiKey - La clé API OpenWeatherMap.
 * @returns {{suggestions: Array, loading: boolean}} Un objet contenant les suggestions de villes et un indicateur de chargement.
 */
export const useCitySuggestions = (city) => {
  const apiKey = import.meta.env.VITE_API_KEY; // Utilisation de la clé depuis .env
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city.length < 3) {
      setSuggestions([]); // Réinitialise les suggestions si moins de 3 lettres sont tapées
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Erreur de récupération des suggestions de villes:", error);
        setSuggestions([]);
      }
      setLoading(false);
    };

    fetchSuggestions();
  }, [city, apiKey]);

  return { suggestions, loading };
};
