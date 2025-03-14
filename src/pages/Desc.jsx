import { useMemo, useState, useEffect, useRef } from 'react';
import pokemons from '../pokemon.json';
import Loading from '../components/common/Loading';
import EndAndReload from '../components/common/EndAndReload';
import Indice from '../components/common/Indices';
import PokemonSearchForm from '../components/common/PokemonSearchForm';
import Pokedex from '../components/common/Pokedex';
import GuessSticker from '../components/common/GuessSticker';
// import { useDailyRandomNumber } from '../hooks/useDailyRandomNumber';
import { usePokemonData } from '../hooks/usePokemonData';
import { usePokemonGame } from '../hooks/usePokemonGame';
import { getRandomPokemonId, sanitizeDescription } from '../services/pokemonService';

export default function Desc() {
    const randomId = useMemo(() => getRandomPokemonId(1, 386), []);
    //const randomId = useDailyRandomNumber(1, 386);
    const { pokemonData: pokemon, isLoading, error } = usePokemonData(randomId, pokemons);
    const { guesses, suggestions, pokemonSearch, handleGuess, resetGame } = usePokemonGame(pokemons);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isGameWon, setIsGameWon] = useState(false);
    const [showEndModal, setShowEndModal] = useState(true);

    const sanitizedDesc = useMemo(() => {
        if (!pokemon?.desc || !pokemon?.nameFr) return "";
        return sanitizeDescription(pokemon.desc, pokemon.nameFr);
    }, [pokemon?.desc, pokemon?.nameFr]);

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (pokemon?.nameFr === pokemonSearch) {
            setIsGameWon(true);
            setShowEndModal(true);
        }
    }, [pokemon, pokemonSearch]);

    const handleSubmit = async (pokemonName) => {
        if (!pokemonName) return;
        await handleGuess(pokemonName);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div>Une erreur est survenue: {error}</div>;
    }

    if (!pokemon) {
        return <Loading />;
    }

    const handleCloseEndModal = () => {
        setShowEndModal(false);
    };
    const handleResetGame = () => {
        setIsGameWon(false);
        setShowEndModal(true);
        resetGame();
    };

    return (
        <div className='relative containerDesc'>
            <div className='flex flex-col gap-4 relative' id='desc'>
                <a href='/'><img src='src/assets/pokedeule.png' className='absolute top-0 left-0 w-[180px]' /></a>
                <div className='flex justify-center flex-col items-center'>
                    {isLoading ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                        <div>
                            <div id='desc_pokedex' className='p-3 rounded-xl bg-white mb-6'>
                                <h2>À quel Pokémon est associée cette phrase du Pokédex ?</h2>
                                <samp>❝{sanitizedDesc || "Chargement en cours..."}❞</samp>
                            </div>
                            <div className='flex justify-between mb-6 entete'>
                                <PokemonSearchForm 
                                    onSubmit={handleSubmit}
                                    suggestions={suggestions}
                                    onSuggestionClick={handleSubmit}
                                    inputRef={searchInputRef}
                                    disabled={isGameWon}
                                />

                                <div id='openPokedex' className="blocAth rounded-xl p-3" onClick={() => setIsModalOpen(true)}>
                                    <div className='flex w-full justify-center'>
                                        <img src='src/assets/img/icones/pokedex.png' alt="Pokedex" />
                                    </div>
                                </div>

                                <div className="blocAth rounded-xl flex-col p-3">
                                    <h3 className='mb-[-10px]'>Essai(s)</h3>
                                    <p className='nbEssais font-medium text-5xl leading-normal'>{guesses.length}</p>
                                </div>

                                <Indice typeIndice='Gen' pokemon={pokemon} nbEssais={guesses.length} nbRequis='4' numIndice='1' />
                                <Indice typeIndice='Cri' pokemon={pokemon} nbEssais={guesses.length} nbRequis='7' numIndice='2' />
                                <Indice typeIndice='Desc.' pokemon={pokemon} nbEssais={guesses.length} nbRequis='10' numIndice='3' />
                            </div>
                        </div>
                    )}
                    {error && <p>{error}</p>}
                    {guesses.length > 0 && (
                        <div id='guessesDesc' className="grid grid-cols-7 gap-4 justify-between">
                            {guesses.map((guess, index) => (
                                <GuessSticker key={`${guess.nameFr}-${index}`} guess={guess} pokemon={pokemon} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {isGameWon && !showEndModal && (
                <div className="fixed bottom-4 left-0 right-0 flex justify-center">
                    <div className="bg-white p-3 rounded-xl shadow-lg flex items-center">
                        <div className="mr-3">
                            <p className="font-bold">Bien joué ! Tu as trouvé {pokemon.nameFr} en {guesses.length} essais.</p>
                        </div>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                            onClick={handleResetGame}
                        >
                            Rejouer
                        </button>
                    </div>
                </div>
            )}
            
            {isGameWon && showEndModal &&  (
                <EndAndReload 
                    pokemon={pokemon} 
                    onReset={handleResetGame} 
                    nbEssais={guesses.length}
                    onClose={handleCloseEndModal}
                />
            )}
            <Pokedex isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
