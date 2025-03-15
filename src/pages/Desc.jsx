import { useMemo, useState, useEffect, useRef } from 'react';
import pokemons from '../pokemon.json';
import Loading from '../components/common/Loading';
import EndAndReload from '../components/common/EndAndReload';
import EndAndReloadMini from '../components/common/EndAndReloadMini';
import Indice from '../components/common/Indices';
import PokemonSearchForm from '../components/common/PokemonSearchForm';
import Pokedex from '../components/common/Pokedex';
import GuessSticker from '../components/common/GuessSticker';
// import { useDailyRandomNumber } from '../hooks/useDailyRandomNumber';
import { usePokemonData } from '../hooks/usePokemonData';
import { usePokemonGame } from '../hooks/usePokemonGame';
import { getRandomPokemonId, sanitizeDescription } from '../services/pokemonService';

import pokedexIcon from '../assets/img/icones/pokedex.png';
import logoIcon from '../assets/pokedeule.png';

export default function Desc() {
    const randomId = useMemo(() => getRandomPokemonId(1, 386), []);
    //const randomId = useDailyRandomNumber(1, 386);
    const { pokemonData: pokemon, isLoading, error } = usePokemonData(randomId, pokemons);
    const { guesses, suggestions, pokemonSearch, handleGuess, resetGame } = usePokemonGame(pokemons);

    const [gameState, setGameState] = useState({
        isModalOpen: false,
        isGameWon: false,
        showEndModal: true
    });

    const searchInputRef = useRef(null);
    const sanitizedDesc = useMemo(() => {
        if (!pokemon?.desc || !pokemon?.nameFr) return "";
        return sanitizeDescription(pokemon.desc, pokemon.nameFr);
    }, [pokemon?.desc, pokemon?.nameFr]);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (pokemon?.nameFr === pokemonSearch) {
            setGameState(prev => ({
                ...prev,
                isGameWon: true,
                showEndModal: true
            }));
        }
    }, [pokemon?.nameFr, pokemonSearch]);

    const handleSubmit = async (pokemonName) => {
        if (!pokemonName) return;
        await handleGuess(pokemonName);
    };

    const handleCloseEndModal = () => {
        setGameState(prev => ({
            ...prev,
            showEndModal: false
        }));
    };
    const handleResetGame = () => {
        setGameState({
            isModalOpen: false,
            isGameWon: false,
            showEndModal: true
        });
        resetGame();
    };

    const togglePokedexModal = (isOpen) => {
        setGameState(prev => ({
            ...prev,
            isModalOpen: isOpen
        }));
    };

    if (isLoading) { return <Loading />; }

    if (error) { return <div>Une erreur est survenue: {error}</div>; }

    if (!pokemon) { return <Loading />; }

    const { isModalOpen, isGameWon, showEndModal } = gameState;

    return (
        <div className='relative containerDesc'>
            <div className='flex flex-col gap-4 relative' id='desc'>
                <a href='/pokedle'><img src={ logoIcon } className='absolute top-0 left-0 w-[180px]' /></a>
                <div className='flex justify-center flex-col items-center mt-12 2xl:mt-0'>
                    <div className='flex flex-col items-center'>
                        <div id='desc_pokedex' className='p-3 rounded-xl bg-white mb-3'>
                            <h2>À quel Pokémon est associée cette phrase du Pokédex ?</h2>
                            <samp>❝{sanitizedDesc || "Chargement en cours..."}❞</samp>
                        </div>
                        <div className='flex justify-between mb-6 entete gap-3 flex-wrap'>
                            <PokemonSearchForm 
                                onSubmit={handleSubmit}
                                suggestions={suggestions}
                                onSuggestionClick={handleSubmit}
                                inputRef={searchInputRef}
                                disabled={isGameWon}
                            />
                            <div className='flex gap-3 flex-wrap'>
                                <div id='openPokedex' className="blocAth rounded-xl p-3" onClick={() => togglePokedexModal(true)}>
                                    <div className='flex w-full justify-center'>
                                        <img src={ pokedexIcon } alt="Pokedex" />
                                    </div>
                                </div>

                                <div className="blocAth rounded-xl flex-col p-3">
                                    <h3 className='mb-[-10px]'>Essai(s)</h3>
                                    <p className='nbEssais font-medium text-5xl leading-normal'>{guesses.length}</p>
                                </div>

                                <Indice typeIndice='Gen' pokemon={pokemon} nbEssais={guesses.length} nbRequis={4} numIndice={1} />
                                <Indice typeIndice='Cri' pokemon={pokemon} nbEssais={guesses.length} nbRequis={7} numIndice={2} />
                                <Indice typeIndice='Desc.' pokemon={pokemon} nbEssais={guesses.length} nbRequis={10} numIndice={3} />
                            </div>
                        </div>
                    </div>
                    {guesses.length > 0 && (
                        <div id='guessesDesc' className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 justify-between">
                            {guesses.map((guess, index) => (
                                <GuessSticker key={`${guess.nameFr}-${index}`} guess={guess} pokemon={pokemon} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {isGameWon && !showEndModal && (
                <EndAndReloadMini 
                    pokemon={pokemon} 
                    nbEssais={guesses.length}
                    onReset={handleResetGame}
                />
            )}
            
            {isGameWon && showEndModal &&  (
                <EndAndReload 
                    pokemon={pokemon} 
                    onReset={handleResetGame} 
                    nbEssais={guesses.length}
                    onClose={handleCloseEndModal}
                />
            )}
            <Pokedex isModalOpen={isModalOpen} onClose={() => togglePokedexModal(false)} />
        </div>
    );
}