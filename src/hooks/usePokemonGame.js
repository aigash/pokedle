import { useState } from 'react';
import { getRandomPokemonId, fetchPokemonData, formatPokemonData, searchPokemonByName } from '../services/pokemonService';

export const usePokemonGame = (pokemons) => {
  const [guesses, setGuesses] = useState([]);
  const [suggestions, setSuggestions] = useState(pokemons?.pokemon || []);
  const [pokemonSearch, setPokemonSearch] = useState('');

  const handleGuess = async (pokemonName) => {
    if (!pokemonName || !pokemons) return null;
    
    const result = await searchPokemonByName(pokemonName, pokemons);
    if (result) {
      setGuesses(prev => [result, ...prev]);
      setPokemonSearch(result.nameFr);
      setSuggestions(prev => prev.filter(
        p => p.name_french.toLowerCase() !== result.nameFr.toLowerCase()
      ));
    }
    return result;
  };

  const resetGame = () => {
    setGuesses([]);
    setSuggestions(pokemons?.pokemon || []);
    setPokemonSearch('');
    window.location.reload();
  };

  return {
    guesses,
    suggestions,
    pokemonSearch,
    handleGuess,
    resetGame
  };
}; 