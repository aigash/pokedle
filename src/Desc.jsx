import { useMemo, useState } from 'react';
import pokemons from './pokemon.json';
import EndAndReload from './components/EndAndReload';
import Indice from './components/Indices';
import { usePokemonData } from './hooks/usePokemonData';
import { usePokemonGame } from './hooks/usePokemonGame';
import { getRandomPokemonId, sanitizeDescription } from './services/pokemonService';
import PokemonSearchForm from './components/PokemonSearchForm';
import Pokedex from './components/Pokedex';

export default function Desc() {
    const randomId = useMemo(() => getRandomPokemonId(1, 386), []);
    const { pokemonData: pokemon, isLoading, error } = usePokemonData(randomId, pokemons);
    const { guesses, suggestions, pokemonSearch, handleGuess, resetGame } = usePokemonGame(pokemons);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sanitizedDesc = useMemo(() => {
        if (!pokemon?.desc || !pokemon?.nameFr) return "";
        return sanitizeDescription(pokemon.desc, pokemon.nameFr);
    }, [pokemon?.desc, pokemon?.nameFr]);

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
        <div className='relative containerDesc'>
            <div className='flex flex-col gap-4' id='desc'>
                <div className='flex justify-center flex-col items-center'>
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

                            <Indice typeIndice='Gen' pokemon={pokemon} nbEssais={guesses.length} nbRequis='4' numIndice='1' />
                            <Indice typeIndice='Cri' pokemon={pokemon} nbEssais={guesses.length} nbRequis='7' numIndice='2' />
                            <Indice typeIndice='Desc.' pokemon={pokemon} nbEssais={guesses.length} nbRequis='10' numIndice='3' />
                        </div>
                    </div>
                </div>
            </div>
            
            {pokemon?.nameFr === pokemonSearch && (
                <EndAndReload pokemon={pokemonSearch} onReset={resetGame} nbEssais={guesses.length} />
            )}
            <Pokedex isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
