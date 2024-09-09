export default function PokemonRow ({pokemon}) {
    console.log(pokemon);
    return <tr>
        <td><img src={pokemon.sprite_off} /></td>
        <td>{pokemon.types[0].type.name}</td>
        <td>{(pokemon.types[1]? pokemon.types[1].type.name: 'Aucun')}</td>
        <td>{pokemon.habitat}</td>
        <td>{pokemon.stadeEvo}</td>
        <td>{pokemon.taille}m</td>
        <td>{pokemon.poids}kg</td>
    </tr>
}