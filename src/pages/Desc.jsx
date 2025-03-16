import { useEffect, useRef } from 'react';
import pokemons from '../pokemon.json';
import Loading from '../components/common/Loading';
import EndAndReload from '../components/common/EndAndReload';
import EndAndReloadMini from '../components/common/EndAndReloadMini';
import Indice from '../components/common/Indices';
import PokemonSearchForm from '../components/common/PokemonSearchForm';
import NbEssais from '../components/common/NbEssais';
import PokedexATH from '../components/common/PokedexATH';
import Pokedex from '../components/common/Pokedex';
import GuessSticker from '../components/common/GuessSticker';
import BlocDesc from '../components/desc/BlocDesc';
// import { useDailyRandomNumber } from '../hooks/useDailyRandomNumber';
import { useDescGame } from '../hooks/useGames/useDescGame';
import ErrorBoundary from '../components/common/ErrorBoundary';

import logoIcon from '../assets/pokedeule.png';

function DescContent() {
    const {
        pokemon,
        isLoading,
        error,
        guesses,
        suggestions,
        gameState,
        sanitizedDesc,
        handleSubmit,
        handleCloseEndModal,
        handleResetGame,
        togglePokedexModal
    } = useDescGame(pokemons);

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

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
                        <BlocDesc>{sanitizedDesc || "Chargement en cours..."}</BlocDesc>
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

export default function Desc() {
    return (
        <ErrorBoundary>
            <DescContent />
        </ErrorBoundary>
    );
}