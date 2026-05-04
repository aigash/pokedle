import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import InsecteIcon from '../../assets/img/icones/types/insecte.svg';
import TenebreIcon from '../../assets/img/icones/types/tenebre.svg';
import DragonIcon from '../../assets/img/icones/types/dragon.svg';
import ElectriqueIcon from '../../assets/img/icones/types/electrique.svg';
import FeeIcon from '../../assets/img/icones/types/fee.svg';
import CombatIcon from '../../assets/img/icones/types/combat.svg';
import FeuIcon from '../../assets/img/icones/types/feu.svg';
import VolIcon from '../../assets/img/icones/types/vol.svg';
import SpectreIcon from '../../assets/img/icones/types/spectre.svg';
import PlanteIcon from '../../assets/img/icones/types/plante.svg';
import SolIcon from '../../assets/img/icones/types/sol.svg';
import GlaceIcon from '../../assets/img/icones/types/glace.svg';
import NormalIcon from '../../assets/img/icones/types/normal.svg';
import PoisonIcon from '../../assets/img/icones/types/poison.svg';
import PsyIcon from '../../assets/img/icones/types/psy.svg';
import RocheIcon from '../../assets/img/icones/types/roche.svg';
import AcierIcon from '../../assets/img/icones/types/acier.svg';
import EauIcon from '../../assets/img/icones/types/eau.svg';

import ArrowRight from '../../assets/img/icones/arrow-right.svg';
import MotifBgVictoire from '../../assets/img/backgrounds/motif-bg/points_modale.svg';

const typeIcons = {
    'Insecte': InsecteIcon,
    'Ténèbres': TenebreIcon,
    'Dragon': DragonIcon,
    'Électrik': ElectriqueIcon,
    'Fée': FeeIcon,
    'Combat': CombatIcon,
    'Feu': FeuIcon,
    'Vol': VolIcon,
    'Spectre': SpectreIcon,
    'Plante': PlanteIcon,
    'Sol': SolIcon,
    'Glace': GlaceIcon,
    'Normal': NormalIcon,
    'Poison': PoisonIcon,
    'Psy': PsyIcon,
    'Roche': RocheIcon,
    'Acier': AcierIcon,
    'Eau': EauIcon,
};

export default function EndAndReload({ pokemon, onReset, nbEssais, onClose }) {
    const buttonRef = useRef(null);
    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.focus(); // Mettre le focus sur le bouton
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                buttonRef.current.click();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    console.log(pokemon);

    if (!pokemon) return null;

    return (
        <div className='alerte fixed z-100'>
            <div className='relative bg-[#091044] rounded-4xl border border-(--secondary-jaune) p-6 w-[860px] flex flex-col gap-6 overflow-hidden'>
                {/* Image de fond avec centre positionné sur le coin haut-gauche */}
                <div
                    className='absolute inset-0 pointer-events-none z-0'
                    style={{
                        backgroundImage: `url(${MotifBgVictoire})`,
                        backgroundPosition: '0 0',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'auto',
                        transform: 'translate(-36%, -42%)',
                        mixBlendMode: 'overlay'
                    }}
                />
                <button 
                    className="absolute top-6 right-6 text-(--text-secondary-color) focus:outline-hidden cursor-pointer z-10"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="z-1">
                    <h1 className="text-[86px] font-bold italic text-white text-center leading-[1.2]" style={{ textShadow: '2px 2px 0 var(--secondary-jaune)' }}>BRAVO !</h1>
                    <h2 className="text-2xl font-bold italic text-white text-center">TU AS TROUVÉ LE POKÉMON !</h2>
                </div>

                <div className="flex justify-between items-center w-[650px] mx-auto z-1">
                    <img className="max-h-[320px] max-w-[320px]" src={pokemon.gif} alt="Trophée" />
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <h3 className="text-(--secondary-jaune) text-3xl font-semibold italic uppercase">{pokemon.nameFr}</h3>
                            <span className="text-white py-1 px-2 rounded-lg bg-(--main-color) italic">#{String(pokemon.id).padStart(3, '0')}</span>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <img src={typeIcons[pokemon.type1.name_french]} alt={pokemon.type1.name_french} className="w-9 h-9" />
                                <span className="text-white text-xl font-medium italic">{pokemon.type1.name_french}</span>
                            </div>
                            {pokemon.type2 !== 'Aucun' && (
                                <div className="flex items-center gap-2">
                                    <img src={typeIcons[pokemon.type2.name_french]} alt={pokemon.type2.name_french} className="w-9 h-9" />
                                    <span className="text-white text-xl font-medium italic">{pokemon.type2.name_french}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-10">
                            <div className="flex flex-col gap-2">
                                <p className="text-(--border)">Couleur(s)</p>
                                <p className="text-(--border)">Habitat</p>
                                <p className="text-(--border)">Stade d&apos;évolution</p>
                                <p className="text-(--border)">Taille</p>
                                <p className="text-(--border)">Poids</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-white">{pokemon.couleur[0]}, {pokemon.couleur[1]}</p>
                                <p className="text-white">{pokemon.habitat}</p>
                                <p className="text-white">{pokemon.stadeEvo}</p>
                                <p className="text-white">{(pokemon.taille / 10).toFixed(1)}m</p>
                                <p className="text-white">{(pokemon.poids / 10).toFixed(1)}kg</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[650px] mx-auto relative rounded-2xl border border-(--border) py-4 flex items-center justify-between">
                    <div className="flex-1 flex justify-center items-center">
                        <div>
                            <p className="text-(--border) font-medium">Tentative(s)</p>
                            <p className="text-white font-semibold text-2xl italic">1</p>
                        </div>
                    </div>
                    <div className="w-px h-[40px] bg-(--border)"></div>
                    <div className="flex-1 flex justify-center items-center">
                        <div>
                            <p className="text-(--border) font-medium">Temps</p>
                            <p className="text-white font-semibold text-2xl italic">1</p>
                        </div>
                    </div>
                    <div className="w-px h-[40px] bg-(--border)"></div>
                    <div className="flex-1 flex justify-center items-center">
                        <div>
                            <p className="text-(--border) font-medium">Score</p>
                            <p className="text-white font-semibold text-2xl italic">1</p>
                        </div>
                    </div>

                    <span className="text-(--secondary-jaune) text-sm italic font-semibold px-3 bg-[#091044] absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">Ta performance</span>
                </div>

                <div className="w-[650px] mx-auto flex items-center gap-6">
                    <button className="bg-white rounded-2xl text-(--main-color) px-6 py-3 flex-1 flex items-center justify-between cursor-pointer">
                        <div>
                            <p className="text-xl font-bold italic text-left">MODE INFINI</p>
                            <p className="text-sm text-left">Rejouer avec un autre Pokémon</p>
                        </div>
                        <p className="text-[34px] font-medium">∞</p>
                    </button>
                    <button className="bg-(--secondary-jaune) rounded-2xl text-(--main-color) px-6 py-3 flex-1 flex items-center justify-between cursor-pointer">
                        <div>
                            <p className="text-xl font-bold italic text-left">PROCHAIN DÉFI</p>
                            <p className="text-sm text-left">Mode de jeu suivant</p>
                        </div>
                        <img src={ArrowRight} alt="Icône flèche vers la droite" />
                    </button>
                </div>
            </div>
        </div>
    );
}

EndAndReload.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nameFr: PropTypes.string.isRequired,
        sprite_off: PropTypes.string.isRequired,
        gif: PropTypes.string.isRequired,
        type1: PropTypes.shape({
            name_french: PropTypes.string.isRequired,
        }).isRequired,
        type2: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                name_french: PropTypes.string.isRequired,
            }),
        ]).isRequired,
        couleur: PropTypes.arrayOf(PropTypes.string).isRequired,
        habitat: PropTypes.string.isRequired,
        stadeEvo: PropTypes.number.isRequired,
        taille: PropTypes.number.isRequired,
        poids: PropTypes.number.isRequired,
    }).isRequired,
    onReset: PropTypes.func.isRequired,
    nbEssais: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
}