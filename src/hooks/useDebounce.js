import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour "débouncer" une valeur.
 * Retarde l'application de la valeur jusqu'à ce que l'utilisateur ait fini de taper.
 * @param {any} value - La valeur à débouncer.
 * @param {number} delay - Le délai en millisecondes avant que la valeur soit prise en compte.
 * @returns {any} La valeur débouncée après le délai spécifié.
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
