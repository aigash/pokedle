import PropTypes from 'prop-types';

import decoJaune from '../../assets/img/icones/deco-jaune.png';
import decoViolet from '../../assets/img/icones/deco-violet.png';
import decoBleu from '../../assets/img/icones/deco-bleu.png';
import decoOrange from '../../assets/img/icones/deco-orange.png';

const decoMap = {
    jaune: decoJaune,
    violet: decoViolet,
    bleu: decoBleu,
    orange: decoOrange
};

const colorMap = {
    jaune: '#BFE900',
    violet: '#7681FB',
    bleu: '#83F7FF',
    orange: '#FF9F40'
};

export default function GameMode({ img, titre, couleur, onclick }) {
    const deco = decoMap[couleur] || decoJaune;
    const color = colorMap[couleur] || '#BFE900';

    return <div className='flex flex-col items-center justify-center gap-1 cursor-pointer' onClick={onclick}>
        <img className="w-24" src={img} alt={titre} />
        <h3 className='font-semibold italic text-xs' style={{ color }}>{titre}</h3>
        <div className="flex items-center gap-1">
            <img src={deco} alt="deco" />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.21875 6.66699C3.51902 7.90942 4.63616 8.83278 5.9707 8.83301C7.30527 8.83281 8.4225 7.90943 8.72266 6.66699H11.9336C11.6017 9.66675 9.05874 12 5.9707 12C2.88294 11.9997 0.340629 9.66655 0.00878906 6.66699H3.21875ZM5.96875 4.41797C6.84305 4.41808 7.55176 5.1266 7.55176 6.00098C7.55174 6.87534 6.84304 7.58387 5.96875 7.58398C5.09437 7.58398 4.38576 6.87541 4.38574 6.00098C4.38574 5.12653 5.09435 4.41797 5.96875 4.41797ZM5.9707 0C9.08751 0 11.6492 2.3769 11.9424 5.41699H8.74414C8.47533 4.13208 7.33539 3.1672 5.9707 3.16699C4.60604 3.16722 3.46618 4.13209 3.19727 5.41699H0C0.293197 2.3771 2.85417 0.000310682 5.9707 0Z" fill={color}/>
            </svg>
            <img src={deco} alt="deco" className="-scale-x-100" />
        </div>
    </div>
}

GameMode.propTypes = {
    img: PropTypes.string.isRequired,
    titre: PropTypes.string.isRequired,
    couleur: PropTypes.string.isRequired,
    onclick: PropTypes.func.isRequired
};