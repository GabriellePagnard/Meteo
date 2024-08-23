// src/hooks/useWeatherIcon.js
export const useWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
        // Ciel dégagé
        case "ciel dégagé":
          return "wi-day-sunny";
        
        // Nuages
        case "peu nuageux":
          return "wi-day-cloudy";
        case "partiellement nuageux":
        case "nuageux":
          return "wi-cloud";
        case "couvert":
          return "wi-cloudy";
        
        // Pluie
        case "pluie légère":
          return "wi-rain-mix";
        case "pluie modérée":
          return "wi-rain";
        case "forte pluie":
        case "pluie très forte":
        case "pluie extrême":
          return "wi-rain-wind";
        case "pluie verglaçante":
          return "wi-rain-mix";
        case "faible pluie intermittente":
          return "wi-showers";
        case "averse de pluie":
          return "wi-rain";
        case "forte averse de pluie":
        case "averse irrégulière":
          return "wi-showers";
        
        // Bruine
        case "légère bruine":
        case "bruine":
        case "bruine intense":
          return "wi-sprinkle";
        case "bruine légère avec pluie":
        case "bruine avec pluie":
        case "bruine forte avec pluie":
          return "wi-showers";
        case "averse de bruine":
          return "wi-sprinkle";
        
        // Orage
        case "orage avec pluie légère":
        case "orage avec pluie":
        case "orage avec forte pluie":
        case "légers orages":
        case "orage":
        case "fort orage":
        case "orage irrégulier":
          return "wi-thunderstorm";
        case "orage avec bruine légère":
        case "orage avec bruine":
        case "orage avec forte bruine":
          return "wi-storm-showers";
        
        // Neige
        case "légère neige":
        case "neige":
        case "forte neige":
          return "wi-snow";
        case "neige fondue":
        case "légère averse de neige fondue":
        case "averse de neige fondue":
          return "wi-sleet";
        case "légère pluie et neige":
        case "pluie et neige":
          return "wi-rain-mix";
        case "légère averse de neige":
        case "averse de neige":
        case "forte averse de neige":
          return "wi-snow";
        
        // Atmosphère
        case "brume":
          return "wi-fog";
        case "fumée":
          return "wi-smoke";
        case "brume sèche":
          return "wi-day-haze";
        case "tourbillons de sable/poussière":
        case "sable":
          return "wi-sandstorm";
        case "poussière":
          return "wi-dust";
        case "brouillard":
          return "wi-fog";
        case "cendres volcaniques":
          return "wi-volcano";
        case "rafales":
          return "wi-strong-wind";
        case "tornade":
          return "wi-tornado";
        
        // Conditions supplémentaires
        case "tempête tropicale":
          return "wi-hurricane";
        case "ouragan":
          return "wi-hurricane";
        case "froid":
          return "wi-snowflake-cold";
        case "chaud":
          return "wi-hot";
        case "vent":
          return "wi-windy";
        case "grêle":
          return "wi-hail";
        
        default:
          return "wi-na"; // Icône par défaut si aucune correspondance
      }
    }
    