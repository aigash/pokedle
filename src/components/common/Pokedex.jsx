import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import pokemonData from '../../pokemon.json';

import MotifBgModale from '../../assets/img/backgrounds/motif-bg/points_modale.svg';

export default function Pokedex({ isModalOpen, onClose }) {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedGen, setSelectedGen] = useState('all');

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

    // Filtrage des Pokémon par génération
    const getFilteredPokemon = () => {
        switch (selectedGen) {
            case 'gen1':
                return pokemonData.pokemon.filter(p => p.id >= 1 && p.id <= 151);
            case 'gen2':
                return pokemonData.pokemon.filter(p => p.id >= 152 && p.id <= 251);
            case 'gen3':
                return pokemonData.pokemon.filter(p => p.id >= 252 && p.id <= 386);
            default:
                return pokemonData.pokemon;
        }
    };

    const filteredPokemon = getFilteredPokemon();

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
            className={`alerte fixed z-100 flex ${isMobile ? 'flex-col' : 'items-center justify-center'}`}
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
                            {filteredPokemon.map((pokemon, index) => (
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
                    className="max-w-[1400px] max-h-[85%] rounded-4xl bg-[#091044] py-6 px-11.5 border border-(--secondary-jaune) flex flex-col gap-6 relative overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Image de fond avec centre positionné sur le coin haut-gauche */}
                    <div
                        className='absolute inset-0 pointer-events-none z-0'
                        style={{
                            backgroundImage: `url(${MotifBgModale})`,
                            backgroundPosition: '0 0',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'auto',
                            transform: 'translate(-20%, -42%)',
                            mixBlendMode: 'overlay'
                        }}
                    />

                    <div className="relative z-1">
                        <h1 className="text-white text-[86px] font-bold italic leading-[1.2]" style={{ textShadow: '2px 2px 0 var(--secondary-jaune)' }}>POKÉDEX</h1>
                        <h2 className="text-2xl font-bold italic text-white">CONSULTE TOUS LES POKÉMON !</h2>
                    </div>

                    <div className="filtres flex gap-4 items-center z-1">
                        <button
                            onClick={() => setSelectedGen('all')}
                            className={`rounded-2xl border border-(--secondary-jaune) py-3 px-6 font-bold italic cursor-pointer ${selectedGen === 'all' ? 'bg-(--secondary-jaune) text-(--main-color)' : 'text-(--secondary-jaune)'}`}
                        >
                            TOUS
                        </button>
                        <button
                            onClick={() => setSelectedGen('gen1')}
                            className={`rounded-2xl border border-(--secondary-jaune) py-3 px-6 font-bold italic cursor-pointer ${selectedGen === 'gen1' ? 'bg-(--secondary-jaune) text-(--main-color)' : 'text-(--secondary-jaune)'}`}
                        >
                            GÉN. 1
                        </button>
                        <button
                            onClick={() => setSelectedGen('gen2')}
                            className={`rounded-2xl border border-(--secondary-jaune) py-3 px-6 font-bold italic cursor-pointer ${selectedGen === 'gen2' ? 'bg-(--secondary-jaune) text-(--main-color)' : 'text-(--secondary-jaune)'}`}
                        >
                            GÉN. 2
                        </button>
                        <button
                            onClick={() => setSelectedGen('gen3')}
                            className={`rounded-2xl border border-(--secondary-jaune) py-3 px-6 font-bold italic cursor-pointer ${selectedGen === 'gen3' ? 'bg-(--secondary-jaune) text-(--main-color)' : 'text-(--secondary-jaune)'}`}
                        >
                            GÉN. 3
                        </button>
                    </div>

                    <div className="grid grid-cols-10 gap-4">
                        {filteredPokemon.map((pokemon, index) => (
                            <div key={index} className="relative p-4 rounded-2xl border border-(--border) flex flex-col items-center gap-1">
                                <div className="flex flex-col items-center">
                                    <span className="text-(--secondary-jaune) font-bold italic leading-[1.2]">#{String(pokemon.id).padStart(3, '0')}</span>
                                    <p className="text-white font-bold italic">{pokemon.name_french}</p>
                                </div>
                                <img
                                    src={getImageUrl(pokemon.img)}
                                    className=""
                                    alt={pokemon.name_french}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

Pokedex.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};