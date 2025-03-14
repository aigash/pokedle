import { PropTypes } from 'prop-types';
import pokemonData from '../../pokemon.json';

export default function Pokedex({ isModalOpen, onClose }) {
    const getImageUrl = (imgPath) => {
        return `/assets/img/pokemons/${imgPath}`;
    };
    return (
        <>
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <div className="max-w-[90%] max-h-[85%] flex flex-wrap opacity-15 hover:opacity-100 transition-all gap-0.5">
                        {pokemonData.pokemon.map((pokemon, index) => (
                            <div key={index} className={`relative group`}>
                                <img 
                                    src={getImageUrl(pokemon.img)}
                                    className="w-[56px] h-[56px]"
                                />
                                <span className="hidden absolute bottom-full left-1/2 bg-black/70 text-white p-1.5 rounded z-10 opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-200 ease-in-out">{pokemon.name_french}</span>
                            </div>
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