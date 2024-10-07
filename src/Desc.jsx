import useSWR from 'swr';
import axios from 'axios';
import {useState, useEffect} from 'react';
import pokemons from './pokemon.json';
import EndAndReload from './components/EndAndReload';
import Indice from './components/Indices';

const randNumber = nombreAleatoire(1, 386);
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Desc() {
    const [searchId, setSearchId] = useState(null);
    const [guesses, setGuesses] = useState([]);
    const [pokemon, setPokemon] = useState(null);
    const [pokemonSearch, setPokemonSearch] = useState('');

    const [suggestions, setSuggestions] = useState(pokemons.pokemon);

    const { data: poke1, error: error1, isLoading: isLoading1 } = useSWR('https://pokeapi.co/api/v2/pokemon/' + randNumber, fetcher);
    const { data: poke2, error: error2, isLoading: isLoading2 } = useSWR(poke1?.species.url, fetcher);

    const error = error1 || error2;
    const isLoading = isLoading1 || isLoading2;

    if (poke2 && !pokemon) {
        const name = poke1.name;
        const types = poke1.types;
        const sprite_off = poke1.sprites.other['official-artwork'].front_default;
        const gif = poke1.sprites.other.showdown.front_default;
        const sprite = poke1.sprites.versions['generation-iv'].platinum.front_default;
        const nameFr = poke2.names[4].name;
        let desc;//poke2.flavor_text_entries[34].flavor_text;
        poke2.flavor_text_entries.forEach(val => {
            if (val.version.name == 'omega-ruby' && val.language.name == 'fr') {
                desc = val.flavor_text.replace(new RegExp(nameFr, 'gi'), '[pokemon]');
            }
        })
        let generation = poke2.generation.url.replace('/', ' ');
        const gen = generation.slice(-2).slice(0,1);
        let type1 = '';
        let type2 = '';
        pokemons.types.forEach(val => {
            if (types[0].type.name == val.name_english) {
                type1 = val;
            }
            if (types.length > 1) {
                if (types[1].type.name == val.name_english) {
                    type2 = val;
                }
            } else {
                type2 = 'Aucun';
            }
        });
        const pokemonData = {
            name: name,
            type1: type1,
            type2: type2,
            sprite_off: sprite_off,
            gif: gif,
            sprite: sprite,
            nameFr: nameFr,
            desc: desc,
            gen: gen,
        };
        setPokemon(pokemonData);
    }
    //console.log(pokemon);

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const pokeSearch = formData.get('pokeSearch');
    
        e.currentTarget.querySelector('#pokeSearch').value = '';
        e.currentTarget.querySelector('#pokeSearch').focus();
    
        let pokemonId = null;
        for (const pokemon of pokemons.pokemon) {
            if (pokemon.name_french.toLowerCase() === pokeSearch.toLowerCase()) {
                pokemonId = pokemon.id;
                break;
            }
        }
        
        setSearchId(pokemonId);
    
        const fetchData = async() => {
            try {
                const pokeSearch1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const pokeSearch2 = await axios.get(pokeSearch1?.data?.species.url);
    
                if (pokeSearch2) {
                    const sprite_offSearch = pokeSearch1.data.sprites.other['official-artwork'].front_default;
                    const gifSearch = pokeSearch1.data.sprites.other.showdown.front_default;
                    const spriteSearch = pokeSearch1.data.sprites.versions['generation-iv'].platinum.front_default;
                    const nameFrSearch = pokeSearch2.data.names[4].name;
                    let generation = pokeSearch2.data.generation.url.replace('/', ' ');
                    const genSearch = generation.slice(-2).slice(0,1);
    
                    const newGuess = {
                        sprite_off: sprite_offSearch,
                        gif: gifSearch,
                        sprite: spriteSearch,
                        nameFr: nameFrSearch,
                        gen: genSearch,
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
        setPokemon(null);
        window.location.reload();
    };

    return (
        <div className='relative containerDesc'>
            <div className='flex flex-col gap-4' id='desc'>
                <div className='flex justify-center flex-col items-center'>
                    {isLoading ? (
                        <span className="loading loading-spinner loading-lg"></span>
                    ) : (
                        <div>
                            <div id='desc_pokedex' className='p-3 rounded-xl bg-white mb-6'>
                                <h2>À quel Pokémon est associée cette phrase du Pokédex ?</h2>
                                <samp>❝{pokemon?.desc || "Chargement en cours..."}❞</samp>
                            </div>
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

                                <div className="blocAth rounded-xl p-3">
                                    <div className='flex w-full justify-center'>
                                        <img src='src/assets/pokemon.png'></img>
                                    </div>
                                </div>

                                <div className="blocAth rounded-xl flex-col p-3">
                                    <h3 className='mb-[-10px]'>Essai(s)</h3>
                                    <p className='nbEssais font-medium text-5xl leading-normal'>{guesses.length}</p>
                                </div>

                                <Indice typeIndice='Gen' pokemon={pokemon} nbEssais={guesses.length} nbRequis='4' numIndice='1'></Indice>
                                <Indice typeIndice='Cri' pokemon={pokemon} nbEssais={guesses.length} nbRequis='7' numIndice='2'></Indice>
                                <Indice typeIndice='Desc.' pokemon={pokemon} nbEssais={guesses.length} nbRequis='10' numIndice='3'></Indice>
                            </div>
                        </div>
                    )}
                    {error ? <p>{error}</p> : null}
                    {guesses.length > 0 ? 
                        
                            ''
                        : ''}
                </div>
            </div>
            {pokemon?.nameFr == pokemonSearch ? (
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
