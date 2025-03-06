import  { useMemo, useState } from 'react';
import pokemons from './pokemon.json';
import EndAndReload from './components/EndAndReload';
import { usePokemonData } from './hooks/usePokemonData';
import { usePokemonGame } from './hooks/usePokemonGame';
import { getRandomPokemonId } from './services/pokemonService';
import PokemonSearchForm from './components/PokemonSearchForm';
import Pokedex from './components/Pokedex';
import GuessSticker from './components/GuessSticker';

export default function Silhouette() {
    const randomId = useMemo(() => getRandomPokemonId(1, 386), []);
    const { pokemonData: pokemon, isLoading, error } = usePokemonData(randomId, pokemons);
    const { guesses, suggestions, pokemonSearch, handleGuess, resetGame } = usePokemonGame(pokemons);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const spriteOff = useMemo(() => {
        if (!pokemon?.sprite_off || !pokemon?.nameFr) return "";
        return pokemon.sprite_off;
    }, [pokemon?.sprite_off, pokemon?.nameFr]);

    const handleSubmit = async (pokemonName) => {
        if (!pokemonName) return;
        await handleGuess(pokemonName);
    };

    if (isLoading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div>Une erreur est survenue: {error}</div>;
    }

    if (!pokemon) {
        return <div>Aucune donnée Pokémon trouvée</div>;
    }

    return (
        <div className='containerSilhouette'>
            <div className='flex flex-col gap-4' id='silhouette'>
                <div className='flex justify-center flex-col items-center'>
                    {isLoading ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                        <div>
                            <div id='silhouette_pokedex' className='p-3 rounded-xl bg-white mb-6'>
                                <h2>À quel Pokémon appartient cette silhouette ?</h2>
                                <div></div>
                            </div>
                            <div className='flex justify-between mb-6 entete'>
                                <PokemonSearchForm 
                                    onSubmit={handleSubmit}
                                    suggestions={suggestions}
                                    onSuggestionClick={handleSubmit}
                                />

                                <div id='openPokedex' className="blocAth rounded-xl p-3" onClick={() => setIsModalOpen(true)}>
                                    <div className='flex w-full justify-center'>
                                        <img src='src/assets/pokedex.png' alt="Pokedex" />
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
                        <div id='blocGuesses' className="grid grid-cols-[repeat(auto-fill,minmax(7rem,7rem))] gap-4 justify-between">
                            {guesses.map((guess, index) => (
                                <GuessSticker key={`${guess.nameFr}-${index}`} guess={guess} pokemon={pokemon} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {pokemon?.nameFr === pokemonSearch && (
                <EndAndReload pokemon={pokemonSearch} onReset={resetGame} nbEssais={guesses.length} />
            )}
            <Pokedex isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}