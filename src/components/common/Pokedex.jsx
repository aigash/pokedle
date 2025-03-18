import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import pokemonData from '../../pokemon.json';

export default function Pokedex({ isModalOpen, onClose }) {
    const [isMobile, setIsMobile] = useState(false);
    // Détection du mode mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Vérification initiale
        checkIfMobile();
        
        // Ajout d'un écouteur pour les changements de taille d'écran
        window.addEventListener('resize', checkIfMobile);
        
        // Nettoyage
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const getImageUrl = (imgPath) => {
        return `${import.meta.env.BASE_URL}/assets/img/pokemons/${imgPath}`;
    };

    // Empêcher le défilement du body quand la modale est ouverte
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    if (!isModalOpen) return null;

    return (
        <div 
            className={`fixed inset-0 bg-white/90 z-50 flex ${isMobile ? 'flex-col' : 'items-center justify-center'}`}
            onClick={isMobile ? undefined : onClose}
        >
            {isMobile ? (
                <>
                    <div className="sticky top-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-10">
                        <h2 className="text-xl font-bold">Pokédex</h2>
                        <button 
                            onClick={onClose}
                            className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                            aria-label="Fermer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                            {pokemonData.pokemon.map((pokemon, index) => (
                                <div key={index} className="relative group flex flex-col items-center">
                                    <img 
                                        src={getImageUrl(pokemon.img)}
                                        className="w-[56px] h-[56px]"
                                        alt={pokemon.name_french}
                                    />
                                    <span className="text-xs text-center mt-1">{pokemon.name_french}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                // Version desktop: modale centrée avec hover
                <div 
                    className="max-w-[90%] max-h-[85%] flex flex-wrap opacity-15 hover:opacity-100 transition-all gap-0.5 overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {pokemonData.pokemon.map((pokemon, index) => (
                        <div key={index} className="relative group">
                            <img 
                                src={getImageUrl(pokemon.img)}
                                className="w-[56px] h-[56px]"
                                alt={pokemon.name_french}
                            />
                            <span className="hidden absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black/70 text-white p-1.5 rounded z-10 opacity-0 group-hover:block group-hover:opacity-100 transition-opacity duration-200 ease-in-out whitespace-nowrap">
                                {pokemon.name_french}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

Pokedex.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};