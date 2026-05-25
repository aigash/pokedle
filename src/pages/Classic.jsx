import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import pokemons from '../pokemon.json';
import Loading from '../components/common/Loading';
import EndAndReload from '../components/common/EndAndReload';
import EndAndReloadMini from '../components/common/EndAndReloadMini';
import PokemonSearchForm from '../components/common/PokemonSearchForm';
import PokedexATH from '../components/common/PokedexATH';
import Pokedex from '../components/common/Pokedex';
import Indice from '../components/common/Indices';
import Entete from '../components/common/Entete';
import PokemonTable from '../components/classic/PokemonTable';
//import { useDailyRandomNumber } from '../hooks/useDailyRandomNumber';
//import { useParam } from '../hooks/useParam';
import { useClassicGame } from '../hooks/useGames/useClassicGame';
import ErrorBoundary from '../components/common/ErrorBoundary';

import BallInclineeIcone from '../assets/img/icones/ball-incline.svg';

function ClassicContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const initialGuess = location.state?.initialGuess;
    const hasSubmittedInitialGuess = useRef(false);

    const {
        mysteryPokemon,
        isLoading,
        error,
        guesses,
        suggestions,
        gameState,
        scoreState,
        handleSubmit,
        handleCloseEndModal,
        handleResetGame,
        togglePokedexModal,
        markHintUsed,
        getElapsedTime
    } = useClassicGame(pokemons);

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

    // Soumettre automatiquement le guess initial venant de la page d'accueil
    useEffect(() => {
        if (initialGuess && mysteryPokemon && !hasSubmittedInitialGuess.current) {
            hasSubmittedInitialGuess.current = true;
            handleSubmit(initialGuess);
        }
    }, [initialGuess, mysteryPokemon, handleSubmit]);

    if (isLoading) { return <Loading />; }

    if (error) { return <div>Une erreur est survenue: {error}</div>; }

    if (!mysteryPokemon) { return <Loading />; }

    const { isModalOpen, isGameWon, showEndModal } = gameState;

    return (
        <div className='containerClassic flex flex-col h-screen py-6'>
            <div className='flex flex-col gap-6 relative h-full' id='classic'>

                <Entete
                    nbEssais={guesses.length}
                    startTime={scoreState.startTime}
                    endTime={scoreState.endTime}
                    timeLeft={timeLeft}
                    formatNumber={formatNumber}
                    title="Pokédeul Classique"
                    description="Devine le Pokémon. Chaque tentative révèle des informations sur ses types, son habitat et ses caractéristiques"
                />

                <div className="flex grow gap-6 min-h-0">
                    <div className="flex flex-col grow gap-6 min-h-0">
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
                        <div className="grow overflow-y-auto min-h-0">
                            {guesses.length > 0 && <PokemonTable guesses={guesses} pokemon={mysteryPokemon} nbEssais={guesses.length}/>}
                        </div>
                    </div>

                    <div className="w-[376px]">
                        <div id="header-indices" className="flex gap-3 items-center px-8 py-4 rounded-tl-4xl">
                            <img src={BallInclineeIcone} alt="Ball Inclinee" />
                            <span className="text-white italic text-2xl font-bold">INDICES</span>
                        </div>

                        <div className='flex flex-col gap-6 py-7 px-8 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.24),rgba(0,0,0,0))]'>
                            <Indice typeIndice='Cri' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis={4} numIndice={1} onHintUsed={markHintUsed} />
                            <Indice typeIndice='Génération' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis={7} numIndice={2} onHintUsed={markHintUsed} />
                            <Indice typeIndice='Description' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis={10} numIndice={3} onHintUsed={markHintUsed} />
                        </div>
                    </div>
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
                    currentMode="classic"
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

export default function Classic() {
    return (
        <ErrorBoundary>
            <ClassicContent />
        </ErrorBoundary>
    );
}