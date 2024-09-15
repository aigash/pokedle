export default function Indice({modeJeu, pokemon, nbEssais}) {
    function showIndice(e, typeIndice) {
        switch (typeIndice) {
            case 'gen':
                if (!nbEssais <= 3) {
                    e.target.children[0].textContent = (pokemon.gen == '1' ? '1 (Rouge/Bleu)' : (pokemon.gen == '2' ? '2 (Or/Argent)' : '3 (Rubis/Saphir)'));
                }
                break;
            case 'cri':
                if (!nbEssais <= 3) {
                    console.log(e);
                }
                break;
            case 'desc_courte':
                if (!nbEssais <= 9) {
                    e.target.children[0].textContent = pokemon.desc_rapide;
                }
                break;
            case 'empreintes':
                break;
            case 'type1':
                break;
            case 'type2':
                break;
        }

    }

    if (modeJeu == 'classic') {
        return <div className='indices'>
            <div></div>
            <div className='flex'>
                <div><div onClick={(e) => showIndice(e,'gen')}>Génération <div></div></div></div>
                <div><div onClick={(e) => showIndice(e,'cri')}>Cri <div></div></div></div>
                <div><div onClick={(e) => showIndice(e,'desc_courte')}>Description <div></div></div></div>
            </div>
        </div>
    } else if (modeJeu == 'pokedex') {
        return <div className='indices'>
            <div></div>
            <div>
                <div><div onClick={(e) => showIndice(e,'empreintes')}>Génération</div></div>
                <div><div onClick={(e) => showIndice(e,'type1')}></div></div>
                <div><div onClick={(e) => showIndice(e,'type2')}></div></div>
            </div>
        </div>
    }
}