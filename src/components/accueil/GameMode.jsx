import PropTypes from 'prop-types';

import cursorIcon from '../../assets/img/icones/curseur.png';


export default function GameMode({ img, titre, onclick }) {
    return <div className='p-3 rounded-xl flex items-center relative gap-6 hover:bg-[#EBC008] cursor-pointer sm:w-[450px] h-[100px] group' onClick={onclick}>
        <img className='h-full rounded-md' src={img} alt={titre} />
        <h3 className='text-[#305380] font-semibold text-2xl'>{titre}</h3>
        <img className='absolute w-14 h-auto left-[-30px] hidden group-hover:block' src={cursorIcon} alt='curseur' />
    </div>
}

GameMode.propTypes = {
    img: PropTypes.string.isRequired,
    titre: PropTypes.string.isRequired,
    onclick: PropTypes.func.isRequired
  };