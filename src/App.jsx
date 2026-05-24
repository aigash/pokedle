import { useState, useEffect } from 'react';
import GameMode from './components/accueil/GameMode';
import PokemonSearchForm from './components/common/PokemonSearchForm';
import { useNavigate } from 'react-router-dom';
import pokemons from './pokemon.json';

import classicIcon from './assets/img/icones/classic_new.png';
import descIcon from './assets/img/icones/desc_new.png';
import pixelsIcon from './assets/img/icones/pixels_new.png';
import typesIcon from './assets/img/icones/types_new.png';

export default function App() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight - now;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  function launchMode(mode) {
    navigate('/' + mode);
  }

  const handleSearchSubmit = (pokemonName) => {
    navigate('/classic', { state: { initialGuess: pokemonName } });
  };

  return (
    <div
      id='modesJeux'
      className='flex flex-col min-h-screen items-center'
    >
      <div className="grow flex items-center justify-center">
        <div className="w-[680px] mx-auto flex flex-col gap-14">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-[96px] font-extrabold italic text-white leading-[80px]" style={{ textShadow: '2px 2px 0 var(--secondary-jaune)' }}>POKÉDEUL</h1>
            <h2 className="text-[26px] font-semibold italic text-(--secondary-jaune) leading-[20px]">Reconnais-les tous !</h2>
            <p className="text-sm text-white text-center max-w-[490px] leading-[20px]">Un nouveau défi t&apos;attend chaque jour. Tes tentatives donnent des indices, analyse-les et trouve le bon Pokémon en un minimum d&apos;essais.</p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <PokemonSearchForm
              onSubmit={handleSearchSubmit}
              suggestions={pokemons.pokemon}
              onSuggestionClick={handleSearchSubmit}
            />

            <div className="">
              <p className="text-sm text-(--secondary-jaune) italic font-semibold text-center">Prochain défi</p>
              <div id='compteur' className="flex items-center gap-1 text-white text-2xl font-semibold">
                <p id='heures'>{formatNumber(timeLeft.hours)}<span className="text-white/80 text-sm">H</span></p>
                <p className="text-(--secondary-jaune)">:</p>
                <p id='minutes'>{formatNumber(timeLeft.minutes)}<span className="text-white/80 text-sm">M</span></p>
                <p className="text-(--secondary-jaune)">:</p>
                <p id='secondes'>{formatNumber(timeLeft.seconds)}<span className="text-white/80 text-sm">S</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center w-9/12 mx-auto border-t border-(--border) py-6'>
        <div className='flex justify-between w-[680px] items-center'>
          <h3 className="text-white">Modes de jeux</h3>     
          <GameMode img={classicIcon} titre='Classique' couleur='jaune' onclick={() => launchMode('classic')} />
          <GameMode img={descIcon} titre='Description' couleur='violet' onclick={() => launchMode('desc')} />
          <GameMode img={pixelsIcon} titre='Pixels' couleur='bleu' onclick={() => launchMode('pixels')} />
          {/* <GameMode img={typesIcon} titre='Types' couleur='orange' onclick={() => launchMode('types')} /> */}
        </div>
      </div>
    </div>
  )
}

