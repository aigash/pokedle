export function Search ({placeholder, value, onChange, id}) {
    return (
        <div>
            <input
                type='text'
                id={id}
                className=''
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default Search