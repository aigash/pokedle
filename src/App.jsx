import GameMode from './components/accueil/GameMode';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

import classicIcon from './assets/img/icones/classic_new.png';
import descIcon from './assets/img/icones/desc_new.png';
import pixelsIcon from './assets/img/icones/pixels_new.png';
import typesIcon from './assets/img/icones/types_new.png';
import backgroundImage from './assets/img/backgrounds/background.png';

export default function App() {
  const navigate = useNavigate();
  
  function launchMode(mode) {
    navigate('/' + mode);
  }

  return (
    <div
      id='modesJeux'
      className='flex flex-col min-h-screen items-center'
      style={{
        background: `
          url(${backgroundImage}) center/cover no-repeat,
          linear-gradient(107deg, var(--bg-color1), var(--bg-color2)),
          linear-gradient(rgba(0,0,0,0.36), rgba(0,0,0,0.36)),
          #fff
        `,
        backgroundBlendMode: 'overlay, normal, normal'
      }}
    >
      <div className="grow flex items-center justify-center">
        <div className="w-[680px] mx-auto flex flex-col gap-14">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-[96px] font-extrabold italic text-white leading-[80px]" style={{ textShadow: '2px 2px 0 var(--secondary-jaune)' }}>POKÉDEUL</h1>
            <h2 className="text-[26px] font-semibold italic text-(--secondary-jaune) leading-[20px]">Reconnais-les tous !</h2>
            <p className="text-sm text-white text-center max-w-[490px] leading-[20px]">Un nouveau défi t&apos;attend chaque jour. Tes tentatives donnent des indices, analyse-les et trouve le bon Pokémon en un minimum d&apos;essais.</p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="w-full rounded-full bg-(--secondary-jaune) flex items-center">
              <div className="flex items-center gap-3 px-6 py-4 bg-white grow rounded-full">
                <Search className="text-(--text-violet-color)" size={26} strokeWidth={3} />
                <input
                  type="text"
                  placeholder="Tape un nom de Pokémon..."
                  className="text-lg text-[22px] text-(--text-violet-color) placeholder-(--placeholder-color) outline-none grow"
                />
              </div>
              <button className="text-(--text-violet-color) text-2xl font-semibold italic bg-transparent pr-10 pl-8">
                JOUER
              </button>
            </div>

            <div className="">
              <p className="text-sm text-(--secondary-jaune) italic font-semibold text-center">Prochain défi</p>
              <div className="flex items-center gap-1 text-white text-2xl font-semibold">
                <p>05<span className="text-white/80 text-sm">H</span></p>
                <p className="text-(--secondary-jaune)">:</p>
                <p>04<span className="text-white/80 text-sm">M</span></p>
                <p className="text-(--secondary-jaune)">:</p>
                <p>28<span className="text-white/80 text-sm">S</span></p>
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
          <GameMode img={typesIcon} titre='Types' couleur='orange'onclick={() => launchMode('types')} />
        </div>
      </div>
    </div>
  )
}

