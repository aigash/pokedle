import useSWR from 'swr';
import axios from 'axios';
import {useState, useEffect} from 'react';
import pokemons from './pokemon.json';
import PokemonRow from './components/classic/PokemonRow';

const randNumber = nombreAleatoire(1, 386);
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const habitats = [
    { name: "cave", trad: "Grottes" },
    { name: "forest", trad: "Forêts" },
    { name: "grassland", trad: "Champs" },
    { name: "mountain", trad: "Montagnes" },
    { name: "rare", trad: "Rares" },
    { name: "rough-terrain", trad: "Milieux hostiles" },
    { name: "sea", trad: "Mers" },
    { name: "urban", trad: "Urbains" },
    { name: "waters-edge", trad: "Marécages" }
]

function Ldle() {
    // se renseigner sur useMemo;
    const [searchId, setSearchId] = useState(null);
    const [guesses, setGuesses] = useState([]);
    const [pokemon, setPokemon] = useState(null);

    const { data: poke1, error: error1, isLoading: isLoading1 } = useSWR('https://pokeapi.co/api/v2/pokemon/' + randNumber, fetcher);
    const { data: poke2, error: error2, isLoading: isLoading2 } = useSWR(poke1?.species.url, fetcher);
    const { data: poke3, error: error3, isLoading: isLoading3 } = useSWR(poke2?.evolution_chain.url, fetcher);
    
    const error = error1 || error2 || error3;
    const isLoading = isLoading1 || isLoading2 || isLoading3;

    if (poke3 && !pokemon) {
        const name = poke1.name;
        const types = poke1.types;
        const taille = (poke1.height / 10).toFixed(1);
        //console.log(taille + 'm');
        const poids = (poke1.weight / 10).toFixed(1);
        //console.log(poids + 'kg');
        const cri = poke1.cries.latest;
        const sprite_off = poke1.sprites.other['official-artwork'].front_default;
        const gif = poke1.sprites.other.showdown.front_default;
        const sprite = poke1.sprites.versions['generation-iv'].platinum.front_default;
        const nameFr = poke2.names[4].name;
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
        habitats.forEach(val => {
            if (poke2.habitat.name == val.name) {
                habitat = val.trad;
            }
        })
        var stadeEvo = 0;
        if (poke3.chain.species.name == name) {
            stadeEvo = 1;
        } else if (poke3.chain.evolves_to.species == name) {
            stadeEvo = 2;
        } else {
            stadeEvo = 3;
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
        console.log(pokemon);
        console.log(guesses);
    }, [guesses]);*/

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const pokeSearch = formData.get('pokeSearch');

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
                const pokeSearch3 = await axios.get(pokeSearch2?.data?.evolution_chain.url);

                if (pokeSearch3) {
                    const nameSearch = pokeSearch1.data.name;
                    const typesSearch = pokeSearch1.data.types;
                    const tailleSearch = (pokeSearch1.data.height / 10).toFixed(1);
                    const poidsSearch = (pokeSearch1.data.weight / 10).toFixed(1);
                    const sprite_offSearch = pokeSearch1.data.sprites.other['official-artwork'].front_default;
                    const gifSearch = pokeSearch1.data.sprites.other.showdown.front_default;
                    const spriteSearch = pokeSearch1.data.sprites.versions['generation-iv'].platinum.front_default;
                    const nameFrSearch = pokeSearch2.data.names[4].name;
                    let generation = pokeSearch2.data.generation.url.replace('/', ' ');
                    const genSearch = generation.slice(-2).slice(0,1)
                    let habitatSearch = '';//poke2.habitat.name;
                    habitats.forEach(val => {
                        if (pokeSearch2.data.habitat.name == val.name) {
                            habitatSearch = val.trad;
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

                    var stadeEvoSearch = 0;
                    if (pokeSearch3.data.chain.species.name == nameSearch) {
                        stadeEvoSearch = 1;
                    } else if (pokeSearch3.data.chain.evolves_to[0].species.name == nameSearch) {
                        stadeEvoSearch = 2;
                    } else {
                        stadeEvoSearch = 3;
                    }
        
                    const newGuess = {
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
                    setGuesses(prevGuesses => [...prevGuesses, newGuess]);
                }
            } catch(error) {
                console.log(error);
            }
        }

        fetchData();
        
    }
    // pokedex, gmax, mega, desc rapide ex : pokemon graine "genera", generation, habitat
    return (
        <div className='flex flex-col gap-4'>
            {isLoading ? (
                <span className="loading loading-spinner loading-lg"></span>
            ) : (
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <input name='pokeSearch' id='pokeSearch' placeholder="Tape un nom de Pokémon..."/>
                    <button type='submit'>GO</button>
                </form>
            )}
            {error ? <p>{error}</p> : null}
            <PokemonTable guesses={guesses} pokemon={pokemon}/>
        </div>
    )
}

function nombreAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PokemonTable({guesses, pokemon}) {
    const rows = [];

    for(let guess of guesses) {
        rows.push(<PokemonRow guess={guess} pokemon={pokemon} key={guess.nameFr} />);
    }

    return <table>
                <thead>
                    <tr>
                        <th>Pokemon</th>
                        <th>Type 1</th>
                        <th>Type 2</th>
                        <th>Habitat</th>
                        <th>Stade d&apos;évolution</th>
                        <th>Hauteur</th>
                        <th>Poids</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
}

export default Ldle