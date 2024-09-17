export default function Indice({modeJeu, pokemon, nbEssais}) {
    console.log(nbEssais);
    function showIndice(e, typeIndice) {
        switch (typeIndice) {
            case 'gen':
                if (nbEssais > 3) {
                    e.target.children[0].innerHTML = (pokemon.gen == '1' ? '1 (Rouge/Bleu)' : (pokemon.gen == '2' ? '2 (Or/Argent)' : '3 (Rubis/Saphir)'));
                }
                break;
            case 'cri':
                if (nbEssais > 1) {
                    console.log(e);
                    e.target.children[0].innerHTML = "<div class='audio-player'><audio controls src="+pokemon.cri+"></audio><button class='play-button'></button></div>";
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
                }
                break;
            case 'desc_courte':
                if (nbEssais > 9) {
                    e.target.children[0].innerHTML = pokemon.desc_rapide;
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
                <div><div onClick={(e) => showIndice(e,'gen')}>Génération<div>4 essai(s)</div></div></div>
                <div><div onClick={(e) => showIndice(e,'cri')}>Cri<div>7 essai(s)</div></div></div>
                <div><div onClick={(e) => showIndice(e,'desc_courte')}>Description<div>10 essai(s)</div></div></div>
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