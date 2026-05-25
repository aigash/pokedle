import PropTypes from 'prop-types';

export default function EndAndReloadMini({ pokemon, nbEssais, onReset }) {
    return (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center z-100">
            <div className="bg-(--sombre)/60 backdrop-blur-xs p-4 rounded-full shadow-lg flex gap-6 items-center">
                <p className="text-white font-medium">Bien joué ! Tu as trouvé {pokemon.nameFr} en {nbEssais} essais.</p>

                <button
                    className="bg-(--secondary-jaune) text-(--text-violet-color) font-semibold italic px-4 py-2 rounded-full focus:outline-hidden"
                    onClick={onReset}
                >
                    Rejouer
                </button>
            </div>
        </div>
    );
}

EndAndReloadMini.propTypes = {
    pokemon: PropTypes.shape({
        nameFr: PropTypes.string.isRequired
    }).isRequired,
    nbEssais: PropTypes.number.isRequired,
    onReset: PropTypes.func.isRequired
};