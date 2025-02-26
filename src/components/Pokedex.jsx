import { PropTypes } from 'prop-types';

export default function Pokedex({ isModalOpen, onClose }) {
    return (
        <>
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <div className="max-w-[90%] h-[90%] flex justify-center opacity-30 hover:opacity-100 transition-all">
                        <img 
                            src="src/assets/background.png" 
                            alt="Pokedex" 
                            className=""
                        />
                    </div>
                </div>
            )}
        </>
    );
}

Pokedex.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};