import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function Chrono({ startTime, endTime }) {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        // Si pas de startTime, le chrono n'a pas démarré
        if (!startTime) {
            setElapsed(0);
            return;
        }

        // Si endTime existe, le jeu est terminé, on affiche le temps final
        if (endTime) {
            setElapsed(Math.floor((endTime - startTime) / 1000));
            return;
        }

        // Sinon, on met à jour le chrono chaque seconde
        const interval = setInterval(() => {
            setElapsed(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, endTime]);

    const mins = Math.floor(elapsed / 60);
    const secs = String(elapsed % 60).padStart(2, '0');

    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-(--secondary-jaune) text-[22px] font-semibold text-left italic leading-[1.2]">Temps</span>
            <p className='text-white text-3xl font-bold text-left leading-[1.2] flex items-center gap-1'>
                <span>{mins}</span><span className="text-(--secondary-jaune) semi-bold text-[28px]">:</span><span>{secs}</span>
            </p>
        </div>
    );
}

Chrono.propTypes = {
    startTime: PropTypes.number,
    endTime: PropTypes.number,
};
