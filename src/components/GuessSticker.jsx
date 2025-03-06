export default function GuessSticker({ guess, pokemon }) {

    return <div className={(pokemon.nameFr === guess.nameFr ? 'bg-green-500' : 'bg-red-500') + ' rounded-md w-28 h-28 flex flex-col items-center p-1.5'}>
        <div class='h-4/5 flex items-end'><img className='imgGuess max-h-full' src={guess.gif} alt={guess.nameFr}></img></div>
        <p className='text-white h-1/5'>{guess.nameFr}</p>
    </div>
}