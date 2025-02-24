import axios from 'axios';

export const fetchPokemonData = async (pokemonId) => {
    try {
        const [pokeResponse, speciesResponse] = await Promise.all([
            axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
        ]);

        const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);

        return {
            pokeData: pokeResponse.data,
            speciesData: speciesResponse.data,
            evolutionData: evolutionResponse.data
        };
    } catch (error) {
        throw new Error("Erreur lors de la récupération des données Pokémon");
    }
};

export const formatPokemonData = (rawData, pokemons) => {
    const { pokeData, speciesData, evolutionData } = rawData;
    
    let type1 = '';
    let type2 = '';
    
    pokemons.types.forEach(val => {
        if (pokeData.types[0].type.name === val.name_english) {
            type1 = val;
        }

        if (pokeData.types.length > 1) {
            if (pokeData.types[1].type.name === val.name_english) {
                type2 = val;
            }
        } else {
            type2 = 'Aucun';
        }
    });

    let stadeEvo = 1;
    const evolutionChain = evolutionData.chain;
    const nameSpecies = pokeData.species.name;

    if (evolutionChain.species.name !== nameSpecies) {
        stadeEvo = 2;
        const secondStage = evolutionChain.evolves_to;
        
        if (!secondStage.some(evolution => evolution.species.name === nameSpecies)) {
            stadeEvo = 3;
        }
    }

    let habitat = '';
    pokemons.habitats.forEach(val => {
        if (speciesData.habitat.name === val.name_english) {
            habitat = val.name_french;
        }
    });

    const pokemonInfo = pokemons.pokemon.find(p => p.id === pokeData.id);

    return {
        couleur: pokemonInfo?.couleur || [],
        type1: type1,
        type2: type2,
        taille: pokeData.height,
        poids: pokeData.weight,
        sprite_off: pokeData.sprites.other['official-artwork'].front_default,
        gif: pokeData.sprites.other.showdown.front_default,
        sprite: pokeData.sprites.versions['generation-iv'].platinum.front_default,
        nameFr: speciesData.names[4].name,
        gen: speciesData.generation.url.replace('/', ' ').slice(-2).slice(0,1),
        habitat: habitat,
        stadeEvo: stadeEvo,
        cri: pokeData.cries.latest,
        desc: speciesData.flavor_text_entries.find(entry => 
            entry.version.name === 'omega-ruby' && entry.language.name === 'fr'
        )?.flavor_text || ''
    };
};
