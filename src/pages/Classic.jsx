import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
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

import BallInclineeIcone from '../assets/img/icones/ball-incline.svg';

function ClassicContent() {
    const location = useLocation();
    const initialGuess = location.state?.initialGuess;
    const hasSubmittedInitialGuess = useRef(false);

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
        <div className='containerClassic flex flex-col min-h-screen py-10'>
            <div className='flex flex-col gap-6 relative' id='classic'>

                <div className="entete px-12 py-6 rounded-4xl relative w-full">
                    <div className="flex gap-16">
                        <div className="flex flex-col -space-y-4 text-white font-bold italic text-left text-xl">
                            <span className="tracking-[0.02em]">QUEL EST LE</span>
                            <h1 className="text-[86px] tracking-[-0.03em]" style={{ textShadow: '2px 2px 0 var(--secondary-jaune)' }}>POKÉMON</h1>
                            <span className="text-(--secondary-jaune) tracking-[0.02em]">MYSTÈRE ?</span>
                        </div>
                        <div className="justify-end flex flex-col gap-3 w-[304px] text-left text-(--text-secondary-color)">
                            <p className="text-sm leading-[1.3]">Devine le Pokémon. Chaque tentative révèle des informations sur ses types, son habitat et ses caractéristiques</p>
                            <div className='flex gap-3 items-center'>
                                <NbEssais nbEssais={guesses.length} />
                                <div className="w-px h-10 bg-(--border) rotate-12"></div>
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-xs text-(--secondary-jaune) italic font-semibold text-left leading-[1.2]">Prochain défi</p>
                                    <div id='compteur' className="flex items-center gap-1 text-white text-xl font-semibold leading-[1.2]">
                                        <p id='heures'>{formatNumber(timeLeft.hours)}<span className="text-white/80 text-xs">H</span></p>
                                        <p className="text-(--secondary-jaune)">:</p>
                                        <p id='minutes'>{formatNumber(timeLeft.minutes)}<span className="text-white/80 text-xs">M</span></p>
                                        <p className="text-(--secondary-jaune)">:</p>
                                        <p id='secondes'>{formatNumber(timeLeft.seconds)}<span className="text-white/80 text-xs">S</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                            {guesses.length > 0 && <PokemonTable guesses={guesses} pokemon={mysteryPokemon} nbEssais={guesses.length}/>}
                        </div>
                    </div>

                    <div className="w-[376px]">
                        <div id="header-indices" className="flex gap-3 items-center px-8 py-4 rounded-tl-4xl">
                            <img src={BallInclineeIcone} alt="Ball Inclinee" />
                            <span className="text-white italic text-2xl font-bold">INDICES</span>
                        </div>

                        <div className='flex flex-col gap-6 py-7 px-8 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.24),rgba(0,0,0,0))]'>
                            <Indice typeIndice='Cri' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis={4} numIndice={1} />
                            <Indice typeIndice='Génération' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis={7} numIndice={2} />
                            <Indice typeIndice='Description' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis={10} numIndice={3} />
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