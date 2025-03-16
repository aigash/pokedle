import { useState, useEffect } from 'react';
import { Search } from './searchBar';
import PropTypes from 'prop-types';

export default function PokemonSearchForm({ onSubmit, suggestions, onSuggestionClick, inputRef, disabled = false }) {
  const getImageUrl = (imgPath) => {
      return `${import.meta.env.BASE_URL}/assets/img/pokemons/${imgPath}`;
  };

  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // État pour vérifier que le formulaire est soumis ou non, cet état est utile afin d'éviter le spam de réponse qui pouvait entrainer 2 même guesses d'affilée
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Enregistre les pokemons déjà guess
  const [submittedPokemons, setSubmittedPokemons] = useState(new Set());

  useEffect(() => {
    if (inputRef && inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [inputRef, disabled]);

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
    // Ne pas permettre de soumettre un Pokémon déjà deviné
    if (submittedPokemons.has(pokemonName) || disabled) {
      return;
    }

    onSuggestionClick(pokemonName);
    setSearchValue('');
    if (!disabled && document.getElementById('pokeSearch')) {
      document.getElementById('pokeSearch').focus();
    }
    setShowSuggestions(false);
    setSelectedIndex(0); // reset la position du curseur après une suggestion

    // Ajouter le Pokémon à la liste des Pokémon soumis
    const newSubmittedPokemons = new Set(submittedPokemons);
    newSubmittedPokemons.add(pokemonName);
    setSubmittedPokemons(newSubmittedPokemons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;

    const trimmedValue = searchValue.trim();
    // Vérifier si le formulaire est en cours ou non
    if (trimmedValue && !isSubmitting && !submittedPokemons.has(trimmedValue)) { 
      setIsSubmitting(true); // Indique que le formulaire est en cours de soumission
      try {
        await onSubmit(trimmedValue); // on attend la fin de la soumission    
        
        // Ajouter le Pokémon à la liste des Pokémon soumis
        const newSubmittedPokemons = new Set(submittedPokemons);
        newSubmittedPokemons.add(trimmedValue);
        setSubmittedPokemons(newSubmittedPokemons);
      } catch (error) {
        console.error('Erreuer lors de la soumission du formulaire : ', error);
      } finally {
        setSearchValue('');
        setShowSuggestions(false);
        setSelectedIndex(0); // reset la position du curseur après une suggestion
        setIsSubmitting(false); // on réinitialise l'état
      }      
    }
  };

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, filteredSuggestions.length - 1));
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        const selectedPokemon = filteredSuggestions[selectedIndex].name_french;
        // Ne pas permettre de sélectionner un Pokémon déjà guess
        //console.log(selectedPokemon);
        //console.log(submittedPokemons);
        if (!submittedPokemons.has(selectedPokemon)) {
          handleSuggestionClick(selectedPokemon);
        }
      }
    }
  };

  useEffect(() => {
    const handleKeyDownGlobal = (e) => {
      if (showSuggestions && filteredSuggestions.length > 0) {
        handleKeyDown(e);
      }
    };
    
    document.addEventListener('keydown', handleKeyDownGlobal);
    return () => {
      document.removeEventListener('keydown', handleKeyDownGlobal);
    };
  }, [showSuggestions, filteredSuggestions, selectedIndex]);

  // Fonction pour vérifier si un Pokémon a déjà été guess
  const isPokemonSubmitted = (pokemonName) => submittedPokemons.has(pokemonName);

  return (
    <form 
      id="formClassic"
      className="bg-white h-[104px] p-3 rounded-xl flex flex-col justify-between grow" 
      onSubmit={handleSubmit}
    >
      <h2 className="mb-2 text-black">Trouve le Pokémon du jour !</h2>
      <div className="relative flex">
        <Search
          id="pokeSearch"
          placeholder="Nom du Pokémon..."
          value={searchValue}
          onChange={handleChange}
          ref={inputRef}
          disabled={disabled}
        />
        <button
          type="submit"
          id="submitClassic"
          className="bg-red-500 text-white px-4 rounded-r hover:bg-red-600"
          disabled={isSubmitting || isPokemonSubmitted(searchValue.trim()) || disabled} // désactive le bouton pendant la soumission du formulaire
        >
          GO
        </button>
        
        {showSuggestions && filteredSuggestions.length > 0 && !disabled && (
          <div className="absolute w-full bg-white border rounded-b mt-12 shadow-lg z-10 max-h-[240px] overflow-y-auto">
            {filteredSuggestions.map((pokemon, index) => {
              const isSubmitted = isPokemonSubmitted(pokemon.name_french);
              return (
                <div
                  key={pokemon.name_french}
                  className={`py-2 hover:bg-[#EBC008]/10 cursor-pointer text-black text-left px-4 flex items-center ${selectedIndex === index ? 'bg-[#EBC008]/10' : ''}`}
                  onClick={() => !isSubmitted && handleSuggestionClick(pokemon.name_french)}
                >
                  <img src={getImageUrl(pokemon.img)} className="w-10 h-10 mr-4" />
                  {pokemon.name_french}
                </div>
              );
            })}
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
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  disabled: PropTypes.bool
};