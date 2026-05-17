import PropTypes from 'prop-types';
import React from 'react';

function NbEssaisComponent({ nbEssais }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-(--secondary-jaune) text-[22px] font-semibold text-left italic leading-[1.2]">Essai(s)</span>
            <p className='text-white text-3xl font-bold text-left leading-[1.2]'>{String(nbEssais).padStart(2, '0')}</p>
        </div>
    );
}
const NbEssais = React.memo(NbEssaisComponent);

export default NbEssais;

NbEssaisComponent.propTypes = {
    nbEssais: PropTypes.number.isRequired,
};