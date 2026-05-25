import PropTypes from 'prop-types';
import { useState } from 'react';

import indice1 from '../../assets/img/icones/indice1_new.png';
import indice2 from '../../assets/img/icones/indice2_new.png';
import indice3 from '../../assets/img/icones/indice3_new.png';
import lockIcon from '../../assets/img/icones/lock.svg';
import shinyIcon from '../../assets/img/icones/shiny.svg';
import starsIcon from '../../assets/img/icones/stars.svg';

export default function Indice({typeIndice, pokemon, nbEssais, nbRequis, numIndice, onHintUsed}) {
    const [isUsed, setIsUsed] = useState(false);
    const [audioElement, setAudioElement] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const getIndiceImage = () => {
        switch(numIndice) {
            case 1: return indice1;
            case 2: return indice2;
            case 3: return indice3;
            default: return indice1;
        }
    };

    function showIndice() {
        if (nbEssais < nbRequis) {
            return false;
        }

        // Marquer l'indice comme utilisé
        setIsUsed(true);

        // Notifier le parent que l'indice a été utilisé
        if (onHintUsed) {
            onHintUsed(numIndice);
        }

        // Si c'est un cri, créer l'élément audio
        if (typeIndice === 'Cri' && !audioElement) {
            const audio = new Audio(pokemon.cri);
            audio.preload = 'auto';

            audio.addEventListener('loadedmetadata', () => {
                setDuration(Math.max(1, Math.floor(audio.duration)));
            });

            audio.addEventListener('timeupdate', () => {
                setCurrentTime(Math.floor(audio.currentTime));
            });

            audio.addEventListener('ended', () => {
                setIsPlaying(false);
                setCurrentTime(0);
            });

            setAudioElement(audio);
        }
    }

    const toggleAudio = async () => {
        if (!audioElement) return;

        try {
            if (audioElement.paused) {
                await audioElement.play();
                setIsPlaying(true);
            } else {
                audioElement.pause();
                audioElement.currentTime = 0;
                setIsPlaying(false);
                setCurrentTime(0);
            }
        } catch (error) {
            console.error('Erreur lors de la lecture du son:', error);
        }
    };

    const getIndiceContent = () => {
        if (typeIndice === 'Génération') {
            const genText = pokemon.gen == '1' ? '1 - Rouge / Bleu'
                : (pokemon.gen == '2' ? '2 - Or / Argent'
                : (pokemon.gen == '3' ? '3 - Rubis / Saphir' : '4 - Diamant / Perle'));
            return <div><p className="font-semibold text-lg text-white text-left">{genText}</p></div>;
        }

        if (typeIndice === 'Cri') {
            const progress = duration > 0 ? (audioElement?.currentTime / audioElement?.duration) * 100 : 0;
            return (
                <div className='flex items-center gap-2'>
                    <button className={`play-button transition-colors ${isPlaying ? 'playing' : ''}`} onClick={toggleAudio}></button>
                    <div className="flex-1 flex items-center gap-2">
                        <span className="time-current text-xs text-white font-medium">
                            0:{String(currentTime).padStart(2, '0')}
                        </span>
                        <span className="time-total text-xs text-white font-medium">
                            {duration > 0 ? `0:${String(duration).padStart(2, '0')}` : '--'}
                        </span>
                        <div className="flex-1 h-1.5 bg-gray-300 rounded-full overflow-hidden">
                            <div className="progress-bar h-full bg-(--border) transition-all" style={{width: `${progress}%`}}></div>
                        </div>
                    </div>
                </div>
            );
        }

        if (typeIndice === 'Description') {
            return <div><p className="font-semibold text-lg text-white text-left">{pokemon.desc_courte}</p></div>;
        }

        if (typeIndice === 'Type1') {
            return <div><p className="font-semibold text-lg text-white text-left">{pokemon.type1.name_french}</p></div>;
        }

        if (typeIndice === 'Type2') {
            return <div><p className="font-semibold text-lg text-white text-left">{pokemon.type2 === 'Aucun' ? 'Aucun' : pokemon.type2.name_french}</p></div>;
        }

        return null;
    };

    // Déterminer l'état de l'indice
    const isLocked = nbEssais < nbRequis;
    const isUnlocked = nbEssais >= nbRequis && !isUsed;

    // Styles conditionnels selon l'état
    const getBorderColor = () => {
        if (isLocked) return 'border-[var(--indice-locked-color)]';
        if (isUnlocked) return 'border-[var(--indice-new-color)]';
        return 'border-[var(--indice-color)]';
    };

    const getBackgroundStyle = () => {
        if (isLocked) return 'bg-[linear-gradient(to_right,rgba(130,130,130,0.4)_0%,rgba(130,130,130,0.16)_40%,rgba(130,130,130,0.02)_100%)]';
        if (isUnlocked) return 'bg-[linear-gradient(to_right,rgba(191,233,0,0.4)_0%,rgba(191,233,0,0.16)_40%,rgba(191,233,0,0.02)_100%)]';
        return 'bg-[linear-gradient(to_right,rgba(118,129,251,0.4)_0%,rgba(118,129,251,0.16)_40%,rgba(118,129,251,0.02)_100%)]';
    };

    const getProgressBarColor = () => {
        if (isLocked) return 'bg-[var(--indice-locked-color)]';
        if (isUnlocked) return 'bg-[var(--indice-new-color)]';
        return 'bg-(--border)';
    };

    return (<div className={"pl-6 relative grow h-17" + (isLocked ? " indiceDesac" : "")}>
                <div className={`rounded-2xl pl-9 pr-4 py-2 w-full h-full flex flex-col justify-between border ${getBorderColor()} ${getBackgroundStyle()} ${isUnlocked ? 'drop-shadow-[0_0_16px_rgba(191,233,0,0.2)]' : ''}`}>
                    <h3 className='text-white text-left font-bold italic'>{typeIndice}</h3>

                    {/* Badge en haut à droite selon l'état */}
                    {isLocked && (
                        <img src={lockIcon} alt="Verrouillé" className="absolute top-2 right-2 w-5 h-5" />
                    )}
                    {isUnlocked && (
                        <div className="absolute top-2 right-2 rounded-lg px-1.5 py-0.5 flex items-center gap-1 bg-[linear-gradient(to_right,rgba(191,233,0,0.24)_0%,rgba(191,233,0,0.10)_100%)]">
                            <img src={shinyIcon} alt="Nouveau" className="w-4 h-4" />
                            <span className="text-xs font-semibold text-(--indice-new-color)">Nouveau !</span>
                        </div>
                    )}
                    {isUsed && (
                        <div className="absolute top-2 right-2 rounded-lg px-1.5 py-0.5 flex bg-[linear-gradient(to_right,rgba(118,129,251,0.24)_0%,rgba(118,129,251,0.10)_100%)]">
                            <span className="text-xs font-semibold text-(--indice-color)">Utilisé</span>
                        </div>
                    )}

                    <div className="indice-content">
                        {!isUsed ? (
                            <>
                                <p className="text-xs text-white text-left">
                                    {nbEssais >= nbRequis ? 'Débloqué' : `Débloqué dans ${nbRequis - nbEssais} tentative(s)`}
                                </p>
                                <div className="flex gap-1 mt-2">
                                    {Array.from({ length: nbRequis }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-1 rounded-full flex-1 ${
                                                index < nbEssais ? getProgressBarColor() : 'bg-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            getIndiceContent()
                        )}
                    </div>
                </div>
                <div onClick={showIndice} className='text-sm absolute left-0 -bottom-1 cursor-pointer'>
                    {isUnlocked && (
                        <img src={starsIcon} alt="Nouveau" className="absolute -left-2 -top-1.5" />
                    )}
                    <img src={getIndiceImage()} alt={`Indice ${numIndice}`} className={isUnlocked ? "drop-shadow-[0_0_16px_rgba(191,233,0,0.2)]" : ""}></img>
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
    onHintUsed: PropTypes.func,
};