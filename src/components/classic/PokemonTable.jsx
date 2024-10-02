import PokemonRow from './PokemonRow';
export default function PokemonTable({guesses, pokemon}) {
    const rows = [];

    for(let guess of guesses) {
        rows.push(<PokemonRow guess={guess} pokemon={pokemon} key={guess.nameFr} />);
    }

    return <table className='tableClassic bg-white rounded-md shadow-lg'>
                <thead>
                    <tr>
                        <th>Pokemon</th>
                        <th>Type 1</th>
                        <th>Type 2</th>
                        <th>Couleur(s)</th>
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