import PropTypes from 'prop-types';

import indice1 from '../../assets/img/icones/indice1.png';
import indice2 from '../../assets/img/icones/indice2.png';
import indice3 from '../../assets/img/icones/indice3.png';

export default function Indice({typeIndice, pokemon, nbEssais, nbRequis, numIndice}) {
    /*if (nbEssais < nbRequis) {
      return <div>{nbRequis - nbEssais} essai(s) restant(s)</div>;
    }*/
      const getIndiceImage = () => {
        switch(numIndice) {
            case 1: return indice1;
            case 2: return indice2;
            case 3: return indice3;
            default: return indice1;
        }
    };

    function showIndice(e) {
        if (nbEssais < nbRequis) {
            return false;
        }
        
        const parentNode = e.target.parentNode;
        let audio;
        
        switch (typeIndice) {
            case 'Gen':
                parentNode.innerHTML = (
                        pokemon.gen == '1' ? 
                            '<div class="flex flex-col items-center"><p class="font-semibold text-2xl">1</p><p>(Rouge/Bleu)</p></div>'
                        : (pokemon.gen == '2' ? 
                            '<div class="flex flex-col items-center"><p class="font-semibold text-2xl">2</p><p>(Or/Argent)</p></div>' 
                        : '<div class="flex flex-col items-center"><p class="font-semibold text-2xl">3</p><p>(Rubis/Saphir)</p></div>'
                        )
                );
                break;
            case 'Cri':
                // Créer l'audio element avant de l'insérer dans le DOM
                audio = new Audio(pokemon.cri);
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
                parentNode.innerHTML = '<div><p class="font-semibold">' + pokemon.desc_courte + '</p></div>';
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
                    <img src={getIndiceImage()} alt={`Indice ${numIndice}`}></img>
                </div>
            </div>);
}

Indice.propTypes = {
    typeIndice: PropTypes.string.isRequired,
    pokemon: PropTypes.shape({
        gen: PropTypes.string,
        cri: PropTypes.string,
        desc_courte: PropTypes.string,
        type1: PropTypes.shape({
            name_french: PropTypes.string,
        }),
        type2: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                name_french: PropTypes.string,
            }),
        ]),
    }).isRequired,
    nbEssais: PropTypes.number.isRequired,
    nbRequis: PropTypes.number.isRequired,
    numIndice: PropTypes.number.isRequired,
};