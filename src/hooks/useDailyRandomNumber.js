import { useState, useEffect } from 'react';

export const useDailyRandomNumber = (min, max, seed = '') => {
  // Fonction pour générer un nombre aléatoire basé sur la date
  const generateDailyNumber = (dateString) => {
    const dailySeed = dateString + seed;
    
    let hash = 0;
    for (let i = 0; i < dailySeed.length; i++) {
      hash = ((hash << 5) - hash) + dailySeed.charCodeAt(i);
      hash |= 0;
    }
    
    const normalizedHash = Math.abs(hash) / 2147483647;
    return Math.floor(normalizedHash * (max - min + 1)) + min;
  };

  // Initialiser l'état avec le nombre stocké ou un nouveau nombre
  const [randomNumber, setRandomNumber] = useState(() => {
    const today = new Date();
    console.log(today);
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    // Vérifier localStorage pour une valeur existante
    const storedData = localStorage.getItem('dailyRandomNumber');
    if (storedData) {
      const { date, number, usedSeed, usedMin, usedMax } = JSON.parse(storedData);
      
      // Si la date stockée est aujourd'hui et les paramètres sont les mêmes, utiliser le nombre stocké
      if (date === dateString && usedSeed === seed && usedMin === min && usedMax === max) {
        return number;
      }
    }
    
    // Sinon générer un nouveau nombre et le stocker
    const newNumber = generateDailyNumber(dateString);
    localStorage.setItem('dailyRandomNumber', JSON.stringify({
      date: dateString,
      number: newNumber,
      usedSeed: seed,
      usedMin: min,
      usedMax: max
    }));
    
    return newNumber;
  });

  // Effet pour vérifier périodiquement si la date a changé
  useEffect(() => {
    const checkForNewDay = () => {
      const now = new Date();
      const currentDateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      
      const storedData = localStorage.getItem('dailyRandomNumber');
      if (storedData) {
        const { date, usedSeed, usedMin, usedMax } = JSON.parse(storedData);
        
        // Si la date a changé ou les paramètres ont changé, générer un nouveau nombre
        if (date !== currentDateString || usedSeed !== seed || usedMin !== min || usedMax !== max) {
          const newNumber = generateDailyNumber(currentDateString);
          
          localStorage.setItem('dailyRandomNumber', JSON.stringify({
            date: currentDateString,
            number: newNumber,
            usedSeed: seed,
            usedMin: min,
            usedMax: max
          }));
          
          setRandomNumber(newNumber);
        }
      }
    };

    // Vérifier immédiatement au montage du composant
    checkForNewDay();
    
    // Puis vérifier périodiquement (toutes les minutes)
    const intervalId = setInterval(checkForNewDay, 60000);
    
    return () => clearInterval(intervalId);
  }, [min, max, seed]);

  return randomNumber;
};