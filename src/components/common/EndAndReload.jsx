import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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

    if (!pokemon) return null;

    return (
        <div className='alerte fixed'>
            <div className='relative'>
                <button 
                    className="absolute top-2 right-2 text-black focus:outline-none bg-white"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className='font-bold text-lg'>Bien joué, tu as trouvé {pokemon.nameFr} !</h2>
                <p>Nombre d&apos;essais : {nbEssais}</p>
                <img className='mb-4' src={pokemon.sprite_off} alt="Trophée" />
                <button
                    ref={buttonRef}
                    className="bg-red-500 focus:outline-none text-white hover:bg-red-600"
                    onClick={onReset}
                >
                    Rejouer
                </button>
            </div>
        </div>
    );
}

EndAndReload.propTypes = {
    pokemon: PropTypes.shape({
        nameFr: PropTypes.string.isRequired,
        sprite_off: PropTypes.string.isRequired,
    }).isRequired,
    onReset: PropTypes.func.isRequired,
    nbEssais: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
}