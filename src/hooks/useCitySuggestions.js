// src/hooks/useCitySuggestions.js
import { useState, useEffect } from "react";

export const useCitySuggestions = (city, apiKey) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city.length < 3) {
      setSuggestions([]); // Réinitialise les suggestions si moins de 3 lettres
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
