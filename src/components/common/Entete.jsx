import PropTypes from 'prop-types';
import NbEssais from './NbEssais';
import Chrono from './Chrono';

export default function Entete({
    nbEssais,
    startTime,
    endTime,
    timeLeft,
    formatNumber,
    title,
    description
}) {
    return (
        <div className="flex flex-col">
            <div className="entete px-12 py-6 rounded-t-4xl relative w-full flex items-center justify-between">
                <div className="flex gap-32">
                    <div className="flex flex-col -space-y-4 text-white font-bold italic text-left text-xl">
                        <span className="tracking-[0.02em]">QUEL EST LE</span>
                        <h1 className="text-[86px] tracking-[-0.03em]" style={{ textShadow: '2px 2px 0 var(--secondary-jaune)' }}>POKÉMON</h1>
                        <span className="text-(--secondary-jaune) tracking-[0.02em]">MYSTÈRE ?</span>
                    </div>
                    <div className='flex gap-5 items-center py-4 px-6 bg-(--sombre) rounded-2xl self-center border border-[#2B31C3]'>
                        <NbEssais nbEssais={nbEssais} />
                        <div className="w-px h-10 bg-(--border) rotate-12"></div>
                        <Chrono startTime={startTime} endTime={endTime} />
                    </div>
                </div>

                <div className="flex flex-col gap-0.5">
                    <p className="text-xs text-(--secondary-jaune) italic font-semibold text-left leading-[1.2]">Prochain défi</p>
                    <div id='compteur' className="flex items-center gap-1 text-white text-xl font-semibold leading-[1.2] tabular-nums">
                        <p id='heures'>{formatNumber(timeLeft.hours)}<span className="text-white/80 text-xs">H</span></p>
                        <p className="text-(--secondary-jaune)">:</p>
                        <p id='minutes'>{formatNumber(timeLeft.minutes)}<span className="text-white/80 text-xs">M</span></p>
                        <p className="text-(--secondary-jaune)">:</p>
                        <p id='secondes'>{formatNumber(timeLeft.seconds)}<span className="text-white/80 text-xs">S</span></p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-full gap-2 rounded-b-4xl bg-(--sombre) px-6 py-4">
                <p className="font-semibold text-white text-left">{title}</p>
                <p className="text-sm text-(--text-secondary-color) text-left">{description}</p>
            </div>
        </div>
    );
}

Entete.propTypes = {
    nbEssais: PropTypes.number.isRequired,
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    timeLeft: PropTypes.shape({
        hours: PropTypes.number.isRequired,
        minutes: PropTypes.number.isRequired,
        seconds: PropTypes.number.isRequired,
    }).isRequired,
    formatNumber: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};
