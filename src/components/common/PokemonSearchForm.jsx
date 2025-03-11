import { useState } from 'react';
import { Search } from './searchBar';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function PokemonSearchForm({ onSubmit, suggestions, onSuggestionClick }) {
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (value) => {
    setSearchValue(value);
    
    if (!value.trim()) {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
      return;
    }

    const filtered = suggestions
      .filter(pokemon => 
        pokemon.name_french
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .startsWith(
            value
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
          )
      );
    
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

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, filteredSuggestions.length - 1));
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        handleSuggestionClick(filteredSuggestions[selectedIndex].name_french);
      }
    }
  };

  useEffect(() => {
    const handleKeyDownGlobal = (e) => handleKeyDown(e);
    document.addEventListener('keydown', handleKeyDownGlobal);
    return () => {
      document.removeEventListener('keydown', handleKeyDownGlobal);
    };
  }, [showSuggestions, filteredSuggestions, selectedIndex]);

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
          GO
        </button>
        
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute w-full bg-white border rounded-b mt-12 shadow-lg z-10 max-h-[240px] overflow-y-auto">
            {filteredSuggestions.map((pokemon, index) => (
              <div
                key={pokemon.name_french}
                className={`py-2 hover:bg-[#EBC008]/10 cursor-pointer text-left px-4 flex items-center ${selectedIndex === index ? 'bg-[#EBC008]/10' : ''}`}
                onClick={() => handleSuggestionClick(pokemon.name_french)}
              >
                <img src={`src/assets/img/pokemons/${pokemon.img}`} className="w-10 h-10 mr-4" />
                {pokemon.name_french}
              </div>
            ))}
          </div>
        )}
      </div>
    </form>
  );
} 

PokemonSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    name_french: PropTypes.string.isRequired,
  })).isRequired,
  onSuggestionClick: PropTypes.func.isRequired,
};