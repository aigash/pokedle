import './App.css'

function App() {
  function launchMode(mode) {
    window.location.href = '/' + mode;
  }

  return (
    <div id='modesJeux' className='flex flex-col items-center gap-2'>

      <img className='w-80' src='src/assets/pokedeule.png'></img>

      <div className='p-3 rounded-md bg-red-500 text-white' id='modeClassique' onClick={(e) => launchMode('classic')}>
        <h3>Classique</h3>
      </div>

      <div className='p-3 rounded-md bg-red-500 text-white' id='modeDesc' onClick={(e) => launchMode('desc')}>
        <h3>Description</h3>
      </div>

      <div className='p-3 rounded-md bg-red-500 text-white' id='modeSilhouette' onClick={(e) => launchMode('silhouette')}>
        <h3>Silhouette</h3>
      </div>

    </div>
  )
}

export default App
