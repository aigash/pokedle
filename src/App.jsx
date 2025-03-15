import './assets/css/App.css'
import GameMode from './components/accueil/GameMode';
import { useNavigate } from 'react-router-dom';

import logoImage from './assets/pokedeule.png';
import classicIcon from './assets/img/icones/classic.svg';
import descIcon from './assets/img/icones/desc.svg';
import pixelsIcon from './assets/img/icones/pixels.svg';

export default function App() {
  const navigate = useNavigate();
  
  function launchMode(mode) {
    navigate('/' + mode);
  }

  return (
    <div id='modesJeux' className='flex flex-col min-h-screen items-center bg-[65%] sm:bg-[50%] bg-no-repeat bg-cover bg-[url("../img/backgrounds/main-screen.jpg")]'>

      <img className='sm:h-44 mb-6' src={logoImage}></img>

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

