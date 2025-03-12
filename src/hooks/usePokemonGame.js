import { useState } from 'react';
import { searchPokemonByName } from '../services/pokemonService';

export const usePokemonGame = (pokemons) => {
  const [guesses, setGuesses] = useState([]);
  const [suggestions, setSuggestions] = useState(pokemons?.pokemon || []);
  const [pokemonSearch, setPokemonSearch] = useState('');

  const handleGuess = async (pokemonName) => {
    if (!pokemonName || !pokemons) return null;
    
    const result = await searchPokemonByName(pokemonName, pokemons);
    if (result) {
      if (!guesses.some(guess => guess.nameFr.toLowerCase() === result.nameFr.toLowerCase())) {
        setGuesses(prev => [result, ...prev]); // Ajoute le résultat uniquement s'il n'est pas déjà dans les guesses
      }
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