import PropTypes from 'prop-types';

import pokedexIcon from '../../assets/img/icones/pokedex.svg';

export default function PokedexATH({ togglePokedexModal }) {
    return (
        <div id='openPokedex' className="flex items-center gap-3 border border-(--secondary-jaune) cursor-pointer rounded-full pr-[30px] pl-6" onClick={() => togglePokedexModal(true)}>
            <img src={ pokedexIcon } alt="Pokedex" />
            <p className="text-2xl text-(--secondary-jaune) italic font-semibold">Pokédex</p>
        </div>
    );
}

PokedexATH.propTypes = {
    togglePokedexModal: PropTypes.func.isRequired
};