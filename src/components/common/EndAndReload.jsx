export default function EndAndReload({ pokemon, onReset, nbEssais }) {
    if (!pokemon) return null;

    return (
        <div className='alerte fixed'>
            <div>
                <h2>Bsahtek, tu as trouvé {pokemon} !</h2>
                <p>Nombre d&apos;essais : {nbEssais}</p>
                <button
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={onReset}
                >
                    Rejouer
                </button>
            </div>
        </div>
    );
}