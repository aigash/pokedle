import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemons from '../pokemon.json';
import Loading from '../components/common/Loading';
import EndAndReload from '../components/common/EndAndReload';
import EndAndReloadMini from '../components/common/EndAndReloadMini';
import PokemonSearchForm from '../components/common/PokemonSearchForm';
import PokedexATH from '../components/common/PokedexATH';
import Pokedex from '../components/common/Pokedex';
import Indice from '../components/common/Indices';
import GuessSticker from '../components/common/GuessSticker';
import Entete from '../components/common/Entete';
import { useDescGame } from '../hooks/useGames/useDescGame';
import ErrorBoundary from '../components/common/ErrorBoundary';

import BallInclineeIcone from '../assets/img/icones/ball-incline.svg';

function DescContent() {
    const navigate = useNavigate();
    const {
        pokemon,
        isLoading,
        error,
        guesses,
        suggestions,
        gameState,
        scoreState,
        sanitizedDesc,
        handleSubmit,
        handleCloseEndModal,
        handleResetGame,
        togglePokedexModal,
        markHintUsed,
        getElapsedTime
    } = useDescGame(pokemons);

    const searchInputRef = useRef(null);

    // Fonction pour naviguer vers le mode suivant
    const handleNextMode = (nextMode) => {
        const modeRoutes = {
            'classic': '/classic',
            'description': '/desc',
            'pixels': '/pixels',
            'types': '/types'
        };
        navigate(modeRoutes[nextMode]);
    };

    // Compteur pour le prochain défi
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    const calculateTimeLeft = () => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);

        const difference = midnight - now;

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    };

    const formatNumber = (num) => String(num).padStart(2, '0');

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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
        <div className='containerDesc flex flex-col min-h-screen py-6'>
            <div className='flex flex-col gap-6 relative' id='desc'>

                <Entete
                    nbEssais={guesses.length}
                    startTime={scoreState.startTime}
                    endTime={scoreState.endTime}
                    timeLeft={timeLeft}
                    formatNumber={formatNumber}
                    title="À quel Pokémon est associée cette description du Pokédex ?"
                    description={sanitizedDesc || "Chargement en cours..."}
                />

                <div className="flex grow gap-6">
                    <div className="flex flex-col grow gap-6">
                        <div className='flex gap-6'>
                            <div className='grow'>
                                <PokemonSearchForm
                                    onSubmit={handleSubmit}
                                    suggestions={suggestions}
                                    onSuggestionClick={handleSubmit}
                                    inputRef={searchInputRef}
                                    disabled={isGameWon}
                                />
                            </div>
                            <PokedexATH togglePokedexModal={togglePokedexModal} />
                        </div>
                        <div>
                            {guesses.length > 0 && (
                                <div id='guessesDesc' className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 justify-between">
                                    {guesses.map((guess, index) => (
                                        <GuessSticker key={`${guess.nameFr}-${index}`} guess={guess} pokemon={pokemon} index={index} totalGuesses={guesses.length} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-[376px]">
                        <div id="header-indices" className="flex gap-3 items-center px-8 py-4 rounded-tl-4xl">
                            <img src={BallInclineeIcone} alt="Ball Inclinee" />
                            <span className="text-white italic text-2xl font-bold">INDICES</span>
                        </div>

                        <div className='flex flex-col gap-6 py-7 px-8 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.24),rgba(0,0,0,0))]'>
                            <Indice typeIndice='Cri' pokemon={pokemon} nbEssais={guesses.length} nbRequis={4} numIndice={1} onHintUsed={markHintUsed} />
                            <Indice typeIndice='Génération' pokemon={pokemon} nbEssais={guesses.length} nbRequis={7} numIndice={2} onHintUsed={markHintUsed} />
                            <Indice typeIndice='Type1' pokemon={pokemon} nbEssais={guesses.length} nbRequis={10} numIndice={3} onHintUsed={markHintUsed} />
                        </div>
                    </div>
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
                    currentMode="description"
                    onNextMode={handleNextMode}
                    timeInSeconds={getElapsedTime()}
                    usedHints={scoreState.usedHints}
                    pokedexUsed={scoreState.pokedexUsed}
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
