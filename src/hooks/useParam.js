import { useEffect, useState } from 'react';

export const useParam = (paramName, validator = null) => {
    const [value, setValue] = useState(null);
    const [isValid, setIsValid] = useState(null);
  
    useEffect(() => {
      // Récupérer les paramètres URL au chargement
      const params = new URLSearchParams(window.location.search);
      const paramValue = params.get(paramName);
      
      setValue(paramValue);
      
      // Vérifier la validité si un validateur est fourni
      if (validator && paramValue !== null) {
        setIsValid(validator(paramValue));
      }
    }, [paramName, validator]);
  
    return { value, isValid };
}