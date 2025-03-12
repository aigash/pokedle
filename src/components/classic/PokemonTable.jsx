import PropTypes from 'prop-types';
import PokemonRow from './PokemonRow';

export default function PokemonTable({ guesses, pokemon }) {
    if (!guesses?.length || !pokemon) return null;

    return (
        <table className='tableClassic rounded-xl shadow-lg border-separate border-spacing-2'>
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
                {guesses.map((guess, index) => (
                    <PokemonRow 
                        key={`${guess.nameFr}-${index}`}
                        guess={guess} 
                        pokemon={pokemon} 
                    />
                ))}
            </tbody>
        </table>
    );
}

PokemonTable.propTypes = {
    guesses: PropTypes.array.isRequired,
    pokemon: PropTypes.object.isRequired,
};