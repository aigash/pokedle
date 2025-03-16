import { useEffect, useRef } from 'react';
import pokemons from '../pokemon.json';
import Loading from '../components/common/Loading';
import EndAndReload from '../components/common/EndAndReload';
import EndAndReloadMini from '../components/common/EndAndReloadMini';
import PokemonSearchForm from '../components/common/PokemonSearchForm';
import NbEssais from '../components/common/NbEssais';
import PokedexATH from '../components/common/PokedexATH';
import Pokedex from '../components/common/Pokedex';
import Indice from '../components/common/Indices';
import PokemonTable from '../components/classic/PokemonTable';
//import { useDailyRandomNumber } from '../hooks/useDailyRandomNumber';
//import { useParam } from '../hooks/useParam';
import { useClassicGame } from '../hooks/useGames/useClassicGame';
import ErrorBoundary from '../components/common/ErrorBoundary';

import logoIcon from '../assets/pokedeule.png';

function ClassicContent() {
    const {
        mysteryPokemon,
        isLoading,
        error,
        guesses,
        suggestions,
        gameState,
        handleSubmit,
        handleCloseEndModal,
        handleResetGame,
        togglePokedexModal
    } = useClassicGame(pokemons);

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    if (isLoading) { return <Loading />; }

    if (error) { return <div>Une erreur est survenue: {error}</div>; }

    if (!mysteryPokemon) { return <Loading />; }

    const { isModalOpen, isGameWon, showEndModal } = gameState;

    return (
        <div className='relative containerClassic'>
            <div className='flex flex-col gap-4 relative' id='classic'>
                <a href='/pokedle'><img src={logoIcon} className='absolute top-0 left-0 w-[180px]' alt="Pokédle logo" /></a>
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
                            <NbEssais nbEssais={guesses.length} />
                            
                            <PokedexATH togglePokedexModal={togglePokedexModal} />

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

export default function Classic() {
    return (
        <ErrorBoundary>
            <ClassicContent />
        </ErrorBoundary>
    );
}