import { PropTypes } from 'prop-types';

export default function BlocDesc({ children }) {
    return (
        <div id='desc_pokedex' className='p-3 rounded-xl bg-white mb-3'>
            <h2 className='text-black'>À quel Pokémon est associée cette phrase du Pokédex ?</h2>
            <samp className='text-black'>❝{ children}❞</samp>
        </div>
    );
}

BlocDesc.propTypes = {
    children: PropTypes.string.isRequired
};