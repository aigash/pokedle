import { useBaseGame } from "./useBaseGame";

export function useClassicGame(pokemons) {
    const baseGame = useBaseGame(pokemons);

    const { pokemon: mysteryPokemon, ...rest } = baseGame;

    return {
        mysteryPokemon,
        ...rest
    };
}