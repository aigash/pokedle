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

export default Search;