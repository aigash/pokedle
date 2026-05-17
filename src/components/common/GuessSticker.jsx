import PropTypes from 'prop-types';

// Composant CutCard : simule une bordure avec clip-path
function CutCard({ borderColor, bgGradient, cutSize = 18 }) {
    // Coins coupés : haut-droit et bas-gauche
    const outerClipPath = `polygon(
        ${cutSize}px 0,
        100% 0,
        100% calc(100% - ${cutSize}px),
        calc(100% - ${cutSize}px) 100%,
        0 100%,
        0 ${cutSize}px
    )`;

    // Pour la bordure de 1px, on décale chaque point de 1px vers l'intérieur
    const borderWidth = 1;
    const innerClipPath = `polygon(
        ${cutSize}px ${borderWidth}px,
        calc(100% - ${borderWidth}px) ${borderWidth}px,
        calc(100% - ${borderWidth}px) calc(100% - ${cutSize}px),
        calc(100% - ${cutSize}px) calc(100% - ${borderWidth}px),
        ${borderWidth}px calc(100% - ${borderWidth}px),
        ${borderWidth}px ${cutSize}px
    )`;

    return (
        <div
            className="absolute inset-0 w-full h-full"
            style={{
                clipPath: outerClipPath,
                backgroundColor: borderColor,
            }}
        >
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    clipPath: innerClipPath,
                    background: bgGradient,
                }}
            />
        </div>
    );
}

CutCard.propTypes = {
    borderColor: PropTypes.string.isRequired,
    bgGradient: PropTypes.string.isRequired,
    cutSize: PropTypes.number,
};

export default function GuessSticker({ guess, pokemon, index, totalGuesses }) {
    const isCorrect = pokemon.nameFr === guess.nameFr;

    const borderColor = isCorrect ? '#00FF88' : '#FF5B5B';
    const bgGradient = isCorrect
        ? 'linear-gradient(to bottom, #00af5d, rgba(0,175,93,0.6)), linear-gradient(124deg, #091044, #1b2088)'
        : 'linear-gradient(to bottom, rgba(183,26,26,0.6), rgba(183,26,26,0.6)), linear-gradient(124deg, #091044, #1b2088)';

    return (
        <div className="guess-sticker-container relative" style={{ width: '226px', height: '126px' }}>
            {/* Couche 1 : fond avec coins coupés et bordure */}
            <div className="absolute inset-0 w-full h-full">
                <CutCard
                    borderColor={borderColor}
                    bgGradient={bgGradient}
                    cutSize={18}
                />
            </div>

            {/* Couche 2 : contenu (NON clippé, permet à l'image de déborder) */}
            <div className="relative flex items-center justify-center h-full z-10 p-4">
                <div className="w-19 h-full flex flex-col justify-end">
                    <p className="text-[40px] font-bold italic text-(--secondary-jaune) leading-[0.9] text-left">{String(totalGuesses - index).padStart(2, '0')}</p>
                    <p className='text-sm font-bold italic text-(--text-secondary-color) text-left'>{guess.nameFr}</p>
                </div>
                <div className="relative w-full h-0 flex-1 flex items-end justify-center">
                    <img
                        className='pointer-events-none absolute z-30 max-h-[140px] max-w-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain'
                        src={guess.gif}
                        alt={guess.nameFr}
                        style={{ overflow: 'visible' }}
                    />
                </div>
            </div>

            {/* Overlay radial pour l'effet lumineux */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                    clipPath: `polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)`,
                    background: isCorrect
                        ? 'radial-gradient(ellipse 90% 50% at center 100%, rgba(7,116,82,1), rgba(7,116,82,0))'
                        : 'radial-gradient(ellipse 90% 50% at center 100%, rgba(115,22,42,1), rgba(115,22,42,0))',
                    mixBlendMode: 'plus-lighter',
                    opacity: 0.75
                }}
            />
        </div>
    );
}

GuessSticker.propTypes = {
    guess: PropTypes.shape({
        nameFr: PropTypes.string.isRequired,
        gif: PropTypes.string.isRequired,
    }).isRequired,
    pokemon: PropTypes.shape({
        nameFr: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    totalGuesses: PropTypes.number.isRequired,
};