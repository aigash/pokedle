import { useState, useEffect } from 'react';

export const useDailyRandomNumber = (min, max, seed = '') => {
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    // Fonction pour générer un nombre aléatoire basé sur une date et un seed optionnel
    const generateDailyNumber = () => {
      const today = new Date();
      const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      
      const dailySeed = dateString + seed;
      
      // Utiliser une fonction de hachage simple pour générer un nombre basé sur la date
      let hash = 0;
      for (let i = 0; i < dailySeed.length; i++) {
        hash = ((hash << 5) - hash) + dailySeed.charCodeAt(i);
        hash |= 0; // Convertir en entier 32 bits
      }
      
      // Convertir le hash en un nombre dans la plage spécifiée
      const normalizedHash = Math.abs(hash) / 2147483647; // Diviser par MAX_INT
      return Math.floor(normalizedHash * (max - min + 1)) + min;
    };

    // Générer le nombre au chargement du composant
    setRandomNumber(generateDailyNumber());
    
    // Vérifier s'il faut régénérer le nombre à minuit
    const checkForNewDay = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const timeUntilMidnight = tomorrow - now;
      
      // Programmer la mise à jour pour minuit
      const timerId = setTimeout(() => {
        setRandomNumber(generateDailyNumber());
        checkForNewDay(); // Réinitialiser pour le jour suivant
      }, timeUntilMidnight);
      
      return () => clearTimeout(timerId);
    };
    
    const cleanup = checkForNewDay();
    return cleanup;
  }, [min, max, seed]);

  return randomNumber;
}