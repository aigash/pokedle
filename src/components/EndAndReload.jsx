export default function EndAndReload({pokemon, onReset, nbrEssais}) {
    return <div className='alerte fixed'>
                <div>
                    <h2>Bsahtek, tu as trouvé {pokemon}</h2>
                    <p>Nombre d'essais : {nbrEssais}</p>
                    <button
                        onClick={onReset}
                    >
                        Rejouer
                    </button>
                </div>
            </div>
    
}