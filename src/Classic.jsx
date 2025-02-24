import useSWR from 'swr';
import axios from 'axios';
import {useState, useEffect, useMemo} from 'react';
import pokemons from './pokemon.json';
import PokemonTable from './components/classic/PokemonTable';
import EndAndReload from './components/EndAndReload';
import Indice from './components/Indices';
import { usePokemonData } from './hooks/usePokemonData';

const randNumber = nombreAleatoire(1, 386);
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Classic() {
    const [searchId, setSearchId] = useState(null);
    const [guesses, setGuesses] = useState([]);
    const [pokemonSearch, setPokemonSearch] = useState('');
    const [suggestions, setSuggestions] = useState(pokemons.pokemon);

    const randNumber = useMemo(() => nombreAleatoire(1, 386), []);
    const { pokemonData: mysteryPokemon, isLoading, error } = usePokemonData(randNumber, pokemons);

    if (isLoading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div>Une erreur est survenue: {error}</div>;
    }

    if (!mysteryPokemon) {
        return <div>Aucune donnée Pokémon trouvée</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const pokeSearch = formData.get('pokeSearch');

        e.currentTarget.querySelector('#pokeSearch').value = '';
        e.currentTarget.querySelector('#pokeSearch').focus();

        let pokemonId = null;
        let couleurSearch = null;
        for (const pokemon of pokemons.pokemon) {
            if (pokemon.name_french.toLowerCase() === pokeSearch.toLowerCase()) {
                pokemonId = pokemon.id;
                couleurSearch = pokemon.couleur;
                break;
            }
        }
        setSearchId(pokemonId);
        const fetchData = async() => {
            try {
                const pokeSearch1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const pokeSearch2 = await axios.get(pokeSearch1?.data?.species.url);
                const pokeSearch3 = await axios.get(pokeSearch2?.data?.evolution_chain.url);

                if (pokeSearch3) {
                    //const nameSearch = pokeSearch1.data.name;
                    const nameSpeciesSearch = pokeSearch1.data.species.name;
                    const typesSearch = pokeSearch1.data.types;
                    const tailleSearch = pokeSearch1.data.height;
                    const poidsSearch = pokeSearch1.data.weight;
                    const sprite_offSearch = pokeSearch1.data.sprites.other['official-artwork'].front_default;
                    const gifSearch = pokeSearch1.data.sprites.other.showdown.front_default;
                    const spriteSearch = pokeSearch1.data.sprites.versions['generation-iv'].platinum.front_default;
                    const nameFrSearch = pokeSearch2.data.names[4].name;
                    let generation = pokeSearch2.data.generation.url.replace('/', ' ');
                    const genSearch = generation.slice(-2).slice(0,1);
                    let habitatSearch = '';//poke2.habitat.name;
                    pokemons.habitats.forEach(val => {
                        if (pokeSearch2.data.habitat.name == val.name_english) {
                            habitatSearch = val.name_french;
                        }
                    })

                    let type1 = '';
                    let type2 = '';

                    pokemons.types.forEach(val => {
                        if (typesSearch[0].type.name == val.name_english) {
                            type1 = val;
                        }
            
                        if (typesSearch.length > 1) {
                            if (typesSearch[1].type.name == val.name_english) {
                                type2 = val;
                            }
                        } else {
                            type2 = 'Aucun';
                        }
                    });

                    let stadeEvoSearch = 1;
                    const evolutionChain = pokeSearch3.data.chain;

                    if (evolutionChain.species.name !== nameSpeciesSearch) {
                        stadeEvoSearch = 2;
                        const secondStage = evolutionChain.evolves_to;
                        
                        if (!secondStage.some(evolution => evolution.species.name === nameSpeciesSearch)) {
                            stadeEvoSearch = 3;
                        }
                    }

                    const newGuess = {
                        couleur: couleurSearch,
                        type1: type1,
                        type2: type2,
                        taille: tailleSearch,
                        poids: poidsSearch,
                        sprite_off: sprite_offSearch,
                        gif: gifSearch,
                        sprite: spriteSearch,
                        nameFr: nameFrSearch,
                        gen: genSearch,
                        habitat: habitatSearch,
                        stadeEvo: stadeEvoSearch
                    };
                    setGuesses(prevGuesses => [newGuess, ...prevGuesses]);
                    setPokemonSearch(nameFrSearch);
                    setSuggestions(prevSuggestions => prevSuggestions.filter(
                        pokemon => pokemon.name_french.toLowerCase() !== nameFrSearch.toLowerCase()
                    ));
                }
            } catch(error) {
                console.log(error);
            }
        }

        fetchData();
        
    }

    function handleSuggestions(e) {
        const suggestionsList = e.target.parentElement.querySelector('ul');
        suggestionsList.style.display = 'block';

        const inputValue = e.target.value.toLowerCase();
        const listItems = suggestionsList.querySelectorAll('li');

        listItems.forEach(item => {
            if (item.textContent.toLowerCase().startsWith(inputValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        document.addEventListener('click', function clickOutside(event) {
            if (!suggestionsList.contains(event.target) && event.target !== e.target) {
                suggestionsList.style.display = 'none';
                // Suppression du gestionnaire après utilisation
                document.removeEventListener('click', clickOutside);
            }
        });
    }

    function handleSuggestionClick(pokemonName) {
        console.log(pokemonName);
        document.getElementById('pokeSearch').value = pokemonName;
        setTimeout(() => {
            document.getElementById('submitClassic').click();
        }, 300);
    }

    const resetGame = () => {
        setSearchId(null);
        setGuesses([]);
        window.location.reload();
    };

    // pokedex, gmax, mega, desc rapide ex : pokemon graine "genera", generation, habitat
    return (
        <div className='relative containerClassic'>
            <div className='flex flex-col gap-4' id='classic'>
                <div className='flex justify-center flex-col items-center'>
                    {isLoading ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                        <div className='flex justify-between mb-6 entete'>
                            <form
                                className='p-3 rounded-xl flex flex-col justify-between'
                                id="formClassic"
                                onSubmit={(e) => {
                                    handleSubmit(e);
                                }}
                            >
                                <h2 className="mb-2">Trouve le Pokémon du jour !</h2>
                                <div className='flex justify-center'>
                                    <div className='relative'>
                                        <input 
                                            name='pokeSearch' 
                                            id='pokeSearch'
                                            autoComplete="off"
                                            onChange={(e) => {
                                                handleSuggestions(e);
                                            }} 
                                            placeholder="Tape un nom de Pokémon..."
                                            className="ring-1 ring-inset ring-gray-300 rounded-l-md px-3"
                                        />
                                        {suggestions.length > 0 && (
                                            <ul className="absolute" id='suggestionsClassic'>
                                                {suggestions.map((pokemon) => (
                                                    <li 
                                                        key={pokemon.id} 
                                                        onClick={() => handleSuggestionClick(pokemon.name_french)}
                                                        className="cursor-pointer hover:bg-gray-100 p-2"
                                                    >
                                                        {pokemon.name_french}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <button id='submitClassic' type='submit' className="btn btn-primary rounded-r-md bg-red-500 text-white">GO</button>
                                </div>
                            </form>

                            <div className="blocAth rounded-xl flex-col p-3">
                                <h3 className='mb-[-10px]'>Essai(s)</h3>
                                <p className='nbEssais font-medium text-5xl leading-normal'>{guesses.length}</p>
                            </div>
                            
                            <div className="blocAth rounded-xl p-3">
                                <div className='flex w-full justify-center'>
                                    <img src='src/assets/pokedex.png'></img>
                                </div>
                            </div>

                            <Indice typeIndice='Gen' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis='4' numIndice='1'></Indice>
                            <Indice typeIndice='Cri' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis='7' numIndice='2'></Indice>
                            <Indice typeIndice='Desc.' pokemon={mysteryPokemon} nbEssais={guesses.length} nbRequis='10' numIndice='3'></Indice>
                        </div>
                    )}
                    {error ? <p>{error}</p> : null}
                    {guesses.length > 0 ? 
                        
                            <PokemonTable guesses={guesses} pokemon={mysteryPokemon} nbEssais={guesses.length}/>
                        : ''}
                </div>
            </div>
            {mysteryPokemon?.nameFr == pokemonSearch ? (
                    <EndAndReload pokemon={pokemonSearch} onReset={resetGame} nbEssais={guesses.length} />
                ) : (
                    ""
                )}
        </div>
    )
}

function nombreAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Classic