import PropTypes from 'prop-types';
import React from 'react';

function NbEssaisComponent({ nbEssais }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-(--secondary-jaune) text-xs font-semibold text-left leading-[1.2]">Essai(s)</span>
            <p className='text-white text-xl font-semibold text-left leading-[1.2]'>{String(nbEssais).padStart(2, '0')}</p>
        </div>
    );
}
const NbEssais = React.memo(NbEssaisComponent);

export default NbEssais;

NbEssaisComponent.propTypes = {
    nbEssais: PropTypes.number.isRequired,
};