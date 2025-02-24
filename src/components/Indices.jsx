export default function Indice({typeIndice, pokemon, nbEssais, nbRequis, numIndice}) {
    /*if (nbEssais < nbRequis) {
      return <div>{nbRequis - nbEssais} essai(s) restant(s)</div>;
    }*/

    function showIndice(e) {
        if (nbEssais < nbRequis) {
            return false;
        }
        
        const parentNode = e.target.parentNode;
        
        switch (typeIndice) {
            case 'Gen':
                parentNode.innerHTML = (pokemon.gen == '1' ? '1 (Rouge/Bleu)' : (pokemon.gen == '2' ? '2 (Or/Argent)' : '3 (Rubis/Saphir)'));
                break;
            case 'Cri':
                // Créer l'audio element avant de l'insérer dans le DOM
                const audio = new Audio(pokemon.cri);
                audio.preload = 'auto';
                
                parentNode.innerHTML = "<div class='audio-player'><button class='play-button'></button></div>";
                
                requestAnimationFrame(() => {
                    const audioPlayer = parentNode.querySelector('.audio-player');
                    if (!audioPlayer) return;

                    const playButton = audioPlayer.querySelector('.play-button');
                    
                    if (playButton) {
                        playButton.addEventListener('click', async () => {
                            try {
                                if (audio.paused) {
                                    await audio.play();
                                    playButton.classList.add('playing');
                                    
                                    // Réinitialiser le bouton quand le son est terminé
                                    audio.onended = () => {
                                        playButton.classList.remove('playing');
                                        audio.currentTime = 0;
                                    };
                                } else {
                                    audio.pause();
                                    audio.currentTime = 0;
                                    playButton.classList.remove('playing');
                                }
                            } catch (error) {
                                console.error('Erreur lors de la lecture du son:', error);
                            }
                        });
                    }
                });
                break;
            case 'Desc.':
                parentNode.innerHTML = pokemon.desc;
                break;
            case 'Empreintes':
                break;
            case 'Type1':
                parentNode.innerHTML = pokemon.type1.name_french;
                break;
            case 'Type2':
                parentNode.innerHTML = pokemon.type2 === 'Aucun' ? 'Aucun' : pokemon.type2.name_french;
                break;
        }
    }

    return (<div className={"blocAth rounded-xl flex-col p-3" + (nbEssais < nbRequis ? " indiceDesac" : "")}>
                <h3>{typeIndice}</h3>
                <div onClick={(e) => showIndice(e)} className='text-sm'>
                    <img src={`/src/assets/indice${numIndice}.png`} alt={`Indice ${numIndice}`}></img>
                </div>
            </div>);
}