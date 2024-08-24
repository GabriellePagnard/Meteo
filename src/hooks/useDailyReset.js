import { useEffect } from "react";

/**
 * Hook personnalisé pour réinitialiser les données de requêtes chaque jour.
 * Utilise le stockage local pour suivre les requêtes effectuées et les réinitialiser au début de chaque nouvelle journée.
 */
export const useDailyReset = () => {
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
};
