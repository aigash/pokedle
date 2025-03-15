import {useState, useMemo, useEffect, useRef } from 'react';
import pokemons from '../pokemon.json';
import Loading from '../components/common/Loading';
import EndAndReload from '../components/common/EndAndReload';
import EndAndReloadMini from '../components/common/EndAndReloadMini';
import PokemonSearchForm from '../components/common/PokemonSearchForm';
import Pokedex from '../components/common/Pokedex';
import Indice from '../components/common/Indices';
import PokemonTable from '../components/classic/PokemonTable';
//import { useDailyRandomNumber } from '../hooks/useDailyRandomNumber';
//import { useParam } from '../hooks/useParam';
import { usePokemonData } from '../hooks/usePokemonData';
import { usePokemonGame } from '../hooks/usePokemonGame';
import { getRandomPokemonId } from '../services/pokemonService';

import pokedexIcon from '../assets/img/icones/pokedex.png';
import logoIcon from '../assets/pokedeule.png';

function Classic() {
    const randomId = useMemo(() => getRandomPokemonId(1, 386), []);
    //const randomId = useDailyRandomNumber(1, 386);
    //console.log(useParam('mode'));

    const { pokemonData: mysteryPokemon, isLoading, error } = usePokemonData(randomId, pokemons);
    const { guesses, suggestions, pokemonSearch, handleGuess, resetGame } = usePokemonGame(pokemons);
    
    const [gameState, setGameState] = useState({
        isModalOpen: false,
        isGameWon: false,
        showEndModal: true
    });

    const searchInputRef = useRef(null);
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (mysteryPokemon?.nameFr === pokemonSearch) {
            setGameState(prev => ({
                ...prev,
                isGameWon: true,
                showEndModal: true
            }));
        }
    }, [mysteryPokemon?.nameFr, pokemonSearch]);


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

    if (!mysteryPokemon) { return <Loading />; }

    const { isModalOpen, isGameWon, showEndModal } = gameState;

    return (
        <div className='relative containerClassic'>
            <div className='flex flex-col gap-4 relative' id='classic'>
                <a href='/pokedle'><img src={logoIcon} className='absolute top-0 left-0 w-[180px]' /></a>
                <div className='flex justify-center flex-col items-center mt-12 2xl:mt-0'>
                    <div className='flex justify-between mb-6 entete gap-3 flex-wrap'>
                        <PokemonSearchForm 
                            onSubmit={handleSubmit}
                            suggestions={suggestions}
                            onSuggestionClick={handleSubmit}
                            inputRef={searchInputRef}
                            disabled={isGameWon}
                        />
                        <div className='flex gap-3 flex-wrap'>
                            <div className="blocAth rounded-xl flex-col p-3">
                                <h3 className='mb-[-10px] text-black'>Essai(s)</h3>
                                <p className='nbEssais font-medium text-5xl leading-normal text-black'>{guesses.length}</p>
                            </div>
                            
                            <div id='openPokedex' className="blocAth rounded-xl p-3" onClick={() => togglePokedexModal(true)}>
                                <div className='flex w-full justify-center'>
                                    <img src={pokedexIcon} alt="Pokedex" />
                                </div>
                            </div>

                            <Indice typeIndice='Gen' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis={4} numIndice={1} />
                            <Indice typeIndice='Cri' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis={7} numIndice={2} />
                            <Indice typeIndice='Desc.' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis={10} numIndice={3} />
                        </div>
                    </div>
                    {guesses.length > 0 && <PokemonTable guesses={guesses} pokemon={mysteryPokemon} nbEssais={guesses.length}/>}
                </div>
            </div>

            {isGameWon && !showEndModal && (
                <EndAndReloadMini 
                    pokemon={mysteryPokemon} 
                    nbEssais={guesses.length}
                    onReset={handleResetGame}
                />
            )}


            {isGameWon && showEndModal &&  (
                <EndAndReload 
                    pokemon={mysteryPokemon} 
                    onReset={handleResetGame} 
                    nbEssais={guesses.length}
                    onClose={handleCloseEndModal}
                />
            )}
            <Pokedex isModalOpen={isModalOpen} onClose={() => togglePokedexModal(false)} />
        </div>
    );
}

export default Classic;