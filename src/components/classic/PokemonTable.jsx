import PropTypes from 'prop-types';
import PokemonRow from './PokemonRow';
import React from 'react';

function PokemonTableComponent({ guesses, pokemon }) {
    if (!guesses?.length || !pokemon) return null;

    return (
        <div className='w-full overflow-x-auto overflow-y-visible flex flex-col gap-10 py-4'>
            {guesses.map((guess, index) => (
                <PokemonRow
                    key={`${guess.nameFr}-${index}`}
                    guess={guess}
                    pokemon={pokemon}
                    index={guesses.length - index}
                />
            ))}
        </div>
    );
}
PokemonTableComponent.propTypes = {
    guesses: PropTypes.array.isRequired,
    pokemon: PropTypes.object.isRequired,
};

function areEqual(prevProps, nextProps) {
    // Re-render if guesses length changes or if the last guess is different
    return (
        prevProps.guesses.length === nextProps.guesses.length &&
        prevProps.pokemon.id === nextProps.pokemon.id &&
        (prevProps.guesses.length === 0 || 
        prevProps.guesses[prevProps.guesses.length - 1].id === 
        nextProps.guesses[nextProps.guesses.length - 1].id)
    );
}
const PokemonTable = React.memo(PokemonTableComponent, areEqual);

export default PokemonTable;

