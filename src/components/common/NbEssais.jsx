import PropTypes from 'prop-types';
import React from 'react';

function NbEssaisComponent({ nbEssais }) {
    return (
        <div className="blocAth rounded-xl flex-col p-3">
            <h3 className='mb-[-10px] text-black'>Essai(s)</h3>
            <p className='nbEssais font-medium text-5xl leading-normal text-black'>{nbEssais}</p>
        </div>
    );
}
const NbEssais = React.memo(NbEssaisComponent);

export default NbEssais;

NbEssaisComponent.propTypes = {
    nbEssais: PropTypes.number.isRequired,
};