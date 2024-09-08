import useSWR from 'swr';
import Search from './components/searchBar';
import {useState, useEffect} from 'react';
import pokemons from './pokemon.json';

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

    const { data: poke1, error: error1, isLoading: isLoading1 } = useSWR('https://pokeapi.co/api/v2/pokemon/' + randNumber, fetcher);
    const { data: poke2, error: error2, isLoading: isLoading2 } = useSWR(poke1?.species.url, fetcher);
    const { data: poke3, error: error3, isLoading: isLoading3 } = useSWR(poke2?.evolution_chain.url, fetcher);

    const { data: pokeSearch1, error: errorSearch1, isLoading: loadingSearch1 } = useSWR(searchId ? `https://pokeapi.co/api/v2/pokemon/${searchId}` : null, fetcher);
    const { data: pokeSearch2, error: errorSearch2, isLoading: loadingSearch2 } = useSWR(pokeSearch1?.species.url, fetcher);
    const { data: pokeSearch3, error: errorSearch3, isLoading: loadingSearch3 } = useSWR(pokeSearch2?.evolution_chain.url, fetcher);
    
    const error = error1 || error2 || error3;
    const isLoading = isLoading1 || isLoading2 || isLoading3;

    if (poke3) {
        const name = poke1.name;
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
        const pokemonData = {
            name: name,
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
    }

    useEffect(() => {

        if (pokeSearch3) {
            const nameSearch = pokeSearch1.name;
            const tailleSearch = (pokeSearch1.height / 10).toFixed(1);
            const poidsSearch = (pokeSearch1.weight / 10).toFixed(1);
            const sprite_offSearch = pokeSearch1.sprites.other['official-artwork'].front_default;
            const gifSearch = pokeSearch1.sprites.other.showdown.front_default;
            const spriteSearch = pokeSearch1.sprites.versions['generation-iv'].platinum.front_default;
            const nameFrSearch = pokeSearch2.names[4].name;
            let generation = pokeSearch2.generation.url.replace('/', ' ');
            const genSearch = generation.slice(-2).slice(0,1)
            let habitatSearch = '';//poke2.habitat.name;
            habitats.forEach(val => {
                if (pokeSearch2.habitat.name == val.name) {
                    habitatSearch = val.trad;
                }
            })
            var stadeEvoSearch = 0;
            if (pokeSearch3.chain.species.name == name) {
                stadeEvoSearch = 1;
            } else if (pokeSearch3.chain.evolves_to.species == name) {
                stadeEvoSearch = 2;
            } else {
                stadeEvoSearch = 3;
            }

            const newGuess = {
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

            setGuesses(prevGuesses => [...prevGuesses, newGuess])
        }
    }, [pokeSearch1, pokeSearch2, pokeSearch3]);

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
            
        </div>
    )
}

function nombreAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PokemonTable() {

    return <table>
                <thead>
                    <th>Pokemon</th>
                    <th>Type 1</th>
                    <th>Type 2</th>
                    <th>Habitat</th>
                    <th>Stade d'évolution</th>
                    <th>Hauteur</th>
                    <th>Poids</th>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
}

export default Ldle