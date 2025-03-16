import PropTypes from 'prop-types';

import pokedexIcon from '../../assets/img/icones/pokedex.png';

export default function PokedexATH({ togglePokedexModal }) {
    return (
        <div id='openPokedex' className="blocAth rounded-xl p-3" onClick={() => togglePokedexModal(true)}>
            <div className='flex w-full justify-center'>
                <img src={ pokedexIcon } alt="Pokedex" />
            </div>
        </div>
    );
}

PokedexATH.propTypes = {
    togglePokedexModal: PropTypes.func.isRequired
};