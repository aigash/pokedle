import PropTypes from 'prop-types';
import { forwardRef } from 'react';

export const Search = forwardRef(({ placeholder, value, onChange, id, disabled = false }, ref) => {
    return (
        <div className="w-full">
            <input
                type="text"
                id={id}
                className="w-full h-full py-2 px-4 border rounded-l focus:outline-none bg-white text-black"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                autoComplete="off"
                aria-label={placeholder}
                ref={ref}
                disabled={disabled}
            />
        </div>
    );
});

Search.displayName = 'Search';

Search.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

export default Search;