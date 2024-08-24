import React, { useState } from "react";
import Weather from "./weather";
import { useDebounce } from "./hooks/useDebounce";
import { useCitySuggestions } from "./hooks/useCitySuggestions";
import { useWeatherData } from "./hooks/useWeatherData";
import { useDailyReset } from "./hooks/useDailyReset";

/**
 * Composant principal de l'application météo.
 * Gère la recherche de villes, les suggestions et l'affichage des données météo.
 * @returns {JSX.Element} Le composant principal de l'application.
 */
function App() {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const debouncedCity = useDebounce(city, 500);
  const apiKey = import.meta.env.VITE_API_KEY;

  useDailyReset();

  // Récupère les suggestions de villes à partir de l'API
  const { suggestions, loading: loadingSuggestions } = useCitySuggestions(
    debouncedCity,
    apiKey
  );
  
  // Récupère les données météo pour la ville sélectionnée
  const { weatherData, error, loading } = useWeatherData(selectedCity, apiKey);

  /**
   * Gère la sélection d'une ville dans les suggestions.
   * @param {Object} city - L'objet ville sélectionné.
   */
  const handleSelectCity = (city) => {
    setCity(city.name);
    setSelectedCity(city.name);
    setShowSuggestions(false); // Masquer les suggestions après sélection
  };

  /**
   * Gère la soumission du formulaire de recherche.
   * @param {Event} e - L'événement de soumission du formulaire.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) return;
    setSelectedCity(city);
    setShowSuggestions(false); // Masquer les suggestions après validation
  };

  /**
   * Gère les changements de l'input de recherche.
   * @param {Event} e - L'événement de changement de l'input.
   */
  const handleInputChange = (e) => {
    setCity(e.target.value);
    setShowSuggestions(true); // Afficher les suggestions lors de la saisie
  };

  // Filtre les suggestions pour qu'elles soient uniques
  const uniqueSuggestions = suggestions.reduce((acc, current) => {
    const x = acc.find(
      (item) => item.name === current.name && item.country === current.country
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return (
    <div className="bg-mobile sm:bg-desktop bg-cover bg-center h-screen w-screen">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-0">
        <div className="overlay-container bg-black bg-opacity-60 max-w-lg w-full p-4 sm:p-6 rounded-lg shadow-lg backdrop-blur-lg">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-blue-300 text-center mb-6 sm:mb-8">
            🌤️ Météo 🌤️
          </h1>
          <form onSubmit={handleSubmit} className="mb-6 sm:mb-8 w-full">
            <div className="relative flex">
              <input
                type="text"
                value={city}
                onChange={handleInputChange}
                placeholder="Entrez une ville..."
                className="p-3 sm:p-4 flex-grow rounded-l-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
              />
              {loadingSuggestions && (
                <p className="absolute top-full mt-2 text-sm text-gray-500">Chargement...</p>
              )}
              {!loadingSuggestions && showSuggestions && uniqueSuggestions.length > 0 && (
                <ul className="absolute top-full left-0 mt-1 w-full bg-white text-gray-900 rounded-lg shadow-lg z-10">
                  {uniqueSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectCity(suggestion)}
                      className="p-2 cursor-pointer hover:bg-blue-300"
                    >
                      {suggestion.name}, {suggestion.country}
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="submit"
                className="bg-dark-blue text-white font-bold uppercase p-3 sm:p-4 rounded-r-lg hover:bg-light-blue hover:text-dark-blue transition transform hover:scale-105"
              >
                Rechercher
              </button>
            </div>
          </form>

          {loading && <p>Chargement...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {weatherData && <Weather data={weatherData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
