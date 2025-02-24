import { useState, useEffect } from 'react';
import { fetchPokemonData, formatPokemonData } from '../services/pokemonService';

export const usePokemonData = (pokemonId, pokemons) => {
    const [pokemonData, setPokemonData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPokemonData = async () => {
            if (!pokemonId) return;

            try {
                setIsLoading(true);
                setError(null);
                const rawData = await fetchPokemonData(pokemonId);
                const formattedData = formatPokemonData(rawData, pokemons);
                setPokemonData(formattedData);
            } catch (err) {
                setError(err.message);
                setPokemonData(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadPokemonData();
    }, [pokemonId, pokemons]);

    return { pokemonData, isLoading, error };
};
