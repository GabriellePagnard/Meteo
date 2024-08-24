/**
 * Hook personnalisé pour obtenir l'icône correspondant à une description météo.
 * @param {string} description - La description de la météo (ex. : "ciel dégagé").
 * @returns {string} La classe CSS de l'icône à afficher.
 */
export const useWeatherIcon = (description) => {
  switch (description.toLowerCase()) {
    // Cas pour différentes descriptions météo avec des icônes associées
    case "ciel dégagé":
      return "wi-day-sunny";
    case "peu nuageux":
      return "wi-day-cloudy";
    case "nuageux":
    case "partiellement nuageux":
      return "wi-cloud";
    case "couvert":
      return "wi-cloudy";
    case "pluie légère":
      return "wi-rain-mix";
    case "pluie modérée":
      return "wi-rain";
    // Ajoutez d'autres cas selon les descriptions météo possibles...
    default:
      return "wi-na"; // Icône par défaut si aucune correspondance
  }
};
