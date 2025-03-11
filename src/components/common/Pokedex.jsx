import { PropTypes } from 'prop-types';
import React from 'react';
import pokemonData from '../../pokemon.json';

export default function Pokedex({ isModalOpen, onClose }) {
    return (
        <>
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <div className="max-w-[90%] max-h-[85%] flex flex-wrap opacity-30 hover:opacity-100 transition-all gap-0.5">
                        {pokemonData.pokemon.map((pokemon, index) => (
                            <img 
                                key={index}
                                src={`src/assets/img/pokemons/${pokemon.img}`} 
                                title={pokemon.name_french} 
                                className="w-[56px] h-[56px]"
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

Pokedex.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};