import { useState, useMemo, useCallback } from 'react';
import { useBaseGame } from './useBaseGame';

export function usePixelsGame(pokemons) {
    const baseGame = useBaseGame(pokemons);
  
    const [pixelSize, setPixelSize] = useState(110);
    
    const spriteOff = useMemo(() => {
        if (!baseGame.pokemon?.sprite_off || !baseGame.pokemon?.nameFr) return "";
        return baseGame.pokemon.sprite_off;
    }, [baseGame.pokemon?.sprite_off, baseGame.pokemon?.nameFr]);
    
    // Override handleSubmit to include pixel size reduction
    const handleSubmit = useCallback(async (pokemonName) => {
        if (!pokemonName) return;

        const isDuplicate = baseGame.guesses.some(guess => 
        guess.nameFr.toLowerCase() === pokemonName.toLowerCase()
        );
        if (isDuplicate) return;
        
        // On stocke le résultat dans une fonction afin d'éviter que setPixelSize ne s'active sur un guess qui n'existe pas
        const result = await baseGame.handleSubmit(pokemonName);
        
        if (result !== null) {
        setPixelSize(prevSize => Math.max(prevSize - 9, 0));
        }
    }, [baseGame]);
    
    // Override handleResetGame to reset pixel size
    const handleResetGame = useCallback(() => {
        const resetSuccessful = baseGame.handleResetGame();
        if (resetSuccessful) {
        setPixelSize(110); // Reset pixel size
        }
    }, [baseGame]);
    
    return {
        ...baseGame,
        pixelSize,
        spriteOff,
        handleSubmit,
        handleResetGame
    };
}