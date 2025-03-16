import  { useEffect, useRef } from 'react';
import pokemons from '../pokemon.json';
//import { useDailyRandomNumber } from '../hooks/useDailyRandomNumber';
import EndAndReload from '../components/common/EndAndReload';
import EndAndReloadMini from '../components/common/EndAndReloadMini';
import PokemonSearchForm from '../components/common/PokemonSearchForm';
import NbEssais from '../components/common/NbEssais';
import PokedexATH from '../components/common/PokedexATH';
import Pokedex from '../components/common/Pokedex';
import GuessSticker from '../components/common/GuessSticker';
import Loading from '../components/common/Loading';
import PixelifiedPokemon from '../components/pixels/PixelifiedPokemon';
import { usePixelsGame } from '../hooks/useGames/usePixelsGame';
import ErrorBoundary from '../components/common/ErrorBoundary';

import logoIcon from '../assets/pokedeule.png';

function PixelsContent() {
    const {
        pokemon,
        isLoading,
        error,
        guesses,
        suggestions,
        gameState,
        pixelSize,
        spriteOff,
        handleSubmit,
        handleCloseEndModal,
        handleResetGame,
        togglePokedexModal
    } = usePixelsGame(pokemons);

    // auto focus sur le champ de recherche
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
        <div className='containerPixels'>
            <div className='flex flex-col gap-4 relative' id='pixels'>
                <a href='/pokedle'><img src={ logoIcon } className='absolute top-0 left-0 w-[180px]' /></a>
                <div className='flex justify-center flex-col items-center mt-12 xl:mt-0'>
                    <div className='flex flex-col items-center'>
                        <PixelifiedPokemon 
                            spriteOff={spriteOff} 
                            pixelSize={pixelSize} 
                        />
                        <div className='flex justify-between mb-6 entetePixels gap-3 flex-wrap'>
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
                            </div>
                        </div>
                    </div>
                    {guesses.length > 0 && (
                        <div id='guessesPixels' className="grid grid-cols-4 gap-4">
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

export default function Pixels() {
    return (
        <ErrorBoundary>
            <PixelsContent />
        </ErrorBoundary>
    );
}