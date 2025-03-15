import PropTypes from 'prop-types';
import PokemonRow from './PokemonRow';

export default function PokemonTable({ guesses, pokemon }) {
    if (!guesses?.length || !pokemon) return null;

    return (
        <div className='w-[90%] lg:w-auto overflow-x-scroll'>
            <table className='tableClassic rounded-xl shadow-lg border-separate border-spacing-2 bg-white/80 border border-white/90'>
                <thead>
                    <tr className='text-black'>
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
        </div>
    );
}

PokemonTable.propTypes = {
    guesses: PropTypes.array.isRequired,
    pokemon: PropTypes.object.isRequired,
};