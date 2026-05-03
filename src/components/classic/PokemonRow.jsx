import PropTypes from 'prop-types';

// Composant CutCard : simule une bordure avec clip-path
function CutCard({ borderColor, bgGradient, cutSize = 18 }) {
    // Coins coupés : haut-gauche et bas-droit
    const outerClipPath = `polygon(
        0 0,
        calc(100% - ${cutSize}px) 0,
        100% ${cutSize}px,
        100% 100%,
        ${cutSize}px 100%,
        0 calc(100% - ${cutSize}px)
    )`;

    // Pour la bordure de 1px, on décale chaque point de 1px vers l'intérieur
    const borderWidth = 1;
    const innerClipPath = `polygon(
        ${borderWidth}px ${borderWidth}px,
        calc(100% - ${cutSize}px) ${borderWidth}px,
        calc(100% - ${borderWidth}px) ${cutSize}px,
        calc(100% - ${borderWidth}px) calc(100% - ${borderWidth}px),
        ${cutSize}px calc(100% - ${borderWidth}px),
        ${borderWidth}px calc(100% - ${cutSize}px)
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

export default function PokemonRow ({guess, pokemon, index}) {
    console.log(guess);
    console.log(index);
    return <div className='bloc-row relative h-31.5'>
        <div className='row-guess relative h-full'>
            {/* Couche 1 : fond avec coins coupés et bordure */}
            <div className="absolute inset-0 w-full h-full -scale-x-100">
                <CutCard
                    borderColor="#2B31C3"
                    bgGradient="linear-gradient(to top right, #091044, #1B2088)"
                    cutSize={18}
                />
            </div>

            {/* Couche 2 : contenu (NON clippé, permet à l'image de déborder) */}
            <div className="relative flex items-center justify-between pl-8 pr-6 py-4 h-full z-10">
                <div className="w-19 z-20">
                    <p className="text-[40px] font-bold italic text-(--secondary-jaune) leading-[0.9] text-left">{index < 10 ? `0${index}` : index}</p>
                    <p className="text-sm font-bold italic text-(--text-secondary-color) text-left">{guess.nameFr}</p>
                </div>

                <div className="relative w-45.5 h-0">
                    <img
                        className='pointer-events-none absolute z-30 max-h-[154px] max-w-[220px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain'
                        src={guess.gif}
                        style={{ overflow: 'visible' }}
                    />
                </div>

            <div className="flex flex-col gap-2 z-1">
                <p className="text-xs font-medium text-(--text-secondary-color) text-left">Type 1</p>
                <div className={(guess.type1.name_french == pokemon.type1.name_french || guess.type1.name_french == pokemon.type2.name_french ? 'cat-wrapper-green' : 'cat-wrapper-red') + ' cat-wrapper'}>
                    <div className={(guess.type1.name_french == pokemon.type1.name_french || guess.type1.name_french == pokemon.type2.name_french ? 'cat-green' : 'cat-red') + ' w-20.5 cat'}>{guess.type1.name_french}</div>
                </div>
            </div>

            <div className="flex flex-col gap-2 z-1">
                <p className="text-xs font-medium text-(--text-secondary-color) text-left">Type 2</p>
                <div className={(guess.type2.name_french == pokemon.type1.name_french || guess.type2.name_french == pokemon.type2.name_french ? 'cat-wrapper-green' : 'cat-wrapper-red') + ' cat-wrapper'}>
                    <div className={(guess.type2.name_french == pokemon.type1.name_french || guess.type2.name_french == pokemon.type2.name_french ? 'cat-green' : 'cat-red') + ' w-20.5 cat'}>{(guess.type2 == 'Aucun' ? 'Aucun' : guess.type2.name_french)}</div>
                </div>
            </div>

            <div className="flex flex-col gap-2 z-1">
                <p className="text-xs font-medium text-(--text-secondary-color) text-left">Couleur(s)</p>
                <div className={(
                    guess.couleur.length > 1 && pokemon.couleur.length > 1
                    ? ((guess.couleur[0] === pokemon.couleur[0] || guess.couleur[0] === pokemon.couleur[1]) &&
                    (guess.couleur[1] === pokemon.couleur[0] || guess.couleur[1] === pokemon.couleur[1]))
                        ? 'cat-wrapper-green'
                        : ((guess.couleur[0] !== pokemon.couleur[0] && guess.couleur[0] !== pokemon.couleur[1]) &&
                        (guess.couleur[1] !== pokemon.couleur[0] && guess.couleur[1] !== pokemon.couleur[1]))
                            ? 'cat-wrapper-red'
                            : 'cat-wrapper-yellow'
                    : guess.couleur.length > 1 && pokemon.couleur.length === 1
                        ? (guess.couleur[0] !== pokemon.couleur[0] && guess.couleur[1] !== pokemon.couleur[0])
                            ? 'cat-wrapper-red'
                            : 'cat-wrapper-yellow'
                        : guess.couleur.length === 1 && pokemon.couleur.length > 1
                            ? (guess.couleur[0] !== pokemon.couleur[0] && guess.couleur[0] !== pokemon.couleur[1])
                                ? 'cat-wrapper-red'
                                : 'cat-wrapper-yellow'
                            : guess.couleur[0] === pokemon.couleur[0]
                                ? 'cat-wrapper-green'
                                : 'cat-wrapper-red'
                ) + ' cat-wrapper'}>
                    <div className={(
                        guess.couleur.length > 1 && pokemon.couleur.length > 1
                        ? ((guess.couleur[0] === pokemon.couleur[0] || guess.couleur[0] === pokemon.couleur[1]) &&
                        (guess.couleur[1] === pokemon.couleur[0] || guess.couleur[1] === pokemon.couleur[1]))
                            ? 'cat-green'
                            : ((guess.couleur[0] !== pokemon.couleur[0] && guess.couleur[0] !== pokemon.couleur[1]) &&
                            (guess.couleur[1] !== pokemon.couleur[0] && guess.couleur[1] !== pokemon.couleur[1]))
                                ? 'cat-red'
                                : 'cat-yellow'
                        : guess.couleur.length > 1 && pokemon.couleur.length === 1
                            ? (guess.couleur[0] !== pokemon.couleur[0] && guess.couleur[1] !== pokemon.couleur[0])
                                ? 'cat-red'
                                : 'cat-yellow'
                            : guess.couleur.length === 1 && pokemon.couleur.length > 1
                                ? (guess.couleur[0] !== pokemon.couleur[0] && guess.couleur[0] !== pokemon.couleur[1])
                                    ? 'cat-red'
                                    : 'cat-yellow'
                                : guess.couleur[0] === pokemon.couleur[0]
                                    ? 'cat-green'
                                    : 'cat-red'
                    ) + ' w-20.5 cat'}>{guess.couleur.length > 1 ? <>{guess.couleur[0]}<br/>{guess.couleur[1]}</> : guess.couleur[0]}</div>
                </div>
            </div>

            <div className="flex flex-col gap-2 z-1">
                <p className="text-xs font-medium text-(--text-secondary-color) text-left">Habitat</p>
                <div className={(guess.habitat !== pokemon.habitat ? 'cat-wrapper-red' : 'cat-wrapper-green') + ' cat-wrapper'}>
                    <div className={(guess.habitat !== pokemon.habitat ? 'cat-red' : 'cat-green') + ' w-20.5 cat'}>{guess.habitat}</div>
                </div>
            </div>

            <div className="flex flex-col gap-2 z-1">
                <p className="text-xs font-medium text-(--text-secondary-color) text-left">Stade d&apos;évo.</p>
                <div className={(guess.stadeEvo > pokemon.stadeEvo ? 'cat-wrapper-red' : (guess.stadeEvo < pokemon.stadeEvo ? 'cat-wrapper-red' : 'cat-wrapper-green')) + ' cat-wrapper'}>
                    <div className={(guess.stadeEvo > pokemon.stadeEvo ? 'cat-red down' : (guess.stadeEvo < pokemon.stadeEvo ? 'cat-red up' : 'cat-green')) + ' w-20.5 cat'}>{guess.stadeEvo}</div>
                </div>
            </div>

            <div className="flex flex-col gap-2 z-1">
                <p className="text-xs font-medium text-(--text-secondary-color) text-left">Taille</p>
                <div className={(guess.taille > pokemon.taille ? 'cat-wrapper-red' : (guess.taille < pokemon.taille ? 'cat-wrapper-red' : 'cat-wrapper-green')) + ' cat-wrapper'}>
                    <div className={(guess.taille > pokemon.taille ? 'cat-red down' : (guess.taille < pokemon.taille ? 'cat-red up' : 'cat-green')) + ' w-20.5 cat'}>{(guess.taille / 10).toFixed(1)}m</div>
                </div>
            </div>

            <div className="flex flex-col gap-2 z-1">
                <p className="text-xs font-medium text-(--text-secondary-color) text-left">Poids</p>
                <div className={(guess.poids > pokemon.poids ? 'cat-wrapper-red' : (guess.poids < pokemon.poids ? 'cat-wrapper-red' : 'cat-wrapper-green')) + ' cat-wrapper'}>
                    <div className={(guess.poids > pokemon.poids ? 'cat-red down' : (guess.poids < pokemon.poids ? 'cat-red up' : 'cat-green')) + ' w-20.5 cat'}>{(guess.poids / 10).toFixed(1)}kg</div>
                </div>
            </div>
            </div>
        </div>

    </div>
}

PokemonRow.propTypes = {
    guess: PropTypes.shape({
        nameFr: PropTypes.string.isRequired,
        gif: PropTypes.string.isRequired,
        type1: PropTypes.shape({
            name_french: PropTypes.string.isRequired,
        }).isRequired,
        type2: PropTypes.shape({
            name_french: PropTypes.string.isRequired,
        }),
        couleur: PropTypes.arrayOf(PropTypes.string).isRequired,
        habitat: PropTypes.string.isRequired,
        stadeEvo: PropTypes.number.isRequired,
        taille: PropTypes.number.isRequired,
        poids: PropTypes.number.isRequired,
    }).isRequired,
    pokemon: PropTypes.shape({
        type1: PropTypes.shape({
            name_french: PropTypes.string.isRequired,
        }).isRequired,
        type2: PropTypes.shape({
            name_french: PropTypes.string.isRequired,
        }),
        couleur: PropTypes.arrayOf(PropTypes.string).isRequired,
        habitat: PropTypes.string.isRequired,
        stadeEvo: PropTypes.number.isRequired,
        taille: PropTypes.number.isRequired,
        poids: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
};