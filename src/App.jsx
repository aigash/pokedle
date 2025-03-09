import './assets/css/App.css'
import GameMode from './components/accueil/GameMode';

export default function App() {
  function launchMode(mode) {
    window.location.href = '/' + mode;
  }

  return (
    <div id='modesJeux' className='flex flex-col items-center'>

      <img className='h-44 mb-6' src='src/assets/pokedeule.png'></img>

      <div className='flex flex-col p-3 rounded-xl bg-white/60'>
        <div className='px-3 mb-3'>
          <h2 className='text-[#305380] text-2xl py-1.5 font-semibold border-b border-[#305380]/80'>Modes de jeu</h2>
        </div>
      
        <GameMode img='src/assets/img/icones/classic.svg' titre='Classique' onclick={(e) => launchMode('classic')} />
        <GameMode img='src/assets/img/icones/desc.svg' titre='Description' onclick={(e) => launchMode('desc')} />
        <GameMode img='src/assets/img/icones/pixels.svg' titre='Pixels' onclick={(e) => launchMode('pixels')} />
      </div>
    </div>
  )
}

