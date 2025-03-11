import PropTypes from 'prop-types';

export function Search({ placeholder, value, onChange, id }) {
    return (
        <div className="w-full">
            <input
                type="text"
                id={id}
                className="w-full py-2 px-4 border rounded-l focus:outline-none"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                autoComplete="off"
                aria-label={placeholder}
            />
        </div>
    );
}

Search.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};

export default Search;