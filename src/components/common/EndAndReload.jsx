import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function EndAndReload({ pokemon, onReset, nbEssais }) {
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
            <div>
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
}