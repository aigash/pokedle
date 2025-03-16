import { useMemo } from 'react';
import { useBaseGame } from './useBaseGame';
import { sanitizeDescription } from '../../services/pokemonService';

export function useDescGame(pokemons) {
    const baseGame = useBaseGame(pokemons);
  
    const sanitizedDesc = useMemo(() => {
        if (!baseGame.pokemon?.desc || !baseGame.pokemon?.nameFr) return "";
        return sanitizeDescription(baseGame.pokemon.desc, baseGame.pokemon.nameFr);
    }, [baseGame.pokemon?.desc, baseGame.pokemon?.nameFr]);
    
    return {
        ...baseGame,
        sanitizedDesc
    };
}