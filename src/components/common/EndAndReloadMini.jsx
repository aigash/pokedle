import PropTypes from 'prop-types';

export default function EndAndReloadMini({ pokemon, nbEssais, onReset }) {
    return (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-white p-3 rounded-xl shadow-lg flex items-center">
                <div className="mr-3">
                    <p className="font-bold">Bien joué ! Tu as trouvé {pokemon.nameFr} en {nbEssais} essais.</p>
                </div>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
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