import './assets/css/App.css'
import GameMode from './components/accueil/GameMode';

import logoImage from './assets/pokedeule.png';
import classicIcon from './assets/img/icones/classic.svg';
import descIcon from './assets/img/icones/desc.svg';
import pixelsIcon from './assets/img/icones/pixels.svg';

export default function App() {
  function launchMode(mode) {
    window.location.href = '/' + mode;
  }

  return (
    <div id='modesJeux' className='flex flex-col items-center'>

      <img className='h-44 mb-6' src={logoImage}></img>

      <div className='flex flex-col p-3 rounded-xl bg-white/60'>
        <div className='px-3 mb-3'>
          <h2 className='text-[#305380] text-2xl py-1.5 font-semibold border-b border-[#305380]/80'>Modes de jeu</h2>
        </div>
      
        <GameMode img={classicIcon} titre='Classique' onclick={() => launchMode('classic')} />
        <GameMode img={descIcon} titre='Description' onclick={() => launchMode('desc')} />
        <GameMode img={pixelsIcon} titre='Pixels' onclick={() => launchMode('pixels')} />
      </div>
    </div>
  )
}

