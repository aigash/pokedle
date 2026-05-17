import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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

  // Score tracking state
  const [scoreState, setScoreState] = useState({
    startTime: null,
    endTime: null,
    usedHints: [],
    pokedexUsed: false
  });

  const timerRef = useRef(null);

  // Check for win condition
  useEffect(() => {
    if (pokemon?.nameFr === pokemonSearch) {
      // Arrêter le chrono
      setScoreState(prev => ({
        ...prev,
        endTime: Date.now()
      }));

      setGameState(prev => ({
        ...prev,
        isGameWon: true,
        showEndModal: true
      }));
    }
  }, [pokemon?.nameFr, pokemonSearch]);

  const handleSubmit = useCallback(async (pokemonName) => {
    if (!pokemonName) return;

    // Démarrer le chrono au premier guess
    if (!scoreState.startTime) {
      setScoreState(prev => ({
        ...prev,
        startTime: Date.now()
      }));
    }

    return await handleGuess(pokemonName);
  }, [handleGuess, scoreState.startTime]);

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
    setScoreState({
      startTime: null,
      endTime: null,
      usedHints: [],
      pokedexUsed: false
    });
    resetGame();
    return true; // Signal that reset was successful
  }, [resetGame]);

  const togglePokedexModal = useCallback((isOpen) => {
    // Marquer le Pokédex comme utilisé si on l'ouvre
    if (isOpen && !scoreState.pokedexUsed) {
      setScoreState(prev => ({
        ...prev,
        pokedexUsed: true
      }));
    }

    setGameState(prev => ({
      ...prev,
      isModalOpen: isOpen
    }));
  }, [scoreState.pokedexUsed]);

  // Fonction pour marquer un indice comme utilisé
  const markHintUsed = useCallback((hintNumber) => {
    setScoreState(prev => {
      if (prev.usedHints.includes(hintNumber)) {
        return prev;
      }
      return {
        ...prev,
        usedHints: [...prev.usedHints, hintNumber].sort((a, b) => a - b)
      };
    });
  }, []);

  // Calculer le temps écoulé en secondes
  const getElapsedTime = useCallback(() => {
    if (!scoreState.startTime) return 0;
    const endTime = scoreState.endTime || Date.now();
    return Math.floor((endTime - scoreState.startTime) / 1000);
  }, [scoreState.startTime, scoreState.endTime]);

  return {
    pokemon,
    isLoading,
    error,
    guesses,
    suggestions,
    pokemonSearch,
    gameState,
    scoreState,
    handleSubmit,
    handleCloseEndModal,
    handleResetGame,
    togglePokedexModal,
    markHintUsed,
    getElapsedTime
  };
}