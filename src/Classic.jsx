import {useState, useMemo} from 'react';
import pokemons from './pokemon.json';
import PokemonTable from './components/classic/PokemonTable';
import EndAndReload from './components/EndAndReload';
import Indice from './components/Indices';
import { usePokemonData } from './hooks/usePokemonData';
import { usePokemonGame } from './hooks/usePokemonGame';
import { getRandomPokemonId } from './services/pokemonService';
import PokemonSearchForm from './components/PokemonSearchForm';
import Pokedex from './components/Pokedex';
import { useDailyRandomNumber } from './hooks/useDailyRandomNumber';

function Classic() {
    //const randomId = useMemo(() => getRandomPokemonId(1, 386), []);
    const randomId = useDailyRandomNumber(1, 386);

    const { pokemonData: mysteryPokemon, isLoading, error } = usePokemonData(randomId, pokemons);
    const { guesses, suggestions, pokemonSearch, handleGuess, resetGame } = usePokemonGame(pokemons);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div>Une erreur est survenue: {error}</div>;
    }

    if (!mysteryPokemon) {
        return <div>Aucune donnée Pokémon trouvée</div>;
    }

    const handleSubmit = async (pokemonName) => {
        if (!pokemonName) return;
        await handleGuess(pokemonName);
    };

    return (
        <div className='relative containerClassic'>
            <div className='flex flex-col gap-4 relative' id='classic'>
                <a href='/'><img src='src/assets/pokedeule.png' className='absolute top-0 left-0 w-[180px]' /></a>
                <div className='flex justify-center flex-col items-center'>
                    {isLoading ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                        <div className='flex justify-between mb-6 entete'>
                            <PokemonSearchForm 
                                onSubmit={handleSubmit}
                                suggestions={suggestions}
                                onSuggestionClick={handleSubmit}
                            />

                            <div className="blocAth rounded-xl flex-col p-3">
                                <h3 className='mb-[-10px]'>Essai(s)</h3>
                                <p className='nbEssais font-medium text-5xl leading-normal'>{guesses.length}</p>
                            </div>
                            
                            <div id='openPokedex' className="blocAth rounded-xl p-3" onClick={() => setIsModalOpen(true)}>
                                <div className='flex w-full justify-center'>
                                    <img src='src/assets/pokedex.png' alt="Pokedex" />
                                </div>
                            </div>

                            <Indice typeIndice='Gen' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis='4' numIndice='1' />
                            <Indice typeIndice='Cri' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis='7' numIndice='2' />
                            <Indice typeIndice='Desc.' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis='10' numIndice='3' />
                        </div>
                    )}
                    {error && <p>{error}</p>}
                    {guesses.length > 0 && <PokemonTable guesses={guesses} pokemon={mysteryPokemon} nbEssais={guesses.length}/>}
                </div>
            </div>
            {mysteryPokemon?.nameFr === pokemonSearch && (
                <EndAndReload pokemon={pokemonSearch} onReset={resetGame} nbEssais={guesses.length} />
            )}
            <Pokedex isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default Classic;