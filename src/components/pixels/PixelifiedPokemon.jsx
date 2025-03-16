import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Pixelify } from 'react-pixelify';

export default function PixelifiedPokemon({ spriteOff, pixelSize }) {
    // State pour le responsive
    const [dimensions, setDimensions] = useState({
        width: 538,
        height: 450
    });

    // Responsive
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 380) {
                setDimensions({
                    width: 260,
                    height: 220
                });
            } else if (window.innerWidth < 500) {
                setDimensions({
                    width: 320,
                    height: 280
                });
            } else if (window.innerWidth < 640) {
                setDimensions({
                    width: 420,
                    height: 380
                });
            } else {
                setDimensions({
                    width: 538,
                    height: 450
                });
            }
        }
        
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id='pixels_pokedex' className='p-3 rounded-xl bg-white mb-6'>
            <h2 className='text-black'>Quel Pokémon a été pixelisé ?</h2>
            <div>
                <Pixelify 
                    src={spriteOff}
                    pixelSize={pixelSize}
                    width={dimensions.width}
                    height={dimensions.height}
                />
            </div>
        </div>
    );
}

PixelifiedPokemon.propTypes = {
    spriteOff: PropTypes.string.isRequired,
    pixelSize: PropTypes.number.isRequired
};