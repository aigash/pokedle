import  { useMemo, useState } from 'react';
import pokemons from '../pokemon.json';
import EndAndReload from '../components/common/EndAndReload';
import { usePokemonData } from '../hooks/usePokemonData';
import { usePokemonGame } from '../hooks/usePokemonGame';
import { getRandomPokemonId } from '../services/pokemonService';
import PokemonSearchForm from '../components/common/PokemonSearchForm';
import Pokedex from '../components/common/Pokedex';
import GuessSticker from '../components/common/GuessSticker';
import { Pixelify } from 'react-pixelify';
//import { useDailyRandomNumber } from '../hooks/useDailyRandomNumber';
import Loading from '../components/common/Loading';

export default function Pixels() {
    const randomId = useMemo(() => getRandomPokemonId(1, 386), []);
    //const randomId = useDailyRandomNumber(1, 386);
    
    const { pokemonData: pokemon, isLoading, error } = usePokemonData(randomId, pokemons);
    const { guesses, suggestions, pokemonSearch, handleGuess, resetGame } = usePokemonGame(pokemons);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pixelSize, setPixelSize] = useState(120);

    const spriteOff = useMemo(() => {
        if (!pokemon?.sprite_off || !pokemon?.nameFr) return "";
        return pokemon.sprite_off;
    }, [pokemon?.sprite_off, pokemon?.nameFr]);


    const handleSubmit = async (pokemonName) => {
        if (!pokemonName) return;

        const isDuplicate = guesses.some(guess => guess.nameFr.toLowerCase() === pokemonName.toLowerCase());
        if (isDuplicate) return;
        // On stocke le résultat dans une fonction afin d'éviter que setPixelSize ne s'active sur un guess qui n'existe pas (ça évite la triche en spammant des lettre + entrée)
        const result = await handleGuess(pokemonName);
        
        if (result !== null) {
            setPixelSize(prevSize => Math.max(prevSize - 9, 0));
        }
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

    return (
        <div className='containerPixels'>
            <div className='flex flex-col gap-4 relative' id='pixels'>
                <a href='/'><img src='src/assets/pokedeule.png' className='absolute top-0 left-0 w-[180px]' /></a>
                <div className='flex justify-center flex-col items-center'>
                    {isLoading ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                        <div>
                            <div id='pixels_pokedex' className='p-3 rounded-xl bg-white mb-6'>
                                <h2>Quel Pokémon a été pixelisé ?</h2>
                                <div>
                                    <Pixelify 
                                        src={spriteOff}
                                        pixelSize={pixelSize}
                                        width={538}
                                        height={450}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-between mb-6 entetePixels'>
                                <PokemonSearchForm 
                                    onSubmit={handleSubmit}
                                    suggestions={suggestions}
                                    onSuggestionClick={handleSubmit}
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
                            </div>
                        </div>
                    )}
                    {error && <p>{error}</p>}
                    {guesses.length > 0 && (
                        <div id='guessesPixels' className="grid grid-cols-4 gap-4">
                            {guesses.map((guess, index) => (
                                <GuessSticker key={`${guess.nameFr}-${index}`} guess={guess} pokemon={pokemon} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {pokemon?.nameFr === pokemonSearch && (
                <EndAndReload pokemon={pokemon} onReset={resetGame} nbEssais={guesses.length} />
            )}
            <Pokedex isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}