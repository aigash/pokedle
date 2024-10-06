
export default function Indice({typeIndice, pokemon, nbEssais, nbRequis, numIndice}) {
    /*if (nbEssais < nbRequis) {
      return <div>{nbRequis - nbEssais} essai(s) restant(s)</div>;
    }*/

    function showIndice(e) {
        if (nbEssais < nbRequis) {
            return false;
        }
        
        switch (typeIndice) {
            case 'Gen':
                e.target.parentNode.innerHTML = (pokemon.gen == '1' ? '1 (Rouge/Bleu)' : (pokemon.gen == '2' ? '2 (Or/Argent)' : '3 (Rubis/Saphir)'));
                break;
            case 'Cri':
                e.target.parentNode.innerHTML = "<div class='audio-player'><audio controls src="+pokemon.cri+"></audio><button class='play-button'></button></div>";
                    setTimeout(() => {
                        const audioPlayer = e.target.querySelector('.audio-player');
                        const audio = audioPlayer.querySelector('audio');
                        const playButton = audioPlayer.querySelector('.play-button');
                        
                        playButton.addEventListener('click', () => {
                            if (audio.paused) {
                                audio.play();
                                playButton.classList.add('playing');
                            } else {
                                audio.pause();
                                audio.currentTime = 0;
                                playButton.classList.remove('playing');
                            }
                        });
                    }, 0);
                break;
            case 'Desc.':
                e.target.parentNode.innerHTML = pokemon.desc_rapide;
                break;
            case 'Empreintes':
                break;
            case 'Type1':
                break;
            case 'Type2':
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