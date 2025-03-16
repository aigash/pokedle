import { useState, useEffect, useMemo, useCallback } from 'react';
import { usePokemonData } from '../usePokemonData';
import { usePokemonGame } from '../usePokemonGame';
import { getRandomPokemonId } from '../../services/pokemonService';

export function useBaseGame(pokemons) {
  // Common state and logic for all game modes
  const randomId = useMemo(() => getRandomPokemonId(1, 386), []);
  const { pokemonData: pokemon, isLoading, error } = usePokemonData(randomId, pokemons);
  const { guesses, suggestions, pokemonSearch, handleGuess, resetGame } = usePokemonGame(pokemons);
  
  const [gameState, setGameState] = useState({
    isModalOpen: false,
    isGameWon: false,
    showEndModal: true
  });

  // Check for win condition
  useEffect(() => {
    if (pokemon?.nameFr === pokemonSearch) {
      setGameState(prev => ({
        ...prev,
        isGameWon: true,
        showEndModal: true
      }));
    }
  }, [pokemon?.nameFr, pokemonSearch]);

  const handleSubmit = useCallback(async (pokemonName) => {
    if (!pokemonName) return;
    return await handleGuess(pokemonName);
  }, [handleGuess]);

  const handleCloseEndModal = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showEndModal: false
    }));
  }, []);

  const handleResetGame = useCallback(() => {
    setGameState({
      isModalOpen: false,
      isGameWon: false,
      showEndModal: true
    });
    resetGame();
    return true; // Signal that reset was successful
  }, [resetGame]);

  const togglePokedexModal = useCallback((isOpen) => {
    setGameState(prev => ({
      ...prev,
      isModalOpen: isOpen
    }));
  }, []);

  return {
    pokemon,
    isLoading,
    error,
    guesses,
    suggestions,
    pokemonSearch,
    gameState,
    handleSubmit,
    handleCloseEndModal,
    handleResetGame,
    togglePokedexModal
  };
}