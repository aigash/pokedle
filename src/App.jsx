import './App.css'
import GameMode from './components/GameMode';

export default function App() {
  function launchMode(mode) {
    window.location.href = '/' + mode;
  }

  return (
    <div id='modesJeux' className='flex flex-col items-center'>

      <img className='h-44 mb-6' src='src/assets/pokedeule.png'></img>

      <div className='flex flex-col p-3 rounded-xl bg-white/60'>
        <GameMode img='src/assets/classic.svg' titre='Classique' onclick={(e) => launchMode('classic')} />
        <GameMode img='src/assets/desc.svg' titre='Description' onclick={(e) => launchMode('desc')} />
        <GameMode img='src/assets/pixels.svg' titre='Pixels' onclick={(e) => launchMode('pixels')} />
      </div>
    </div>
  )
}

