import useSWR from 'swr';
import axios from 'axios';
import {useState, useEffect} from 'react';
import pokemons from './pokemon.json';
import PokemonTable from './components/classic/PokemonTable';
import EndAndReload from './components/EndAndReload';
import Indice from './components/Indices';

const randNumber = nombreAleatoire(1, 386);
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Classic() {
    // se renseigner sur useMemo;
    const [searchId, setSearchId] = useState(null);
    const [guesses, setGuesses] = useState([]);
    const [pokemon, setPokemon] = useState(null);
    const [pokemonSearch, setPokemonSearch] = useState('');

    const [suggestions, setSuggestions] = useState(pokemons.pokemon);

    const { data: poke1, error: error1, isLoading: isLoading1 } = useSWR('https://pokeapi.co/api/v2/pokemon/' + randNumber, fetcher);
    const { data: poke2, error: error2, isLoading: isLoading2 } = useSWR(poke1?.species.url, fetcher);
    const { data: poke3, error: error3, isLoading: isLoading3 } = useSWR(poke2?.evolution_chain.url, fetcher);
    
    const error = error1 || error2 || error3;
    const isLoading = isLoading1 || isLoading2 || isLoading3;

    if (poke3 && !pokemon) {
        const name = poke1.name;
        const nameSpecies = poke1.species.name;
        const types = poke1.types;
        const taille = poke1.height;
        //console.log(taille + 'm');
        const poids = poke1.weight;
        //console.log(poids + 'kg');
        const cri = poke1.cries.latest;
        const sprite_off = poke1.sprites.other['official-artwork'].front_default;
        const gif = poke1.sprites.other.showdown.front_default;
        const sprite = poke1.sprites.versions['generation-iv'].platinum.front_default;
        const nameFr = poke2.names[4].name;
        let couleur = null;
        for (const pokemon of pokemons.pokemon) {
            if (pokemon.id === poke1.id) {
                couleur = pokemon.couleur;
                break;
            }
        }
        let desc = '';//poke2.flavor_text_entries[34].flavor_text;
        poke2.flavor_text_entries.forEach(val => {
            if (val.version.name == 'omega-ruby' && val.language.name == 'fr') {
                desc = val.flavor_text.replace(new RegExp(nameFr, 'gi'), '[pokemon]');
            }
        })
        const desc_rapide = poke2.genera[3].genus;
        let generation = poke2.generation.url.replace('/', ' ');
        const gen = generation.slice(-2).slice(0,1)
        let habitat = '';//poke2.habitat.name;
        pokemons.habitats.forEach(val => {
            if (poke2.habitat.name == val.name_english) {
                habitat = val.name_french;
            }
        })
        let stadeEvo = 1;
        const evolutionChain = poke3.chain;

        if (evolutionChain.species.name !== nameSpecies) {
            stadeEvo = 2;
            const secondStage = evolutionChain.evolves_to;
            
            if (!secondStage.some(evolution => evolution.species.name === nameSpecies)) {
                stadeEvo = 3;
            }
        }

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
            couleur: couleur,
            name: name,
            type1: type1,
            type2: type2,
            taille: taille,
            poids: poids,
            cri: cri,
            sprite_off: sprite_off,
            gif: gif,
            sprite: sprite,
            nameFr: nameFr,
            desc: desc,
            desc_rapide: desc_rapide,
            gen: gen,
            habitat: habitat,
            stadeEvo: stadeEvo
        };
        setPokemon(pokemonData);
    }
    /*useEffect(() => {
        
    }, []);*/
    function handleSubmit(e) {
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
                    const genSearch = generation.slice(-2).slice(0,1)
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
        setPokemon(null);
        window.location.reload();
    };

    // pokedex, gmax, mega, desc rapide ex : pokemon graine "genera", generation, habitat
    return (
        <div className='relative containerClassic'>
            <div className='flex flex-col gap-4' id='classic'>
                {isLoading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) : (
                    <div className='flex justify-center'>
                        <form
                            className='shadow-lg p-4'
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
                    </div>
                )}
                {error ? <p>{error}</p> : null}
                {guesses.length > 0 ? 
                    <div className='flex justify-center flex-col items-center'>
                        <h3>Essais : {guesses.length}</h3>
                        <Indice modeJeu='classic' pokemon={pokemon} nbEssais={guesses.length} />
                        <PokemonTable guesses={guesses} pokemon={pokemon} nbEssais={guesses.length}/>
                    </div> : ''}
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

export default Classic