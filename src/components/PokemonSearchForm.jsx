import { useState } from 'react';
import { Search } from './searchBar';

export default function PokemonSearchForm({ onSubmit, suggestions, onSuggestionClick }) {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (value) => {
    setSearchValue(value);
    
    if (!value.trim()) {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions
      .filter(pokemon => pokemon.name_french.toLowerCase().includes(value.toLowerCase()));
    
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (pokemonName) => {
    onSuggestionClick(pokemonName);
    setSearchValue('');
    document.getElementById('pokeSearch').focus();
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();
    if (trimmedValue) {
      onSubmit(trimmedValue);
      setSearchValue('');
      setShowSuggestions(false);
    }
  };

  return (
    <form 
      id="formClassic"
      className="p-3 rounded-xl flex flex-col justify-between" 
      onSubmit={handleSubmit}
    >
      <h2 className="mb-2">Trouve le Pokémon du jour !</h2>
      <div className="relative flex">
        <Search
          id="pokeSearch"
          placeholder="Nom du Pokémon..."
          value={searchValue}
          onChange={handleChange}
        />
        <button
          type="submit"
          id="submitClassic"
          className="bg-red-500 text-white px-4 rounded-r hover:bg-red-600"
        >
          Valider
        </button>
        
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute w-full bg-white border rounded-b mt-12 shadow-lg z-10 max-h-[240px] overflow-y-auto">
            {filteredSuggestions.map((pokemon) => (
              <div
                key={pokemon.name_french}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(pokemon.name_french)}
              >
                {pokemon.name_french}
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
} 